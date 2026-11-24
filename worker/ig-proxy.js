/* Cloudflare Worker:替「收藏」App 讀 IG 貼文的標題、說明、封面圖
 * 用法:
 *   GET /meta?url=<IG 貼文網址>  → {title, description, image}
 *   GET /img?u=<圖片網址>        → 圖片本體(加上 CORS,讓網頁能拿來縮圖存檔)
 * 用「連結預覽爬蟲」的身分去讀,IG 會回有 og 標籤的簡化頁面,不用登入。
 */
const ALLOW_ORIGIN = 'https://coffee-who.github.io';
const UA = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

function cors(extra = {}) {
  return { 'Access-Control-Allow-Origin': ALLOW_ORIGIN, 'Access-Control-Allow-Methods': 'GET, OPTIONS', ...extra };
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: cors({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }) });
}
function decodeHtml(s) {
  return (s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d));
}
function meta(html, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const t of tags) {
    const k = (t.match(/(?:property|name)\s*=\s*"([^"]*)"/i) || [])[1];
    if (k && k.toLowerCase() === key) { const c = (t.match(/content\s*=\s*"([^"]*)"/i) || [])[1]; if (c) return decodeHtml(c); }
  }
  return '';
}
const IG_URL = /^https:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[\w-]+/i;
const IMG_HOST = /(^|\.)(cdninstagram\.com|fbcdn\.net)$/i;

export default {
  async fetch(req) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors() });
    const u = new URL(req.url);
    if (u.pathname === '/meta') {
      const target = u.searchParams.get('url') || '';
      if (!IG_URL.test(target)) return json({ error: 'bad url' }, 400);
      const clean = target.match(IG_URL)[0].replace(/^https:\/\/instagram/i, 'https://www.instagram') + '/';
      const r = await fetch(clean, { headers: { 'User-Agent': UA, 'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8' }, redirect: 'follow' });
      const html = await r.text();
      const title = meta(html, 'og:title'), description = meta(html, 'og:description'), image = meta(html, 'og:image');
      if (!description && !image) return json({ error: 'no meta', status: r.status }, 502);
      return json({ title, description, image });
    }
    if (u.pathname === '/img') {
      let t; try { t = new URL(u.searchParams.get('u') || ''); } catch (e) { return json({ error: 'bad url' }, 400); }
      if (t.protocol !== 'https:' || !IMG_HOST.test(t.hostname)) return json({ error: 'host not allowed' }, 400);
      const r = await fetch(t.toString(), { headers: { 'User-Agent': UA } });
      if (!r.ok) return json({ error: 'img ' + r.status }, 502);
      return new Response(r.body, { headers: cors({ 'Content-Type': r.headers.get('Content-Type') || 'image/jpeg', 'Cache-Control': 'public, max-age=86400' }) });
    }
    return json({ ok: true, usage: '/meta?url=<IG 貼文網址>  或  /img?u=<圖片網址>' });
  }
};
