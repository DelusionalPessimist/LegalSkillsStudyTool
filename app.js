'use strict';
/* 1L Legal Skills — app shell, routing, views, and local data.
   Depends on content.js (curriculum, order, lessons, moves). No framework, no network. */

const KEY = '1l-legal-skills-v1';
const APP_VERSION = '2.0 prototype';
const LEVELS = ['Basic', 'Advanced', 'Expert'];

/* ---------- Skill metadata (all examples use fictional facts and fictional rules) ---------- */
const SKILLS = {
  Reading: {
    color: '#2f7cf6', icon: 'bookOpen',
    tagline: 'Read opinions and statutes for what they actually decide.',
    why: 'Every other skill depends on an accurate read. A misread holding or a dropped exception quietly breaks everything built on top of it.',
    steps: ['Skim for structure: who is asking for what, and in what procedural posture.', 'Read the operative language slowly; mark elements, connectors, and exceptions.', 'Separate what the court decided from what it said along the way.', 'Restate the result in one sentence using the source’s own key words.'],
    mistake: 'Paraphrasing too early. Once you swap the source’s words for your own, small but decisive conditions disappear.',
    example: { title: 'The Lantern Ordinance', body: 'A fictional town rule says: “No lantern may be lit on the pier after dusk unless a ranger has approved it in writing.” A careful reader marks three pieces: the act (lit), the place and time (on the pier, after dusk), and the exception (written ranger approval). A fictional opinion applying it remarks that the rule “protects the wooden decking,” then holds that a battery lamp is not a lantern. The holding is about what counts as a lantern; the remark about decking is reasoning that may help in a later case, not a separate rule.' },
    checklist: ['I quoted the operative words before paraphrasing.', 'I marked every element, connector, and exception.', 'I separated the holding from commentary.', 'I can state the result in one sentence.']
  },
  Analysis: {
    color: '#5e5ce6', icon: 'grid',
    tagline: 'Turn facts and a rule into a reasoned answer.',
    why: 'Exams and memos reward visible reasoning. Analysis is the bridge that shows a reader exactly how each fact meets each element.',
    steps: ['Frame the decision: who wants what, from whom, under which rule.', 'Break the rule into elements and set them across the top of a grid.', 'For each element, place the facts that cut each way.', 'Write the inference that connects fact to element, then the rival inference.', 'Conclude with confidence that matches the reasons.'],
    mistake: 'The fact dump: narrating every fact, then announcing that the rule is satisfied without showing why.',
    example: { title: 'The Greenhouse Gate', body: 'A fictional campus rule: “A key holder who leaves the west gate unlatched after closing must report it to the grounds lead before sunrise.” Noor leaves at dusk; the latch appears engaged, but a later photograph shows a gap. At 6:10 a.m. Noor sends a saved message: “Gate issue—checking now.” Careful analysis does not jump from the photograph to an answer. It asks what “unlatched” means in the text, separates the photograph from an inference about the latch at departure, checks whether “before sunrise” was met, and asks whether the message reports the issue clearly enough.' },
    checklist: ['Each issue names the party, the rule, and the decisive facts.', 'Every element has facts on both sides.', 'Each inference is written down, not implied.', 'Missing facts are handled as forks.']
  },
  Logic: {
    color: '#0e9f9a', icon: 'branch',
    tagline: 'Test the structure of rules and the strength of reasons.',
    why: 'Legal arguments fail at the joints: a factor treated as a requirement, an “or” read as an “and,” a reason that just restates the conclusion.',
    steps: ['Diagram the rule: elements, factors, exceptions, and burdens.', 'Read every connector — and, or, unless — literally first.', 'After each reason, label it: authority, evidence, inference, or policy.', 'Check for circularity: does any premise assume the conclusion?'],
    mistake: 'Silently upgrading a factor into a prerequisite, or a “may” into a “must.”',
    example: { title: 'The Library Fine Waiver', body: 'A fictional campus rule waives a late fine “if the borrower was ill or the book was recalled, and the borrower returns it within seven days.” Diagrammed, the waiver needs one of two triggers (illness or recall) plus the seven-day return. A borrower who was ill but returned the book on day ten does not fit the structure, however sympathetic. Mapping the connectors first keeps the argument from resting on the wrong shape — and shows exactly where a fairness argument would have to do its work.' },
    checklist: ['I diagrammed the rule before applying it.', 'I read each connector precisely.', 'Each reason is labeled by type.', 'No premise assumes the conclusion.']
  },
  Writing: {
    color: '#e8730c', icon: 'pen',
    tagline: 'Write so a skeptical reader can follow every step.',
    why: 'Good analysis that a reader cannot follow does not do its job. Legal writing is judged on precision, structure, and whether the conclusion matches the reasons.',
    steps: ['Lead with the answer or the question the reader needs.', 'Give each paragraph one job: claim, support, transition.', 'Use the same term for the same thing every time.', 'Revise in passes: logic, structure, register, then mechanics.'],
    mistake: 'Polishing sentences before fixing the logic underneath them.',
    example: { title: 'The Bakery Pre-Order', body: 'Before: “It seems like the baker probably might have had some kind of duty here, depending.” After: “The baker likely owed notice under fictional Rule 4 because she accepted the pre-order in writing; the open question is whether a posted sign counts as that notice.” The revision gives a calibrated answer, states the reason, and names the fork — with fewer hedges and more information.' },
    checklist: ['The answer appears where the reader expects it.', 'Each paragraph does one job.', 'Party names and key terms are consistent.', 'My confidence words match my reasons.']
  },
  Argument: {
    color: '#e5484d', icon: 'scale',
    tagline: 'Persuade honestly with analogy, distinction, and rebuttal.',
    why: 'Advocacy is credible only when it engages the strongest opposing point. Readers notice when an argument answers a weaker version.',
    steps: ['Identify the feature the precedent turned on.', 'Show how that feature appears — or doesn’t — in your facts.', 'State the other side’s best argument in terms its advocate would accept.', 'Answer it: deny a premise, challenge an inference, distinguish, or concede and narrow.'],
    mistake: 'Surface analogies. “Both cases involve dogs” proves nothing until you show why dogs mattered.',
    example: { title: 'The Rooftop Garden Cases', body: 'In fictional Ames, a tenant could keep rooftop planters because the lease was silent and the planters were removable. In fictional Brook, a tenant could not, because the planters were bolted to the roof. A new tenant uses heavy freestanding planters. The landlord analogizes to Brook on weight and roof damage; the tenant analogizes to Ames on removability. The real fight is over which feature the cases turned on — and the honest argument names both.' },
    checklist: ['I named the decisive feature, not a surface similarity.', 'I stated the opposing argument fairly.', 'My response targets a specific premise or inference.', 'I did not overstate what an authority holds.']
  },
  Oral: {
    color: '#d6409f', icon: 'mic',
    tagline: 'Answer cold calls and arguments directly and calmly.',
    why: 'Cold calls, moots, and client meetings reward the same habit: answer first, then give the reason, then qualify.',
    steps: ['Give a direct answer in one sentence.', 'Follow with the rule or fact that supports it.', 'Add a qualification only after the answer.', 'Stop when the question is answered.'],
    mistake: 'Long preambles. The listener waits through context and misses the answer when it finally arrives.',
    example: { title: 'The Ferry Schedule Cold Call', body: 'Professor: “Under the fictional ferry rule, was the passenger late?” Weak: “Well, so, there are a lot of facts here, and the rule is kind of interesting because…” Strong: “Probably yes. The rule measures lateness at the gangway, and she reached it two minutes after departure. The open question is whether the delayed boarding call resets the clock.”' },
    checklist: ['My first sentence answered the question.', 'The reason followed immediately.', 'I said what I’d need to know instead of guessing.', 'I stopped once I’d answered.']
  },
  Research: {
    color: '#2f9e62', icon: 'search',
    tagline: 'Find, verify, and log authority efficiently.',
    why: 'Research is where time disappears. A plan and a log turn open-ended searching into a process you can retrace and finish.',
    steps: ['Write the research question, jurisdiction, and key terms.', 'Start with a secondary source to learn the vocabulary.', 'Confirm every proposition in primary authority.', 'Log each search, and decide in advance when you’ll stop.'],
    mistake: 'Citing a proposition from a summary without reading the primary authority it describes.',
    example: { title: 'The Harbor Dock Question', body: 'Question: under the fictional Port Code, may a dock owner charge overnight fees to emergency vessels? Plan: jurisdiction is the fictional Port District; terms include “moorage,” “emergency,” “safe harbor,” and “fee.” Log entry: searched emergency /s moorage /p fee; found Port Code § 12 and a commentary note. Next step: read § 12 in full and check the definitions section before relying on the note.' },
    checklist: ['I wrote the question before searching.', 'I logged queries and results.', 'Every proposition is confirmed in primary material.', 'I set a stopping point.']
  }
};
const LEVEL_INFO = {
  Basic: { mins: 10, split: [2, 6, 2], goal: 'Build the habit on a short excerpt.' },
  Advanced: { mins: 15, split: [3, 9, 3], goal: 'Apply it across competing readings.' },
  Expert: { mins: 20, split: [3, 12, 5], goal: 'Use it under pressure and at the boundaries.' }
};
const SCORE_LABELS = ['', 'Missing', 'Partial', 'Solid', 'Strong'];
const SEVEN_ID = lessons.find(l => l.title === 'The Seven Moves module').id;

