/* 收藏:本機儲存的社群內容整理 App(第一階段網頁版) */
(function () {
'use strict';

/* ---------- 圖示 ---------- */
const I = {
  clip: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/></svg>',
  plus: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>',
  back: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  more: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  map: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
  home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 11 L12 4 L20 11 V20 H4 Z"/></svg>',
  search: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  gear: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  open: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/></svg>',
  pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.5-7-11.5a7 7 0 0 1 14 0C19 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  share: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V4M7 9l5-5 5 5M5 13v7h14v-7"/></svg>',
  trash: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>'
};

/* ---------- 預設分類 ---------- */
function defaultCats() {
  return [
    { id: 'food', name: '美食', fields: [
      { id: 'name', name: '店名', type: 'text' },
      { id: 'loc', name: '地點', type: 'location' },
      { id: 'kind', name: '類型', type: 'multi', options: ['甜點', '伴手禮', '小吃', '拉麵', '日式', '泰式', '咖啡', '火鍋', '早午餐', '餐酒館'] },
      { id: 'price', name: '價位', type: 'single', options: ['$', '$$', '$$$'] },
      { id: 'status', name: '狀態', type: 'single', options: ['想吃', '吃過'] }],
      keywords: ['餐廳', '必吃', '菜單', '美食', '好吃', '口味', '麻糬', '拉麵', '咖啡', '甜點', '小吃', '伴手禮', '排隊', '早午餐', '火鍋', '泰式', '布丁', '吃'] },
    { id: 'trip', name: '景點', fields: [
      { id: 'name', name: '地點名稱', type: 'text' },
      { id: 'loc', name: '地點', type: 'location' },
      { id: 'season', name: '適合季節', type: 'multi', options: ['春', '夏', '秋', '冬'] },
      { id: 'cost', name: '費用', type: 'text' },
      { id: 'status', name: '狀態', type: 'single', options: ['想去', '去過'] }],
      keywords: ['景點', '旅遊', '步道', '秘境', '露營', '門票', '打卡', '看海', '夜景', '一日遊', '老街', '溫泉'] },
    { id: 'recipe', name: '食譜', fields: [
      { id: 'name', name: '料理名稱', type: 'text' },
      { id: 'ing', name: '主要食材', type: 'text' },
      { id: 'level', name: '難度', type: 'single', options: ['簡單', '普通', '困難'] },
      { id: 'status', name: '狀態', type: 'single', options: ['想做', '做過'] }],
      keywords: ['食譜', '做法', '材料', '步驟', '料理', '烤箱', '氣炸鍋', '電鍋', '醬汁', '備料'] },
    { id: 'goods', name: '好物', fields: [
      { id: 'name', name: '品名', type: 'text' },
      { id: 'cost', name: '價格', type: 'text' },
      { id: 'where', name: '哪裡買', type: 'text' },
      { id: 'status', name: '狀態', type: 'single', options: ['想買', '買了'] }],
      keywords: ['開箱', '好物', '團購', '折扣', '必買', '推薦', '優惠', '下單'] },
    { id: 'learn', name: '知識', fields: [
      { id: 'name', name: '主題', type: 'text' },
      { id: 'status', name: '狀態', type: 'single', options: ['待讀', '讀過'] }],
      keywords: ['技巧', '方法', '學習', '教學', 'AI', '工作', '效率', '模板', '筆記', '觀念'] }
  ];
}

/* ---------- 本機儲存(IndexedDB,失敗時只存在記憶體) ---------- */
const store = (function () {
  let db = null;
  const mem = { items: new Map(), meta: new Map() };
  function open() {
    return new Promise(resolve => {
      try {
        const req = indexedDB.open('clipbox', 1);
        req.onupgradeneeded = () => {
          const d = req.result;
          if (!d.objectStoreNames.contains('items')) d.createObjectStore('items', { keyPath: 'id' });
          if (!d.objectStoreNames.contains('meta')) d.createObjectStore('meta');
        };
        req.onsuccess = () => { db = req.result; resolve(true); };
        req.onerror = () => resolve(false);
      } catch (e) { resolve(false); }
    });
  }
  function tx(name, mode, fn) {
    return new Promise((resolve, reject) => {
      try {
        const t = db.transaction(name, mode); const s = t.objectStore(name);
        const r = fn(s);
        t.oncomplete = () => resolve(r && r.result);
        t.onerror = () => reject(t.error);
      } catch (e) { reject(e); }
    });
  }
  return {
    ok: () => !!db,
    open,
    async allItems() {
      if (!db) return [...mem.items.values()];
      return new Promise((resolve) => {
        const t = db.transaction('items', 'readonly'); const r = t.objectStore('items').getAll();
        r.onsuccess = () => resolve(r.result || []); r.onerror = () => resolve([]);
      });
    },
    async putItem(it) { if (!db) { mem.items.set(it.id, it); return; } await tx('items', 'readwrite', s => s.put(it)); },
    async delItem(id) { if (!db) { mem.items.delete(id); return; } await tx('items', 'readwrite', s => s.delete(id)); },
    async getMeta(k) {
      if (!db) return mem.meta.get(k);
      return new Promise((resolve) => {
        const r = db.transaction('meta', 'readonly').objectStore('meta').get(k);
        r.onsuccess = () => resolve(r.result); r.onerror = () => resolve(undefined);
      });
    },
    async setMeta(k, v) { if (!db) { mem.meta.set(k, v); return; } await tx('meta', 'readwrite', s => s.put(v, k)); },
    async persist() { try { if (navigator.storage && navigator.storage.persist) return await navigator.storage.persist(); } catch (e) {} return false; }
  };
})();

/* ---------- 狀態 ---------- */
let CATS = [], ITEMS = [], SET = { askWhenUnsure: true };
const S = { area: '', todo: false, detail: null, scroll: 0, view: 'feed', tab: 'all', q: '', searching: false, add: null, draft: null, sheet: null, editCat: null, busy: '', near: false, pos: null, radius: 1000, mapSel: null, from: '', imp: null };
const app = document.getElementById('app');
const $ = s => app.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const cat = id => CATS.find(c => c.id === id);

/* ---------- 連結處理 ---------- */
function firstUrl(text) { const m = String(text || '').match(/https?:\/\/[^\s<>"']+/); return m ? m[0] : ''; }
function ytId(u) {
  const m = String(u || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|live\/|embed\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : '';
}
function ytThumb(u) { const id = ytId(u); if (!id) return null; const shorts = /\/shorts\//.test(u); return { url: 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg', w: shorts ? 225 : 480, h: 360, remote: true }; }
async function ytTitle(u) {
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
    const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(u), { signal: ctl.signal }); clearTimeout(t);
    if (!r.ok) return null; const j = await r.json(); return { title: j.title || '', author: j.author_name || '' };
  } catch (e) { return null; }
}
function normalizeUrl(u) {
  u = (u || '').trim(); if (!u) return '';
  try {
    const x = new URL(u);
    const social = /(instagram\.com|threads\.(net|com)|facebook\.com|fb\.watch|youtube\.com|youtu\.be)$/i.test(x.hostname.replace(/^www\.|^m\./, ''));
    const yid = ytId(u);
    if (yid) return /\/shorts\//.test(x.pathname) ? 'https://www.youtube.com/shorts/' + yid : 'https://www.youtube.com/watch?v=' + yid;
    if (social) {
      let keep = '';
      if (/youtube\.com$/i.test(x.hostname.replace(/^www\.|^m\./, '')) && x.searchParams.get('v')) keep = '?v=' + x.searchParams.get('v');
      return x.origin.replace('://m.', '://www.').replace('threads.net', 'threads.com') + x.pathname.replace(/\/+$/, '/') + keep;
    }
    x.hash = ''; return x.toString();
  } catch (e) { return u; }
}
function platformOf(u) {
  const s = (u || '').toLowerCase();
  if (s.includes('instagram.com')) return 'IG';
  if (s.includes('threads.')) return 'Threads';
  if (s.includes('facebook.com') || s.includes('fb.watch')) return 'FB';
  if (s.includes('youtube.com') || s.includes('youtu.be')) return 'YT';
  return s ? '網頁' : '';
}
function embedUrl(u) {
  const s = u || '';
  let m = s.match(/instagram\.com\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (m) return 'https://www.instagram.com/' + (m[1] === 'reels' ? 'reel' : m[1]) + '/' + m[2] + '/embed/';
  m = s.match(/threads\.(?:net|com)\/(@[^/]+)\/post\/([A-Za-z0-9_-]+)/);
  if (m) return 'https://www.threads.net/' + m[1] + '/post/' + m[2] + '/embed';
  if (/facebook\.com\/.+\/(videos|reel)\//.test(s) || /facebook\.com\/reel\//.test(s) || /fb\.watch/.test(s)) return 'https://www.facebook.com/plugins/video.php?width=340&href=' + encodeURIComponent(s);
  if (/facebook\.com\//.test(s)) return 'https://www.facebook.com/plugins/post.php?width=340&href=' + encodeURIComponent(s);
  return '';
}
function kindOf(u) { const s = (u || '').toLowerCase(); if (s.includes('/shorts/')) return 'Shorts'; if (ytId(s)) return '影片'; if (s.includes('/reel')) return 'Reel'; if (s.includes('/p/') || s.includes('/post/')) return '貼文'; return ''; }

/* ---------- 判斷分類與抓欄位(規則版,完全在手機上跑) ---------- */
function classify(text) {
  const r = CATS.map(c => { const hit = c.keywords.filter(k => k && text.includes(k)); return { c, hit, score: hit.length }; })
    .sort((a, b) => b.score - a.score);
  return r[0] || { c: null, hit: [], score: 0 };
}
function extractAddress(t) {
  const m = t.replace(/\s+/g, '').match(/(?:台北|臺北|新北|桃園|台中|臺中|台南|臺南|高雄|新竹|基隆|嘉義|宜蘭|花蓮|屏東|彰化|南投|雲林|苗栗|台東|臺東|澎湖|金門)[市縣][^,,。!!()()「」]{2,40}?號/);
  return m ? m[0] : '';
}
function extractName(t, c) {
  if (!c || c.id !== 'food') return '';
  const K = '(?:麻糬|拉麵|咖啡|食堂|餐廳|小吃|麵店|甜點|冰店|早午餐|火鍋|麵|飯|粥|豆花|燒肉|鍋|館)';
  const pats = [
    new RegExp('(?:台北|臺北|新北|台中|臺中|台南|臺南|高雄|新竹|桃園)([\\u4e00-\\u9fa5]{1,4}?[記家號屋堂軒坊][\\u4e00-\\u9fa5]{0,3}?' + K + ')'),
    new RegExp('([\\u4e00-\\u9fa5]{1,3}[記家號屋堂軒坊][\\u4e00-\\u9fa5]{0,3}?' + K + ')'),
    /[「『]([^」』]{2,14})[」』]/
  ];
  for (const p of pats) { const m = t.match(p); if (m) return m[1]; }
  return '';
}
function summarize(t) {
  const parts = t.replace(/#\S+/g, '').split(/[。!!??\n]/).map(s => s.trim()).filter(s => s.length > 6);
  return parts.slice(0, 3).join('。') + (parts.length ? '。' : '');
}
function guessCat() {
  const recent = ITEMS.filter(i => !i.sample).sort((a, b) => b.at - a.at).slice(0, 20); const n = {};
  recent.forEach(i => { n[i.cat] = (n[i.cat] || 0) + 1; });
  const top = Object.keys(n).sort((a, b) => n[b] - n[a]).map(cat).find(Boolean);
  return top ? Object.assign(Object.create(top), top, { recent: true }) : (cat('food') || CATS[0]);
}
function analyze(input) {
  const text = [input.caption, input.ocr].filter(Boolean).join('\n').trim();
  const d = { id: null, url: input.url, platform: platformOf(input.url), kind: kindOf(input.url), images: input.images || [],
    cat: null, values: {}, note: '', state: 'ok', why: '', at: Date.now() };
  const r = text ? classify(text) : { c: null, score: 0, hit: [] };
  if (!r.c || r.score === 0) {
    /* 沒有線索:先放進最常用的分類,不對再改 */
    const g = guessCat(); d.cat = g.id; d.state = 'guess'; d.note = text ? summarize(text) : '';
    const sf = g.fields.find(f => f.id === 'status'); if (sf) d.values.status = sf.options[0];
    d.why = (text ? '說明裡沒有明顯的分類線索' : '連結本身沒有文字可以判斷') + ',先放進「' + g.name + '」' + (g.recent ? '(你最近最常存的)' : '') + ',不對按「改分類」。';
    return d;
  }
  const c = r.c; d.cat = c.id;
  if (r.score < 2 && SET.askWhenUnsure) d.state = 'unsure';
  const filled = [];
  const name = extractName(text, c), addr = extractAddress(text);
  c.fields.forEach(f => {
    if (f.id === 'name' && name) { d.values.name = name; filled.push(f.name); }
    else if (f.type === 'location' && addr) { d.values[f.id] = addr; filled.push(f.name); }
    else if (f.type === 'multi') {
      const syn = { '甜點': ['甜點', '麻糬', '蛋糕', '豆花', '冰'], '伴手禮': ['伴手禮'] };
      const pick = f.options.filter(o => (syn[o] || [o]).some(w => text.includes(w)));
      if (pick.length) { d.values[f.id] = pick; filled.push(f.name); }
    } else if (f.type === 'single' && f.id === 'status') d.values[f.id] = f.options[0];
  });
  d.note = summarize(text); if (d.note) filled.push('重點');
  const fromImg = input.ocr && addr && !String(input.caption || '').replace(/\s+/g, '').includes(addr);
  d.why = '出現「' + r.hit.slice(0, 4).join('、') + '」' + (fromImg ? ';地址從截圖辨識' : '') + (filled.length ? '。已自動填:' + filled.join('、') : '');
  return d;
}

/* ---------- 圖片:縮小後存在手機 ---------- */
function shrink(file, max) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file); const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      resolve({ data: c.toDataURL('image/jpeg', 0.8), w: c.width, h: c.height });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('讀不到圖片')); };
    img.src = url;
  });
}

/* ---------- 截圖文字辨識(Tesseract.js,在手機上跑,第一次要下載語言檔) ---------- */
let ocrWorker = null;
function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('載入失敗')); document.head.appendChild(s); }); }
async function runOcr(images, onProgress) {
  if (!window.Tesseract) await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
  if (!ocrWorker) ocrWorker = await window.Tesseract.createWorker(['chi_tra', 'eng'], 1, { logger: m => { if (m.status && onProgress) onProgress(m.status, m.progress); } });
  const out = [];
  for (let i = 0; i < images.length; i++) { onProgress && onProgress('辨識第 ' + (i + 1) + ' 張', 0); const r = await ocrWorker.recognize(images[i].data); out.push(r.data.text); }
  return out.join('\n').replace(/[ \t]+/g, ' ');
}

