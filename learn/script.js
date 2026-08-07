/* Helios 技术教程 · 导航渲染（依赖 site-nav.js 先加载） */

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

/* 顶栏：品牌 + 首页 + 各技术线（直接链接到目录页） */
function renderTopNav(root) {
  var inner = document.getElementById('nav-inner');
  if (!inner) return;
  var trackId = document.body.getAttribute('data-track');
  var html = '<span class="brand">' + SITE_NAV.siteName + '</span>';
  html += '<a href="' + root + 'index.html"' + (trackId ? '' : ' class="active"') + '>' + SITE_NAV.homeLabel + '</a>';
  SITE_NAV.tracks.forEach(function (track) {
    var isActive = (trackId === track.id);
    html += '<a href="' + root + track.id + '/index.html"' + (isActive ? ' class="active"' : '') + '>' + track.name + '</a>';
  });
  inner.innerHTML = html;
}

/* 底部导航：上一章 / 目录 / 下一章（自动由 SITE_NAV 推导） */
function renderBottomNav(root) {
  var el = document.getElementById('bottom-nav');
  if (!el) return;
  var trackId = document.body.getAttribute('data-track');
  if (!trackId) return;
  var track = SITE_NAV.tracks.find(function (t) { return t.id === trackId; });
  if (!track) return;
  var flat = [];
  track.parts.forEach(function (p) { p.chapters.forEach(function (c) { flat.push(c); }); });
  var idx = flat.findIndex(function (c) { return c.num === parseInt(document.body.getAttribute('data-chapter'), 10); });
  var prev = (idx > 0) ? flat[idx - 1] : null;
  var next = (idx >= 0 && idx < flat.length - 1) ? flat[idx + 1] : null;
  var html = '';
  html += prev ? '<a class="prev" href="' + root + trackId + '/chapter' + pad(prev.num) + '.html">« 上一章</a>' : '<span class="placeholder"></span>';
  html += '<a class="toc" href="' + root + trackId + '/index.html">目录</a>';
  html += next ? '<a class="next" href="' + root + trackId + '/chapter' + pad(next.num) + '.html">下一章 »</a>' : '<span class="placeholder"></span>';
  el.innerHTML = html;
}

/* 目录页 TOC：分部 → 章节（含导师标注） */
function renderTOC(root) {
  var el = document.getElementById('toc');
  if (!el) return;
  var trackId = document.body.getAttribute('data-track');
  if (!trackId) return;
  var track = SITE_NAV.tracks.find(function (t) { return t.id === trackId; });
  if (!track) return;
  var html = '';
  track.parts.forEach(function (part) {
    html += '<div class="toc-part"><h2>' + part.title + '</h2><ul class="toc-list">';
    part.chapters.forEach(function (ch) {
      var emoji = MENTORS[ch.mentor] || '📘';
      html += '<li><a href="chapter' + pad(ch.num) + '.html"><span class="chapter-num">' + pad(ch.num) + '</span>' +
        ch.title + ' <small>' + emoji + ' ' + ch.mentor + '</small></a></li>';
    });
    html += '</ul></div>';
  });
  el.innerHTML = html;
}

/* 代码复制按钮 */
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = (code || pre).textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '已复制';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
      });
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var root = document.body.getAttribute('data-root') || './';
  renderTopNav(root);
  renderBottomNav(root);
  renderTOC(root);
  initCopyButtons();
});
