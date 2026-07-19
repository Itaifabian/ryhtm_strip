#!/usr/bin/env node
/**
 * validate.js — data-integrity gate.
 *
 * Loads every src/data/*.js file in an isolated VM context and checks the
 * shapes the app depends on: topics have flashcards and quizzes, every quiz
 * answer index is valid, extra-quiz keys point at real topics, topic ids are
 * unique, and the drug/classification tables are well-formed.
 *
 * Run before opening a pull request:  npm run validate
 * Exit code is non-zero on any error, so CI blocks a bad merge.
 *
 * NOTE: this validates STRUCTURE, not medical correctness. A human clinician
 * must still review the content of every new card and question (see CLAUDE.md).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const errors = [];
const warnings = [];
const err = m => errors.push(m);
const warn = m => warnings.push(m);

/* ---- load all data files into one sandbox ---- */
function loadData() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).sort();
  let combined = '';
  for (const f of files) combined += fs.readFileSync(path.join(DATA_DIR, f), 'utf8') + '\n';
  // Expose top-level `const NAME =` declarations as sandbox globals.
  combined = combined.replace(/^(?:const|let|var)\s+/gm, 'globalThis.');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(combined, sandbox, { filename: 'data-bundle.js' });
  return sandbox;
}

/* ---- shape checks ---- */
function checkQuizItem(item, where) {
  if (typeof item.q !== 'string' || !item.q.trim()) err(`${where}: quiz item missing 'q'`);
  if (!Array.isArray(item.options) || item.options.length < 2) err(`${where}: quiz needs >=2 options`);
  if (typeof item.answer !== 'number') err(`${where}: quiz 'answer' must be a number`);
  else if (!item.options || !item.options[item.answer]) err(`${where}: 'answer' index ${item.answer} out of range — "${item.q}"`);
  if (typeof item.explain !== 'string' || !item.explain.trim()) warn(`${where}: quiz item has no explanation — "${item.q}"`);
}

function checkTopic(t, where, ids) {
  if (!t.id) err(`${where}: topic missing 'id'`);
  else if (ids.has(t.id)) err(`${where}: duplicate topic id '${t.id}'`);
  else ids.add(t.id);
  if (!t.name) err(`${where} (${t.id}): missing 'name'`);
  if (!t.blurb) warn(`${where} (${t.id}): missing 'blurb'`);
  if (!Array.isArray(t.flashcards) || !t.flashcards.length) err(`${where} (${t.id}): no flashcards`);
  else t.flashcards.forEach((c, i) => {
    if (!c.front || !c.back) err(`${where} (${t.id}) flashcard #${i + 1}: needs 'front' and 'back'`);
  });
  if (!Array.isArray(t.quiz) || !t.quiz.length) warn(`${where} (${t.id}): no quiz questions`);
  else t.quiz.forEach((q, i) => checkQuizItem(q, `${where} (${t.id}) quiz #${i + 1}`));
}

