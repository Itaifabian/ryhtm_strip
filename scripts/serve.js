#!/usr/bin/env node
/**
 * serve.js — a tiny static server for local preview. Serves the dist/
 * folder at http://localhost:8080.
 *
 * Also backs two AI Studio endpoints (src/shell.html):
 *  - POST /api/generate      proxies the Claude API when ANTHROPIC_API_KEY is
 *                            set. The key never reaches the browser. Uses
 *                            Node's built-in https module (no SDK).
 *  - POST /api/extract-text  extracts plain text from an uploaded PDF/DOCX
 *                            using the pdf-parse / mammoth devDependencies,
 *                            so AI Studio can accept those file types.
 * The rest of the app (everything but AI Studio) has zero dependencies and
 * works as a static file with neither of the above configured.
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'dist');
const PORT = process.env.PORT || 8080;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const MAX_UPLOAD_BYTES = 30 * 1024 * 1024; // ~30MB of base64 body (~22MB file)

loadDotEnv();

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-8';

function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

/* ---- JSON schemas for structured output, matching docs/AUTHORING_GUIDE.md ---- */
function schemaFor(kind) {
  if (kind === 'quiz') {
    return {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              q: { type: 'string' },
              options: { type: 'array', items: { type: 'string' } },
              answer: { type: 'integer' },
              explain: { type: 'string' },
              uncertain: { type: 'boolean' },
              note: { type: 'string' }
            },
            required: ['q', 'options', 'answer', 'explain', 'uncertain', 'note'],
            additionalProperties: false
          }
        }
      },
      required: ['items'],
      additionalProperties: false
    };
  }
  return {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            front: { type: 'string' },
            back: { type: 'string' },
            uncertain: { type: 'boolean' },
            note: { type: 'string' }
          },
          required: ['front', 'back', 'uncertain', 'note'],
          additionalProperties: false
        }
      }
    },
    required: ['items'],
    additionalProperties: false
  };
}

const SYSTEM_PROMPT = [
  'You are drafting study material for a medical-education app (cardiology & rheumatology).',
  'Use ONLY facts explicitly stated in the reference text the user provides. Do not add facts,',
  'doses, thresholds, or antibody/drug associations from your general knowledge — if the source',
  "doesn't state it, don't assert it.",
  'For each item, set "uncertain": true and fill "note" with a short explanation if the source was',
  'ambiguous, contradictory, or you had to phrase something loosely. Otherwise set "uncertain": false',
  'and leave "note" as an empty string.',
  'For quiz items: exactly one option must be unambiguously correct per the source. Avoid "all of the',
  'above", trick negatives, or two-defensible-answers questions.',
  'Respond with data matching the given JSON schema only.'
].join(' ');

function callClaude({ referenceText, topicName, kind, count }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Promise.reject({ status: 503, body: { error: 'ANTHROPIC_API_KEY not set on the server — see README.md "AI Studio" section.' } });
  }
  const userPrompt = `Topic: ${topicName}\nGenerate ${count} ${kind === 'quiz' ? 'quiz questions' : 'flashcards'} grounded strictly in this reference text:\n\n${referenceText}`;
  const payload = JSON.stringify({
    model: ANTHROPIC_MODEL,
    max_tokens: 8192,
    thinking: { type: 'adaptive' },
    system: SYSTEM_PROMPT,
    output_config: { format: { type: 'json_schema', schema: schemaFor(kind) } },
    messages: [{ role: 'user', content: userPrompt }]
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-length': Buffer.byteLength(payload)
        }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          let parsed;
          try { parsed = JSON.parse(data); } catch (e) {
            return reject({ status: 502, body: { error: 'Claude API returned invalid JSON.' } });
          }
          if (res.statusCode >= 300) {
            return reject({ status: 502, body: { error: (parsed.error && parsed.error.message) || 'Claude API request failed.' } });
          }
          const textBlock = (parsed.content || []).find((b) => b.type === 'text');
          if (!textBlock) return reject({ status: 502, body: { error: 'Claude API returned no text content.' } });
          let items;
          try { items = JSON.parse(textBlock.text).items || []; } catch (e) {
            return reject({ status: 502, body: { error: 'Could not parse structured output from Claude.' } });
          }
          resolve(items);
        });
      }
    );
    req.on('error', (e) => reject({ status: 502, body: { error: 'Network error contacting Claude API: ' + e.message } }));
    req.write(payload);
    req.end();
  });
}