/* ---------- Icons (inline SVG, SF Symbols–style strokes) ---------- */
const PATHS = {
  today: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
  bookOpen: '<path d="M2 4.5h6a4 4 0 0 1 4 4V20a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6a4 4 0 0 0-4 4V20a3 3 0 0 1 3-3h7z"/>',
  grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8"/>',
  branch: '<circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="7" r="2.2"/><path d="M6 7.2v9.6M18 9.2c0 5-6 4-11 8"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  scale: '<path d="M12 3v18M7.5 21h9M4 7h16"/><path d="M7 7 4 14a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>',
  mic: '<rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0M12 17.5V21"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.5 2M9.5 2.5h5"/>',
  log: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  sparkle: '<path d="M12 3.5 13.9 9 19.5 11l-5.6 2-1.9 5.5-1.9-5.5L4.5 11l5.6-2z"/><path d="M19 3v3M17.5 4.5h3"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M3.5 6h17M9 6V4h6v2M6 6l1 14h10l1-14"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15V5.5A2.5 2.5 0 0 1 7.5 3H15"/>',
  play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="3"/>',
  reset: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/>',
  flame: '<path d="M12 22c4 0 7-2.8 7-6.8 0-4.2-3.2-6.5-4.3-10.7-2 1.8-3 3.8-3 6-1.2-.8-2-2.2-2.2-3.8C6.8 9 5 11.6 5 15.2 5 19.2 8 22 12 22z"/>',
  download: '<path d="M12 3.5v12M7.5 11l4.5 4.5 4.5-4.5M4 20.5h16"/>',
  upload: '<path d="M12 15.5v-12M7.5 8 12 3.5 16.5 8M4 20.5h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  quote: '<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  words: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  medal: '<circle cx="12" cy="14.5" r="5.5"/><path d="M8.5 10 6 3h4l2 4 2-4h4l-2.5 7"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
};
function icon(name, size = 22, sw = 1.8) {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || ''}</svg>`;
}

/* ---------- State ---------- */
function defaults() {
  return {
    version: 1, entries: [], progress: {}, classes: [], theme: 'system', notes: {}, checks: {},
    moveChecks: {}, moveDrafts: {}, practiceDraft: { task: '', source: '', lessonId: null },
    activity: [], lastLesson: null, targetWords: 600,
    timer: { duration: 45 * 60, remaining: 45 * 60, endsAt: null }
  };
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (d && d.version === 1) {
      const s = Object.assign(defaults(), d);
      s.practiceDraft = Object.assign({ task: '', source: '', lessonId: null }, d.practiceDraft || {});
      s.timer = Object.assign(defaults().timer, d.timer || {});
      return s;
    }
  } catch (e) { /* fall through to defaults */ }
  return defaults();
}
const state = load();
let saveTimer = null;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
  catch (e) { toast('Couldn’t save — storage may be full. Export a backup.', 'alert'); return false; }
}
function saveSoon(statusEl) {
  if (statusEl) statusEl.textContent = 'Saving…';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { if (save() && statusEl) statusEl.textContent = 'Saved'; }, 250);
}

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function esc(s = '') { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function wordCount(s = '') { return (String(s).trim().match(/\S+/g) || []).length; }
function today(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function fmtDate(iso, opts = { month: 'short', day: 'numeric' }) { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(undefined, opts); }
function fmtTime(sec) { return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; }
function plural(n, w) { return `${n.toLocaleString()} ${w}${n === 1 ? '' : 's'}`; }
function skillVar(skill) { return `--c:${SKILLS[skill]?.color || 'var(--accent)'}`; }
function lessonById(id) { return lessons.find(l => l.id === id); }
function lessonsOf(skill, level) { return lessons.filter(l => l.skill === skill && (!level || l.level === level)); }
function lessonIndex(l) { return lessonsOf(l.skill).indexOf(l) + 1; }
function isDone(id) { return !!state.progress[id]; }
function doneCount(list = lessons) { return list.filter(l => isDone(l.id)).length; }
function markActivity() { const d = today(); if (!state.activity.includes(d)) { state.activity.push(d); state.activity = state.activity.slice(-400); } }
function streak() {
  const days = new Set([...state.activity, ...state.entries.filter(e => wordCount(e.fullAnswer)).map(e => e.date)]);
  const d = new Date(); if (!days.has(today(d))) d.setDate(d.getDate() - 1);
  let n = 0; while (days.has(today(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function nextLesson() {
  const start = Math.max(0, lessons.findIndex(l => l.id === state.lastLesson));
  for (let i = 0; i < lessons.length; i++) { const l = lessons[(start + i) % lessons.length]; if (!isDone(l.id)) return l; }
  return lessons[start];
}
function dailyLesson() {
  const day = Math.floor(new Date(today() + 'T00:00:00').getTime() / 864e5);
  const start = (day * 7) % lessons.length;
  for (let i = 0; i < lessons.length; i++) { const l = lessons[(start + i) % lessons.length]; if (!isDone(l.id) && l.id !== nextLesson().id) return l; }
  return lessons[start];
}
function ring(pct, size = 120, stroke = 12, inner = '', color) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.min(1, Math.max(0, pct)));
  return `<div class="ring" style="width:${size}px;height:${size}px;${color ? `--c:${color}` : ''}"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle class="track" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}"/><circle class="val" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>${inner ? `<div class="label">${inner}</div>` : ''}</div>`;
}
function bar(pct, color) { return `<div class="bar" style="${color ? `--c:${color};` : ''}--p:${Math.round(pct * 100)}%"><i></i></div>`; }
function paragraphs(text) { return String(text).split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join(''); }
function sentences(text) { return String(text).match(/[^.!?]+[.!?]+(?:[”’"]+)?\s*/g) || [text]; }
function chunk(text, per = 4) { const s = sentences(text); const out = []; for (let i = 0; i < s.length; i += per) out.push(s.slice(i, i + per).join('').trim()); return out.join('\n\n'); }
function autoGrow(t) { t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight + 2, 120) + 'px'; }

let toastTimer;
function toast(msg, ic = 'check') {
  const t = $('#toast'); t.innerHTML = `${icon(ic, 18, 2.4)}<span>${esc(msg)}</span>`;
  t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Theme ---------- */
const mq = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const t = state.theme === 'system' ? (mq.matches ? 'dark' : 'light') : state.theme;
  document.documentElement.dataset.theme = t;
}
mq.addEventListener?.('change', applyTheme);

/* ---------- Timer (survives navigation and reloads) ---------- */
function timerLeft() { const t = state.timer; return t.endsAt ? Math.max(0, Math.round((t.endsAt - Date.now()) / 1000)) : t.remaining; }
function timerRunning() { return !!state.timer.endsAt; }
function timerActive() { return timerRunning() || state.timer.remaining < state.timer.duration; }
function timerToggle() {
  const t = state.timer;
  if (t.endsAt) { t.remaining = timerLeft(); t.endsAt = null; }
  else { if (t.remaining <= 0) t.remaining = t.duration; t.endsAt = Date.now() + t.remaining * 1000; }
  save(); paintTimer(true);
}
function timerReset(mins) { const t = state.timer; if (mins) t.duration = mins * 60; t.remaining = t.duration; t.endsAt = null; save(); paintTimer(true); }
function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [880, 1175].forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = f; o.connect(g); g.connect(ctx.destination); const s = ctx.currentTime + i * .18; g.gain.setValueAtTime(.0001, s); g.gain.exponentialRampToValueAtTime(.15, s + .02); g.gain.exponentialRampToValueAtTime(.0001, s + .5); o.start(s); o.stop(s + .55); });
  } catch (e) { /* audio optional */ }
}
function paintTimer(full) {
  const left = timerLeft(), t = state.timer;
  if (t.endsAt && left <= 0) { t.endsAt = null; t.remaining = 0; save(); chime(); navigator.vibrate?.(200); toast('Time’s up — finish your sentence and save.', 'timer'); full = true; }
  $$('[data-timer-text]').forEach(el => el.textContent = fmtTime(left));
  $$('.timer-card .ring .val').forEach(el => { const c = +el.getAttribute('stroke-dasharray'); el.setAttribute('stroke-dashoffset', c * (1 - left / t.duration)); });
  if (full) {
    $$('[data-action="timer-toggle"]').forEach(b => b.innerHTML = timerRunning() ? `${icon('pause', 18)} Pause` : `${icon('play', 18)} ${t.remaining < t.duration && t.remaining > 0 ? 'Resume' : 'Start'}`);
    paintPill();
  }
}
function paintPill() {
  const slot = $('#timer-slot'); if (!slot) return;
  slot.innerHTML = timerActive() && route().tab !== 'practice' && route().view !== 'moves'
    ? `<a class="timer-pill ${timerRunning() ? 'running' : ''}" href="#/practice" aria-label="Practice timer">${timerRunning() ? '<span class="dot"></span>' : icon('pause', 14)}<span data-timer-text>${fmtTime(timerLeft())}</span></a>` : '';
}
setInterval(() => { if (timerRunning()) paintTimer(); }, 500);