/* ---------- 共用 ---------- */
function toast(m) { let t = document.querySelector('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = m; clearTimeout(toast.t); toast.t = setTimeout(() => t.remove(), 2000); }
async function saveCats() { await store.setMeta('cats', CATS); }
async function saveSet() { await store.setMeta('settings', SET); }
function titleOf(it) { return (it.values && it.values.name) || (it.note ? it.note.slice(0, 18) : '') || ((it.platform || '連結') + (it.kind ? ' ' + it.kind : '') + ' · 內容待補'); }
function itemText(it) { const c = cat(it.cat); const v = Object.values(it.values || {}).map(x => Array.isArray(x) ? x.join(' ') : x).join(' '); return [v, it.note, it.platform, c ? c.name : ''].join(' ').toLowerCase(); }
function isDone(it) { const sf = statusField(it); return !!(sf && it.values && it.values.status === sf.options[sf.options.length - 1]); }
function areaOf(it) {
  const v = it.values || {};
  /* 先看地點欄,沒有再看店名、重點(例如說明寫「台中北區 泰奶麻糬豆花」) */
  for (const src of [v.loc, v.name, it.note]) {
    const t = (src || '').replace(/\s+/g, ''); if (!t) continue;
    const cityM = t.match(/(台北|臺北|新北|桃園|台中|臺中|台南|臺南|高雄|新竹|基隆|嘉義|宜蘭|花蓮|屏東|彰化|南投|雲林|苗栗|台東|臺東)/);
    const city = cityM ? cityM[1].replace('臺', '台') : '';
    const after = cityM ? t.slice(t.indexOf(cityM[1]) + cityM[1].length).replace(/^[市縣]/, '') : '';
    let dist = (after.match(/^([\u4e00-\u9fa5]{1,3}?[區鄉鎮])/) || t.match(/(東區|西區|南區|北區|中區)/) || [])[1] || '';
    if (dist.length === 3 && dist.endsWith('區')) dist = dist.slice(0, 2); /* 西屯區 → 西屯,北區保留 */
    if (dist) return city + dist;
    const hood = t.match(/(北屯|西屯|南屯|中港|逢甲|一中|勤美|大里|太平|豐原|信義|大安|中山|松山|士林|板橋|新莊)/);
    if (hood) return (city || '') + hood[1];
    if (city && src === v.loc) return city;
  }
  return '';
}
function statusField(it) { const c = cat(it.cat); return c ? c.fields.find(f => f.id === 'status') : null; }

/* =====================================================================
   地點與 Google 地圖(從口袋景點移植並改寫)
   ===================================================================== */
const BUILTIN_KEY = 'AIzaSyBvbz07UEwVw7K3tI4JcLcW2tXkqf_bksw'; /* 上線前填入你的金鑰,並在 Google Cloud 限制只允許 coffee-who.github.io 使用 */
const DEMO_POS = { lat: 24.1620, lng: 120.6460, demo: true }; /* 無法定位時的示範位置(台中西屯) */
const G_KINDS = [
  { k: 'mapsjs', label: '地圖顯示', cap: 10000 },
  { k: 'geocoding', label: '地址轉座標', cap: 10000 },
  { k: 'autocomplete', label: '地點自動完成', cap: 10000 },
  { k: 'textsearch', label: '店家查詢', cap: 5000 },
  { k: 'photos', label: '店家照片', cap: 1000 }
];
let GU = null;
function ym() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
function today() { return ym() + '-' + String(new Date().getDate()).padStart(2, '0'); }
function gUsage() {
  if (!GU || GU.ym !== ym()) GU = { ym: ym(), day: today(), dn: 0, k: {} };
  if (GU.day !== today()) { GU.day = today(); GU.dn = 0; }
  return GU;
}
function gBump(kind, query) { const u = gUsage(); u.k[kind] = (u.k[kind] || 0) + 1; if (query) u.dn++; store.setMeta('gusage', u); }
function gKey() { return SET.keyMode === 'own' ? (SET.ownKey || '').trim() : BUILTIN_KEY; }
function gCanQuery() { const cap = +SET.gcap || 0; return !!gKey() && (cap === 0 || gUsage().dn < cap); }

function haversine(a, b, c, d) { const R = 6371000, r = Math.PI / 180; const x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2); return 2 * R * Math.asin(Math.sqrt(x * x + Math.cos(a * r) * Math.cos(c * r) * y * y)); }
function distTxt(m) { return m < 1000 ? Math.round(m / 10) * 10 + ' 公尺' : (m / 1000).toFixed(1) + ' 公里'; }
function hasGeo(it) { return !!(it.geo && typeof it.geo.lat === 'number'); }
function distOf(it) { return S.pos && hasGeo(it) ? haversine(S.pos.lat, S.pos.lng, it.geo.lat, it.geo.lng) : null; }
function needsGeo(it) { const c = cat(it.cat); return !!(c && c.fields.some(f => f.type === 'location')); }
function getPos() {
  return new Promise(resolve => {
    if (!navigator.geolocation) return resolve(DEMO_POS);
    let done = false; const t = setTimeout(() => { if (!done) { done = true; resolve(DEMO_POS); } }, 7000);
    try {
      navigator.geolocation.getCurrentPosition(p => { if (done) return; done = true; clearTimeout(t); resolve({ lat: p.coords.latitude, lng: p.coords.longitude }); },
        () => { if (done) return; done = true; clearTimeout(t); resolve(DEMO_POS); }, { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 });
    } catch (e) { done = true; clearTimeout(t); resolve(DEMO_POS); }
  });
}
async function ensurePos() {
  if (S.pos) return S.pos;
  S.pos = await getPos();
  if (S.pos.demo) toast('無法取得定位,先用台中西屯當示範位置');
  return S.pos;
}

/* ---------- Google Maps JavaScript 載入 ---------- */
let mapsPromise = null, mapsAuthFail = false;
/* 金鑰被 Google 拒絕(網址限制不符、沒開 API、沒開帳單)時改用簡易地圖 */
window.gm_authFailure = () => {
  mapsAuthFail = true;
  toast('Google 地圖金鑰被拒絕,先改用簡易地圖');
  if (S.view === 'map') { const el = document.getElementById('gmap'); if (el) { el.innerHTML = ''; simpleMap(el, mapItems()); const src = document.getElementById('mapsrc'); if (src) src.textContent = '簡易地圖(Google 金鑰被拒絕,請檢查網址限制)'; } }
};
/* 把 Google 地圖的錯誤代碼抓出來顯示,方便查原因 */
let mapsErr = '';
['error', 'warn'].forEach(k => { const o = console[k]; console[k] = function (...args) { try { const t = args.join(' '); const m = t.match(/([A-Za-z]+MapError)/); if (m && !mapsErr) { mapsErr = m[1]; toast('Google 地圖錯誤:' + mapsErr); const src = document.getElementById('mapsrc'); if (src) src.textContent = 'Google 地圖錯誤:' + mapsErr; } } catch (e) {} return o.apply(this, args); }; });
function ensureMaps() {
  if (mapsAuthFail) return Promise.resolve(false);
  if (window.google && window.google.maps && window.google.maps.Map) return Promise.resolve(true);
  const key = gKey(); if (!key) return Promise.resolve(false);
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise(resolve => {
    window.__clipMapsReady = () => { gBump('mapsjs', false); resolve(true); };
    const s = document.createElement('script');
    s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(key) + '&libraries=places&language=zh-TW&region=TW&callback=__clipMapsReady';
    s.async = true; s.onerror = () => { mapsPromise = null; resolve(false); };
    document.head.appendChild(s);
    setTimeout(() => resolve(!!(window.google && window.google.maps && window.google.maps.Map)), 8000);
  });
  return mapsPromise;
}

/* ---------- 店家查詢:座標 + 地址 + 照片(Places API New) ---------- */
async function gTextSearch(query) {
  if (!gCanQuery()) return null;
  const mask = 'places.id,places.location,places.formattedAddress' + (SET.gphoto ? ',places.photos' : '');
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': gKey(), 'X-Goog-FieldMask': mask },
    body: JSON.stringify({ textQuery: query, maxResultCount: 1, languageCode: 'zh-TW' })
  });
  if (!r.ok) throw new Error('places ' + r.status);
  const j = await r.json(); gBump('textsearch', true);
  const p = (j.places || [])[0]; if (!p || !p.location) return null;
  const photo = p.photos && p.photos[0];
  if (photo) gBump('photos', false);
  return { lat: p.location.latitude, lng: p.location.longitude, addr: p.formattedAddress || '', placeId: p.id, photo: photo ? { gphoto: photo.name, w: photo.widthPx || 600, h: photo.heightPx || 750 } : null };
}
async function osmSearch(query) {
  const r = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=zh-TW&q=' + encodeURIComponent(query));
  const j = await r.json(); return j && j[0] ? { lat: +j[0].lat, lng: +j[0].lon } : null;
}
let geoBusy = false;
async function geoQueue() {
  if (geoBusy) return; geoBusy = true;
  try {
    const week = 7 * 86400000;
    const todo = ITEMS.filter(it => needsGeo(it) && !hasGeo(it) && !(it.geo && it.geo.miss && Date.now() - it.geo.at < week) && ((it.values && (it.values.loc || it.values.name)))).slice(0, 30);
    for (const it of todo) {
      const q = [it.values.name, it.values.loc].filter(Boolean).join(' ');
      let res = null;
      try { res = gKey() ? await gTextSearch(q) : await osmSearch(it.values.loc || it.values.name); } catch (e) { res = null; }
      if (res) {
        it.geo = { lat: res.lat, lng: res.lng, src: gKey() ? 'google' : 'osm' };
        if (res.addr && !it.values.loc) it.values.loc = res.addr;
        if (res.photo && SET.gphoto && (!it.images || !it.images.length)) it.images = [res.photo];
      } else it.geo = { miss: true, at: Date.now() };
      await store.putItem(it);
      if (S.view === 'feed') { const w = $('#wall'); if (w) { w.innerHTML = wallHTML(); fitEmbeds(); } }
      if (!gCanQuery() && gKey()) break;
      await new Promise(r => setTimeout(r, 1200));
    }
  } finally { geoBusy = false; }
}
function imgSrc(img) {
  if (!img) return '';
  if (img.data) return img.data; if (img.url) return img.url;
  if (img.gphoto && gKey()) return 'https://places.googleapis.com/v1/' + img.gphoto + '/media?maxWidthPx=600&key=' + encodeURIComponent(gKey());
  return '';
}
function firstImg(it) { const im = it && it.images && it.images.find(x => imgSrc(x)); return im || null; }

