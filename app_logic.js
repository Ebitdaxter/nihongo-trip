/* ============================================================
   NihongoTrip — logica applicativa
   Nessuna dipendenza esterna. Dati in data.js. Storage: localStorage.
   ============================================================ */

const TRIP_DATE = new Date('2026-11-02T00:00:00');
const LS_PREFIX = 'ntrip_';

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
function getActivity() { return Store.get('activity', {}); } // {date: count}
function saveActivity(a) { Store.set('activity', a); }
function getNewIntroToday(kind) { return Store.get('newIntro_' + kind, { date: todayStr(), count: 0 }); }
function saveNewIntroToday(kind, v) { Store.set('newIntro_' + kind, v); }

function logActivity(n = 1) {
  const a = getActivity();
  const t = todayStr();
  a[t] = (a[t] || 0) + n;
  saveActivity(a);
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

  // shuffle due
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
    showToast('Il tuo browser non supporta la sintesi vocale (TTS).');
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

// ================= DASHBOARD =================
function renderDashboard() {
  const el = document.getElementById('tab-dashboard');
  const today = todayStr();
  const daysLeft = daysBetween(today, todayStr(TRIP_DATE));
  const srs = getSRS();

  const allDeckIds = []
    .concat(buildDeck('hiragana', { lvl: 3 }).map(c => c.id))
    .concat(buildDeck('katakana', { lvl: 3 }).map(c => c.id))
    .concat(buildDeck('vocab').map(c => c.id))
    .concat(buildDeck('phrases').map(c => c.id));

  let dueCount = 0, masteredCount = 0, seenCount = 0;
  allDeckIds.forEach(id => {
    const s = srs[id];
    if (s) {
      seenCount++;
      if (s.due <= today) dueCount++;
      if (s.interval >= 21) masteredCount++;
    }
  });

  // streak
  const activity = getActivity();
  let streak = 0;
  let cursor = today;
  if (!activity[cursor]) {
    cursor = addDays(cursor, -1);
  }
  while (activity[cursor]) {
    streak++;
    cursor = addDays(cursor, -1);
  }

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
      <div class="countdown-label">giorni al Giappone (2 novembre 2026)</div>
    </div>
    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-num">${dueCount}</div>
        <div class="stat-label">carte da ripassare oggi</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${streak}</div>
        <div class="stat-label">giorni di streak</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${seenCount}</div>
        <div class="stat-label">carte totali iniziate</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${masteredCount}</div>
        <div class="stat-label">carte consolidate (21+ gg)</div>
      </div>
    </div>
    <div class="card">
      <h3>Attività (ultimi 70 giorni)</h3>
      <div class="heatmap">${heatmapHtml}</div>
    </div>
    <div class="quick-actions">
      <button class="btn btn-primary" onclick="showTab('kana')">Studia Kana</button>
      <button class="btn btn-primary" onclick="showTab('vocab')">Studia Vocabolario</button>
      <button class="btn btn-primary" onclick="showTab('phrases')">Frasi / Shadowing</button>
    </div>
  `;
}

// ================= SESSIONE FLASHCARD (generica) =================
let currentSession = { queue: [], idx: 0, showingBack: false, kind: null };

function startSession(kind, deck, onDone) {
  const queue = buildSession(deck, kind);
  if (queue.length === 0) {
    showToast('Nessuna carta da ripassare adesso in questo mazzo. Torna più tardi o cambia livello/categoria.');
    return;
  }
  const newInThisQueue = queue.filter(c => !getSRS()[c.id]).length;
  markNewIntroduced(kind, newInThisQueue);
  currentSession = { queue, idx: 0, showingBack: false, kind, onDone };
  renderSessionCard();
}

function renderSessionCard() {
  const area = document.getElementById('session-area');
  if (!area) return;
  const { queue, idx } = currentSession;
  if (idx >= queue.length) {
    area.innerHTML = `<div class="card session-done">
      <h3>Sessione completata 🎉</h3>
      <p>Hai ripassato ${queue.length} carte.</p>
      <button class="btn btn-primary" onclick="currentSession.onDone && currentSession.onDone()">Torna al mazzo</button>
    </div>`;
    logActivity(0); // ensure date key exists
    return;
  }
  const c = queue[idx];
  currentSession.showingBack = false;
  area.innerHTML = `
    <div class="card flash-card">
      <div class="flash-progress">${idx + 1} / ${queue.length}</div>
      <div class="flash-front">${c.front}</div>
      ${c.sub ? `<div class="flash-sub">${c.sub}</div>` : ''}
      <button class="btn btn-ghost" onclick="speakJa('${(c.audio || c.front).replace(/'/g, "\\'")}')">🔊 Ascolta</button>
      <div id="flash-back" class="flash-back hidden">${c.back}</div>
      <div class="flash-controls">
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
}

