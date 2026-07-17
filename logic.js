/* ============================================================
   Samurai Sam — logica applicativa
   Nessuna dipendenza esterna. Dati in data.js. Storage: localStorage.
   ============================================================ */

const TRIP_DATE = new Date('2026-11-02T00:00:00');
const LS_PREFIX = 'sam_';
const MASTERY_DAYS = 10; // intervallo SRS (giorni) oltre il quale una carta è "padroneggiata"

// ---------------- Utility date ----------------
function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return todayStr(d);
}
function daysBetween(aStr, bStr) {
  const a = new Date(aStr + 'T00:00:00');
  const b = new Date(bStr + 'T00:00:00');
  return Math.round((b - a) / 86400000);
}

// ---------------- Icone (sprite SVG definita in index.html) ----------------
function icon(name, extraClass) {
  return '<svg class="icon' + (extraClass ? ' ' + extraClass : '') + '"><use href="#icon-' + name + '"></use></svg>';
}

// ---------------- Storage ----------------
const Store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(LS_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, val) {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(val));
  },
  allKeys() {
    return Object.keys(localStorage).filter(k => k.startsWith(LS_PREFIX));
  }
};

function getSRS() { return Store.get('srs', {}); }
function saveSRS(srs) { Store.set('srs', srs); }
function getSettings() { return Store.get('settings', { newPerDay: 15 }); }
function saveSettings(s) { Store.set('settings', s); }
function getActivity() { return Store.get('activity', {}); } // {date: count totale}
function saveActivity(a) { Store.set('activity', a); }
function getActivityByKind() { return Store.get('activityByKind', {}); } // {date: {kind: count}}
function saveActivityByKind(a) { Store.set('activityByKind', a); }
function getNewIntroToday(kind) { return Store.get('newIntro_' + kind, { date: todayStr(), count: 0 }); }
function saveNewIntroToday(kind, v) { Store.set('newIntro_' + kind, v); }

function logActivity(kind, n = 1) {
  const a = getActivity();
  const t = todayStr();
  a[t] = (a[t] || 0) + n;
  saveActivity(a);

  const byKind = getActivityByKind();
  if (!byKind[t]) byKind[t] = {};
  byKind[t][kind] = (byKind[t][kind] || 0) + n;
  saveActivityByKind(byKind);
}

function getScoreLog() { return Store.get('scoreLog', {}); } // {date: punti}
function saveScoreLog(s) { Store.set('scoreLog', s); }

function addScore(points) {
  const log = getScoreLog();
  const t = todayStr();
  log[t] = (log[t] || 0) + points;
  saveScoreLog(log);
  return log[t];
}

function getTodayScore() {
  const log = getScoreLog();
  return log[todayStr()] || 0;
}

function getTotalScore() {
  const log = getScoreLog();
  return Object.values(log).reduce((sum, v) => sum + v, 0);
}

// Punti = base in base al voto dato (più è stato difficile ricordarla, più vale)
// moltiplicato per un fattore di difficoltà della carta stessa (carte con ease factor
// basso, cioè storicamente più ostiche, valgono di più), più un bonus per le carte nuove.
function scoreForReview(quality, priorEf, isNew) {
  const base = { 0: 1, 3: 8, 4: 10, 5: 5 }[quality] ?? 5;
  const difficultyMultiplier = Math.min(1.8, Math.max(1, 2.5 / (priorEf || 2.5)));
  let pts = Math.round(base * difficultyMultiplier);
  if (isNew) pts += 5;
  return pts;
}

function isDoneToday(kind) {
  const byKind = getActivityByKind();
  const t = todayStr();
  return !!(byKind[t] && byKind[t][kind] > 0);
}

// ---------------- SM-2 semplificato ----------------
// quality: 0 = Di nuovo, 3 = Difficile, 4 = Bene, 5 = Facile
function sm2Review(card, quality) {
  card = card || { ef: 2.5, interval: 0, reps: 0 };
  if (quality < 3) {
    card.reps = 0;
    card.interval = 1;
  } else {
    card.reps += 1;
    if (card.reps === 1) card.interval = 1;
    else if (card.reps === 2) card.interval = 6;
    else card.interval = Math.max(1, Math.round(card.interval * card.ef));
    card.ef = card.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (card.ef < 1.3) card.ef = 1.3;
  }
  card.due = addDays(todayStr(), card.interval);
  card.lastReview = todayStr();
  return card;
}