/* ---------- 地圖檢視 ---------- */
const MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1d2230' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#8a8f9a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1d2230' }] }, { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#333a4a' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#40495c' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f1a2b' }] }, { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry', stylers: [{ color: '#20263a' }] }
];
function mapItems() { return ITEMS.filter(it => hasGeo(it) && (S.tab === 'all' || it.cat === S.tab) && (!S.todo || !isDone(it))); }
function vMap() {
  const tabs = [{ id: 'all', name: '全部' }].concat(CATS.filter(c => c.fields.some(f => f.type === 'location')).map(c => ({ id: c.id, name: c.name })));
  const noGeo = ITEMS.filter(it => needsGeo(it) && !hasGeo(it) && (S.tab === 'all' || it.cat === S.tab)).length;
  return `<div class="mapv"><div id="gmap"></div>
    <div class="maptop">
      <div class="mapchips">${tabs.map(t => `<button class="mchip ${S.tab === t.id ? 'on' : ''}" data-a="maptab" data-id="${t.id}">${esc(t.name)}</button>`).join('')}<button class="mchip ${S.todo ? 'on' : ''}" data-a="maptodo">還沒去過</button></div>
      ${noGeo ? `<p class="mapnote">${noGeo} 筆還沒有座標${gKey() ? ',正在背景補' : ''}</p>` : ''}
    </div>
    <button class="locbtn" data-a="locate" aria-label="回到我的位置"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></button>
    <div id="mapcard"></div>
    <span class="mapsrc" id="mapsrc"></span>
    ${dockHTML('map')}
  </div>`;
}
function mapCardHTML() {
  const it = ITEMS.find(i => i.id === S.mapSel); if (!it) return '';
  const img = firstImg(it); const c = cat(it.cat); const d = distOf(it);
  return `<div class="mcard"><button class="mcard-main" data-a="open" data-id="${it.id}">${img ? `<img src="${imgSrc(img)}" alt="">` : '<span class="ph"></span>'}<span class="mc-t"><b>${esc(titleOf(it))}</b><span>${esc([c ? c.name : '', (it.values.kind || []).join('、'), it.values.status].filter(Boolean).join(' · '))}</span>${d != null ? `<span class="mc-d">${distTxt(d)}${S.pos && S.pos.demo ? '(示範位置)' : ''}</span>` : ''}</span></button>
    <a class="mc-nav" href="${navUrl(it)}" target="_blank" rel="noopener">${I.pin}導航</a></div>`;
}
function navUrl(it) { return hasGeo(it) ? 'https://www.google.com/maps/dir/?api=1&destination=' + it.geo.lat + ',' + it.geo.lng : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((it.values && (it.values.loc || it.values.name)) || titleOf(it)); }
function setMapSel(id) { S.mapSel = id; const el = document.getElementById('mapcard'); if (el) el.innerHTML = mapCardHTML(); document.querySelectorAll('[data-mk]').forEach(m => m.classList.toggle('sel', m.dataset.mk === id)); }
function markerHTML(it) { const img = firstImg(it); return `<div class="mk ${S.mapSel === it.id ? 'sel' : ''}" data-mk="${it.id}">${img ? `<img src="${imgSrc(img)}" alt="">` : `<span>${esc(titleOf(it).slice(0, 1))}</span>`}</div>`; }
async function initMap() {
  const el = document.getElementById('gmap'); if (!el) return;
  const items = mapItems(); if (!S.mapSel && items[0]) S.mapSel = items[0].id;
  const card = document.getElementById('mapcard'); if (card) card.innerHTML = mapCardHTML();
  const ok = await ensureMaps();
  if (!document.getElementById('gmap')) return;
  if (ok && window.google && google.maps) { googleMap(el, items); document.getElementById('mapsrc').textContent = ''; }
  else { simpleMap(el, items); document.getElementById('mapsrc').textContent = gKey() ? '簡易地圖(Google 地圖載入失敗)' : '簡易地圖(設定金鑰後改用 Google 地圖)'; }
}
function googleMap(el, items) {
  const map = new google.maps.Map(el, { center: S.pos || DEMO_POS, zoom: 13, styles: MAP_STYLE, disableDefaultUI: true, clickableIcons: false, gestureHandling: 'greedy' });
  class HtmlMarker extends google.maps.OverlayView {
    constructor(pos, html, onClick) { super(); this.pos = pos; this.html = html; this.onClick = onClick; }
    onAdd() { const d = document.createElement('div'); d.style.position = 'absolute'; d.innerHTML = this.html; d.addEventListener('click', e => { e.stopPropagation(); this.onClick(); }); this.div = d; this.getPanes().overlayMouseTarget.appendChild(d); }
    draw() { const p = this.getProjection().fromLatLngToDivPixel(this.pos); if (p && this.div) { this.div.style.left = (p.x - 24) + 'px'; this.div.style.top = (p.y - 24) + 'px'; } }
    onRemove() { if (this.div) this.div.remove(); }
  }
  const b = new google.maps.LatLngBounds();
  items.forEach(it => { const ll = new google.maps.LatLng(it.geo.lat, it.geo.lng); b.extend(ll); new HtmlMarker(ll, markerHTML(it), () => setMapSel(it.id)).setMap(map); });
  if (S.pos) { const ll = new google.maps.LatLng(S.pos.lat, S.pos.lng); new HtmlMarker(ll, '<div class="me" style="margin:16px"></div>', () => {}).setMap(map); b.extend(ll); }
  if (items.length) map.fitBounds(b, 70);
  S.gmap = map;
}
function simpleMap(el, items) {
  const W = el.clientWidth, H = el.clientHeight; const pts = items.map(it => it.geo).concat(S.pos ? [S.pos] : []);
  if (!pts.length) { el.innerHTML = '<div class="empty" style="padding-top:200px"><b>地圖上還沒有東西</b>收藏的地點補上座標後,會出現在這裡。</div>'; return; }
  let minLa = Math.min(...pts.map(p => p.lat)), maxLa = Math.max(...pts.map(p => p.lat)), minLn = Math.min(...pts.map(p => p.lng)), maxLn = Math.max(...pts.map(p => p.lng));
  const k = Math.cos((minLa + maxLa) / 2 * Math.PI / 180); let spanX = Math.max((maxLn - minLn) * k, 0.01), spanY = Math.max(maxLa - minLa, 0.01);
  const top = 150, bottom = 230, padX = 50; const s = Math.min((W - padX * 2) / spanX, (H - top - bottom) / spanY);
  const cx = (minLn + maxLn) / 2, cy = (minLa + maxLa) / 2;
  const X = ln => W / 2 + (ln - cx) * k * s, Y = la => top + (H - top - bottom) / 2 - (la - cy) * s;
  let h = `<svg class="sm-bg" width="${W}" height="${H}" aria-hidden="true">`;
  for (let i = 0; i < 9; i++) h += `<line x1="0" y1="${i * H / 8}" x2="${W}" y2="${i * H / 8 + 40}" stroke="#2a3040" stroke-width="${i % 3 ? 3 : 8}"/>`;
  for (let i = 0; i < 6; i++) h += `<line x1="${i * W / 5}" y1="0" x2="${i * W / 5 - 30}" y2="${H}" stroke="#2a3040" stroke-width="${i % 2 ? 3 : 7}"/>`;
  h += '</svg>';
  items.forEach(it => { h += `<button class="sm-mk" style="left:${X(it.geo.lng) - 24}px;top:${Y(it.geo.lat) - 24}px" data-a="mapsel" data-id="${it.id}" aria-label="${esc(titleOf(it))}">${markerHTML(it)}</button>`; });
  if (S.pos) h += `<div class="me" style="position:absolute;left:${X(S.pos.lng) - 8}px;top:${Y(S.pos.lat) - 8}px"></div>`;
  el.innerHTML = h;
}

/* ---------- 編輯地點:Google 自動完成 ---------- */
async function attachAutocomplete() {
  const inp = document.getElementById('f_loc'); if (!inp || !gKey()) return;
  const ok = await ensureMaps(); if (!ok || !google.maps.places || !document.getElementById('f_loc')) return;
  const ac = new google.maps.places.Autocomplete(inp, { fields: ['formatted_address', 'geometry', 'name'] });
  inp.addEventListener('focus', () => { if (!inp.dataset.counted) { inp.dataset.counted = '1'; gBump('autocomplete', true); } }, { once: true });
  ac.addListener('place_changed', () => {
    const p = ac.getPlace(); if (!p || !S.draft) return;
    S.draft.values.loc = p.formatted_address || inp.value; inp.value = S.draft.values.loc;
    if (p.geometry && p.geometry.location) S.draft.geo = { lat: p.geometry.location.lat(), lng: p.geometry.location.lng(), src: 'google' };
    if (!S.draft.values.name && p.name) { S.draft.values.name = p.name; const n = document.getElementById('f_name'); if (n) n.value = p.name; }
    toast('已帶入地址和座標');
  });
}