function handleGenerate(req, res) {
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    let payload;
    try { payload = JSON.parse(body); } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
    }
    const referenceText = (payload.referenceText || '').trim();
    const topicName = (payload.topicName || 'Untitled topic').trim();
    const kind = payload.kind === 'quiz' ? 'quiz' : 'flashcards';
    const count = Math.min(Math.max(parseInt(payload.count, 10) || 8, 1), 20);
    if (!referenceText) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'No reference text provided.' }));
    }
    callClaude({ referenceText, topicName, kind, count }).then(
      (items) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ items }));
      },
      (err) => {
        res.writeHead(err.status || 502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err.body || { error: 'Generation failed.' }));
      }
    );
  });
}

function extractPdf(buffer) {
  let pdfParse;
  try { pdfParse = require('pdf-parse'); } catch (e) {
    return Promise.reject({ status: 500, body: { error: 'pdf-parse is not installed — run `npm install` in the repo root.' } });
  }
  return pdfParse(buffer)
    .then((data) => data.text || '')
    .catch((e) => Promise.reject({ status: 422, body: { error: 'Could not read that PDF: ' + e.message } }));
}

function extractDocx(buffer) {
  let mammoth;
  try { mammoth = require('mammoth'); } catch (e) {
    return Promise.reject({ status: 500, body: { error: 'mammoth is not installed — run `npm install` in the repo root.' } });
  }
  return mammoth.extractRawText({ buffer })
    .then((result) => result.value || '')
    .catch((e) => Promise.reject({ status: 422, body: { error: 'Could not read that Word document: ' + e.message } }));
}

function handleExtractText(req, res) {
  let body = '';
  let tooBig = false;
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_UPLOAD_BYTES) tooBig = true;
  });
  req.on('end', () => {
    if (tooBig) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'File is too large (max ~20MB).' }));
    }
    let payload;
    try { payload = JSON.parse(body); } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
    }
    const filename = (payload.filename || '').toLowerCase();
    const ext = path.extname(filename);
    let buffer;
    try { buffer = Buffer.from(payload.dataBase64 || '', 'base64'); } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid file data.' }));
    }
    let job;
    if (ext === '.pdf') job = extractPdf(buffer);
    else if (ext === '.docx') job = extractDocx(buffer);
    else if (ext === '.doc') job = Promise.reject({ status: 415, body: { error: 'Legacy .doc files are not supported — save as .docx and try again.' } });
    else job = Promise.reject({ status: 415, body: { error: 'Unsupported file type: ' + (ext || filename) } });

    job.then(
      (text) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text: text }));
      },
      (err) => {
        res.writeHead(err.status || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err.body || { error: 'Text extraction failed.' }));
      }
    );
  });
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/generate') return handleGenerate(req, res);
  if (req.method === 'POST' && req.url === '/api/extract-text') return handleExtractText(req, res);

  let file = decodeURIComponent(req.url.split('?')[0]);
  if (file === '/') file = '/index.html';
  const full = path.join(ROOT, path.normalize(file));
  if (!full.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(full, (e, data) => {
    if (e) { res.writeHead(404); return res.end('Not found — run `npm run build` first.'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(full)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`▶ Rhythm Strip running at http://localhost:${PORT}`);
  console.log(process.env.ANTHROPIC_API_KEY ? '  AI Studio: enabled' : '  AI Studio: disabled (set ANTHROPIC_API_KEY to enable)');
  console.log('  (Ctrl-C to stop)');
}).on('error', (e) => {
  console.error('Server failed to start:', e.message);
  process.exit(1);
});
