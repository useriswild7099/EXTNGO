(function () {
  'use strict';

  var SECTION_ID = 'extngo-story-v4';
  var FRAME_PATH = './frames/png/frame_';
  var TOTAL = 1800;

  function init() {
    if (!document.body) {
      setTimeout(init, 50);
      return;
    }

    // ========== Inject CSS ==========
    if (!document.getElementById('extngo-story-styles')) {
      var style = document.createElement('style');
      style.id = 'extngo-story-styles';
      style.textContent = [
        '#' + SECTION_ID + '{position:relative;height:800vh;background:#050505;z-index:999999!important;display:block!important;visibility:visible!important;min-height:800vh!important;margin:0!important;padding:0!important;clear:both!important;overflow:visible!important}',
        '.extngo-sw{position:sticky;top:0;width:100%;height:100vh;overflow:hidden;z-index:999999;background:#050505}',
        '.extngo-sw canvas{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:1}',
        '.extngo-tb{position:absolute;top:0;left:0;width:100%;height:100%;display:none;align-items:center;padding:0 clamp(24px,5vw,120px);opacity:0;will-change:opacity,transform;pointer-events:none;z-index:10}',
        '.extngo-tb.al{justify-content:flex-start}',
        '.extngo-tb.ar{justify-content:flex-end}',
        '.extngo-tb.ac{justify-content:center;text-align:center}',
        '.extngo-ti{max-width:min(520px,45vw);position:relative}',
        '.extngo-tb.ac .extngo-ti{max-width:min(780px,70vw)}',
        '.extngo-tb.ar .extngo-ti{text-align:right}',
        '.extngo-h{font-family:LayGrotesk-Semibold,sans-serif;font-weight:400;color:#cfd9e0;margin:0;line-height:.96;letter-spacing:-.015em;text-shadow:0 0 60px rgba(207,217,224,.06)}',
        '.extngo-h.xl{font-size:clamp(36px,7vw,110px)}',
        '.extngo-h.lg{font-size:clamp(28px,5vw,72px)}',
        '.extngo-h.md{font-size:clamp(22px,3.5vw,52px)}',
        '.extngo-sub{font-family:LayGrotesk-Semibold,sans-serif;font-weight:400;color:rgba(207,217,224,.5);font-size:clamp(14px,1.6vw,24px);line-height:1.4;margin-top:clamp(12px,2vw,28px);max-width:min(420px,35vw)}',
        '.extngo-tb.ac .extngo-sub{margin-left:auto;margin-right:auto;max-width:min(520px,50vw)}',
        '.extngo-tb.ar .extngo-sub{margin-left:auto}',
        '.extngo-mono{font-family:AkkuratMono,sans-serif;text-transform:uppercase;letter-spacing:.02em;font-size:clamp(9px,1vw,15px);color:rgba(207,217,224,.35);margin-bottom:clamp(8px,1.2vw,18px);display:block}',
        '.extngo-btn{pointer-events:auto;display:inline-flex;align-items:center;gap:10px;padding:clamp(14px,2vw,22px) clamp(24px,3.5vw,40px);background:#080808;color:#e6efe9;border:1px solid rgba(207,217,224,.15);border-radius:36px;font-family:AkkuratMono,sans-serif;font-size:clamp(10px,1vw,14px);text-transform:uppercase;letter-spacing:.02em;cursor:pointer;text-decoration:none;transition:background .4s,border-color .4s}',
        '.extngo-btn:hover{background:rgba(207,217,224,.08);border-color:rgba(207,217,224,.3)}',
        '@media(max-width:768px){.extngo-ti{max-width:85vw!important}.extngo-tb.ar{justify-content:flex-start}.extngo-tb.ar .extngo-ti{text-align:left}.extngo-tb.ar .extngo-sub{margin-left:0}}'
      ].join('\n');
      document.head.appendChild(style);
    }

    // ========== Text overlay data ==========
    var textData = [
      { s: 0, p: 0.05, e: 0.10, align: 'ac', label: 'Since 2017 — Trusted by IT Professionals', title: 'Connect<br>Without Limits', titleClass: 'xl', sub: 'The world\'s first retractable flat ethernet cable reel.' },
      { s: 0.10, p: 0.16, e: 0.22, align: 'al', label: 'The Problem', title: 'Tangled cables.<br>Trip hazards.<br>Unreliable drops.', titleClass: 'lg', sub: 'For decades, field connectivity meant compromise. Limited reach, fragile connectors, cable management nightmares.' },
      { s: 0.22, p: 0.28, e: 0.34, align: 'ar', label: 'The Solution', title: '50ft CAT6.<br>Zero Tangles.', titleClass: 'lg', sub: 'Retractable flat cable that deploys in seconds, disappears underfoot, and delivers gigabit speed — anywhere.' },
      { s: 0.34, p: 0.40, e: 0.46, align: 'al', label: 'Cascadable Power', title: 'Daisy-chain<br>Connectivity.', titleClass: 'lg', sub: 'Stack and snap. Our unique cascadable mechanism allows you to extend your reach without adding clutter.' },
      { s: 0.46, p: 0.52, e: 0.58, align: 'ar', label: 'Industrial Strength', title: 'Truck-pass rated.<br>Field proven.', titleClass: 'lg', sub: 'Encased in high-impact polymers, EXTNGO handles the weight of a truck and the grit of a construction site.' },
      { s: 0.58, p: 0.64, e: 0.70, align: 'ac', label: 'The Platform', title: 'Flat. Portable.<br>Retractable.', titleClass: 'md', sub: 'A single platform for all your networking needs. From office desks to industrial wind turbines.' },
      { s: 0.70, p: 0.85, e: 1.0, align: 'ac', label: 'Ready to Deploy', title: 'Deploy. Retract.<br>Repeat.', titleClass: 'md', sub: 'Available now on Amazon. 3-year warranty included.', cta: true }
    ];

    // ========== Build DOM ==========
    var engine = document.createElement('div');
    engine.id = SECTION_ID;

    function log(msg) {
      console.log('[EXTNGO] ' + msg);
    }

    var sticky = document.createElement('div');
    sticky.className = 'extngo-sw';

    var canvas = document.createElement('canvas');
    canvas.id = 'extngo-cvs';
    sticky.appendChild(canvas);

    textData.forEach(function (d) {
      var block = document.createElement('div');
      block.className = 'extngo-tb ' + d.align;
      block.setAttribute('data-s', d.s);
      block.setAttribute('data-p', d.p);
      block.setAttribute('data-e', d.e);

      var inner = document.createElement('div');
      inner.className = 'extngo-ti';

      var mono = document.createElement('span');
      mono.className = 'extngo-mono';
      mono.textContent = d.label;
      inner.appendChild(mono);

      var h2 = document.createElement('h2');
      h2.className = 'extngo-h ' + d.titleClass;
      h2.innerHTML = d.title;
      inner.appendChild(h2);

      if (d.sub) {
        var p = document.createElement('p');
        p.className = 'extngo-sub';
        p.textContent = d.sub;
        inner.appendChild(p);
      }

      if (d.cta) {
        var wrap = document.createElement('div');
        wrap.style.marginTop = '24px';
        var a = document.createElement('a');
        a.className = 'extngo-btn';
        a.href = 'https://www.amazon.com/dp/B01LVZ3UI6';
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = '<span>Shop on Amazon</span>';
        wrap.appendChild(a);
        inner.appendChild(wrap);
      }

      block.appendChild(inner);
      sticky.appendChild(block);
    });

    engine.appendChild(sticky);

    // ========== Injection Logic ==========
    function injectEngine() {
      var existing = document.getElementById(SECTION_ID);
      
      var timeline = document.querySelector('[class*="Timeline_wrapper"]') || document.querySelector('.Timeline_inner__XaZJy');
      var advantage = document.querySelector('[class*="AdvantageSection_wrapper"]');
      var main = document.querySelector('main') || document.body;

      if (!existing) {
        if (timeline) {
          timeline.parentNode.insertBefore(engine, timeline);
          log('Injected before Timeline');
        } else if (advantage) {
          advantage.parentNode.insertBefore(engine, advantage.nextSibling);
          log('Injected after Advantage');
        } else {
          main.appendChild(engine);
          log('Injected into Main/Body');
        }
        updateMetrics();
        obs.observe(engine);
      } else {
        existing.style.setProperty('display', 'block', 'important');
        existing.style.setProperty('visibility', 'visible', 'important');
        existing.style.setProperty('z-index', '999999', 'important');
        
        var p = existing.parentElement;
        while(p && p !== document.body) {
          if (getComputedStyle(p).display === 'none') {
            p.style.setProperty('display', 'block', 'important');
            log('Forced parent visible: ' + p.className);
          }
          p = p.parentElement;
        }
      }
    }

    // ========== Canvas & Scroll ==========
    var ctx = canvas.getContext('2d', { alpha: false }); 
    var imgs = [];
    var loaded = 0;
    var ready = false;
    var tbs = engine.querySelectorAll('.extngo-tb');
    var isInView = false;
    var engineHeight = 0;

    function updateMetrics() {
      engineHeight = engine.offsetHeight - window.innerHeight;
      if (engineHeight <= 0) engineHeight = 800 * window.innerHeight;
    }
    window.addEventListener('resize', updateMetrics);

    function pad(n) {
      if (n < 10) return '000' + n;
      if (n < 100) return '00' + n;
      if (n < 1000) return '0' + n;
      return '' + n;
    }

    var queue = [];
    for (var i = 1; i <= TOTAL; i += 5) queue.push(i);
    for (var i = 1; i <= TOTAL; i++) { if (queue.indexOf(i) === -1) queue.push(i); }

    var qi = 0;
    var concurrent = 0;
    function loadNext() {
      while (concurrent < 12 && qi < queue.length) {
        concurrent++;
        (function (idx) {
          var img = new Image();
          img.onload = function () {
            imgs[idx] = img;
            loaded++;
            concurrent--;
            if (!ready) { ready = true; initCanvas(); }
            loadNext();
          };
          img.onerror = function () { concurrent--; loadNext(); };
          img.src = FRAME_PATH + pad(idx) + '.png';
        })(queue[qi]);
        qi++;
      }
    }

    function initCanvas() {
      var first;
      for (var k in imgs) { if (imgs[k]) { first = imgs[k]; break; } }
      if (!first) return;
      canvas.width = first.naturalWidth;
      canvas.height = first.naturalHeight;
      log('Canvas Ready');
      draw(1);
    }

    function draw(idx) {
      var img = imgs[idx];
      if (!img) {
        for (var d = 1; d < 100; d++) {
          if (imgs[idx - d]) { img = imgs[idx - d]; break; }
          if (imgs[idx + d]) { img = imgs[idx + d]; break; }
        }
      }
      if (img && ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    function tick() {
      if (!isInView) return;
      var rect = engine.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, -rect.top / engineHeight));
      
      if (ready) {
        var fi = Math.max(1, Math.min(TOTAL, Math.round(p * (TOTAL - 1)) + 1));
        draw(fi);
      }

      tbs.forEach(function (tb) {
        var s = parseFloat(tb.getAttribute('data-s')), pk = parseFloat(tb.getAttribute('data-p')), e = parseFloat(tb.getAttribute('data-e'));
        var op = 0, ty = 0;
        if (p >= s && p <= e) {
          if (p <= pk) { var t = (p - s) / (pk - s); op = t; ty = 20 * (1 - t); }
          else { var t = (p - pk) / (e - pk); op = 1 - t; ty = -20 * t; }
        }
        tb.style.display = op > 0.01 ? 'flex' : 'none';
        tb.style.opacity = op;
        tb.style.transform = 'translate3d(0, ' + ty + 'px, 0)';
      });
      requestAnimationFrame(tick);
    }

    var obs = new IntersectionObserver(function(entries) {
      isInView = entries[0].isIntersecting;
      if (isInView) requestAnimationFrame(tick);
    }, { threshold: 0 });

    loadNext();
    setInterval(injectEngine, 1000);
    injectEngine();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