/* ---------- Routing ---------- */
function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  const [a = '', b = ''] = parts;
  const map = { '': ['today', 'today'], learn: ['learn', 'learn'], skill: ['learn', 'skill'], lesson: ['learn', 'lesson'], practice: ['practice', 'practice'], moves: ['practice', 'moves'], log: ['log', b ? 'entry' : 'log'], bridge: ['bridge', 'bridge'] };
  const [tab, view] = map[a] || map[''];
  return { tab, view, arg: b };
}
const TABS = [
  ['today', 'Today', 'today', '#/'], ['learn', 'Learn', 'bookOpen', '#/learn'], ['practice', 'Practice', 'timer', '#/practice'],
  ['log', 'Work log', 'log', '#/log'], ['bridge', 'Gap Bridge', 'sparkle', '#/bridge']
];

function renderChrome(tab) {
  const done = doneCount();
  $('#side').innerHTML = `
    <a class="brand" href="#/"><div class="brand-mark" aria-hidden="true">§</div><div><strong>1L Legal Skills</strong><small>Practice the work</small></div></a>
    ${TABS.map(([id, label, ic, href]) => `<a class="nav-item" href="${href}" ${id === tab ? 'aria-current="page"' : ''}>${icon(ic, 20)}<span>${label}</span>${id === 'bridge' ? '<span class="soon">Soon</span>' : ''}</a>`).join('')}
    <div class="side-foot">
      <div class="side-progress"><div class="row"><span>Course progress</span><strong>${done}/${lessons.length}</strong></div>${bar(done / lessons.length)}</div>
      <button class="nav-item" data-action="settings">${icon('gear', 20)}<span>Settings</span></button>
    </div>`;
  $('#tabbar').innerHTML = TABS.map(([id, label, ic, href]) => `<a href="${href}" ${id === tab ? 'aria-current="page"' : ''}>${icon(ic, 24)}<span>${label === 'Work log' ? 'Log' : label === 'Gap Bridge' ? 'Bridge' : label}</span></a>`).join('');
}

let lastEntryId = null;
function render() {
  applyTheme();
  const r = route();
  // Drop blank entries the user opened but never wrote in.
  if (lastEntryId && !(r.view === 'entry' && r.arg === lastEntryId)) {
    const e = state.entries.find(x => x.id === lastEntryId);
    if (e && !e.fullAnswer.trim() && !e.fixNext.trim() && !e.source.trim() && (!e.title || e.title === 'Untitled entry')) { state.entries = state.entries.filter(x => x !== e); save(); }
    lastEntryId = null;
  }
  const views = { today: viewToday, learn: viewLearn, skill: viewSkill, lesson: viewLesson, practice: viewPractice, moves: viewMoves, log: viewLog, entry: viewEntry, bridge: viewBridge };
  const v = views[r.view](r.arg);
  renderChrome(r.tab);
  $('#topbar').innerHTML = `
    <div class="tb-left">${v.back ? `<a class="back" href="${v.back[1]}">${icon('chevL', 24, 2.2)}<span>${esc(v.back[0])}</span></a>` : ''}</div>
    <div class="tb-title">${esc(v.title)}</div>
    <div class="tb-right"><span id="timer-slot"></span>${v.right || ''}<button class="icon-btn mobile-only" data-action="settings" aria-label="Settings">${icon('gear', 20)}</button></div>`;
  const app = $('#app');
  app.innerHTML = `<div class="view">${v.html}</div>`;
  document.title = v.title === 'Today' ? '1L Legal Skills' : `${v.title} · 1L Legal Skills`;
  v.bind?.(app);
  $$('textarea[data-grow]', app).forEach(autoGrow);
  paintTimer(true);
  onScroll();
}
function onScroll() { $('#topbar')?.classList.toggle('scrolled', window.scrollY > 36); }
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('hashchange', () => { document.body.classList.remove('focus'); render(); window.scrollTo(0, 0); $('#app').focus({ preventScroll: true }); });

/* ---------- Views ---------- */
function viewToday() {
  const done = doneCount(), next = nextLesson(), drill = dailyLesson(), st = streak();
  const words = state.entries.reduce((n, e) => n + wordCount(e.fullAnswer), 0);
  const mastered = order.filter(s => doneCount(lessonsOf(s)) === 9).length;
  const h = new Date().getHours();
  const greet = h < 5 ? 'Late night study' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const scored = Object.values(state.moveChecks).filter(Boolean).length;
  const recent = [...state.entries].sort((a, b) => b.updated - a.updated).slice(0, 3);
  const nl = SKILLS[next.skill];
  return {
    title: 'Today',
    html: `
    <section class="hero">
      <div>
        <div class="eyebrow">${new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        <h1 class="large-title">${greet}</h1>
        <p class="muted">Seven skills, practiced on your own class materials.<br>${done ? `You’ve finished ${plural(done, 'lesson')}.` : 'Start with one lesson — about ten minutes.'}</p>
      </div>
      ${ring(done / lessons.length, 132, 13, `<strong>${Math.round(done / lessons.length * 100)}%</strong><span>course</span>`)}
    </section>
    <div class="stats">
      <div class="stat" style="--c:#f97316">${icon('flame')}<strong>${st}</strong><span>day streak</span></div>
      <div class="stat" style="--c:#2f9e62">${icon('check')}<strong>${done}<small class="faint" style="font-size:15px">/${lessons.length}</small></strong><span>lessons done</span></div>
      <div class="stat" style="--c:#2f7cf6">${icon('log')}<strong>${state.entries.length}</strong><span>practice entries</span></div>
      <div class="stat" style="--c:#5e5ce6">${icon('words')}<strong>${words >= 10000 ? Math.round(words / 1000) + 'k' : words.toLocaleString()}</strong><span>words written</span></div>
    </div>
    <h2 class="section-title">Up next</h2>
    <div class="grid-2">
      <a class="card feature" href="#/lesson/${next.id}" style="${skillVar(next.skill)}">
        <div class="chips"><span class="chip c">${icon(nl.icon, 14, 2.2)} ${next.skill}</span><span class="chip">${next.level}</span></div>
        <h3>${esc(next.title)}</h3>
        <p class="muted small">${esc(sentences(next.focus)[0])}</p>
        <span class="go">${state.lastLesson ? 'Continue' : 'Start lesson'} ${icon('chevR', 16, 2.4)}</span>
      </a>
      <a class="card feature" href="#/practice/${drill.id}" style="${skillVar(drill.skill)}">
        <div class="chips"><span class="chip c">${icon('timer', 14, 2.2)} Today’s drill</span><span class="chip">${LEVEL_INFO[drill.level].mins} min</span></div>
        <h3>${esc(drill.title)}</h3>
        <p class="muted small">${drill.skill} · ${drill.level}. Rotates daily — open it, set the timer, practice on this week’s reading.</p>
        <span class="go">Start drill ${icon('chevR', 16, 2.4)}</span>
      </a>
    </div>
    <a class="card harbor" href="#/moves" style="margin-top:14px">
      <svg class="waves" width="260" height="140" viewBox="0 0 260 140" fill="none" stroke="#fff" stroke-width="3"><path d="M0 40c30-20 60 20 90 0s60-20 90 0 60 20 90 0M0 80c30-20 60 20 90 0s60-20 90 0 60 20 90 0M0 120c30-20 60 20 90 0s60-20 90 0 60 20 90 0"/></svg>
      <div class="eyebrow">Featured module · Analysis</div>
      <h3>The Seven Moves: Harbor Point Market</h3>
      <p>One fictional permit dispute, seven checkpoints from Frame to Express, and a timed 45-minute problem with a model outline.</p>
      <div class="moves-dots">${moves.map((m, i) => `<span class="${state.moveChecks[i] ? 'done' : ''}">${state.moveChecks[i] ? icon('check', 13, 3) : i + 1} ${m[0]}</span>`).join('')}</div>
      ${scored ? `<p style="margin-top:12px;font-size:14px">${scored} of 7 moves self-checked</p>` : ''}
    </a>
    <h2 class="section-title">Your skills <a href="#/learn">See all</a></h2>
    <div class="list">${order.map(s => { const d = doneCount(lessonsOf(s)); return `
      <a class="list-row" href="#/skill/${s}" style="${skillVar(s)}">
        <span class="tile">${icon(SKILLS[s].icon, 20)}</span>
        <span class="grow"><span class="title">${s}</span><span style="display:block;margin-top:6px">${bar(d / 9)}</span></span>
        <span class="trail">${d}/9</span>${icon('chevR', 18, 2)}
      </a>`; }).join('')}</div>
    <h2 class="section-title">Recent work ${recent.length ? '<a href="#/log">Work log</a>' : ''}</h2>
    ${recent.length ? `<div class="list">${recent.map(entryRow).join('')}</div>` : `
      <div class="card empty"><span class="tile soft lg">${icon('pen', 26)}</span><h3>No practice entries yet</h3><p class="muted">Open any lesson and choose <b>Practice this</b>, or write freely in the practice workspace.</p><a class="btn primary" href="#/practice">Open practice</a></div>`}
    `
  };
}