// ---------------- Costruzione mazzi ----------------
function cardIdForKana(set, k) { return (set === 'hiragana' ? 'h_' : 'k_') + k.k; }
function cardIdForKanji(k) { return 'kj_' + k.k; }
function cardIdForVocab(i) { return 'v_' + i; }
function cardIdForPhrase(i) { return 'p_' + i; }

function buildDeck(kind, opts = {}) {
  // ritorna array di {id, front, sub, back, audio}
  const deck = [];
  if (kind === 'hiragana' || kind === 'katakana') {
    const list = kind === 'hiragana' ? HIRAGANA : KATAKANA;
    const lvl = opts.lvl || 1;
    list.filter(x => x.lvl <= lvl).forEach(x => {
      deck.push({
        id: cardIdForKana(kind, x),
        front: x.k,
        back: x.r,
        audio: x.k
      });
    });
  } else if (kind === 'kanji') {
    KANJI_BASE.forEach(x => {
      if (opts.grp && x.grp !== opts.grp) return;
      deck.push({
        id: cardIdForKanji(x),
        front: x.k,
        back: x.r + ' — ' + x.it,
        audio: x.k
      });
    });
  } else if (kind === 'vocab') {
    VOCAB.forEach((v, i) => {
      if (opts.cat && v.cat !== opts.cat) return;
      deck.push({
        id: cardIdForVocab(i),
        front: v.jp,
        sub: v.kana !== v.jp ? v.kana : '',
        back: v.romaji + ' — ' + v.it,
        audio: v.kana || v.jp
      });
    });
  } else if (kind === 'phrases') {
    PHRASES.forEach((p, i) => {
      if (opts.cat && p.cat !== opts.cat) return;
      deck.push({
        id: cardIdForPhrase(i),
        front: p.jp,
        sub: p.romaji,
        back: p.it,
        audio: p.jp
      });
    });
  }
  return deck;
}

function deckMastery(deck) {
  const srs = getSRS();
  let mastered = 0;
  let started = 0;
  deck.forEach(c => {
    const s = srs[c.id];
    if (s) {
      started++;
      if (s.interval >= MASTERY_DAYS) mastered++;
    }
  });
  return { total: deck.length, started, mastered, pct: deck.length ? Math.round((mastered / deck.length) * 100) : 0 };
}

function buildSession(deck, kind) {
  const srs = getSRS();
  const settings = getSettings();
  let newIntro = getNewIntroToday(kind);
  if (newIntro.date !== todayStr()) newIntro = { date: todayStr(), count: 0 };

  const today = todayStr();
  const due = [];
  const fresh = [];
  deck.forEach(c => {
    const state = srs[c.id];
    if (state) {
      if (state.due <= today) due.push(c);
    } else {
      fresh.push(c);
    }
  });

  const remainingNew = Math.max(0, settings.newPerDay - newIntro.count);
  const newCards = fresh.slice(0, remainingNew);

  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }

  return due.concat(newCards);
}

function markNewIntroduced(kind, count) {
  let newIntro = getNewIntroToday(kind);
  if (newIntro.date !== todayStr()) newIntro = { date: todayStr(), count: 0 };
  newIntro.count += count;
  saveNewIntroToday(kind, newIntro);
}

// ---------------- TTS ----------------
let cachedVoices = [];
function loadVoices() {
  cachedVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}
