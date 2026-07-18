#!/usr/bin/env node
/**
 * build.js — assembles the single-file study app.
 *
 * Reads src/shell.html and every src/data/*.js file (in filename order),
 * concatenates the data into the shell's /*__DATA__*​/ placeholder, and
 * writes the result to dist/index.html.
 *
 * The app is intentionally a single self-contained HTML file: no bundler,
 * no runtime dependencies, works offline once fonts are cached. Data files
 * are plain JS that declare top-level consts the app reads as globals.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SHELL = path.join(ROOT, 'src', 'shell.html');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const SW_SRC = path.join(ROOT, 'src', 'sw.js');
const OUT_DIR = path.join(ROOT, 'dist');
const OUT = path.join(OUT_DIR, 'index.html');
const SW_OUT = path.join(OUT_DIR, 'sw.js');
const PLACEHOLDER = '/*__DATA__*/';

function main() {
  const shell = fs.readFileSync(SHELL, 'utf8');
  if (!shell.includes(PLACEHOLDER)) {
    console.error(`❌ shell.html is missing the ${PLACEHOLDER} placeholder.`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.js'))
    .sort(); // numeric prefixes (01-, 02- …) guarantee order

  if (!files.length) {
    console.error('❌ No data files found in src/data/.');
    process.exit(1);
  }

  const blocks = files.map(f => {
    const body = fs.readFileSync(path.join(DATA_DIR, f), 'utf8').trim();
    return `/* ---- ${f} ---- */\n${body}`;
  });

  const combined = blocks.join('\n\n');
  const out = shell.replace(PLACEHOLDER, combined);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT, out);

  // Service worker: version the cache name with a content hash of the built
  // page, so a redeploy with new/changed content invalidates old caches
  // automatically (see src/sw.js's activate handler), while an unchanged
  // rebuild reuses the same cache name and doesn't force a refetch.
  const hash = crypto.createHash('sha256').update(out).digest('hex').slice(0, 12);
  const swSrc = fs.readFileSync(SW_SRC, 'utf8');
  fs.writeFileSync(SW_OUT, swSrc.replace('__CACHE_VERSION__', hash));

  const kb = (out.length / 1024).toFixed(1);
  console.log(`✅ Built dist/index.html (${kb} KB) from ${files.length} data files:`);
  files.forEach(f => console.log(`   · ${f}`));
  console.log(`✅ Built dist/sw.js (cache version ${hash})`);
}

main();