function viewLearn() {
  const done = doneCount();
  return {
    title: 'Learn',
    html: `
    <div class="page-head"><div><h1 class="large-title">Learn</h1><p class="muted">Seven skills · ${lessons.length} lessons · Basic to Expert. Skills, not doctrine — bring your own class materials.</p></div>
      <span class="chip ok">${icon('check', 14, 2.6)} ${done} complete</span></div>
    <div class="grid-3">${order.map(s => { const k = SKILLS[s], d = doneCount(lessonsOf(s)); return `
      <a class="card skill-card" href="#/skill/${s}" style="${skillVar(s)}">
        <div class="top"><span class="tile lg">${icon(k.icon, 28)}</span>${ring(d / 9, 46, 5, `<span style="font-size:12px;font-weight:700;color:var(--ink)">${d}/9</span>`, k.color)}</div>
        <h3>${s}</h3><p>${k.tagline}</p>
        <div class="levels">${LEVELS.map(lv => `<div><small>${lv}</small><div class="pips">${lessonsOf(s, lv).map(l => `<i class="${isDone(l.id) ? 'on' : ''}"></i>`).join('')}</div></div>`).join('')}</div>
      </a>`; }).join('')}
      <a class="card harbor" href="#/moves" style="grid-column:span 2;display:flex;flex-direction:column;justify-content:center"><div class="eyebrow">Interactive module · Analysis</div><h3>The Seven Moves: Harbor Point Market</h3><p>Frame, Rule, Read, Bridge, Compare, Test, Express — one fictional dispute, worked move by move, with a timed problem and model outline.</p></a></div>`
  };
}

function viewSkill(skill) {
  if (!SKILLS[skill]) skill = order[0];
  const k = SKILLS[skill], all = lessonsOf(skill), d = doneCount(all);
  return {
    title: skill, back: ['Learn', '#/learn'],
    html: `
    <section class="skill-hero" style="${skillVar(skill)}">
      <span class="tile lg">${icon(k.icon, 28)}</span>
      <h1 class="large-title">${skill}</h1>
      <p>${k.tagline} ${k.why}</p>
      ${bar(d / 9)}<div class="meta">${d} of 9 lessons complete</div>
    </section>
    ${skill === 'Analysis' ? `<a class="card harbor" href="#/moves" style="margin-top:14px"><div class="eyebrow">Interactive module</div><h3>The Seven Moves: Harbor Point Market</h3><p>Work one fictional dispute through Frame, Rule, Read, Bridge, Compare, Test, and Express.</p></a>` : ''}
    ${LEVELS.map(lv => `
      <div class="level-head"><h2>${lv}</h2><span class="muted small">${LEVEL_INFO[lv].goal} · ${LEVEL_INFO[lv].mins}-min drills</span></div>
      <div class="list">${lessonsOf(skill, lv).map(l => `
        <a class="list-row" href="#/lesson/${l.id}" style="${skillVar(skill)}">
          <span class="num ${isDone(l.id) ? 'done' : ''}">${isDone(l.id) ? icon('check', 16, 3) : lessonIndex(l)}</span>
          <span class="grow"><span class="title">${esc(l.title)}</span><span class="sub">${esc(sentences(l.focus)[0])}</span></span>
          ${icon('chevR', 18, 2)}
        </a>`).join('')}</div>`).join('')}`
  };
}