/* ---------- 匯入 Google 地圖收藏(Takeout) ---------- */
function parseCsvRows(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) { const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true; else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); cell = ''; if (row.some(c => c.trim())) rows.push(row); row = []; }
    else cell += ch; }
  row.push(cell); if (row.some(c => c.trim())) rows.push(row); return rows;
}
function parseTakeoutCsv(text, list, out) {
  const rows = parseCsvRows(text); if (rows.length < 2) return;
  const head = rows[0].map(h => h.trim().toLowerCase()); const find = names => head.findIndex(h => names.includes(h));
  let iN = find(['title', '標題', 'name', '名稱']); const iNote = find(['note', '備註', 'comment', '註解']), iU = find(['url', '網址', 'link']); if (iN < 0) iN = 0;
  for (let i = 1; i < rows.length; i++) { const name = (rows[i][iN] || '').trim(); if (!name) continue;
    const r = { name, note: iNote >= 0 ? (rows[i][iNote] || '').trim() : '', list, url: iU >= 0 ? (rows[i][iU] || '').trim() : '' };
    const m = r.url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || r.url.match(/[@\/](-?\d+\.\d{3,}),(-?\d+\.\d{3,})/); if (m) { r.lat = +m[1]; r.lng = +m[2]; }
    out.push(r); }
}
function parseTakeoutGeo(text, list, out) {
  let js; try { js = JSON.parse(text); } catch (e) { return; }
  (js.features || []).forEach(f => { const p = f.properties || {}, loc = p.location || {};
    let name = (loc.name || p.title || p.Title || '').trim(); if (!name && loc.address) name = loc.address.split(',')[0].trim(); if (!name) return;
    const r = { name, note: '', list, url: p.google_maps_url || '', addr: loc.address || '' };
    const g = f.geometry; if (g && g.type === 'Point' && g.coordinates && g.coordinates.length >= 2 && (g.coordinates[0] || g.coordinates[1])) { r.lng = +g.coordinates[0]; r.lat = +g.coordinates[1]; }
    out.push(r); });
}
const FOOD_WORDS = ['餐', '食', '飯', '麵', '麵包', '牛排', '火鍋', '燒肉', '壽司', '拉麵', '小吃', '夜市', '冰', '甜點', '蛋糕', '茶', '飲', '粥', '雞', '鴨', '豆花', '早餐', '早午餐', '披薩', 'pizza', 'restaurant', 'cafe', 'coffee', '咖啡', '食堂', '居酒屋', '丼', '鍋', '麻糬', '布丁', '泰式', '館'];
function guessImportCat(r) {
  const t = (r.name + ' ' + r.list + ' ' + r.note).toLowerCase(); const c = classify(t);
  if (c.c && c.score > 0 && c.c.fields.some(f => f.type === 'location')) return c.c.id;
  if (FOOD_WORDS.some(w => t.includes(w)) && cat('food')) return 'food';
  return cat('trip') ? 'trip' : (CATS.find(c2 => c2.fields.some(f => f.type === 'location')) || CATS[0]).id;
}
async function importTakeout(files) {
  const out = []; const base = n => n.replace(/\.[^.]+$/, '').split('/').pop();
  try {
    for (const f of files) { const n = f.name.toLowerCase();
      if (n.endsWith('.zip')) {
        if (!window.JSZip) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
        const zip = await window.JSZip.loadAsync(await f.arrayBuffer()); const jobs = [];
        zip.forEach((path, entry) => { const p = path.toLowerCase(); if (entry.dir) return;
          if (p.endsWith('.csv')) jobs.push(entry.async('string').then(t => parseTakeoutCsv(t, base(path), out)));
          else if (p.endsWith('.json') || p.endsWith('.geojson')) jobs.push(entry.async('string').then(t => parseTakeoutGeo(t, base(path), out))); });
        await Promise.all(jobs);
      } else if (n.endsWith('.csv')) parseTakeoutCsv(await f.text(), base(f.name), out);
      else if (n.endsWith('.json') || n.endsWith('.geojson')) parseTakeoutGeo(await f.text(), base(f.name), out);
    }
  } catch (e) { toast('讀取失敗:' + (e.message || e)); return; }
  if (!out.length) { toast('檔案裡沒有找到地點。Takeout 匯出時要勾選「已儲存」'); return; }
  const names = new Set(ITEMS.map(it => (it.values && it.values.name || '').trim()));
  out.forEach(r => { r.cat = guessImportCat(r); r.dup = names.has(r.name); });
  S.imp = out; S.sheet = { type: 'imp' }; render();
}
function importSheetHTML() {
  const rows = S.imp || []; const lists = {}; rows.forEach(r => { lists[r.list] = (lists[r.list] || 0) + 1; });
  const dup = rows.filter(r => r.dup).length; const geoCats = CATS.filter(c => c.fields.some(f => f.type === 'location'));
  return `<b style="font-size:17px">匯入 Google 地圖收藏</b>
    <p class="note">找到 ${rows.length} 個地點,來自清單:${Object.keys(lists).map(l => esc(l) + '(' + lists[l] + ')').join('、')}${dup ? ';' + dup + ' 個已存在會略過' : ''}。座標會一起帶入,不花查詢額度。</p>
    <div class="list" style="max-height:44vh;overflow-y:auto">${rows.slice(0, 300).map((r, i) => `<div class="li"><span class="grow" style="${r.dup ? 'color:var(--muted)' : ''}">${esc(r.name)}${r.dup ? '<small>已存在,略過</small>' : `<small>${esc(r.list)}${typeof r.lat === 'number' ? '' : ' · 沒有座標'}</small>`}</span>${r.dup ? '' : `<label class="sr" for="ic${i}">分類</label><select id="ic${i}" class="isel" data-a="impcat" data-i="${i}">${geoCats.map(c => `<option value="${c.id}" ${c.id === r.cat ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>`}</div>`).join('')}</div>
    <button class="btn" data-a="impgo">匯入 ${rows.length - dup} 個地點</button><button class="btn ghost" data-a="closesheet">取消</button>`;
}
async function doImport() {
  let n = 0; const now = Date.now();
  for (const [i, r] of (S.imp || []).entries()) { if (r.dup) continue; const c = cat(r.cat); const sf = c && c.fields.find(f => f.id === 'status');
    const it = { id: uid(), url: r.url, platform: r.url ? 'Google 地圖' : '', kind: '', cat: r.cat, values: { name: r.name }, note: r.note, images: [], at: now - i };
    if (r.addr) it.values.loc = r.addr; if (sf) it.values.status = sf.options[0];
    if (typeof r.lat === 'number' && typeof r.lng === 'number') it.geo = { lat: r.lat, lng: r.lng, src: 'import' };
    ITEMS.push(it); await store.putItem(it); n++; }
  S.imp = null; S.sheet = null; S.view = 'feed'; render(); toast('已匯入 ' + n + ' 個地點'); geoQueue();
}

/* ---------- 設定:地點與地圖 ---------- */
function mapSettingsHTML() {
  const u = gUsage();
  return `<span class="label" style="margin-top:8px">地點與地圖</span>
    <div class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr))"><button class="${SET.keyMode !== 'own' ? 'on' : ''}" data-a="keymode" data-id="builtin">使用內建金鑰</button><button class="${SET.keyMode === 'own' ? 'on' : ''}" data-a="keymode" data-id="own">用我自己的金鑰</button></div>
    ${SET.keyMode === 'own' ? `<div class="row"><label class="sr" for="okey">Google API 金鑰</label><input id="okey" class="inp" type="password" placeholder="貼上 Google API 金鑰" value="${esc(SET.ownKey || '')}" autocomplete="off"><button class="chip" style="height:46px;flex:none" data-a="savekey">儲存</button></div>
      <p class="note">金鑰只存在這支手機。要在 Google Cloud 啟用 Maps JavaScript API 和 Places API (New),並設定使用上限。</p>`
      : `<p class="note">${BUILTIN_KEY ? '用 App 內建的金鑰,不用設定。今天的額度用完時,地圖會改成在 Google 地圖開啟。' : '內建金鑰還沒設定(開發中)。可以先改用自己的金鑰;沒有金鑰時會用簡易地圖和免費的地址查詢。'}</p>`}
    <div class="field"><span class="label">每天最多查詢</span><div class="seg" style="grid-template-columns:repeat(4,minmax(0,1fr))">${[50, 150, 300, 0].map(v => `<button class="${(+SET.gcap) === v ? 'on' : ''}" data-a="gcap" data-id="${v}">${v || '不限'}</button>`).join('')}</div></div>
    <label class="li" style="cursor:pointer"><span class="grow">沒照片時用 Google 店家照片<small>IG 預覽抓不到時自動補封面(要有金鑰)</small></span><input type="checkbox" data-a="gphoto" ${SET.gphoto ? 'checked' : ''} style="width:22px;height:22px"></label>
    <span class="label">本月用量(這支手機,今天已查詢 ${u.dn} 次)</span>
    ${G_KINDS.map(g => { const n = u.k[g.k] || 0; return `<div class="ubar"><div class="row" style="justify-content:space-between;font-size:13px"><span style="color:var(--ink2)">${g.label}</span><span>${n.toLocaleString()} / ${g.cap.toLocaleString()}</span></div><div class="ub"><i style="width:${Math.max(1, Math.min(100, n / g.cap * 100))}%"></i></div></div>`; }).join('')}
    <label class="btn ghost" style="display:flex;align-items:center;justify-content:center;cursor:pointer">匯入 Google 地圖收藏<input type="file" accept=".zip,.csv,.json,.geojson,application/zip,application/json,text/csv" multiple class="sr" data-a="importgm"></label>
    <p class="note">到 Google Takeout 只勾「已儲存」匯出,把下載的 zip 選進來。</p>`;
}


function dockHTML(on) {
  return `<div class="dock">
    <button class="${on === 'feed' ? 'on' : ''}" data-a="home">${I.home}首頁</button>
    <button class="${on === 'map' ? 'on' : ''}" data-a="map">${I.map}地圖</button>
    <button data-a="search">${I.search}搜尋</button>
    <button data-a="cats">${I.gear}設定</button>
  </div>`;
}
/* 範例資料的大概座標(示意,不是精確位置) */
const SAMPLE_GEO = { 'sample-liji': [24.1545, 120.6700], 'sample-pudding': [24.1649, 120.6436], 'sample-lollier': [24.1500, 120.6600], 'sample-thai': [24.1820, 120.6860] };
async function applySampleGeo() {
  for (const it of ITEMS) { const g = SAMPLE_GEO[it.id]; if (g && !hasGeo(it)) { it.geo = { lat: g[0], lng: g[1], src: 'sample' }; await store.putItem(it); } }
}
function locBlockHTML(it) {
  const c = cat(it.cat); if (!(c && c.fields.some(f => f.type === 'location'))) return '';
  const loc = it.values.loc || ''; const d = distOf(it);
  const mapIf = hasGeo(it) ? `<div class="dmap"><div class="dmfall">${I.pin}<span>${esc(loc || titleOf(it))}</span><small>${it.geo.lat.toFixed(4)}, ${it.geo.lng.toFixed(4)}${it.geo.src === 'sample' ? '・示意位置' : ''}</small></div><iframe src="https://maps.google.com/maps?q=${it.geo.lat},${it.geo.lng}&z=16&hl=zh-TW&output=embed" loading="lazy" title="地圖" tabindex="-1"></iframe></div>` : '';
  return `<section class="dloc">
    <div class="row" style="justify-content:space-between;align-items:baseline"><span class="label">地點</span>${d != null ? `<span class="note">距離 ${distTxt(d)}${S.pos && S.pos.demo ? '(示範位置)' : ''}</span>` : ''}</div>
    <p class="dlocaddr">${esc(loc || '還沒有地址')}${!hasGeo(it) ? `<small>${it.geo && it.geo.miss ? '找不到座標,編輯地址後會再試' : '座標補齊中'}</small>` : ''}</p>
    ${mapIf}
    <div class="row" style="gap:10px"><a class="b1 lk" href="${navUrl(it)}" target="_blank" rel="noopener">導航</a><a class="b2 lk" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([it.values.name, loc].filter(Boolean).join(' ') || titleOf(it))}" target="_blank" rel="noopener">在 Google 地圖開啟</a></div>
  </section>`;
}

/* ---------- 畫面:首頁瀑布流 ---------- */
function vFeed() {
  const tabs = [{ id: 'all', name: '全部' }].concat(CATS.map(c => ({ id: c.id, name: c.name })));
  return `<header class="head">
    <div class="head-row"><h1>收藏</h1><div class="row" style="gap:4px"><button class="pastebtn" data-a="pasteshared" aria-label="貼上剛分享的連結">${I.clip}貼上</button><button class="icon" data-a="new" aria-label="存一筆">${I.plus}</button></div></div>
    ${S.searching ? `<div class="search">${I.search}<label class="sr" for="q">搜尋</label><input id="q" data-m="q" value="${esc(S.q)}" placeholder="店名、地區、重點" autocomplete="off" enterkeyhint="search"><button class="icon" style="width:36px;height:36px" data-a="closesearch" aria-label="關閉搜尋">${I.close}</button></div>` : ''}
    <nav class="tabs">${tabs.map(t => `<button class="tab ${S.tab === t.id ? 'on' : ''}" data-a="tab" data-id="${t.id}">${esc(t.name)}</button>`).join('')}</nav>
    ${filtersHTML()}
  </header>
  ${backupNudge()}
  <main id="wall">${wallHTML()}</main>
  ${dockHTML('feed')}`;
}
function filtersHTML() {
  const base = ITEMS.filter(it => S.tab === 'all' || it.cat === S.tab);
  const areas = {}; base.forEach(it => { const a = areaOf(it); if (a) areas[a] = (areas[a] || 0) + 1; });
  const keys = Object.keys(areas).sort((a, b) => areas[b] - areas[a]);
  const hasStatus = base.some(it => statusField(it)); const hasLoc = base.some(needsGeo);
  if (!hasStatus && !keys.length && !hasLoc) return '';
  return `<div class="fchips">${hasLoc ? `<button class="fchip ${S.near ? 'on' : ''}" data-a="near" aria-pressed="${S.near}"><span>附近</span></button>` : ''}${S.near ? [500, 1000, 3000].map(r => `<button class="fchip sub ${S.radius === r ? 'on' : ''}" data-a="radius" data-id="${r}"><span>${r < 1000 ? r + ' 公尺' : r / 1000 + ' 公里'}</span></button>`).join('') : ''}${hasStatus ? `<button class="fchip ${S.todo ? 'on' : ''}" data-a="todo" aria-pressed="${S.todo}"><span>還沒去過</span></button>` : ''}${keys.map(k => `<button class="fchip ${S.area === k ? 'on' : ''}" data-a="area" data-id="${esc(k)}" aria-pressed="${S.area === k}"><span>${esc(k)}</span><i>${areas[k]}</i></button>`).join('')}</div>`;
}
function wallHTML() {
  const terms = S.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const list = ITEMS.filter(it => (S.tab === 'all' || it.cat === S.tab) && (!S.area || areaOf(it) === S.area) && (!S.todo || !isDone(it)) && terms.every(t => itemText(it).includes(t)))
    .filter(it => !S.near || (distOf(it) != null && distOf(it) <= S.radius))
    .sort((a, b) => S.near ? distOf(a) - distOf(b) : ((isDone(a) - isDone(b)) || (b.at - a.at)));
  if (S.near && !list.length) return `<div class="empty"><b>${distTxt(S.radius)}內沒有收藏</b>${S.pos && S.pos.demo ? '目前用的是示範位置(台中西屯)。' : ''}放大範圍試試。</div>`;
  if (!ITEMS.length) return `<div class="empty"><b>存下第一筆</b>在 IG、Threads 看到想記的店或景點,複製連結後回來按右上角「+」。也可以上傳截圖,系統會辨識上面的字。<br><br><button class="btn ghost" style="max-width:240px" data-a="samples">先載入範例看看</button></div>`;
  if (!list.length) return `<div class="empty"><b>找不到</b>換個關鍵字或分類試試。</div>`;
  return wallOf(list);
}
/* 讓每格高度不一樣:依 id 算出固定的變化,重新整理也不會跳動 */
function vary(id, n) { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h % n; }
/* IG 官方預覽:切掉上方帳號列和下方按讚列,只留影片/照片 */
const IG_TOP = 62; /* 帳號列高度(預覽框寬 340 時) */
function isIgEmbed(it) { return /instagram\.com/.test(embedUrl(it.url) || ''); }
function pinRatio(it) {
  const img = firstImg(it);
  if (img) return Math.min(1.6, Math.max(0.7, img.h / img.w));
  if (isIgEmbed(it)) return it.kind === 'Reel' ? [1.3, 1.45, 1.6][vary(it.id, 3)] : [0.85, 0.92][vary(it.id, 2)];
  if (embedUrl(it.url)) return it.kind === 'Reel' ? 1.7 : [1.15, 1.3, 1.45][vary(it.id, 3)];
  return [0.8, 1.05, 1.3, 0.95][vary(it.id, 4)];
}
function visualHTML(it, big) {
  const img = firstImg(it); const c = cat(it.cat); const emb = !img && embedUrl(it.url); const r = pinRatio(it);
  const attrs = big ? '' : `data-a="open" data-id="${it.id}" data-lp="${it.id}" role="button" tabindex="0" aria-label="查看 ${esc(titleOf(it))}"`;
  const src = it.platform ? `<span class="src">${esc(it.platform)}</span>` : '';
  if (img) return `<div class="pic" ${attrs}><img src="${imgSrc(img)}" alt="" draggable="false" loading="lazy" style="aspect-ratio:1/${r.toFixed(3)};object-fit:cover">${big ? '' : src}</div>`;
  if (emb) return `<div class="embed${isIgEmbed(it) ? ' ig' : ''}" ${attrs} style="aspect-ratio:1/${r}"><div class="efall"><span class="s">${esc([it.platform, it.kind].filter(Boolean).join(' '))} · 預覽載入中</span><span class="t">${esc(titleOf(it))}</span></div><iframe src="${esc(emb)}" ${isIgEmbed(it) ? `data-ig="${it.kind === 'Reel' ? 'reel' : 'post'}" data-r="${r}"` : ''} style="height:${isIgEmbed(it) ? 900 : Math.round(340 * r)}px" loading="lazy" title="${esc(it.platform)} 官方預覽" scrolling="no" tabindex="-1"></iframe><span class="cover"></span>${big ? '' : src}</div>`;
  return `<div class="textpin" ${attrs} style="aspect-ratio:1/${r}"><span class="s">${esc([it.platform, c ? c.name : ''].filter(Boolean).join(' · '))}</span><span class="t">${esc(titleOf(it))}</span></div>`;
}
function pinHTML(it) {
  const img = firstImg(it); const emb = !img && embedUrl(it.url); const d = S.near ? distOf(it) : null;
  return `<article class="pin">${visualHTML(it)}<div class="pinfoot"><span class="n">${img || emb ? esc(titleOf(it)) : ''}${d != null ? `<small class="dist">${distTxt(d)}</small>` : ''}</span><button class="more" data-a="menu" data-id="${it.id}" aria-label="${esc(titleOf(it))} 的選項">${I.more}</button></div></article>`;
}
function wallOf(list) {
  const cols = [[], []], h = [0, 0];
  list.forEach(it => { const est = pinRatio(it) * 100 + 16; const k = h[0] <= h[1] ? 0 : 1; cols[k].push(it); h[k] += est; });
  return `<div class="wall">${cols.map(col => `<div class="col">${col.map(pinHTML).join('')}</div>`).join('')}</div>`;
}

/* ---------- 畫面:單筆詳細 ---------- */
function vDetail() {
  const it = ITEMS.find(i => i.id === S.detail); if (!it) { S.view = 'feed'; return vFeed(); }
  const c = cat(it.cat); const sf = statusField(it); const loc = it.values.loc || '';
  const rows = c ? c.fields.filter(f => f.id !== 'name' && f.id !== 'status' && f.type !== 'location').map(f => { const v = it.values[f.id]; const s2 = Array.isArray(v) ? v.join('、') : v; return s2 ? `<div class="kv"><span>${esc(f.name)}</span><span>${esc(s2)}</span></div>` : ''; }).join('') : '';
  const st = sf ? it.values.status : ''; const done = sf && st === sf.options[sf.options.length - 1];
  const more = ITEMS.filter(i => i.id !== it.id && i.cat === it.cat).sort((a, b) => b.at - a.at).slice(0, 20);
  return `<div class="detail">
    <div class="dhero">${visualHTML(it, true)}
      <button class="fbtn l" data-a="back" aria-label="返回">${I.back}</button>
      <button class="fbtn r" data-a="menu" data-id="${it.id}" aria-label="更多選項">${I.more}</button>
      ${it.url ? `<a class="hero-open" href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.platform || '原貼文')} ↗</a>` : ''}</div>
    <div class="dbar">
      <div class="row" style="gap:2px">
        ${it.url ? `<a class="icon" href="${esc(it.url)}" target="_blank" rel="noopener" aria-label="開原貼文">${I.open}</a>` : ''}
        <button class="icon" data-a="share" data-id="${it.id}" aria-label="分享">${I.share}</button>
        ${loc || (c && c.fields.some(f => f.type === 'location')) ? `<a class="icon" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc || titleOf(it))}" target="_blank" rel="noopener" aria-label="導航">${I.pin}</a>` : ''}
      </div>
      ${sf ? `<button class="stbtn ${done ? 'done' : ''}" data-a="status" data-id="${it.id}">${done ? '已' + esc(st) + ' ✓' : '標記' + esc(sf.options[sf.options.length - 1])}</button>` : ''}
    </div>
    <div class="dbody">
      <span class="note">${esc([c ? c.name : '未分類', it.platform, it.kind].filter(Boolean).join(' · '))}</span>
      <h1 class="dtitle">${esc(titleOf(it))}</h1>
      ${it.note ? `<p class="dnote">${esc(it.note)}</p>` : '<p class="note">還沒有重點,按下面「編輯」補上。</p>'}
      ${rows ? `<div>${rows}</div>` : ''}
      ${locBlockHTML(it)}
      <button class="linkbtn" data-a="edit" data-id="${it.id}">編輯重點與分類</button>
    </div>
    ${more.length ? `<h2 class="dmore">更多${esc(c ? c.name : '')}</h2>${wallOf(more)}` : '<div style="height:60px"></div>'}
  </div>`;
}

/* ---------- 畫面:新增 ---------- */
function vAdd() {
  const a = S.add;
  const dup = a.url && ITEMS.find(it => it.url && it.url === normalizeUrl(a.url));
  return `<div class="page">
  <div class="bar"><button class="icon" data-a="home" aria-label="關閉">${I.close}</button><h2>存一筆</h2><span style="width:44px"></span></div>
  <div class="body">
    <div class="field"><label class="label" for="url">連結</label>
      <div class="row"><input id="url" class="inp" data-m="add.url" value="${esc(a.url)}" placeholder="貼上 IG / Threads / FB 連結" inputmode="url" autocomplete="off"><button class="chip" data-a="paste" style="height:46px;flex:none">貼上</button></div>
      ${dup ? `<p class="note" style="color:var(--accent)">這個連結已經存過了(${esc(titleOf(dup))})。</p>` : ''}
    </div>
    <div class="field"><span class="label">截圖 <i>(選填,第一張當封面,也會辨識上面的字)</i></span>
      <div class="shots">${a.images.map((im, i) => `<div class="shot"><img src="${im.data}" alt="截圖 ${i + 1}"><button class="x" data-a="rmshot" data-i="${i}" aria-label="移除截圖 ${i + 1}">×</button></div>`).join('')}
        <label class="addshot" aria-label="加入截圖">${I.plus}<input type="file" accept="image/*" multiple data-a="files" class="sr"></label></div>
    </div>
    <div class="field"><label class="label" for="cap">貼文說明 <i>(選填,在 IG 長按說明 → 複製)</i></label>
      <textarea id="cap" class="inp" data-m="add.caption" placeholder="貼上貼文說明">${esc(a.caption)}</textarea></div>
    <p class="note">只存在這支手機。系統會先判斷分類、填好欄位,你確認後才存。</p>
    ${S.busy ? `<p class="progress" role="status">${esc(S.busy)}</p>` : ''}
  </div>
  <div class="foot"><button class="btn" data-a="analyze" ${(a.url.trim() || a.caption.trim() || a.images.length) && !S.busy ? '' : 'disabled'}>下一步</button></div>
  </div>`;
}

/* ---------- 畫面:確認後存入 / 編輯 ---------- */
function fieldHTML(f, v) {
  if (f.type === 'multi') { const arr = v || []; return `<div class="field"><span class="label">${esc(f.name)}</span><div class="row" style="flex-wrap:wrap">${f.options.map(o => `<button class="chip ${arr.includes(o) ? 'on' : ''}" data-a="multi" data-f="${f.id}" data-o="${esc(o)}" aria-pressed="${arr.includes(o)}">${esc(o)}</button>`).join('')}</div></div>`; }
  if (f.type === 'single') return `<div class="field"><span class="label">${esc(f.name)}${v ? '' : ' <i>(未填)</i>'}</span><div class="seg" style="grid-template-columns:repeat(${f.options.length},minmax(0,1fr))">${f.options.map(o => `<button class="${v === o ? 'on' : ''}" data-a="single" data-f="${f.id}" data-o="${esc(o)}" aria-pressed="${v === o}">${esc(o)}</button>`).join('')}</div></div>`;
  return `<div class="field"><label class="label" for="f_${f.id}">${esc(f.name)}${v ? '' : ' <i>(未填)</i>'}</label><input id="f_${f.id}" class="inp" data-m="val.${f.id}" value="${esc(v || '')}" ${f.type === 'location' ? `placeholder="${gKey() ? '輸入店名或地址,會跳出 Google 建議' : '地址或店名'}" autocomplete="off"` : ''}></div>`;
}
function vConfirm() {
  const d = S.draft; const c = d.cat ? cat(d.cat) : null; const img = firstImg(d);
  let banner = '';
  if (d.state === 'empty') banner = `<div class="banner warn"><b style="font-size:14px">還沒有內容可以判斷</b><span class="why">連結已保留。選一個分類、自己寫重點;或回上一步貼說明、加截圖。</span><div class="row"><button class="b2" data-a="sheetcat">選分類</button></div></div>`;
  else if (d.state === 'guess') banner = `<div class="banner" style="flex-direction:row;align-items:center;justify-content:space-between;gap:10px"><span style="font-size:14px;min-width:0">先放進 <b>${esc(c ? c.name : '')}</b><span class="why" style="display:block">${esc(d.why)}</span></span><button class="b2" style="flex:none;width:auto;padding:0 14px;height:36px" data-a="sheetcat">改分類</button></div>`;
  else if (d.state === 'unsure') banner = `<div class="banner warn"><span style="font-size:14px">系統沒把握${c ? `,猜是 <b>${esc(c.name)}</b>` : ''}</span><span class="why">${esc(d.why || '說明裡沒有明顯的分類線索')}</span><div class="row">${c ? '<button class="b1" data-a="okcat">就是這類</button>' : ''}<button class="b2" data-a="sheetcat">${c ? '改分類' : '選分類'}</button></div></div>`;
  else if (d.state === 'ok') banner = `<div class="banner"><span style="font-size:14px">系統判斷:<b>${esc(c.name)}</b></span><span class="why">${esc(d.why)}</span><div class="row"><button class="b1" data-a="okcat">分類正確</button><button class="b2" data-a="sheetcat">改分類</button></div></div>`;
  else if (c) banner = `<div class="banner" style="flex-direction:row;align-items:center;justify-content:space-between"><span style="font-size:14px">分類:<b>${esc(c.name)}</b></span><button class="b2" style="flex:none;width:auto;padding:0 14px;height:36px" data-a="sheetcat">改分類</button></div>`;
  return `<div class="page">
  <div class="bar"><button class="icon" data-a="${d.id ? 'open' : 'backadd'}" data-id="${d.id || ''}" aria-label="返回">${I.back}</button><h2>${d.id ? '編輯' : '確認後存入'}</h2><span style="width:44px"></span></div>
  <div class="body">
    <div class="preview">${img ? `<img src="${imgSrc(img)}" alt="">` : '<div class="ph"></div>'}<div style="min-width:0;display:flex;flex-direction:column;gap:2px"><span style="font-size:12px;color:var(--ink2)">${esc([d.platform, d.kind].filter(Boolean).join(' ') || '手動輸入')}</span>${d.url ? `<a href="${esc(d.url)}" target="_blank" rel="noopener" style="font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">開原貼文 ↗</a>` : ''}${!img && embedUrl(d.url) ? '<span style="font-size:12px;color:var(--ink2)">封面會自動用官方預覽,之後可以換成自己的照片</span>' : ''}</div></div>
    ${banner}
    ${c ? c.fields.map(f => fieldHTML(f, d.values[f.id])).join('') : ''}
    <div class="field"><label class="label" for="durl">原貼文連結</label><input id="durl" class="inp" data-m="draft.url" value="${esc(d.url)}" placeholder="貼上 IG / Threads / FB 連結" inputmode="url" autocomplete="off"></div>
    <div class="field"><label class="label" for="note">重點 <i>(可以改)</i></label><textarea id="note" class="inp" data-m="draft.note" placeholder="之後想記得的事">${esc(d.note)}</textarea></div>
  </div>
  <div class="foot"><button class="btn" data-a="save" ${c ? '' : 'disabled'}>${d.id ? '儲存' : (c ? '存進' + esc(c.name) : '先選分類')}</button></div>
  </div>`;
}

/* ---------- 畫面:設定與分類 ---------- */
function vCats() {
  return `<div class="page">
  <div class="bar"><button class="icon" data-a="home" aria-label="返回">${I.back}</button><h2>設定</h2><span style="width:44px"></span></div>
  <div class="body">
    <span class="label">分類</span>
    <div class="list">${CATS.map(c => `<button class="li" style="border-left:0;border-right:0;border-top:0;background:transparent;text-align:left" data-a="editcat" data-id="${c.id}"><span class="grow">${esc(c.name)}<small>${c.fields.map(f => esc(f.name)).join(' · ')}</small></span><span style="color:var(--ink2);font-size:13px">${ITEMS.filter(i => i.cat === c.id).length}</span></button>`).join('')}</div>
    <button class="btn ghost" data-a="newcat">新增分類</button>
    <label class="li" style="cursor:pointer"><span class="grow">系統沒把握時,先問我<small>關鍵字只命中一個時,要你確認分類</small></span><input type="checkbox" data-a="askset" ${SET.askWhenUnsure ? 'checked' : ''} style="width:22px;height:22px"></label>
    ${ITEMS.some(i => i.sample) ? '<button class="btn danger" data-a="clearsamples">清除範例資料</button>' : '<button class="btn ghost" data-a="samples">載入範例資料</button>'}
    ${mapSettingsHTML()}
    <span class="label" style="margin-top:8px">備份</span>
    <p class="note">資料只存在這支手機的瀏覽器裡。換手機、清除 Safari 資料或太久沒打開都可能讓資料消失,請定期匯出。共 ${ITEMS.length} 筆。</p>
    <div class="row"><button class="btn ghost" data-a="export">匯出備份</button><label class="btn ghost" style="display:flex;align-items:center;justify-content:center;cursor:pointer">匯入備份<input type="file" accept="application/json,.json" data-a="import" class="sr"></label></div>
    ${store.ok() ? '' : '<p class="note" style="color:var(--danger)">這個瀏覽器不能用本機資料庫,關掉頁面資料就會不見。</p>'}
  </div></div>`;
}
function vEditCat() {
  const c = S.editCat; const tn = { text: '文字', location: '地點', multi: '多選', single: '單選' };
  return `<div class="page">
  <div class="bar"><button class="icon" data-a="cats" aria-label="返回">${I.back}</button><h2>編輯分類</h2><span style="width:44px"></span></div>
  <div class="body">
    <div class="field"><label class="label" for="cn">名稱</label><input id="cn" class="inp" data-m="cat.name" value="${esc(c.name)}"></div>
    <div class="field"><span class="label">欄位</span><div class="list">${c.fields.map((f, i) => `<div class="li"><span class="grow">${esc(f.name)}<small>${tn[f.type]}${f.options ? ':' + esc(f.options.join('、')) : ''}</small></span>${f.id === 'name' ? '' : `<button class="icon" data-a="delfield" data-i="${i}" aria-label="刪除欄位 ${esc(f.name)}">${I.close}</button>`}</div>`).join('')}</div>
      <label class="sr" for="nf">新欄位名稱</label><input id="nf" class="inp" placeholder="新欄位名稱,例如:營業時間">
      <div class="row"><label class="sr" for="nt">欄位種類</label><select id="nt" class="inp" style="flex:1"><option value="text">文字</option><option value="location">地點</option><option value="single">單選</option><option value="multi">多選</option></select><button class="chip" style="height:46px" data-a="addfield">加入</button></div>
      <label class="sr" for="no">選項</label><input id="no" class="inp" placeholder="單選或多選的選項,用逗號分開"></div>
    <div class="field"><span class="label">判斷關鍵字 <i>(貼文出現這些詞,就優先判斷成這類)</i></span>
      <div class="row" style="flex-wrap:wrap">${c.keywords.map((k, i) => `<span class="kw">${esc(k)}<button data-a="delkw" data-i="${i}" aria-label="移除 ${esc(k)}">×</button></span>`).join('')}</div>
      <div class="row"><label class="sr" for="nk">新關鍵字</label><input id="nk" class="inp" placeholder="新增關鍵字"><button class="chip" style="height:46px" data-a="addkw">加入</button></div></div>
    ${CATS.some(x => x.id === c.id) && CATS.length > 1 ? '<button class="btn danger" data-a="delcat">刪除這個分類</button>' : ''}
  </div>
  <div class="foot"><button class="btn" data-a="savecat">儲存</button></div></div>`;
}

/* ---------- 底部卡片 ---------- */
function sheetHTML() {
  if (!S.sheet) return '';
  let inner = '';
  if (S.sheet.type === 'menu') {
    const it = ITEMS.find(i => i.id === S.sheet.id); if (!it) return '';
    const c = cat(it.cat); const img = firstImg(it); const sf = statusField(it);
    const rows = c ? c.fields.filter(f => f.id !== 'name' && f.id !== 'status').map(f => { const v = it.values[f.id]; const s = Array.isArray(v) ? v.join('、') : v; return s ? `<div class="kv"><span>${esc(f.name)}</span><span>${esc(s)}</span></div>` : ''; }).join('') : '';
    const loc = it.values.loc || '';
    const nextSt = sf ? sf.options[(sf.options.indexOf(it.values.status) + 1) % sf.options.length] : '';
    inner = `<div class="row" style="gap:14px">${img ? `<img src="${imgSrc(img)}" alt="" style="width:60px;height:76px;object-fit:cover;border-radius:10px">` : ''}<div style="min-width:0"><div style="font-size:21px;font-weight:900;line-height:1.3">${esc(titleOf(it))}</div><div style="font-size:13px;color:var(--ink2)">${esc([c ? c.name : '未分類', it.platform, sf ? it.values.status : ''].filter(Boolean).join(' · '))}</div></div></div>
      ${it.note ? `<p style="margin:0;font-size:15px;line-height:1.75">${esc(it.note)}</p>` : ''}
      ${rows ? `<div>${rows}</div>` : ''}
      <div class="acts">
        ${it.url ? `<a class="act pri" href="${esc(it.url)}" target="_blank" rel="noopener">${I.open}開原貼文</a>` : '<span></span>'}
        ${loc || (c && c.fields.some(f => f.type === 'location')) ? `<a class="act" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc || titleOf(it))}" target="_blank" rel="noopener">${I.pin}導航</a>` : '<span></span>'}
        ${sf ? `<button class="act" data-a="status" data-id="${it.id}">${I.check}改成${esc(nextSt)}</button>` : '<span></span>'}
      </div>
      <div class="row" style="gap:18px;flex-wrap:wrap"><label class="linkbtn" style="cursor:pointer">${img ? '換照片' : '放自己的照片'}<input type="file" accept="image/*" class="sr" data-a="photo" data-id="${it.id}"></label>${img && embedUrl(it.url) ? `<button class="linkbtn" data-a="rmphoto" data-id="${it.id}">改用官方預覽</button>` : ''}</div>
      <div class="row" style="justify-content:space-between"><button class="linkbtn" data-a="edit" data-id="${it.id}">編輯重點與分類</button><button class="linkbtn red" data-a="askdel" data-id="${it.id}">刪除</button></div>`;
  } else if (S.sheet.type === 'cat') {
    inner = `<b style="font-size:17px">選分類</b><p class="note">欄位會跟著換,同名欄位的內容會保留。</p>${CATS.map(c => `<button class="catopt ${S.draft && S.draft.cat === c.id ? 'on' : ''}" data-a="pickcat" data-id="${c.id}"><b>${esc(c.name)}</b><span>${c.fields.map(f => esc(f.name)).join(' · ')}</span></button>`).join('')}`;
  } else if (S.sheet.type === 'imp') {
    inner = importSheetHTML();
  } else if (S.sheet.type === 'del') {
    inner = `<b style="font-size:17px">刪除這筆?</b><p class="note">刪除後無法復原。</p><button class="btn" style="background:var(--danger)" data-a="del" data-id="${S.sheet.id}">刪除</button><button class="btn ghost" data-a="closesheet">取消</button>`;
  }
  return `<div class="sheetbg" data-a="closesheet"><div class="sheet" role="dialog" aria-modal="true" data-stop="1"><div class="grab"></div>${inner}</div></div>`;
}

/* ---------- 繪製 ---------- */
function render() {
  const v = { feed: vFeed, detail: vDetail, add: vAdd, confirm: vConfirm, cats: vCats, editcat: vEditCat, map: vMap }[S.view] || vFeed;
  app.innerHTML = v() + sheetHTML();
  fitEmbeds();
  document.body.classList.toggle('onmap', S.view === 'map');
  if (S.view === 'map') initMap();
  if (S.view === 'confirm') attachAutocomplete();
}
function fitEmbeds() {
  app.querySelectorAll('.embed').forEach(el => { const f = el.querySelector('iframe'); if (!f) return; const k = el.clientWidth / 340;
    if (!f.dataset.ig) { f.style.transform = 'scale(' + k + ')'; return; }
    /* IG:切掉帳號列與下方按讚列;Reel 再放大去掉左右黑邊,置中裁切 */
    const reel = f.dataset.ig === 'reel', r = +f.dataset.r, mediaH = reel ? 425 : 340, z = reel ? 340 / 241 : 1, sc = k * z;
    const vis = 340 * k * r, tx = reel ? -49.5 * sc : 0, ty = -IG_TOP * sc - (mediaH * sc - vis) / 2;
    f.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + sc + ')'; });
}
window.addEventListener('resize', fitEmbeds);
/* 嵌入框被擋(例如預覽環境)時,改顯示文字卡 */
document.addEventListener('securitypolicyviolation', e => { if (/frame|child/.test(e.effectiveDirective || e.violatedDirective || '')) document.body.classList.add('noembed'); });
function go(view) { S.view = view; S.sheet = null; render(); window.scrollTo(0, 0); }

/* ---------- 事件 ---------- */
app.addEventListener('input', e => {
  const m = e.target.dataset.m; if (!m) return; const val = e.target.value;
  if (m === 'q') { S.q = val; $('#wall').innerHTML = wallHTML(); fitEmbeds(); return; }
  if (m.startsWith('add.')) { S.add[m.slice(4)] = val; const b = $('[data-a="analyze"]'); if (b) b.disabled = !(S.add.url.trim() || S.add.caption.trim() || S.add.images.length); return; }
  if (m.startsWith('val.')) { S.draft.values[m.slice(4)] = val; return; }
  if (m === 'draft.note') { S.draft.note = val; return; }
  if (m === 'draft.url') { S.draft.url = val; return; }
  if (m === 'cat.name') { S.editCat.name = val; }
});
/* 在連結欄長按貼上:有連結就直接進下一步 */
app.addEventListener('paste', e => {
  if (!e.target || e.target.id !== 'url' || S.view !== 'add') return;
  const t = (e.clipboardData && e.clipboardData.getData('text')) || ''; const u = firstUrl(t); if (!u) return;
  e.preventDefault(); S.add.url = u; if (t.trim() !== u) S.add.caption = S.add.caption || t.replace(u, '').trim();
  if (!S.add.images.length) act('analyze', {}); else render();
});
app.addEventListener('change', async e => {
  const a = e.target.dataset.a;
  if (a === 'files') {
    const files = [...e.target.files].slice(0, 20 - S.add.images.length);
    for (const f of files) { try { S.add.images.push(await shrink(f, 1000)); } catch (err) { toast(err.message); } }
    render();
  } else if (a === 'photo') {
    const it = ITEMS.find(i => i.id === e.target.dataset.id); const f = e.target.files[0];
    if (it && f) { try { it.images = [await shrink(f, 1000)]; await store.putItem(it); S.sheet = null; render(); toast('已換照片'); } catch (err) { toast(err.message); } }
  } else if (a === 'askset') { SET.askWhenUnsure = e.target.checked; await saveSet(); }
  else if (a === 'import') { const f = e.target.files[0]; if (f) importFile(f); }
  else if (a === 'importgm') { const fs = [...e.target.files]; if (fs.length) importTakeout(fs); }
  else if (a === 'gphoto') { SET.gphoto = e.target.checked; await saveSet(); }
  else if (a === 'impcat') { const r = S.imp && S.imp[+e.target.dataset.i]; if (r) r.cat = e.target.value; }
});
app.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (e.target.id === 'nk') { e.preventDefault(); act('addkw', {}); }
  if (e.target.id === 'nf') { e.preventDefault(); act('addfield', {}); }
});
app.addEventListener('click', e => {
  const t = e.target.closest('[data-a]'); if (!t || t.tagName === 'INPUT' || t.tagName === 'SELECT') return;
  if (t.classList.contains('sheetbg') && e.target.closest('[data-stop]')) return;
  if (t.tagName === 'A' && t.getAttribute('href')) return;
  e.preventDefault(); act(t.dataset.a, t.dataset);
});

async function act(a, ds) {
  switch (a) {
    case 'home': S.draft = null; S.add = null; S.busy = ''; go('feed'); break;
    case 'tab': S.tab = ds.id; S.area = ''; render(); break;
    case 'todo': S.todo = !S.todo; render(); break;
    case 'area': S.area = S.area === ds.id ? '' : ds.id; render(); break;
    case 'backupnow': exportData(); break;
    case 'backuplater': await store.setMeta('backupSnooze', Date.now()); BK.snooze = Date.now(); render(); break;
    case 'search': S.searching = true; S.view = 'feed'; render(); setTimeout(() => { const q = $('#q'); if (q) q.focus(); }, 30); break;
    case 'closesearch': S.searching = false; S.q = ''; render(); break;
    case 'cats': go('cats'); break;
    case 'pasteshared': pasteShared(); break;
    case 'new': S.add = { url: '', caption: '', images: [] }; go('add'); break;
    case 'paste': try { const t = await navigator.clipboard.readText(); const u = firstUrl(t); if (u) { S.add.url = u; if (t.trim() !== u) S.add.caption = S.add.caption || t.replace(u, '').trim(); if (!S.add.images.length) { act('analyze', {}); } else render(); } else toast('剪貼簿裡沒有連結'); } catch (err) { const el = $('#url'); if (el) el.focus(); toast('請長按輸入框選「貼上」'); } break;
    case 'rmshot': S.add.images.splice(+ds.i, 1); render(); break;
    case 'analyze': {
      const ad = S.add; ad.url = normalizeUrl(ad.url || firstUrl(ad.caption));
      let ocr = '';
      if (ad.images.length) {
        try { S.busy = '準備文字辨識(第一次要下載語言檔,約 20MB)…'; render();
          ocr = await runOcr(ad.images, (s, p) => { S.busy = '辨識圖片文字中' + (p ? ' ' + Math.round(p * 100) + '%' : '') + '…'; const el = $('.progress'); if (el) el.textContent = S.busy; }); }
        catch (err) { toast('文字辨識失敗,先用說明文字判斷'); }
      }
      let cap = ad.caption; let ytAuthor = '';
      if (ytId(ad.url)) { S.busy = '讀取 YouTube 標題…'; render(); const info = await ytTitle(ad.url); if (info) { cap = [info.title, cap].filter(Boolean).join('\n'); ytAuthor = info.author; } }
      const imgs = ad.images.length ? ad.images.slice(0, 1) : (ytThumb(ad.url) ? [ytThumb(ad.url)] : []);
      S.busy = ''; S.draft = analyze({ url: ad.url, caption: cap, ocr, images: imgs });
      if (ytAuthor && !S.draft.note.includes(ytAuthor)) S.draft.note = (S.draft.note ? S.draft.note + ' ' : '') + '(' + ytAuthor + ')';
      go('confirm'); break; }
    case 'backadd': S.draft = null; go('add'); break;
    case 'okcat': S.draft.state = 'done'; render(); break;
    case 'sheetcat': S.sheet = { type: 'cat' }; render(); break;
    case 'closesheet': S.sheet = null; render(); break;
    case 'pickcat': {
      const nc = cat(ds.id), oc = S.draft.cat ? cat(S.draft.cat) : null, nv = {};
      nc.fields.forEach(f => { const of = oc && oc.fields.find(x => x.id === f.id || x.name === f.name); const v = of ? S.draft.values[of.id] : undefined; if (v == null) return;
        if (f.type === 'multi') nv[f.id] = (Array.isArray(v) ? v : [v]).filter(o => f.options.includes(o));
        else if (f.type === 'single') nv[f.id] = f.options.includes(v) ? v : '';
        else nv[f.id] = Array.isArray(v) ? v.join('、') : v; });
      const sf = nc.fields.find(f => f.id === 'status'); if (sf && !nv.status) nv.status = sf.options[0];
      S.draft.cat = nc.id; S.draft.values = nv; S.draft.state = 'done'; S.sheet = null; render(); break; }
    case 'multi': { const arr = S.draft.values[ds.f] || []; const i = arr.indexOf(ds.o); i >= 0 ? arr.splice(i, 1) : arr.push(ds.o); S.draft.values[ds.f] = arr; render(); break; }
    case 'single': S.draft.values[ds.f] = S.draft.values[ds.f] === ds.o ? '' : ds.o; render(); break;
    case 'save': {
      const d = S.draft; if (!d.cat) return;
      const nu = normalizeUrl(d.url || '');
      const dupe = nu && ITEMS.find(x => x.url === nu && x.id !== d.id); if (dupe) { toast('這個連結已經存過:' + titleOf(dupe)); return; }
      if ((!d.images || !d.images.length) && ytThumb(nu)) d.images = [ytThumb(nu)];
      const it = { id: d.id || uid(), url: nu, platform: platformOf(nu) || d.platform, kind: kindOf(nu) || d.kind, cat: d.cat, values: d.values, note: d.note.trim(), images: d.images, at: d.at || Date.now() };
      if (d.sample) it.sample = true;
      if (d.geo && (d.geo.src === 'google' || (d.values.loc || '') === (d._loc || ''))) it.geo = d.geo;
      await store.putItem(it); const i = ITEMS.findIndex(x => x.id === it.id); i >= 0 ? ITEMS[i] = it : ITEMS.push(it);
      const isNew = !d.id; S.draft = null; S.add = null; if (isNew) { S.tab = 'all'; S.q = ''; go('feed'); } else { S.detail = it.id; go('detail'); } toast(isNew ? '已存進' + cat(it.cat).name : '已儲存');
      if (isNew && ITEMS.length === 1) store.persist();
      if (isNew && !it.sample) { BK.since++; await store.setMeta('savedSinceBackup', BK.since); }
      if (!hasGeo(it)) geoQueue();
      break; }
    case 'map': S.from = ''; S.detail = null; go('map'); ensurePos().then(() => { if (S.view === 'map') initMap(); }); geoQueue(); break;
    case 'maptab': S.tab = ds.id; S.mapSel = null; render(); break;
    case 'maptodo': S.todo = !S.todo; S.mapSel = null; render(); break;
    case 'mapsel': setMapSel(ds.id); break;
    case 'locate': S.pos = null; await ensurePos(); if (S.gmap && S.view === 'map' && window.google) S.gmap.panTo(S.pos); else render(); break;
    case 'near': S.near = !S.near; if (S.near) { await ensurePos(); geoQueue(); } render(); break;
    case 'radius': S.radius = +ds.id; render(); break;
    case 'keymode': SET.keyMode = ds.id; await saveSet(); render(); break;
    case 'savekey': { const el = $('#okey'); SET.ownKey = el ? el.value.trim() : ''; await saveSet(); mapsPromise = null; toast(SET.ownKey ? '金鑰已存在這支手機' : '已清除金鑰'); render(); geoQueue(); break; }
    case 'gcap': SET.gcap = +ds.id; await saveSet(); render(); break;
    case 'impgo': doImport(); break;
    case 'open': if (S.view === 'map') S.from = 'map'; else if (S.view === 'feed') { S.from = ''; S.scroll = window.scrollY; } S.detail = ds.id; S.sheet = null; S.view = 'detail'; render(); window.scrollTo(0, 0); break;
    case 'back': if (S.from === 'map') { S.detail = null; go('map'); break; } S.view = 'feed'; S.detail = null; render(); window.scrollTo(0, S.scroll || 0); break;
    case 'share': shareItem(ds.id); break;
    case 'menu': S.sheet = { type: 'menu', id: ds.id }; render(); break;
    case 'status': { const it = ITEMS.find(i => i.id === ds.id); const sf = statusField(it); it.values.status = sf.options[(sf.options.indexOf(it.values.status) + 1) % sf.options.length]; await store.putItem(it); render(); toast('已改成' + it.values.status); break; }
    case 'edit': { const it = ITEMS.find(i => i.id === ds.id); S.draft = JSON.parse(JSON.stringify(Object.assign({}, it, { state: 'done' }))); S.draft._loc = it.values.loc || ''; go('confirm'); break; }
    case 'rmphoto': { const it = ITEMS.find(i => i.id === ds.id); it.images = []; await store.putItem(it); S.sheet = null; render(); toast('已改用官方預覽'); break; }
    case 'askdel': S.sheet = { type: 'del', id: ds.id }; render(); break;
    case 'del': await store.delItem(ds.id); ITEMS = ITEMS.filter(i => i.id !== ds.id); S.sheet = null; if (S.detail === ds.id) { S.detail = null; S.view = 'feed'; } render(); toast('已刪除'); break;
    case 'editcat': S.editCat = JSON.parse(JSON.stringify(cat(ds.id))); go('editcat'); break;
    case 'newcat': S.editCat = { id: 'c' + uid(), name: '新分類', fields: [{ id: 'name', name: '名稱', type: 'text' }], keywords: [] }; go('editcat'); break;
    case 'delfield': S.editCat.fields.splice(+ds.i, 1); render(); break;
    case 'addfield': { const n = ($('#nf') || {}).value; if (!n || !n.trim()) return; const ty = $('#nt').value; const f = { id: 'f' + uid(), name: n.trim(), type: ty };
      if (ty === 'single' || ty === 'multi') { const o = $('#no').value.split(/[,,、]/).map(s => s.trim()).filter(Boolean); if (!o.length) { toast('請輸入選項,用逗號分開'); return; } f.options = o; }
      S.editCat.fields.push(f); render(); break; }
    case 'delkw': S.editCat.keywords.splice(+ds.i, 1); render(); break;
    case 'addkw': { const el = $('#nk'); const k = el && el.value.trim(); if (k && !S.editCat.keywords.includes(k)) S.editCat.keywords.push(k); render(); const n = $('#nk'); if (n) n.focus(); break; }
    case 'savecat': { const c = S.editCat; if (!c.name.trim()) { toast('請輸入名稱'); return; } c.name = c.name.trim(); const i = CATS.findIndex(x => x.id === c.id); i >= 0 ? CATS[i] = c : CATS.push(c); await saveCats(); go('cats'); toast('已儲存分類'); break; }
    case 'delcat': { const id = S.editCat.id; if (ITEMS.some(i => i.cat === id)) { toast('這個分類還有收藏,不能刪'); return; } CATS = CATS.filter(c => c.id !== id); await saveCats(); go('cats'); break; }
    case 'export': exportData(); break;
    case 'samples': {
      try { await loadSamples(); S.view = 'feed'; S.tab = 'all'; render(); toast('已載入範例'); } catch (err) { toast('範例載入失敗'); } break; }
    case 'clearsamples': { for (const it of ITEMS.filter(i => i.sample)) await store.delItem(it.id); ITEMS = ITEMS.filter(i => !i.sample); render(); toast('已清除範例'); break; }
  }
}

async function loadSamples() {
  const r = await fetch('samples.json'); const data = await r.json();
  for (const it of data.items) { if (!ITEMS.find(x => x.id === it.id)) { ITEMS.push(it); await store.putItem(it); } }
  await store.setMeta('samplesLoaded', true);
  await applySampleGeo();
}

/* ---------- 分享 ---------- */
async function shareItem(id) {
  const it = ITEMS.find(i => i.id === id); if (!it) return;
  const text = titleOf(it) + (it.note ? '\n' + it.note : '');
  try { if (navigator.share) { await navigator.share({ title: titleOf(it), text, url: it.url || undefined }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText((it.url ? it.url + '\n' : '') + text); toast('已複製,可以貼給朋友'); } catch (e) { toast('這個瀏覽器不能分享'); }
}

/* ---------- 長按:快捷選單 ---------- */
const LP = { timer: null, fired: false, x: 0, y: 0, id: null, el: null };
app.addEventListener('pointerdown', e => {
  const v = e.target.closest('[data-lp]'); if (!v) return;
  LP.fired = false; LP.x = e.clientX; LP.y = e.clientY; LP.id = v.dataset.lp; LP.el = v;
  clearTimeout(LP.timer); LP.timer = setTimeout(() => { LP.timer = null; LP.fired = true; showRadial(); }, 450);
});
app.addEventListener('pointermove', e => { if (LP.timer && (Math.abs(e.clientX - LP.x) > 10 || Math.abs(e.clientY - LP.y) > 10)) { clearTimeout(LP.timer); LP.timer = null; } });
['pointerup', 'pointercancel'].forEach(t => app.addEventListener(t, () => { clearTimeout(LP.timer); LP.timer = null; }));
app.addEventListener('contextmenu', e => { if (e.target.closest('[data-lp]')) e.preventDefault(); });
app.addEventListener('click', e => { if (LP.fired) { LP.fired = false; e.preventDefault(); e.stopImmediatePropagation(); } }, true);
function showRadial() {
  const it = ITEMS.find(i => i.id === LP.id); if (!it || !LP.el) return;
  try { if (navigator.vibrate) navigator.vibrate(10); } catch (e) {}
  const r = LP.el.getBoundingClientRect(); const sf = statusField(it);
  const nextSt = sf ? sf.options[(sf.options.indexOf(it.values.status) + 1) % sf.options.length] : '';
  const btns = [
    it.url ? { a: 'ropen', icon: I.open, label: '開原貼文' } : null,
    { a: 'rshare', icon: I.share, label: '分享' },
    sf ? { a: 'rstatus', icon: I.check, label: '改成' + nextSt } : null,
    { a: 'rdel', icon: I.trash, label: '刪除' }
  ].filter(Boolean);
  const W = window.innerWidth, H = window.innerHeight, R = 104, spread = 150;
  const toRight = LP.x < W / 2; const base = toRight ? -90 : 270;
  const ov = document.createElement('div'); ov.className = 'radial';
  const clone = LP.el.cloneNode(true); ['data-a', 'data-lp', 'role', 'tabindex'].forEach(k => clone.removeAttribute(k));
  clone.classList.add('lifted'); clone.style.position = 'fixed'; clone.style.left = r.left + 'px'; clone.style.top = r.top + 'px'; clone.style.width = r.width + 'px'; clone.style.height = r.height + 'px';
  ov.appendChild(clone);
  btns.forEach((b, i) => {
    const step = btns.length > 1 ? spread / (btns.length - 1) : 0;
    const deg = toRight ? base + 15 + step * i : base - 15 - step * i;
    const ang = deg * Math.PI / 180;
    const x = Math.min(W - 66, Math.max(6, LP.x + R * Math.cos(ang) - 30));
    const y = Math.min(H - 90, Math.max(6, LP.y + R * Math.sin(ang) - 30));
    const el = document.createElement('button'); el.className = 'rbtn'; el.style.left = x + 'px'; el.style.top = y + 'px';
    el.style.animationDelay = (i * 30) + 'ms'; el.setAttribute('aria-label', b.label); el.innerHTML = b.icon; el.title = b.label;
    el.addEventListener('click', ev => {
      ev.stopPropagation(); ov.remove();
      if (b.a === 'ropen') window.open(it.url, '_blank', 'noopener');
      else if (b.a === 'rshare') shareItem(it.id);
      else if (b.a === 'rstatus') act('status', { id: it.id });
      else if (b.a === 'rdel') act('askdel', { id: it.id });
    });
    ov.appendChild(el);
  });
  ov.addEventListener('click', () => ov.remove());
  document.body.appendChild(ov);
}

/* ---------- 備份 ---------- */
const BK = { last: 0, since: 0, snooze: 0 };
function backupNudge() {
  const real = ITEMS.filter(i => !i.sample).length; if (real < 3) return '';
  const now = Date.now(), day = 86400000;
  if (BK.snooze && now - BK.snooze < 3 * day) return '';
  const due = BK.since >= 20 || (!BK.last && real >= 5) || (BK.last && now - BK.last > 14 * day && BK.since > 0);
  if (!due) return '';
  const msg = BK.last ? `距離上次備份已經 ${Math.floor((now - BK.last) / day)} 天,新增了 ${BK.since} 筆` : `已經存了 ${real} 筆,還沒備份過`;
  return `<div class="nudge" role="status"><span>${msg}。資料只在這支手機,建議存一份到 iCloud 雲碟。</span><div class="row"><button class="b1" data-a="backupnow">立即備份</button><button class="b2" data-a="backuplater">稍後</button></div></div>`;
}
async function markBackedUp() { BK.last = Date.now(); BK.since = 0; await store.setMeta('lastBackupAt', BK.last); await store.setMeta('savedSinceBackup', 0); }
async function exportData() {
  const d = new Date(); const name = 'clipbox-' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '.json';
  const json = JSON.stringify({ app: 'clipbox', v: 1, at: d.toISOString(), cats: CATS, settings: SET, items: ITEMS.filter(i => !i.sample) });
  try {
    const file = new File([json], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: '收藏備份' }); await markBackedUp(); render(); toast('已備份'); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  downloadData(json, name); await markBackedUp(); render();
}
function downloadData(json, name) {
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
async function importFile(f) {
  try {
    const data = JSON.parse(await f.text());
    if (data.app !== 'clipbox' || !Array.isArray(data.items)) throw new Error('不是這個 App 的備份檔');
    if (Array.isArray(data.cats)) { data.cats.forEach(c => { if (!cat(c.id)) CATS.push(c); }); await saveCats(); }
    let n = 0; for (const it of data.items) { if (!ITEMS.find(x => x.id === it.id)) { ITEMS.push(it); await store.putItem(it); n++; } }
    render(); toast('匯入 ' + n + ' 筆');
  } catch (err) { toast('匯入失敗:' + err.message); }
}

/* ---------- 從分享或捷徑帶進來(?url= / ?text= / ?title=) ---------- */
/* 捷徑抓來的 IG 說明(og:description):解開 HTML 編碼、去掉「N 個讚 - 帳號 於 日期:」前綴 */
function cleanShared(t) {
  if (!t) return '';
  const ta = document.createElement('textarea'); ta.innerHTML = t; t = ta.value;
  t = t.replace(/^[^\n]{0,160}?(likes?|個讚|comments?|則留言)[^\n]{0,160}?[:：]\s*["“「]/i, '').replace(/["”」]\s*\.?\s*$/, '');
  return t.trim();
}
function decodeHtml(x) { const ta = document.createElement('textarea'); ta.innerHTML = x; return ta.value; }
function captionFromHtml(h) {
  const metas = h.match(/<meta\b[^>]*>/gi) || [];
  const attr = (tag, n) => { const m = tag.match(new RegExp(n + '\\s*=\\s*"([^"]*)"', 'i')) || tag.match(new RegExp(n + "\\s*=\\s*'([^']*)'", 'i')); return m ? m[1] : ''; };
  for (const key of ['og:description', 'twitter:description', 'description']) {
    const tag = metas.find(m => (attr(m, 'property') || attr(m, 'name')).toLowerCase() === key);
    if (tag && attr(tag, 'content')) return decodeHtml(attr(tag, 'content'));
  }
  const j = h.match(/"caption"\s*:\s*\{[^{}]*?"text"\s*:\s*("(?:[^"\\]|\\.)*")/) || h.match(/"edge_media_to_caption"[\s\S]*?"text"\s*:\s*("(?:[^"\\]|\\.)*")/);
  if (j) { try { return JSON.parse(j[1]); } catch (e) {} }
  const c = h.match(/class="Caption"[^>]*>([\s\S]*?)<div class="CaptionComments/);
  if (c) return decodeHtml(c[1].replace(/<br\s*\/?>/gi, '\n').replace(/<a[^>]*class="CaptionUsername"[^>]*>[\s\S]*?<\/a>/, '').replace(/<[^>]+>/g, '')).trim();
  return '';
}
function incoming(search) {
  const p = new URLSearchParams(search == null ? location.search : search);
  let pu = p.get('url') || '', pt = p.get('text') || '';
  /* 捷徑裡兩個變數放反也沒關係:哪個是連結就當連結 */
  if (pu && !/^https?:\/\//i.test(pu.trim()) && /^https?:\/\//i.test(pt.trim())) { const t = pu; pu = pt; pt = t; }
  const text = cleanShared([p.get('title'), pt].filter(Boolean).join('\n'));
  const url = pu.trim() || firstUrl(text);
  if (!url && !text) return;
  S.autoSave = p.get('auto') === '1';
  if (search == null) history.replaceState(null, '', location.pathname);
  S.add = { url: url || '', caption: text.replace(url || '', '').trim(), images: [] };
  S.view = 'add';
  return true;
}
/* 跑完分享流程:判斷 → 自動存(auto=1 時) */
async function runShared() {
  await act('analyze', {});
  if (S.autoSave && S.view === 'confirm' && S.draft && S.draft.cat) { S.autoSave = false; await act('save', {}); }
}
/* 主畫面 App 用:讀剪貼簿(捷徑複製的網址或一般連結) */
async function pasteShared() {
  let t = '';
  /* 捷徑拷貝的是「網址」格式,readText 讀不到,所以先用 read() 找文字或網址 */
  try {
    if (navigator.clipboard.read) {
      const items = await navigator.clipboard.read();
      for (const it of items) {
        for (const ty of ['text/plain', 'text/uri-list', 'text/html']) {
          if (!it.types.includes(ty)) continue;
          let v = await (await it.getType(ty)).text();
          if (ty === 'text/html') v = (v.match(/https?:\/\/[^"'<\s]+/) || [''])[0].replace(/&amp;/g, '&');
          if (ty === 'text/uri-list') v = v.split(/\r?\n/).filter(x => x && !x.startsWith('#'))[0] || '';
          if (v && v.trim()) { t = v; break; }
        }
        if (t) break;
      }
    } else t = await navigator.clipboard.readText();
  } catch (e) {
    try { t = await navigator.clipboard.readText(); } catch (e2) { toast('沒有讀到剪貼簿,請再按一次並點「貼上」'); return; }
  }
  t = (t || '').trim(); if (!t) { toast('剪貼簿是空的'); return; }
  t = t.replace(/(instagram\.com\/(?:p|reel|reels|tv)\/[\w-]+\/)embed(?:\/captioned)?\/?/gi, '$1'); /* 嵌入頁網址換回原貼文網址 */
  /* 捷徑把「連結 + 整個網頁」拷貝過來:從網頁裡找貼文說明 */
  if (/<(meta|html|!doctype)/i.test(t)) {
    const u = firstUrl(t.split('<')[0]) || firstUrl(t) || '';
    const cap = captionFromHtml(t);
    if (!cap) { const ti = (t.match(/<title[^>]*>([^<]*)/i) || [, ''])[1].trim(); toast('IG 沒有給貼文內容' + (ti ? '(拿到的是「' + ti.slice(0, 20) + '」頁)' : '') + ',先只存連結'); }
    if (!u) { toast('剪貼簿裡沒有連結'); return; }
    S.autoSave = true; S.add = { url: normalizeUrl(u), caption: cleanShared(cap || ''), images: [] }; S.view = 'add';
    await runShared(); return;
  }
  const m = t.match(/coffee-who\.github\.io\/Collect\/?(\?\S*)/i);
  if (m) { if (incoming(m[1])) await runShared(); else toast('剪貼簿裡沒有連結'); return; }
  const u = firstUrl(t); if (!u) { toast('剪貼簿裡沒有連結'); return; }
  if (t.length < 400) setTimeout(() => toast('剪貼簿只有連結(' + t.length + ' 字),沒有網頁內容'), 600);
  else {
    /* 捷徑給的是網頁「轉成文字」的版本:去掉 IG 介面字,剩下當說明 */
    const body = t.replace(u, '').split(/\n/).map(x => x.trim()).filter(x => x && !/^(Instagram|登入|註冊|Log in|Sign up|查看更多|View more|More|讚|則留言|分享|收藏|追蹤|Follow|•)$/i.test(x)).join('\n');
    S.autoSave = true; S.add = { url: normalizeUrl(u), caption: cleanShared(body), images: [] }; S.view = 'add'; await runShared(); return;
  }
  S.autoSave = false; S.add = { url: u, caption: t.replace(u, '').trim(), images: [] }; await act('analyze', {});
}

/* ---------- 啟動 ---------- */
(async function start() {
  await store.open();
  CATS = (await store.getMeta('cats')) || defaultCats();
  const food = CATS.find(c => c.id === 'food'); const kf = food && food.fields.find(f => f.id === 'kind'); if (kf && !kf.options.includes('泰式')) kf.options.push('泰式');
  SET = Object.assign({ askWhenUnsure: false, keyMode: 'builtin', ownKey: '', gcap: 150, gphoto: true }, (await store.getMeta('settings')) || {});
  if (!SET.autoCatV) { SET.askWhenUnsure = false; SET.autoCatV = 1; await saveSet(); }
  GU = (await store.getMeta('gusage')) || null;
  ITEMS = await store.allItems();
  BK.last = (await store.getMeta('lastBackupAt')) || 0; BK.since = (await store.getMeta('savedSinceBackup')) || 0; BK.snooze = (await store.getMeta('backupSnooze')) || 0;
  if (!(await store.getMeta('samplesLoaded')) && !ITEMS.some(i => i.sample)) { try { await loadSamples(); } catch (e) {} }
  incoming();
  const fromShare = S.view === 'add' && S.add && !S.add.images.length;
  window.__clipbox = { analyze, normalizeUrl, firstUrl, embedUrl, setCats: c => { CATS = c; } };
  await applySampleGeo();
  render();
  setTimeout(geoQueue, 1500);
  if (fromShare) await runShared();
  if ('serviceWorker' in navigator && location.protocol === 'https:') { navigator.serviceWorker.register('sw.js').catch(() => {}); }
})();
})();