function main() {
  let S;
  try { S = loadData(); }
  catch (e) { console.error('❌ Data files failed to parse:\n   ' + e.message); process.exit(1); }

  const ids = new Set();
  let fcCount = 0, qCount = 0, topicCount = 0;

  const countTopics = (arr, label) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(t => {
      checkTopic(t, label, ids);
      topicCount++;
      fcCount += (t.flashcards || []).length;
      qCount += (t.quiz || []).length;
    });
  };

  countTopics(S.TOPICS, 'TOPICS');
  countTopics(S.RHEUM_TOPICS, 'RHEUM_TOPICS');
  countTopics(S.RHEUM_EXTRA_TOPICS, 'RHEUM_EXTRA_TOPICS');
  countTopics(S.PULM_TOPICS, 'PULM_TOPICS');
  countTopics(S.ID_TOPICS, 'ID_TOPICS');
  countTopics(S.ID_EXTRA_TOPICS, 'ID_EXTRA_TOPICS');
  countTopics(S.ALLERGY_TOPICS, 'ALLERGY_TOPICS');
  countTopics(S.GERIATRIC_TOPICS, 'GERIATRIC_TOPICS');
  countTopics(S.RADIOLOGY_TOPICS, 'RADIOLOGY_TOPICS');
  countTopics(S.ENDO_TOPICS, 'ENDO_TOPICS');
  countTopics(S.NEPHRO_TOPICS, 'NEPHRO_TOPICS');
  countTopics(S.NEURO_TOPICS, 'NEURO_TOPICS');
  countTopics(S.HEMATOLOGY_TOPICS, 'HEMATOLOGY_TOPICS');
  countTopics(S.GASTRO_TOPICS, 'GASTRO_TOPICS');

  // extra-quiz maps must key into existing topic ids
  const checkExtra = (map, label, validIds) => {
    if (!map) return;
    Object.keys(map).forEach(k => {
      if (!validIds.has(k)) err(`${label}: key '${k}' is not an existing topic id`);
      map[k].forEach((q, i) => { checkQuizItem(q, `${label}['${k}'] #${i + 1}`); qCount++; });
    });
  };
  const cardioIds = new Set((S.TOPICS || []).map(t => t.id));
  const rheumIds = new Set([...(S.RHEUM_TOPICS || []), ...(S.RHEUM_EXTRA_TOPICS || [])].map(t => t.id));
  checkExtra(S.EXTRA_CARDIO_QUIZ, 'EXTRA_CARDIO_QUIZ', cardioIds);
  checkExtra(S.EXTRA_RHEUM_QUIZ, 'EXTRA_RHEUM_QUIZ', rheumIds);
  const nephroIds = new Set((S.NEPHRO_TOPICS || []).map(t => t.id));
  checkExtra(S.EXTRA_NEPHRO_QUIZ, 'EXTRA_NEPHRO_QUIZ', nephroIds);
  const idIds = new Set([...(S.ID_TOPICS || []), ...(S.ID_EXTRA_TOPICS || [])].map(t => t.id));
  checkExtra(S.EXTRA_ID_QUIZ, 'EXTRA_ID_QUIZ', idIds);
  const hematologyIds = new Set((S.HEMATOLOGY_TOPICS || []).map(t => t.id));
  checkExtra(S.EXTRA_HEMATOLOGY_QUIZ, 'EXTRA_HEMATOLOGY_QUIZ', hematologyIds);

  // drugs
  let drugCount = 0;
  if (S.DRUGS) {
    Object.keys(S.DRUGS).forEach(ch => {
      S.DRUGS[ch].forEach(g => {
        if (!g.group) err(`DRUGS[${ch}]: group missing 'group' name`);
        (g.items || []).forEach(d => {
          drugCount++;
          if (!d.name) err(`DRUGS[${ch}]/${g.group}: drug missing 'name'`);
          if (!d.moa) warn(`DRUGS[${ch}] ${d.name}: missing 'moa'`);
          if (!d.ind) warn(`DRUGS[${ch}] ${d.name}: missing 'ind' (indications)`);
        });
      });
    });
  } else warn('DRUGS table not found');

  // classifications
  let schemeCount = 0;
  if (S.CLASSIFICATIONS) {
    Object.keys(S.CLASSIFICATIONS).forEach(ch => {
      S.CLASSIFICATIONS[ch].forEach(sub => {
        if (!sub.subject) err(`CLASSIFICATIONS[${ch}]: subject missing 'subject'`);
        (sub.schemes || []).forEach(sc => {
          schemeCount++;
          if (!sc.title) err(`CLASSIFICATIONS[${ch}]/${sub.subject}: scheme missing 'title'`);
          if (!Array.isArray(sc.rows) || !sc.rows.length) err(`CLASSIFICATIONS[${ch}]/${sub.subject}/${sc.title}: no rows`);
        });
      });
    });
  } else warn('CLASSIFICATIONS table not found');

  // past exams
  const KNOWN_CHAPTERS = new Set(['Cardiology', 'Rheumatology', 'Pulmonology', 'Infectious Diseases',
    'Allergy & Immunology', 'Geriatrics', 'Radiology', 'Endocrinology', 'Nephrology', 'Neurology',
    'Hematology', 'Gastroenterology']);
  let examCount = 0, examQCount = 0;
  if (S.PAST_EXAMS) {
    S.PAST_EXAMS.forEach(exam => {
      examCount++;
      if (!exam.id) err('PAST_EXAMS: exam missing id');
      if (!exam.name) err(`PAST_EXAMS[${exam.id}]: missing name`);
      const nums = new Set();
      (exam.questions || []).forEach(q => {
        examQCount++;
        const label = `PAST_EXAMS[${exam.id}] Q${q.num}`;
        if (typeof q.num !== 'number') err(`${label}: missing/invalid num`);
        if (nums.has(q.num)) err(`${label}: duplicate question number`);
        nums.add(q.num);
        if (!q.stem) err(`${label}: missing stem`);
        if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 5) err(`${label}: options must have 2-5 items`);
        if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= (q.options || []).length) err(`${label}: answer index out of range`);
        if (!q.chapter) err(`${label}: missing chapter tag`);
        else if (!KNOWN_CHAPTERS.has(q.chapter)) err(`${label}: chapter '${q.chapter}' is not a known chapter`);
        if (q.img !== undefined && !q.img) err(`${label}: img present but empty/unresolved (check PAST_EXAM_IMAGES key)`);
      });
    });
  }

  /* ---- report ---- */
  console.log('— Rhythm Strip content validation —');
  console.log(`  topics:         ${topicCount}`);
  console.log(`  flashcards:     ${fcCount}`);
  console.log(`  quiz questions: ${qCount}`);
  console.log(`  drugs:          ${drugCount}`);
  console.log(`  classification schemes: ${schemeCount}`);
  console.log(`  past exams:     ${examCount} (${examQCount} questions)`);

  if (warnings.length) {
    console.log(`\n⚠️  ${warnings.length} warning(s):`);
    warnings.forEach(w => console.log('   · ' + w));
  }
  if (errors.length) {
    console.log(`\n❌ ${errors.length} error(s):`);
    errors.forEach(e => console.log('   · ' + e));
    console.log('\nValidation FAILED.');
    process.exit(1);
  }
  console.log('\n✅ Structure valid. (Medical accuracy still needs human review — see CLAUDE.md.)');
}

main();