function viewLesson(id) {
  const l = lessonById(id) || lessons[0], k = SKILLS[l.skill], info = LEVEL_INFO[l.level];
  if (state.lastLesson !== l.id) { state.lastLesson = l.id; save(); }
  const i = lessons.indexOf(l), prev = lessons[i - 1], next = lessons[i + 1];
  const checks = state.checks[l.id] || [];
  const checkHtml = k.checklist.map((c, n) => `<label class="check"><input type="checkbox" data-check="${n}" ${checks[n] ? 'checked' : ''}><span class="box">${icon('check', 14, 3)}</span><span>${esc(c)}</span></label>`).join('');
  const done = isDone(l.id);
  const completeBtn = `<button class="btn block complete-btn ${done ? 'done' : 'primary'}" data-action="complete" data-id="${l.id}">${icon('check', 18, 2.6)} ${done ? 'Completed' : 'Mark complete'}</button>`;
  return {
    title: l.title, back: [l.skill, `#/skill/${l.skill}`],
    html: `
    <header class="lesson-head" style="${skillVar(l.skill)}">
      <div class="chips"><span class="chip c">${icon(k.icon, 14, 2.2)} ${l.skill}</span><span class="chip">${l.level} · Lesson ${lessonIndex(l)} of 9</span><span class="chip">${icon('clock', 14, 2.2)} ${info.mins + 5} min</span>${done ? `<span class="chip ok">${icon('check', 14, 2.6)} Done</span>` : ''}</div>
      <h1>${esc(l.title)}</h1>
    </header>
    <div class="lesson-layout" style="${skillVar(l.skill)}">
      <div>
        <section class="card"><div class="card-title">${icon('target')} The idea</div><p class="lead">${esc(l.focus)}</p><p class="muted small" style="margin-top:12px">${l.level} goal: ${info.goal}</p></section>
        <section class="card"><div class="card-title">${icon('branch')} How to do it</div><ol class="steps">${k.steps.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol></section>
        <section class="card warn-card"><div class="card-title">${icon('alert')} Watch for</div><p>${esc(k.mistake)}</p></section>
        <section class="card"><div class="card-title">${icon('quote')} Worked example</div><span class="fiction-tag">${icon('info', 13, 2.2)} Fictional facts and rules — method only, not law</span><div class="example"><h4>${esc(k.example.title)}</h4><p>${esc(k.example.body)}</p></div></section>
        <section class="card task"><div class="card-title">${icon('pen')} Your task</div><p>Pick one passage or fact sequence from a current assignment — a case, statute, rule, hypo, or past exam. Apply <b>${esc(l.title.toLowerCase())}</b> to it. Show the source language, your reasoning, and the strongest alternative. If something is missing, name the gap; if you need a rule you weren’t given, write “check against your materials.”</p>
          <div class="btn-row" style="margin-top:14px"><a class="btn primary" href="#/practice/${l.id}">${icon('timer', 18)} Practice this</a>${l.id === SEVEN_ID ? `<a class="btn tinted" href="#/moves">Open the Seven Moves</a>` : ''}</div></section>
        <section class="card"><div class="card-title">${icon('clock')} ${info.mins}-minute drill</div><div class="drill">
          <div><b>${info.split[0]} min</b><span>Choose and reread a short assigned excerpt.</span></div>
          <div><b>${info.split[1]} min</b><span>Apply the method to one issue or paragraph, in writing.</span></div>
          <div><b>${info.split[2]} min</b><span>State the best alternative and one thing you’d revise.</span></div></div></section>
        <section class="card"><div class="card-title">${icon('pen')} Notes <span class="save-state" id="note-state" style="margin-left:auto;font-weight:400"></span></div><textarea id="notes" data-grow placeholder="A reminder, a question for class, a passage to revisit…">${esc(state.notes[l.id] || '')}</textarea></section>
        <nav class="pager" aria-label="Lesson navigation">
          ${prev ? `<a class="card" href="#/lesson/${prev.id}"><span class="dir">${icon('chevL', 14, 2.4)} Previous</span><span class="t">${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a class="card next" href="#/lesson/${next.id}"><span class="dir">Next ${icon('chevR', 14, 2.4)}</span><span class="t">${esc(next.title)}</span></a>` : ''}
        </nav>
      </div>
      <aside class="lesson-aside">
        <section class="card">
          ${completeBtn}
          <div class="aside-check" style="margin-top:14px"><div class="label" style="margin-bottom:4px">Self-check</div>${checkHtml}</div>
        </section>
      </aside>
    </div>`,
    bind(root) {
      const n = $('#notes', root), st = $('#note-state', root);
      n.addEventListener('input', () => { state.notes[l.id] = n.value; autoGrow(n); saveSoon(st); });
      $$('[data-check]', root).forEach(cb => cb.addEventListener('change', () => {
        const arr = state.checks[l.id] = state.checks[l.id] || [];
        arr[+cb.dataset.check] = cb.checked;
        $$(`[data-check="${cb.dataset.check}"]`, root).forEach(x => x.checked = cb.checked);
        save();
        if (k.checklist.every((_, j) => arr[j]) && !isDone(l.id)) toast('All checks met — ready to mark complete?', 'check');
      }));
    }
  };
}

function lessonOptions(selectedId) {
  return order.map(s => `<optgroup label="${s}">${lessonsOf(s).map(l => `<option value="${l.id}" ${l.id === selectedId ? 'selected' : ''}>${l.level} · ${esc(l.title)}</option>`).join('')}</optgroup>`).join('');
}
function timerCard() {
  const t = state.timer, left = timerLeft();
  return `<section class="card timer-card">
    ${ring(left / t.duration, 196, 12, `<strong data-timer-text>${fmtTime(left)}</strong><span>${t.duration / 60}-minute session</span>`)}
    <div>
      <div class="seg" role="group" aria-label="Timer length" style="margin-top:14px">${[10, 30, 45, 60].map(m => `<button data-action="timer-set" data-min="${m}" aria-pressed="${t.duration === m * 60}">${m}m</button>`).join('')}</div>
      <div class="btn-row"><button class="btn primary" data-action="timer-toggle"></button><button class="btn" data-action="timer-reset" aria-label="Reset timer">${icon('reset', 18)}</button></div>
    </div>
  </section>`;
}
function viewPractice(id) {
  const d = state.practiceDraft;
  if (id && lessonById(id)) d.lessonId = id;
  const l = lessonById(d.lessonId) || lessonById(state.lastLesson) || lessons[0];
  d.lessonId = l.id;
  const wc = wordCount(d.task), target = state.targetWords;
  return {
    title: 'Practice', back: id ? [l.title.length > 22 ? 'Lesson' : l.title, `#/lesson/${l.id}`] : null,
    right: `<button class="icon-btn" data-action="focus" aria-label="Toggle focus mode" title="Focus mode">${icon('expand', 18)}</button>`,
    html: `
    <div class="page-head hide-in-focus"><div><h1 class="large-title">Practice</h1><p class="muted">Timed writing on your own class material. Drafts save as you type.</p></div></div>
    <div class="practice-grid" style="${skillVar(l.skill)}">
      <section class="card">
        <div class="field"><label for="plesson">Lesson</label><select id="plesson">${lessonOptions(l.id)}</select></div>
        <p class="prompt muted"><span class="chip c" style="margin-right:6px">${icon(SKILLS[l.skill].icon, 14, 2.2)} ${l.skill}</span>${esc(l.focus)}</p>
        <details class="source" ${d.source ? 'open' : ''}><summary>${icon('chevR', 16, 2.4)} Class material or prompt <span class="faint small" style="font-weight:400">optional</span></summary><textarea id="source" data-grow placeholder="Paste the excerpt, rule as assigned, hypo, or exam prompt you’re working from">${esc(d.source)}</textarea></details>
        <div class="editor-wrap"><label for="task" class="label">Your answer</label><textarea id="task" class="editor" data-grow placeholder="Start writing. Show the source language, your reasoning, and the strongest alternative.">${esc(d.task)}</textarea></div>
        <div class="editor-foot">
          <div class="wc"><span id="wc">${plural(wc, 'word')}</span>${bar(Math.min(1, wc / target))}<select id="target" aria-label="Word target" style="width:auto;min-height:32px;padding:2px 30px 2px 10px;font-size:13px;background-position:right 10px center">${[150, 300, 600, 1000].map(n => `<option value="${n}" ${n === target ? 'selected' : ''}>${n} goal</option>`).join('')}</select></div>
          <div class="btn-row"><span class="save-state" id="draft-state">${d.task ? 'Draft saved' : ''}</span><button class="btn" data-action="clear-practice">Clear</button><button class="btn primary" data-action="save-practice">Save to log</button></div>
        </div>
      </section>
      <aside class="practice-aside">
        ${timerCard()}
        <section class="card hide-in-focus"><div class="card-title">${icon('check')} Before you save</div>${SKILLS[l.skill].checklist.map(c => `<p class="small muted" style="display:flex;gap:8px;margin-bottom:8px"><span style="color:var(--c)">•</span>${esc(c)}</p>`).join('')}</section>
        ${l.skill === 'Analysis' ? `<a class="card harbor hide-in-focus" href="#/moves"><div class="eyebrow">Need a problem?</div><h3 style="font-size:19px">Harbor Point Market</h3><p class="small">A fictional 45-minute exam problem with a model outline.</p></a>` : ''}
      </aside>
    </div>`,
    bind(root) {
      const task = $('#task', root), src = $('#source', root), st = $('#draft-state', root);
      const upd = () => { d.task = task.value; d.source = src.value; const n = wordCount(task.value); $('#wc', root).textContent = plural(n, 'word'); $('.wc .bar', root).style.setProperty('--p', Math.min(100, n / state.targetWords * 100) + '%'); saveSoon(st); };
      task.addEventListener('input', () => { autoGrow(task); upd(); });
      src.addEventListener('input', () => { autoGrow(src); upd(); });
      $('#plesson', root).addEventListener('change', e => { d.lessonId = e.target.value; save(); location.hash = '#/practice'; render(); });
      $('#target', root).addEventListener('change', e => { state.targetWords = +e.target.value; save(); upd(); });
    }
  };
}

const HARBOR = {
  rule: 'A vendor’s stall permit lapses if the vendor is absent for three consecutive market days without written notice to the manager. Market days are every Wednesday and Saturday.',
  ortiz: 'A market day cancelled for weather did not count, because no vendor could attend.',
  lee: 'A voicemail was not written notice, because the manager could not keep it in the file.',
  timeline: [
    ['Sat 3', 'absent', 'Absent', 'Dana is sick.'],
    ['Tue 6', 'note', 'Text sent', '“Can’t make it for a bit, will update.”'],
    ['Wed 7', 'absent', 'Absent', 'Storm closes the road to her farm. Market is open.'],
    ['Sat 10', 'absent', 'Absent', 'Family event.'],
    ['Sun 11', 'end', 'Revoked', 'Manager revokes the permit.']
  ],
  outline: [
    ['Question', 'Whether Rule 7’s three-consecutive-market-day condition and lack-of-written-notice condition are both met.'],
    ['Market day', 'A scheduled/open-market reading counts the 7th; an access-based reading excludes a day Dana could not reach. Ortiz supports exclusion where nobody could attend — distinguish its market-wide cancellation from Dana’s individual road closure.'],
    ['Written notice', 'A text is written and retainable, unlike Lee’s voicemail. Counterpoint: its content (“for a bit”) may not identify the absences or give sufficiently clear notice to the manager.'],
    ['Missing facts', 'Whether the text was received and retained, what the manager understood, the exact access conditions, and how the supplied materials treat specificity and individual inability.'],
    ['Conclusion', 'Calibrate. Revocation is plausible if the 7th counts and the text is insufficient; Dana has a substantial argument if either condition fails. Say which reading is stronger on the supplied materials and why — without inventing a rule.']
  ]
};
let selectedMove = 0, moveDepth = 'Basic', showModel = false;
function viewMoves() {
  const m = moves[selectedMove], i = selectedMove;
  const sents = sentences(m[2]);
  const body = moveDepth === 'Basic' ? sents.slice(0, 3).join('') : moveDepth === 'Advanced' ? sents.slice(0, 8).join('') : m[2];
  const scored = moves.filter((_, j) => state.moveChecks[j]).length;
  return {
    title: 'The Seven Moves', back: ['Practice', '#/practice'],
    html: `
    <div class="page-head"><div><div class="eyebrow">Analysis · Interactive module</div><h1 class="large-title">The Seven Moves</h1><p class="muted">One method, seven checkpoints — worked through a single fictional dispute.</p></div><span class="chip ${scored === 7 ? 'ok' : ''}">${scored}/7 self-checked</span></div>
    <section class="card">
      <div class="card-title">${icon('info')} Harbor Point Market <span class="fiction-tag" style="margin:0 0 0 auto">Fictional</span></div>
      <p><b>Rule 7.</b> ${HARBOR.rule}</p>
      <div class="timeline" role="list" aria-label="Timeline of events">${HARBOR.timeline.map(([d, cls, lab, txt]) => `<div class="tl ${cls}" role="listitem"><small>${lab}</small><strong>${d}</strong><span>${esc(txt)}</span></div>`).join('')}</div>
      <div class="sources"><div class="src"><b>Ortiz (fictional)</b>${HARBOR.ortiz}</div><div class="src"><b>Lee (fictional)</b>${HARBOR.lee}</div><div class="src"><b>The dispute</b>Dana says the 7th shouldn’t count and the text was notice. The manager says the market was open and the text was vague.</div></div>
    </section>
    <h2 class="section-title">Work the moves</h2>
    <div class="stepper" role="group" aria-label="Choose a move">${moves.map((mv, j) => `<button data-action="move" data-i="${j}" aria-pressed="${j === i}" class="${state.moveChecks[j] ? 'scored' : ''}"><span class="n">${state.moveChecks[j] ? icon('check', 14, 3) : j + 1}</span>${mv[0]}</button>`).join('')}</div>
    <section class="card" id="move-card">
      <div class="eyebrow">Move ${i + 1} of 7 · ${m[0]}</div>
      <p class="move-q">${esc(m[1])}</p>
      <div class="seg" role="group" aria-label="Explanation depth" style="margin-bottom:16px">${LEVELS.map(lv => `<button data-action="depth" data-v="${lv}" aria-pressed="${lv === moveDepth}">${lv}</button>`).join('')}</div>
      <div class="depth-body">${paragraphs(chunk(body, 4))}</div>
      ${moveDepth !== 'Expert' ? `<button class="btn sm tinted" data-action="depth" data-v="${moveDepth === 'Basic' ? 'Advanced' : 'Expert'}" style="margin-top:12px">Go deeper</button>` : ''}
    </section>
    <section class="card">
      <div class="card-title">${icon('pen')} Practice on your own material</div>
      <p class="muted small">${esc(m[3])}</p>
      <textarea id="movetask" data-grow placeholder="Write your ${m[0].toLowerCase()} here…">${esc(state.moveDrafts[i] || '')}</textarea>
      <div class="score-row" style="margin-top:6px"><span class="label">How did this move go?</span>
        <div class="seg" role="group" aria-label="Self-check score">${[1, 2, 3, 4].map(n => `<button data-action="score" data-n="${n}" aria-pressed="${String(state.moveChecks[i]) === String(n)}">${n} · ${SCORE_LABELS[n]}</button>`).join('')}</div></div>
      <div class="btn-row" style="justify-content:space-between;margin-top:8px">
        <button class="btn tinted" data-action="add-move">${icon('plus', 18)} Add to practice draft</button>
        <div class="btn-row">${i > 0 ? `<button class="btn" data-action="move" data-i="${i - 1}">${icon('chevL', 18, 2.2)} ${moves[i - 1][0]}</button>` : ''}${i < 6 ? `<button class="btn primary" data-action="move" data-i="${i + 1}">${moves[i + 1][0]} ${icon('chevR', 18, 2.2)}</button>` : ''}</div>
      </div>
    </section>
    <h2 class="section-title">The full problem</h2>
    <section class="card">
      <p class="lead serif" style="margin-bottom:8px"><b>Should the revocation stand?</b></p>
      <div class="chips" style="margin-bottom:12px"><span class="chip">${icon('clock', 14, 2.2)} 45 minutes</span><span class="chip">${icon('words', 14, 2.2)} ~600 words</span><span class="chip">Objective</span></div>
      <p>Address both readings of “market day” and “written notice,” use Ortiz and Lee, handle the missing facts, and reach a calibrated conclusion.</p>
      <div class="btn-row"><button class="btn primary" data-action="start-harbor">${icon('timer', 18)} Start 45-minute attempt</button><button class="btn" data-action="model" aria-expanded="${showModel}">${showModel ? 'Hide' : 'Show'} model outline</button></div>
      ${showModel ? `<div class="model card" style="background:var(--fill);border:0;box-shadow:none"><ol>${HARBOR.outline.map(([h, t]) => `<li><b>${h}.</b> ${esc(t)}</li>`).join('')}</ol></div>` : ''}
    </section>`,
    bind(root) {
      const t = $('#movetask', root);
      t.addEventListener('input', () => { state.moveDrafts[selectedMove] = t.value; autoGrow(t); saveSoon(); });
    }
  };
}

function entryRow(e) {
  const k = SKILLS[e.skill] || SKILLS.Reading, wc = wordCount(e.fullAnswer);
  const preview = (e.fullAnswer || e.fixNext || '').trim().slice(0, 220);
  const sc = moves.map((_, i) => e.selfChecks?.[i] || 0);
  return `<a class="list-row entry-row" href="#/log/${e.id}" style="--c:${k.color}">
    <span class="tile">${icon(k.icon, 20)}</span>
    <span class="grow"><span class="title">${esc(e.title || 'Untitled entry')}</span>
      <span class="sub">${fmtDate(e.date)} · ${esc(e.className || e.skill)} · ${plural(wc, 'word')}</span>
      ${preview ? `<span class="sub preview">${esc(preview)}</span>` : ''}
      ${sc.some(Boolean) ? `<span class="mini-scores" aria-label="Seven Moves self-checks">${sc.map(s => `<i data-s="${s}"></i>`).join('')}</span>` : ''}
    </span>${icon('chevR', 18, 2)}</a>`;
}
let logFilter = 'All', logQuery = '';
function viewLog() {
  const total = state.entries.length, words = state.entries.reduce((n, e) => n + wordCount(e.fullAnswer), 0);
  const classes = new Set(state.entries.map(e => e.className).filter(Boolean)).size;
  return {
    title: 'Work log',
    right: `<button class="icon-btn" data-action="new-entry" aria-label="New entry">${icon('plus', 20, 2.2)}</button>`,
    html: `
    <div class="page-head"><div><h1 class="large-title">Work log</h1><p class="muted">${total ? `${plural(total, 'entry')} · ${plural(words, 'word')}${classes ? ` · ${classes} ${classes === 1 ? 'class' : 'classes'}` : ''}` : 'Everything you practice, saved on this device only.'}</p></div>
      <button class="btn primary" data-action="new-entry">${icon('plus', 18, 2.4)} New entry</button></div>
    ${total ? `
    <div class="filter-bar"><div class="search">${icon('search', 18)}<input id="q" class="input" type="search" placeholder="Search titles, classes, and answers" value="${esc(logQuery)}" aria-label="Search entries"></div></div>
    <div class="chip-scroll" role="group" aria-label="Filter by skill">${['All', ...order].map(s => `<button data-action="filter" data-v="${s}" aria-pressed="${s === logFilter}">${s !== 'All' ? `<span class="dot" style="${skillVar(s)}"></span>` : ''}${s}</button>`).join('')}</div>
    <div id="entries"></div>` : `
    <div class="card empty"><span class="tile soft lg">${icon('log', 26)}</span><h3>Your work log is empty</h3><p class="muted">Practice answers, outlines, and cold-call notes land here. Each entry tracks the class, the skill, and one thing to fix next time.</p><div class="btn-row" style="justify-content:center"><button class="btn primary" data-action="new-entry">New entry</button><a class="btn" href="#/practice">Timed practice</a></div></div>`}`,
    bind(root) {
      const list = $('#entries', root); if (!list) return;
      const draw = () => {
        const q = logQuery.toLowerCase();
        const arr = state.entries.filter(e => (logFilter === 'All' || e.skill === logFilter) && (!q || [e.title, e.className, e.fullAnswer, e.fixNext, e.skill].join(' ').toLowerCase().includes(q)))
          .sort((a, b) => b.date.localeCompare(a.date) || b.updated - a.updated);
        if (!arr.length) { list.innerHTML = `<div class="card empty"><p class="muted">No entries match${q ? ` “${esc(logQuery)}”` : ''}${logFilter !== 'All' ? ` in ${logFilter}` : ''}.</p></div>`; return; }
        const groups = {};
        arr.forEach(e => { const k = e.date.slice(0, 7); (groups[k] = groups[k] || []).push(e); });
        list.innerHTML = Object.entries(groups).map(([k, es]) => `<div class="month">${fmtDate(k + '-01', { month: 'long', year: 'numeric' })}</div><div class="list">${es.map(entryRow).join('')}</div>`).join('');
      };
      $('#q', root).addEventListener('input', e => { logQuery = e.target.value; draw(); });
      root._draw = draw; draw();
    }
  };
}

function createEntry(extra = {}) {
  const e = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), date: today(), className: state.classes[0] || '', skill: 'Reading', title: 'Untitled entry', fullAnswer: '', selfChecks: {}, fixNext: '', source: '', ...extra, updated: Date.now() };
  state.entries.unshift(e); save(); return e;
}
function viewEntry(id) {
  const e = state.entries.find(x => x.id === id);
  if (!e) return { title: 'Not found', back: ['Work log', '#/log'], html: `<div class="card empty"><h3>Entry not found</h3><p class="muted">It may have been deleted.</p><a class="btn primary" href="#/log">Back to Work log</a></div>` };
  lastEntryId = e.id;
  const k = SKILLS[e.skill] || SKILLS.Reading;
  return {
    title: e.title || 'Entry', back: ['Work log', '#/log'],
    right: `<span class="save-state" id="entry-state">Saved</span>`,
    html: `
    <div style="max-width:820px;margin:0 auto">
      <div class="chips" style="margin:6px 0 10px"><span class="chip c" style="--c:${k.color}" id="skill-chip">${icon(k.icon, 14, 2.2)} ${e.skill}</span>${e.lessonId && lessonById(e.lessonId) ? `<a class="chip" href="#/lesson/${e.lessonId}">${icon('bookOpen', 14, 2.2)} Lesson</a>` : ''}</div>
      <input id="etitle" class="title-input" value="${esc(e.title === 'Untitled entry' ? '' : e.title)}" placeholder="Untitled entry" aria-label="Title">
      <section class="card" style="margin-top:16px">
        <div class="fields-3">
          <div class="field"><label for="edate">Date</label><input id="edate" class="input" type="date" value="${esc(e.date)}"></div>
          <div class="field"><label for="eclass">Class</label><input id="eclass" class="input" type="text" list="classchoices" value="${esc(e.className)}" placeholder="e.g., Contracts"><datalist id="classchoices">${state.classes.map(c => `<option value="${esc(c)}">`).join('')}</datalist></div>
          <div class="field"><label for="eskill">Skill</label><select id="eskill">${order.map(s => `<option ${s === e.skill ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
        </div>
        <details class="source" ${e.source ? 'open' : ''}><summary>${icon('chevR', 16, 2.4)} Source material</summary><textarea id="esource" data-grow placeholder="The excerpt or prompt this answers">${esc(e.source)}</textarea></details>
        <div class="editor-wrap"><label for="eanswer" class="label">Answer</label><textarea id="eanswer" class="editor" data-grow placeholder="Write your answer here">${esc(e.fullAnswer)}</textarea></div>
        <div class="editor-foot"><span class="wc" id="ewords">${plural(wordCount(e.fullAnswer), 'word')}</span></div>
      </section>
      <section class="card">
        <div class="card-title">${icon('grid')} Seven Moves self-check <span class="faint small" style="font-weight:400;margin-left:auto">optional</span></div>
        ${moves.map((m, i) => `<div class="score-row"><span><b>${m[0]}</b> <span class="faint small">${esc(m[1].split(/[,?]/)[0])}</span></span><div class="seg" role="group" aria-label="${m[0]} score">${[1, 2, 3, 4].map(n => `<button data-action="entry-score" data-i="${i}" data-n="${n}" aria-pressed="${String(e.selfChecks?.[i] || '') === String(n)}" title="${SCORE_LABELS[n]}">${n}</button>`).join('')}</div></div>`).join('')}
        <p class="faint small" style="margin-top:8px">1 Missing · 2 Partial · 3 Solid · 4 Strong</p>
      </section>
      <section class="card warn-card"><div class="card-title">${icon('target')} One thing to fix next</div><textarea id="efix" data-grow placeholder="The single most useful revision for next time">${esc(e.fixNext)}</textarea></section>
      <div class="btn-row" style="margin-top:18px;justify-content:space-between">
        <div class="btn-row"><button class="btn" data-action="copy-entry">${icon('copy', 18)} Copy as text</button><a class="btn" href="#/practice/${e.lessonId || ''}">${icon('timer', 18)} Practice again</a></div>
        <button class="btn danger" data-action="delete-entry">${icon('trash', 18)} Delete</button>
      </div>
    </div>`,
    bind(root) {
      const st = $('#entry-state');
      const upd = () => {
        e.date = $('#edate', root).value || today(); e.className = $('#eclass', root).value.trim(); e.skill = $('#eskill', root).value;
        e.title = $('#etitle', root).value.trim() || 'Untitled entry'; e.fullAnswer = $('#eanswer', root).value; e.fixNext = $('#efix', root).value; e.source = $('#esource', root).value;
        e.updated = Date.now();
        if (e.className && !state.classes.includes(e.className)) state.classes = [e.className, ...state.classes].slice(0, 12);
        if (wordCount(e.fullAnswer)) markActivity();
        $('#ewords', root).textContent = plural(wordCount(e.fullAnswer), 'word');
        const kk = SKILLS[e.skill]; const chip = $('#skill-chip', root); chip.style.setProperty('--c', kk.color); chip.innerHTML = `${icon(kk.icon, 14, 2.2)} ${e.skill}`;
        $('.tb-title').textContent = e.title;
        saveSoon(st);
      };
      ['etitle', 'edate', 'eclass', 'eskill', 'eanswer', 'efix', 'esource'].forEach(i => $('#' + i, root).addEventListener('input', ev => { if (ev.target.tagName === 'TEXTAREA') autoGrow(ev.target); upd(); }));
      $('#eskill', root).addEventListener('change', upd);
      root._entry = e; root._upd = upd;
      if (!e.fullAnswer && e.title === 'Untitled entry') setTimeout(() => $('#etitle', root).focus(), 50);
    }
  };
}

function viewBridge() {
  return {
    title: 'Gap Bridge',
    html: `
    <section class="card bridge-hero">
      <span class="tile lg">${icon('sparkle', 28)}</span>
      <span class="chip" style="margin-bottom:10px">${icon('lock', 13, 2.2)} Not connected in this build</span>
      <h1 class="large-title">Gap Bridge</h1>
      <p class="muted">A planned feedback layer: paste an answer or an oral transcript, see clear, minimal improvements tagged to a skill, and get one targeted next exercise.</p>
      <p class="small faint">For graded work, follow your professor’s rules on AI help.</p>
    </section>
    <div class="grid-3" style="margin-top:14px">
      ${[['pen', 'Paste your work', 'Written answer or oral transcript, plus the prompt it answers.'], ['grid', 'Review each change', 'Voice, facts, order, and party names stay; only clear improvements, each with a one-sentence reason.'], ['target', 'Practice the gap', 'A specific rewrite or short drill, linked to the matching lesson.']].map(([ic, h, p], n) => `<div class="card"><span class="tile soft">${icon(ic, 20)}</span><h3 style="margin:12px 0 6px">${n + 1}. ${h}</h3><p class="muted small">${p}</p></div>`).join('')}
    </div>
    <h2 class="section-title">What feedback would look like</h2>
    <section class="card rel">
      <span class="chip preview-badge">Illustrative mockup</span>
      <div class="eyebrow" style="margin-bottom:10px">Fictional example · Harbor Point</div>
      <p class="diff">The revocation <del>is definitely valid because Dana missed three days</del><ins>is plausible but not certain: Dana missed three scheduled market days, but the 7th may not count under Ortiz’s rationale</ins>. Her text <del>was notice</del><ins>was written and retainable, unlike Lee’s voicemail, though “for a bit” may be too vague to give notice of specific absences</ins>.</p>
      <div class="list" style="margin-top:14px;box-shadow:none">
        <div class="list-row plain" style="--c:${SKILLS.Logic.color}"><span class="chip c">Logic</span><span class="grow small">Calibrated the conclusion to match an unresolved reading of “market day.”</span></div>
        <div class="list-row plain" style="--c:${SKILLS.Argument.color}"><span class="chip c">Argument</span><span class="grow small">Named the distinction from Lee instead of asserting the text was notice.</span></div>
      </div>
      <p class="small muted" style="margin-top:14px"><b>Next step:</b> rewrite your conclusion using “likely / plausible / unclear” — see <a href="#/skill/Logic" style="color:var(--accent)">Calibrated conclusions</a>.</p>
    </section>
    <p class="faint small" style="margin-top:14px">Nothing on this page sends data anywhere. Any future version would use only law you paste, flag other rules “check against your materials,” and never invent cases.</p>`
  };
}

/* ---------- Settings sheet ---------- */
function openSettings() {
  const sh = $('#sheet');
  const totalNotes = Object.values(state.notes).filter(Boolean).length;
  sh.innerHTML = `
    <div class="sheet-head"><h2 id="sheet-title">Settings</h2><button class="icon-btn" data-action="close-sheet" aria-label="Close">${icon('close', 18, 2.2)}</button></div>
    <div class="sheet-body">
      <div class="group-label">Appearance</div>
      <div class="seg full" role="group" aria-label="Theme">${[['system', 'Automatic'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) => `<button data-action="theme" data-v="${v}" aria-pressed="${state.theme === v}">${l}</button>`).join('')}</div>
      <div class="group-label">Your data</div>
      <div class="list">
        <button class="list-row plain" data-action="export"><span class="grow"><span class="title">Export backup</span><span class="sub">${plural(state.entries.length, 'entry')}, ${doneCount()} lessons, ${plural(totalNotes, 'note')} · JSON</span></span>${icon('download', 20)}</button>
        <label class="list-row plain file-label"><span class="grow"><span class="title">Import backup</span><span class="sub">Replaces everything currently saved</span></span>${icon('upload', 20)}<input id="import" type="file" accept="application/json,.json" aria-label="Import JSON backup"></label>
        <button class="list-row plain" data-action="erase"><span class="grow"><span class="title" style="color:var(--danger)">Erase all data</span><span class="sub">Can’t be undone — export first</span></span>${icon('trash', 20)}</button>
      </div>
      <p class="group-note">Everything stays in this browser’s storage. No account, no analytics, no network calls. Clearing site data or switching devices won’t carry entries over.</p>
      <div class="group-label">About</div>
      <div class="list"><div class="list-row plain"><span class="grow"><span class="title">1L Legal Skills</span><span class="sub">Version ${APP_VERSION} · skills, not doctrine</span></span></div>
        <div class="list-row plain"><span class="grow small muted">Lesson examples use fictional facts and fictional rules only. Anything outside your supplied materials should be labeled “check against your materials.”</span></div></div>
    </div>`;
  $('#import', sh).addEventListener('change', importData);
  if (!sh.open) sh.showModal();
}
$('#sheet').addEventListener('click', e => { if (e.target.id === 'sheet') e.target.close(); });

/* ---------- Actions (event delegation) ---------- */
const actions = {
  settings: () => openSettings(),
  'close-sheet': () => $('#sheet').close(),
  theme: b => { state.theme = b.dataset.v; save(); applyTheme(); $$('[data-action="theme"]').forEach(x => x.setAttribute('aria-pressed', x === b)); },
  export: () => exportData(),
  erase: b => {
    if (b.dataset.armed !== 'yes') { b.dataset.armed = 'yes'; $('.title', b).textContent = 'Tap again to erase everything'; setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; $('.title', b).textContent = 'Erase all data'; } }, 3500); return; }
    const theme = state.theme; Object.keys(state).forEach(k => delete state[k]); Object.assign(state, defaults(), { theme }); save(); $('#sheet').close(); location.hash = '#/'; render(); toast('All data erased', 'trash');
  },
  complete: b => {
    const id = b.dataset.id, l = lessonById(id); state.progress[id] = !state.progress[id];
    if (state.progress[id]) { markActivity(); }
    save();
    const skillDone = doneCount(lessonsOf(l.skill)) === 9;
    if (state.progress[id]) toast(skillDone ? `${l.skill} complete — all 9 lessons!` : 'Lesson complete', skillDone ? 'medal' : 'check');
    const y = window.scrollY; render(); window.scrollTo(0, y);
    $('.complete-btn')?.classList.add('pop');
  },
  'timer-toggle': () => timerToggle(),
  'timer-reset': () => timerReset(),
  'timer-set': b => { timerReset(+b.dataset.min); $$('[data-action="timer-set"]').forEach(x => x.setAttribute('aria-pressed', x === b)); $$('.timer-card .ring .label span').forEach(s => s.textContent = `${b.dataset.min}-minute session`); },
  focus: () => { document.body.classList.toggle('focus'); if (document.body.classList.contains('focus')) { toast('Focus mode — press Esc to exit', 'expand'); $('#task')?.focus(); } },
  'save-practice': () => {
    const d = state.practiceDraft, l = lessonById(d.lessonId) || lessons[0];
    if (!wordCount(d.task)) { toast('Write something first', 'alert'); $('#task')?.focus(); return; }
    const e = createEntry({ skill: l.skill, title: l.title, lessonId: l.id, fullAnswer: d.task, source: d.source });
    markActivity(); state.practiceDraft = { task: '', source: '', lessonId: l.id }; save();
    toast('Saved to Work log'); location.hash = `#/log/${e.id}`;
  },
  'clear-practice': b => {
    if (b.dataset.armed !== 'yes') { b.dataset.armed = 'yes'; b.textContent = 'Tap to confirm'; b.classList.add('armed'); setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; b.textContent = 'Clear'; b.classList.remove('armed'); } }, 3000); return; }
    state.practiceDraft.task = ''; state.practiceDraft.source = ''; save(); render();
  },
  move: b => { selectedMove = +b.dataset.i; const y = window.scrollY; render(); window.scrollTo(0, y); $('#move-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },
  depth: b => { moveDepth = b.dataset.v; const y = window.scrollY; render(); window.scrollTo(0, y); },
  score: b => { const n = b.dataset.n; state.moveChecks[selectedMove] = String(state.moveChecks[selectedMove]) === n ? '' : n; save(); const y = window.scrollY; render(); window.scrollTo(0, y); },
  'add-move': () => {
    const txt = (state.moveDrafts[selectedMove] || '').trim();
    if (!txt) { toast('Write this move first', 'alert'); $('#movetask')?.focus(); return; }
    const d = state.practiceDraft; d.lessonId = SEVEN_ID;
    d.task = (d.task ? d.task.replace(/\s+$/, '') + '\n\n' : '') + `${moves[selectedMove][0]}: ${txt}`; save();
    toast(`${moves[selectedMove][0]} added to practice draft`);
  },
  model: () => { showModel = !showModel; const y = window.scrollY; render(); window.scrollTo(0, y); },
  'start-harbor': () => { state.practiceDraft.lessonId = SEVEN_ID; if (!state.practiceDraft.source) state.practiceDraft.source = `Harbor Point Market (fictional). Rule 7: ${HARBOR.rule}\nOrtiz: ${HARBOR.ortiz}\nLee: ${HARBOR.lee}\nFacts: ${HARBOR.timeline.map(t => `${t[0]} — ${t[3]}`).join(' ')}\nQuestion: Should the revocation stand? 45 minutes, about 600 words, objective.`; state.targetWords = 600; timerReset(45); timerToggle(); location.hash = '#/practice'; },
  filter: b => { logFilter = b.dataset.v; $$('[data-action="filter"]').forEach(x => x.setAttribute('aria-pressed', x === b)); $('#app')._draw?.(); },
  'new-entry': () => { const e = createEntry(); location.hash = `#/log/${e.id}`; },
  'entry-score': b => {
    const e = $('#app')._entry; if (!e) return; const i = b.dataset.i, n = b.dataset.n;
    e.selfChecks = e.selfChecks || {}; if (String(e.selfChecks[i]) === n) delete e.selfChecks[i]; else e.selfChecks[i] = n;
    $$(`[data-action="entry-score"][data-i="${i}"]`).forEach(x => x.setAttribute('aria-pressed', String(e.selfChecks[i]) === x.dataset.n));
    $('#app')._upd();
  },
  'copy-entry': async () => {
    const e = $('#app')._entry; if (!e) return;
    const scores = moves.map((m, i) => e.selfChecks?.[i] ? `${m[0]} ${e.selfChecks[i]}/4` : '').filter(Boolean).join(', ');
    const text = [`${e.title}`, `${fmtDate(e.date, { year: 'numeric', month: 'long', day: 'numeric' })} · ${e.className || 'No class'} · ${e.skill}`, '', e.fullAnswer, e.fixNext ? `\nFix next: ${e.fixNext}` : '', scores ? `Self-checks: ${scores}` : ''].join('\n').trim();
    try { await navigator.clipboard.writeText(text); toast('Copied to clipboard', 'copy'); } catch (err) { toast('Copy isn’t available in this browser', 'alert'); }
  },
  'delete-entry': b => {
    const e = $('#app')._entry; if (!e) return;
    if (b.dataset.armed !== 'yes') { b.dataset.armed = 'yes'; b.classList.add('armed'); b.innerHTML = `${icon('trash', 18)} Tap again to delete`; setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; b.classList.remove('armed'); b.innerHTML = `${icon('trash', 18)} Delete`; } }, 3000); return; }
    state.entries = state.entries.filter(x => x.id !== e.id); lastEntryId = null; save(); toast('Entry deleted', 'trash'); location.hash = '#/log';
  }
};
document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-action]'); if (!b) return;
  const fn = actions[b.dataset.action]; if (fn) { ev.preventDefault(); fn(b, ev); }
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape' && document.body.classList.contains('focus')) document.body.classList.remove('focus');
  if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 's') { ev.preventDefault(); save(); toast('Saved on this device'); }
  if (ev.key === '/' && route().view === 'log' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') { ev.preventDefault(); $('#q')?.focus(); }
});