if (window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function speakJa(text, rate) {
  if (!('speechSynthesis' in window)) {
    showToast('Il tuo browser non supporta la sintesi vocale.');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = rate || 0.85;
  const jaVoice = cachedVoices.find(v => v.lang && v.lang.startsWith('ja'));
  if (jaVoice) u.voice = jaVoice;
  window.speechSynthesis.speak(u);
}

// ---------------- Toast ----------------
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

// ---------------- Router / Tabs ----------------
function showTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('active');
  const btn = document.querySelector('.nav-btn[data-tab="' + name + '"]');
  if (btn) btn.classList.add('active');
  window.location.hash = name;
  if (name === 'dashboard') renderDashboard();
  if (name === 'kana') renderKanaHome();
  if (name === 'vocab') renderVocabHome();
  if (name === 'phrases') renderPhrasesHome();
  if (name === 'plan') renderPlan();
  if (name === 'settings') renderSettings();
}

function goToActivity(kind) {
  if (kind === 'kana') {
    showTab('kana');
    setTimeout(launchKanaSession, 0);
  } else if (kind === 'vocab') {
    showTab('vocab');
    setTimeout(launchVocabSession, 0);
  } else if (kind === 'phrases') {
    showTab('phrases');
    setTimeout(launchPhraseSession, 0);
  }
}

// ================= DASHBOARD =================
function renderDashboard() {
  const el = document.getElementById('tab-dashboard');
  const today = todayStr();
  const daysLeft = daysBetween(today, todayStr(TRIP_DATE));
  const srs = getSRS();

  const kanaDeckAll = buildDeck('hiragana', { lvl: 3 }).concat(buildDeck('katakana', { lvl: 3 })).concat(buildDeck('kanji', {}));
  const vocabDeckAll = buildDeck('vocab');
  const phraseDeckAll = buildDeck('phrases');

  const allDeckIds = [].concat(kanaDeckAll, vocabDeckAll, phraseDeckAll).map(c => c.id);

  let dueCount = 0, masteredCount = 0, seenCount = 0;
  allDeckIds.forEach(id => {
    const s = srs[id];
    if (s) {
      seenCount++;
      if (s.due <= today) dueCount++;
      if (s.interval >= MASTERY_DAYS) masteredCount++;
    }
  });

  // streak
  const activity = getActivity();
  let streak = 0;
  let cursor = today;
  if (!activity[cursor]) cursor = addDays(cursor, -1);
  while (activity[cursor]) {
    streak++;
    cursor = addDays(cursor, -1);
  }

  // punteggio
  const todayScore = getTodayScore();
  const totalScore = getTotalScore();

  // checklist di oggi
  const tasks = [
    { kind: 'kana', label: 'Kana', sub: 'Hiragana, katakana e kanji base', icon: 'kana' },
    { kind: 'vocab', label: 'Vocabolario', sub: 'Ripasso SRS delle parole', icon: 'vocab' },
    { kind: 'phrases', label: 'Frasi', sub: 'Ascolto e shadowing', icon: 'phrases' },
  ];
  const doneFlags = tasks.map(t => isDoneToday(t.kind));
  const allDone = doneFlags.every(Boolean);

  const taskRows = tasks.map((t, i) => {
    const done = doneFlags[i];
    return `
      <button class="task-row ${done ? 'is-done' : ''}" onclick="goToActivity('${t.kind}')">
        <span class="task-icon">${icon(t.icon)}</span>
        <span class="task-text">
          <span class="task-label">${t.label}</span>
          <span class="task-sub">${t.sub}</span>
        </span>
        <span class="task-status">${done ? icon('check', 'task-check') : icon('arrow-right', 'task-arrow')}</span>
      </button>
    `;
  }).join('');

  // heatmap ultimi 70 giorni
  let heatmapHtml = '';
  for (let i = 69; i >= 0; i--) {
    const d = addDays(today, -i);
    const c = activity[d] || 0;
    let level = 0;
    if (c > 0) level = 1;
    if (c >= 10) level = 2;
    if (c >= 25) level = 3;
    heatmapHtml += `<div class="heat-cell heat-${level}" title="${d}: ${c} ripassi"></div>`;
  }

  el.innerHTML = `
    <div class="card countdown-card">
      <div class="countdown-num">${daysLeft}</div>
      <div class="countdown-label">giorni al Giappone — 2 novembre 2026</div>
    </div>

    <div class="card score-card">
      <div class="score-row">
        <div class="score-item">
          <div class="score-num">${icon('bolt', 'score-icon')}${todayScore}</div>
          <div class="score-label">punti oggi</div>
        </div>
        <div class="score-divider"></div>
        <div class="score-item">
          <div class="score-num">${totalScore}</div>
          <div class="score-label">punti totali</div>
        </div>
      </div>
      <p class="score-hint">Ogni ripasso vale punti: le carte più difficili e quelle nuove ne valgono di più.</p>
    </div>

    ${allDone ? `
    <div class="banner banner-success">
      ${icon('check', 'banner-icon')}
      <span>Giorno completato. Tutte le attività di oggi sono fatte.</span>
    </div>` : ''}

    <div class="section-title">Attività di oggi</div>
    <div class="task-list">${taskRows}</div>

    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-num">${dueCount}</div>
        <div class="stat-label">carte da ripassare</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${streak}</div>
        <div class="stat-label">giorni di streak</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${seenCount}</div>
        <div class="stat-label">carte iniziate</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${masteredCount}</div>
        <div class="stat-label">carte padroneggiate</div>
      </div>
    </div>

    <div class="card">
      <h3>Attività (ultimi 70 giorni)</h3>
      <div class="heatmap">${heatmapHtml}</div>
    </div>

    <div class="autosave-note">${icon('check', 'autosave-icon')} I progressi si salvano da soli su questo telefono dopo ogni ripasso — non serve fare nulla.</div>
  `;
}

// ================= SESSIONE FLASHCARD (generica) =================
let currentSession = { queue: [], idx: 0, showingBack: false, kind: null, mode: 'visivo', points: 0 };

function startSession(kind, deck, onDone, mode) {
  const queue = buildSession(deck, kind);
  if (queue.length === 0) {
    showToast('Nessuna carta da ripassare adesso in questo mazzo. Cambia livello/categoria o torna più tardi.');
    return;
  }
  const newInThisQueue = queue.filter(c => !getSRS()[c.id]).length;
  markNewIntroduced(kind, newInThisQueue);
  currentSession = { queue, idx: 0, showingBack: false, kind, onDone, mode: mode || 'visivo', points: 0 };
  renderSessionCard();
}

function renderSessionCard() {
  const area = document.getElementById('session-area');
  if (!area) return;
  const { queue, idx, mode, points } = currentSession;
  if (idx >= queue.length) {
    area.innerHTML = `<div class="card session-done">
      ${icon('check', 'session-done-icon')}
      <h3>Sessione completata</h3>
      <p>Hai ripassato ${queue.length} carte e guadagnato <strong>${points} punti</strong>.</p>
      <button class="btn btn-primary" onclick="currentSession.onDone && currentSession.onDone()">Torna al mazzo</button>
    </div>`;
    logActivity(currentSession.kind, 0); // assicura che la data sia registrata anche a 0 nuove
    return;
  }
  const c = queue[idx];
  currentSession.showingBack = false;
  const isAscolto = mode === 'ascolto';

  area.innerHTML = `
    <div class="card flash-card">
      <div class="flash-progress">${idx + 1} / ${queue.length}</div>
      ${isAscolto
        ? `<div class="flash-front flash-front-hidden" id="flash-front-el">?</div>
           <div class="flash-hint">Ascolta e prova a indovinare, poi tocca per rivelare</div>`
        : `<div class="flash-front" id="flash-front-el">${c.front}</div>`
      }
      ${c.sub && !isAscolto ? `<div class="flash-sub">${c.sub}</div>` : ''}
      <button class="btn btn-icon" onclick="speakJa('${(c.audio || c.front).replace(/'/g, "\\'")}')">${icon('speaker')} Ascolta</button>
      <div id="flash-back" class="flash-back hidden">
        ${isAscolto ? `<div class="flash-reveal-front">${c.front}</div>` : ''}
        ${c.sub && isAscolto ? `<div class="flash-sub">${c.sub}</div>` : ''}
        ${c.back}
      </div>
      <div class="flash-controls" id="show-controls">
        <button class="btn btn-primary" id="btn-show" onclick="revealBack()">Mostra risposta</button>
      </div>
      <div class="flash-controls hidden" id="grade-controls">
        <button class="btn btn-grade again" onclick="gradeCard(0)">Di nuovo</button>
        <button class="btn btn-grade hard" onclick="gradeCard(3)">Difficile</button>
        <button class="btn btn-grade good" onclick="gradeCard(4)">Bene</button>
        <button class="btn btn-grade easy" onclick="gradeCard(5)">Facile</button>
      </div>
    </div>
  `;

  if (isAscolto) {
    setTimeout(() => speakJa(c.audio || c.front), 200);
  }
}

function revealBack() {
  document.getElementById('flash-back').classList.remove('hidden');
  document.getElementById('show-controls').classList.add('hidden');
  document.getElementById('grade-controls').classList.remove('hidden');
  const frontEl = document.getElementById('flash-front-el');
  if (frontEl && frontEl.classList.contains('flash-front-hidden')) {
    frontEl.classList.remove('flash-front-hidden');
    frontEl.textContent = '';
  }
}

function gradeCard(quality) {
  const c = currentSession.queue[currentSession.idx];
  const srs = getSRS();
  const prior = srs[c.id];
  const isNew = !prior;
  const priorEf = prior ? prior.ef : 2.5;
  srs[c.id] = sm2Review(prior, quality);
  saveSRS(srs);
  logActivity(currentSession.kind, 1);
  const pts = scoreForReview(quality, priorEf, isNew);
  addScore(pts);
  currentSession.points += pts;
  currentSession.idx++;
  renderSessionCard();
}

// ================= KANA =================
const KANA_MODE_HELP = {
  visivo: 'Guarda il carattere e prova a ricordare la lettura a mente, prima di rivelarla. Allena il riconoscimento visivo.',
  ascolto: 'Il carattere resta nascosto: ascolta l\'audio e prova a indovinare quale carattere/lettura corrisponde, poi tocca "Mostra risposta" per controllare. Allena l\'orecchio.',
};

function renderKanaHome() {
  const el = document.getElementById('tab-kana');
  el.innerHTML = `
    <div class="card">
      <h3>Kana e Kanji</h3>
      <div class="row-controls">
        <select id="kana-set" onchange="onKanaSetChange()">
          <option value="hiragana">Hiragana</option>
          <option value="katakana">Katakana</option>
          <option value="kanji">Kanji di base</option>
        </select>
        <select id="kana-lvl">
          <option value="1">Livello 1 (base)</option>
          <option value="2">Livello 2 (+ dakuten)</option>
          <option value="3" selected>Livello 3 (set completo)</option>
        </select>
        <select id="kana-grp" class="hidden">
          <option value="">Tutti i gruppi</option>
          <option value="numeri">Numeri</option>
          <option value="tempo">Tempo</option>
          <option value="natura">Natura</option>
          <option value="persone">Persone e corpo</option>
          <option value="luoghi">Luoghi e direzioni</option>
          <option value="aggettivi">Aggettivi</option>
          <option value="verbi">Verbi (radice)</option>
        </select>
      </div>
      <div class="row-controls">
        <select id="kana-mode" onchange="updateKanaModeHelp()">
          <option value="visivo">Modalità: Visivo (leggi)</option>
          <option value="ascolto">Modalità: Ascolto (indovina dall'audio)</option>
        </select>
      </div>
      <p class="muted" id="kana-mode-help">${KANA_MODE_HELP.visivo}</p>
      <div id="kana-mastery" class="mastery-line"></div>
      <button class="btn btn-primary" onclick="launchKanaSession()">Inizia sessione</button>
    </div>
    <div id="session-area"></div>
  `;
  onKanaSetChange();
}

function onKanaSetChange() {
  const set = document.getElementById('kana-set').value;
  document.getElementById('kana-lvl').classList.toggle('hidden', set === 'kanji');
  document.getElementById('kana-grp').classList.toggle('hidden', set !== 'kanji');
  updateKanaMastery();
}

function updateKanaModeHelp() {
  const mode = document.getElementById('kana-mode').value;
  document.getElementById('kana-mode-help').textContent = KANA_MODE_HELP[mode];
}

function updateKanaMastery() {
  const set = document.getElementById('kana-set').value;
  let deck;
  if (set === 'kanji') {
    const grp = document.getElementById('kana-grp').value;
    deck = buildDeck('kanji', grp ? { grp } : {});
  } else {
    const lvl = parseInt(document.getElementById('kana-lvl').value, 10);
    deck = buildDeck(set, { lvl });
  }
  const m = deckMastery(deck);
  const complete = m.total > 0 && m.mastered === m.total;
  document.getElementById('kana-mastery').innerHTML = `
    <div class="mastery-bar"><div class="mastery-fill" style="width:${m.pct}%"></div></div>
    <span class="mastery-text">${m.mastered}/${m.total} padroneggiate ${complete ? icon('check', 'mastery-check') : ''}</span>
  `;
}

function launchKanaSession() {
  const set = document.getElementById('kana-set').value;
  const mode = document.getElementById('kana-mode').value;
  let deck;
  if (set === 'kanji') {
    const grp = document.getElementById('kana-grp').value;
    deck = buildDeck('kanji', grp ? { grp } : {});
  } else {
    const lvl = parseInt(document.getElementById('kana-lvl').value, 10);
    deck = buildDeck(set, { lvl });
  }
  startSession('kana', deck, () => { renderKanaHome(); }, mode);
}

// ================= VOCAB =================
function renderVocabHome() {
  const el = document.getElementById('tab-vocab');
  const cats = Object.keys(CATEGORY_LABELS).filter(c => VOCAB.some(v => v.cat === c));
  const options = cats.map(c => `<option value="${c}">${CATEGORY_LABELS[c]}</option>`).join('');
  el.innerHTML = `
    <div class="card">
      <h3>Vocabolario</h3>
      <p class="muted">${VOCAB.length} parole totali · nuove carte al giorno: ${getSettings().newPerDay}</p>
      <div class="row-controls">
        <select id="vocab-cat" onchange="updateVocabMastery()">
          <option value="">Tutte le categorie (misto)</option>
          ${options}
        </select>
      </div>
      <div id="vocab-mastery" class="mastery-line"></div>
      <button class="btn btn-primary" onclick="launchVocabSession()">Inizia sessione</button>
    </div>
    <div id="session-area"></div>
  `;
  updateVocabMastery();
}
function updateVocabMastery() {
  const cat = document.getElementById('vocab-cat').value;
  const deck = buildDeck('vocab', cat ? { cat } : {});
  const m = deckMastery(deck);
  const complete = m.total > 0 && m.mastered === m.total;
  document.getElementById('vocab-mastery').innerHTML = `
    <div class="mastery-bar"><div class="mastery-fill" style="width:${m.pct}%"></div></div>
    <span class="mastery-text">${m.mastered}/${m.total} padroneggiate ${complete ? icon('check', 'mastery-check') : ''}</span>
  `;
}
function launchVocabSession() {
  const cat = document.getElementById('vocab-cat').value;
  const deck = buildDeck('vocab', cat ? { cat } : {});
  startSession('vocab', deck, renderVocabHome);
}

// ================= FRASI / SHADOWING =================
function renderPhrasesHome() {
  const el = document.getElementById('tab-phrases');
  const cats = [...new Set(PHRASES.map(p => p.cat))];
  const options = cats.map(c => `<option value="${c}">${CATEGORY_LABELS[c] || c}</option>`).join('');
  el.innerHTML = `
    <div class="card">
      <h3>Frasi e Shadowing</h3>
      <p class="muted">Ascolta ogni frase e ripetila ad alta voce imitando ritmo e intonazione. Stessa frase per 3-5 giorni prima di passare oltre.</p>
      <div class="row-controls">
        <select id="phrase-cat" onchange="updatePhraseMastery()">
          <option value="">Tutte le categorie</option>
          ${options}
        </select>
      </div>
      <div id="phrase-mastery" class="mastery-line"></div>
      <button class="btn btn-primary" onclick="launchPhraseSession()">Inizia sessione</button>
    </div>
    <div id="session-area"></div>
  `;
  updatePhraseMastery();
}
function updatePhraseMastery() {
  const cat = document.getElementById('phrase-cat').value;
  const deck = buildDeck('phrases', cat ? { cat } : {});
  const m = deckMastery(deck);
  const complete = m.total > 0 && m.mastered === m.total;
  document.getElementById('phrase-mastery').innerHTML = `
    <div class="mastery-bar"><div class="mastery-fill" style="width:${m.pct}%"></div></div>
    <span class="mastery-text">${m.mastered}/${m.total} padroneggiate ${complete ? icon('check', 'mastery-check') : ''}</span>
  `;
}
function launchPhraseSession() {
  const cat = document.getElementById('phrase-cat').value;
  const deck = buildDeck('phrases', cat ? { cat } : {});
  startSession('phrases', deck, renderPhrasesHome);
}

// ================= PIANO DI STUDIO =================
function renderPlan() {
  const el = document.getElementById('tab-plan');
  const today = todayStr();
  const daysLeft = daysBetween(today, todayStr(TRIP_DATE));
  const first = STUDY_PLAN[0].start;
  const last = STUDY_PLAN[STUDY_PLAN.length - 1].end;
  const totalDays = daysBetween(first, last);
  const elapsedDays = Math.min(totalDays, Math.max(0, daysBetween(first, today)));
  const overallPct = totalDays > 0 ? Math.round((elapsedDays / totalDays) * 100) : 0;

  const items = STUDY_PLAN.map(f => {
    let status = 'futuro';
    if (today > f.end) status = 'passato';
    else if (today >= f.start && today <= f.end) status = 'corrente';
    const rangeLabel = formatDateRange(f.start, f.end);
    return `
      <div class="timeline-item timeline-${status}">
        <div class="timeline-dot">${status === 'passato' ? icon('check') : ''}</div>
        <div class="timeline-content">
          <div class="timeline-title">${f.fase}${status === 'corrente' ? '<span class="pill-current">in corso</span>' : ''}</div>
          <div class="timeline-range">${rangeLabel}</div>
          <ul>${f.obiettivi.map(o => `<li>${o}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <div class="card">
      <h3>Piano di studio</h3>
      <p class="muted">${daysLeft} giorni rimasti al viaggio · 30-45 min/giorno consigliati</p>
      <div class="mastery-bar"><div class="mastery-fill" style="width:${overallPct}%"></div></div>
      <span class="mastery-text">${overallPct}% del percorso completato (in base al calendario)</span>
    </div>
    <div class="timeline">${items}</div>
  `;
}

function formatDateRange(start, end) {
  const opts = { day: 'numeric', month: 'short' };
  const s = new Date(start + 'T00:00:00').toLocaleDateString('it-IT', opts);
  const e = new Date(end + 'T00:00:00').toLocaleDateString('it-IT', opts);
  return s + ' – ' + e;
}

// ================= IMPOSTAZIONI =================
function renderSettings() {
  const el = document.getElementById('tab-settings');
  const s = getSettings();
  el.innerHTML = `
    <div class="card autosave-card">
      <h3>${icon('check', 'inline-icon')} Salvataggio automatico</h3>
      <p class="muted">I tuoi progressi vengono salvati da soli su questo telefono ogni volta che rispondi a una carta. Non devi premere nulla per salvare. Il backup qui sotto è solo una copia di sicurezza extra, utile se cambi telefono o disinstalli l'app.</p>
    </div>
    <div class="card">
      <h3>Impostazioni</h3>
      <label class="field-label">Nuove carte al giorno (SRS)</label>
      <input type="number" id="setting-newperday" min="5" max="50" value="${s.newPerDay}" />
      <button class="btn btn-primary" onclick="saveNewPerDay()">Salva</button>
    </div>
    <div class="card">
      <h3>Backup</h3>
      <button class="btn btn-primary" onclick="exportData()">Esporta backup (.json)</button>
      <label class="btn btn-ghost" style="display:inline-block;cursor:pointer;">
        Importa backup
        <input type="file" accept="application/json" style="display:none" onchange="importData(event)" />
      </label>
    </div>
    <div class="card">
      <h3 class="danger-title">Zona pericolosa</h3>
      <button class="btn btn-danger" onclick="resetAllData()">Azzera tutti i progressi</button>
    </div>
  `;
}
function saveNewPerDay() {
  const v = parseInt(document.getElementById('setting-newperday').value, 10) || 15;
  saveSettings({ newPerDay: v });
  showToast('Impostazione salvata.');
}
function exportData() {
  const data = {};
  Store.allKeys().forEach(k => { data[k] = JSON.parse(localStorage.getItem(k)); });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'samurai-sam-backup-' + todayStr() + '.json';
  a.click();
  URL.revokeObjectURL(url);
}
function importData(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      Object.keys(data).forEach(k => localStorage.setItem(k, JSON.stringify(data[k])));
      showToast('Backup importato. Ricarico...');
      setTimeout(() => location.reload(), 1200);
    } catch (e) {
      showToast('File non valido.');
    }
  };
  reader.readAsText(file);
}
function resetAllData() {
  if (!confirm('Sei sicuro? Tutti i progressi verranno cancellati permanentemente.')) return;
  Store.allKeys().forEach(k => localStorage.removeItem(k));
  showToast('Progressi azzerati.');
  setTimeout(() => location.reload(), 800);
}

// ================= INIT =================
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });
  const initial = window.location.hash ? window.location.hash.slice(1) : 'dashboard';
  showTab(initial);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