function revealBack() {
  document.getElementById('flash-back').classList.remove('hidden');
  document.getElementById('btn-show').parentElement.classList.add('hidden');
  document.getElementById('grade-controls').classList.remove('hidden');
}

function gradeCard(quality) {
  const c = currentSession.queue[currentSession.idx];
  const srs = getSRS();
  srs[c.id] = sm2Review(srs[c.id], quality);
  saveSRS(srs);
  logActivity(1);
  currentSession.idx++;
  renderSessionCard();
}

// ================= KANA =================
function renderKanaHome() {
  const el = document.getElementById('tab-kana');
  el.innerHTML = `
    <div class="card">
      <h3>Kana</h3>
      <p class="muted">Scegli alfabeto e livello. Livello 1 = base (46 caratteri), 2 = aggiunge dakuten/handakuten, 3 = aggiunge le combinazioni (きゃ, しゃ...).</p>
      <div class="row-controls">
        <select id="kana-set">
          <option value="hiragana">Hiragana</option>
          <option value="katakana">Katakana</option>
        </select>
        <select id="kana-lvl">
          <option value="1">Livello 1 (base)</option>
          <option value="2">Livello 2 (+ dakuten)</option>
          <option value="3" selected>Livello 3 (+ combinazioni)</option>
        </select>
        <button class="btn btn-primary" onclick="launchKanaSession()">Inizia sessione</button>
      </div>
    </div>
    <div id="session-area"></div>
  `;
}
function launchKanaSession() {
  const set = document.getElementById('kana-set').value;
  const lvl = parseInt(document.getElementById('kana-lvl').value, 10);
  const deck = buildDeck(set, { lvl });
  startSession('kana', deck, renderKanaHome);
}

// ================= VOCAB =================
function renderVocabHome() {
  const el = document.getElementById('tab-vocab');
  const cats = Object.keys(CATEGORY_LABELS);
  const options = cats.map(c => `<option value="${c}">${CATEGORY_LABELS[c]}</option>`).join('');
  el.innerHTML = `
    <div class="card">
      <h3>Vocabolario (SRS)</h3>
      <p class="muted">${VOCAB.length} parole totali. Nuove carte al giorno: ${getSettings().newPerDay} (modificabile in Impostazioni).</p>
      <div class="row-controls">
        <select id="vocab-cat">
          <option value="">Tutte le categorie (misto)</option>
          ${options}
        </select>
        <button class="btn btn-primary" onclick="launchVocabSession()">Inizia sessione</button>
      </div>
    </div>
    <div id="session-area"></div>
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
      <h3>Frasi / Shadowing</h3>
      <p class="muted">Ascolta ogni frase e ripetila ad alta voce imitando ritmo e intonazione (tecnica "shadowing"). Consigliato: stessa frase per 3-5 giorni prima di passare oltre.</p>
      <div class="row-controls">
        <select id="phrase-cat">
          <option value="">Tutte le categorie</option>
          ${options}
        </select>
        <button class="btn btn-primary" onclick="launchPhraseSession()">Inizia sessione</button>
      </div>
    </div>
    <div id="session-area"></div>
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
  el.innerHTML = `
    <div class="card">
      <h3>Piano di studio — ${daysLeft} giorni rimasti</h3>
      <p class="muted">30-45 min/giorno consigliati: 10-15 min SRS (Vocabolario), 10 min Frasi/Shadowing, resto ripasso Kana o ascolto libero.</p>
    </div>
    ${STUDY_PLAN.map(f => `
      <div class="card">
        <h4>${f.fase}</h4>
        <div class="muted">${f.periodo}</div>
        <ul>${f.obiettivi.map(o => `<li>${o}</li>`).join('')}</ul>
      </div>
    `).join('')}
  `;
}

// ================= IMPOSTAZIONI =================
function renderSettings() {
  const el = document.getElementById('tab-settings');
  const s = getSettings();
  el.innerHTML = `
    <div class="card">
      <h3>Impostazioni</h3>
      <label class="field-label">Nuove carte al giorno (SRS)</label>
      <input type="number" id="setting-newperday" min="5" max="50" value="${s.newPerDay}" />
      <button class="btn btn-primary" onclick="saveNewPerDay()">Salva</button>
    </div>
    <div class="card">
      <h3>Backup dati</h3>
      <p class="muted">I tuoi progressi sono salvati solo su questo dispositivo. Esporta un backup ogni tanto, soprattutto prima del viaggio.</p>
      <button class="btn btn-primary" onclick="exportData()">Esporta backup (.json)</button>
      <label class="btn btn-ghost" style="display:inline-block;cursor:pointer;">
        Importa backup
        <input type="file" accept="application/json" style="display:none" onchange="importData(event)" />
      </label>
    </div>
    <div class="card">
      <h3 style="color:#bc1829">Zona pericolosa</h3>
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
  a.download = 'nihongotrip-backup-' + todayStr() + '.json';
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