/* ---------- Export / import ---------- */
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `1l-legal-skills-${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('Backup exported', 'download');
}
function importData(ev) {
  const f = ev.target.files[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const d = JSON.parse(reader.result);
      if (d.version !== 1 || !Array.isArray(d.entries) || typeof d.progress !== 'object' || !d.progress) throw Error('format');
      const entries = d.entries.filter(e => e && typeof e === 'object' && e.id).map(e => ({ date: today(), className: '', skill: 'Reading', title: 'Untitled entry', fullAnswer: '', selfChecks: {}, fixNext: '', source: '', updated: Date.now(), ...e }));
      const clean = Object.assign(defaults(), {
        entries, progress: d.progress, classes: Array.isArray(d.classes) ? d.classes.filter(c => typeof c === 'string') : [],
        theme: ['light', 'dark', 'system'].includes(d.theme) ? d.theme : 'system', notes: d.notes || {}, checks: d.checks || {},
        moveChecks: d.moveChecks || {}, moveDrafts: d.moveDrafts || {}, activity: Array.isArray(d.activity) ? d.activity : [],
        practiceDraft: Object.assign({ task: '', source: '', lessonId: null }, d.practiceDraft || {}), lastLesson: d.lastLesson || null, targetWords: d.targetWords || 600
      });
      Object.keys(state).forEach(k => delete state[k]); Object.assign(state, clean); save();
      $('#sheet').close(); render(); toast(`Imported ${plural(entries.length, 'entry')}`, 'upload');
    } catch (e) { toast('That file isn’t a valid 1L Legal Skills backup', 'alert'); }
    ev.target.value = '';
  };
  reader.readAsText(f);
}

/* ---------- Future provider contract (not connected) ----------
   The student supplies their writing and the prompt/facts it answers, then chooses “written” or “oral transcript”.
   Eventually return strict JSON: improvedVersion; changes[] with from, to, skillTag (Reading, Analysis, Logic, Writing,
   Argument, Oral, Research), and a one-sentence reason; nextStep with a specific rewrite or short exercise and lessonId.
   Preserve voice, facts, order, and party names; change only clear improvements. For oral transcripts focus on directness,
   structure, and answering the question asked. Use only law in pasted text; flag anything else “check against your
   materials”; never invent cases. Parse defensively, retry once, then show a readable error. Save each result to Work log. */
function improveWriting() { return { status: 'not connected' }; }

/* ---------- Boot ---------- */
render();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
