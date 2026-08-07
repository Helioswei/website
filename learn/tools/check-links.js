#!/usr/bin/env node
/* 全站链接检查：静态 href/src + SITE_NAV 生成的导航链接 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
global.window = globalThis;
require(path.join(root, 'site-nav.js'));
const SITE_NAV = window.SITE_NAV;

function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    if (['.git', 'node_modules', 'docs', 'tools'].includes(f)) continue;
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
}
const files = [];
walk(root, files);
let errors = 0;
const fail = (file, href) => { console.log('BROKEN: ' + path.relative(root, file) + ' -> ' + href); errors++; };

/* 1) 静态链接 */
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const hrefs = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m => m[1])
    .filter(h => h && !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('//'));
  for (const h of hrefs) {
    const target = path.resolve(dir, decodeURIComponent(h));
    if (!fs.existsSync(target)) fail(file, h);
  }
}

/* 2) SITE_NAV 导航 + TOC + 底部导航链接（按页面 data-* 推导，与 script.js 逻辑一致） */
function pad(n) { return (n < 10 ? '0' : '') + n; }
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const track = /data-track="([^"]+)"/.exec(html);
  const dataRoot = /data-root="([^"]+)"/.exec(html);
  if (!dataRoot) continue;
  const rootPath = dataRoot[1];
  const trackId = track ? track[1] : null;
  const links = [rootPath + 'index.html']; /* 顶栏 首页 */
  SITE_NAV.tracks.forEach(tk => links.push(rootPath + tk.id + '/index.html')); /* 顶栏各技术线 */
  if (trackId) {
    const t = SITE_NAV.tracks.find(x => x.id === trackId);
    if (!t) { fail(file, '[unknown track ' + trackId + ']'); }
    else {
      /* 目录页 TOC + 章节页底部上一/下一章（均指向本线 chapterNN.html） */
      t.parts.forEach(p => p.chapters.forEach(c => links.push(rootPath + trackId + '/chapter' + pad(c.num) + '.html')));
    }
  }
  for (const l of links) {
    const target = path.resolve(dir, decodeURIComponent(l));
    if (!fs.existsSync(target)) fail(file, l);
  }
}

if (errors) { console.log('FAIL: ' + errors + ' broken link(s)'); process.exit(1); }
console.log('OK: all links resolve');
