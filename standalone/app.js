/* Standalone vanilla render + interactivity for the Yassine Lgnani site.
   Builds the whole page from the `translations` object so language switching
   (incl. Arabic RTL) and dark/light theming apply across every section. */
(function () {
  'use strict';

  var state = {
    lang: localStorage.getItem('yl-lang') || 'en',
    theme: localStorage.getItem('yl-theme') || 'dark',
  };

  // ---------- tiny DOM helpers ----------
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var attr = function (s) { return esc(s); };

  // Split a localized title into a plain head + gradient tail (last word).
  function splitTitle(text) {
    var parts = text.trim().split(' ');
    if (parts.length === 1) return { main: '', grad: text };
    return { main: parts.slice(0, -1).join(' '), grad: parts.slice(-1).join(' ') };
  }
  function titleHTML(text) {
    var s = splitTitle(text);
    return esc(s.main) + ' <span class="grad">' + esc(s.grad) + '</span>';
  }
  function head(t, opts) {
    opts = opts || {};
    return (
      '<div class="section-head reveal">' +
      (opts.eyebrow ? '<span class="eyebrow"><i class="fa-solid fa-sparkles"></i> ' + esc(opts.eyebrow) + '</span>' : '') +
      '<h2 class="section-title">' + titleHTML(opts.title) + '</h2>' +
      (opts.sub ? '<p class="section-sub">' + esc(opts.sub) + '</p>' : '') +
      '</div>'
    );
  }
  function card(icon, title, desc, delay) {
    return (
      '<article class="card glass reveal" style="transition-delay:' + delay + 'ms">' +
      '<div class="card-icon"><i class="' + icon + '"></i></div>' +
      '<h3>' + esc(title) + '</h3><p>' + esc(desc) + '</p></article>'
    );
  }

  // ---------- sections ----------
  function navbar(t) {
    var links = NAV_KEYS.map(function (k) {
      return '<li><a href="#' + k + '">' + esc(t.nav[k]) + '</a></li>';
    }).join('');
    var langButtons = LANGUAGES.map(function (l) {
      return (
        '<button data-lang="' + l.code + '" class="' + (l.code === state.lang ? 'active' : '') + '">' +
        '<strong>' + esc(l.label) + '</strong><span>' + esc(l.name) + '</span></button>'
      );
    }).join('');
    var sunMoon = state.theme === 'dark' ? 'fa-sun' : 'fa-moon';
    return (
      '<nav class="navbar" id="navbar"><div class="nav-inner">' +
      '<a href="#home" class="brand"><span class="brand-logo">YL</span>' +
      '<span class="brand-name">Yassine <span class="grad">Lgnani</span></span></a>' +
      '<ul class="nav-links">' + links + '</ul>' +
      '<div class="nav-actions">' +
      '<button class="icon-btn" id="themeBtn" aria-label="Toggle theme"><i class="fa-solid ' + sunMoon + '"></i></button>' +
      '<div class="lang-switch"><button class="icon-btn" id="langBtn" aria-label="Change language"><i class="fa-solid fa-globe"></i></button>' +
      '<div class="lang-menu glass" id="langMenu">' + langButtons + '</div></div>' +
      '<button class="icon-btn menu-toggle" id="menuBtn" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>' +
      '</div></div></nav>' +
      '<div class="mobile-menu" id="mobileMenu">' + NAV_KEYS.map(function (k) {
        return '<a href="#' + k + '" data-close>' + esc(t.nav[k]) + '</a>';
      }).join('') + '</div>'
    );
  }

  function hero(t) {
    return (
      '<section id="home" class="hero"><div class="container"><div class="hero-inner">' +
      '<span class="eyebrow reveal"><i class="fa-solid fa-bolt"></i> ' + esc(t.hero.badge) + '</span>' +
      '<h1 class="reveal">' + titleHeroHTML(t.hero.title) + '</h1>' +
      '<p class="reveal">' + esc(t.hero.subtitle) + '</p>' +
      '<div class="hero-cta reveal">' +
      '<a href="#contact" class="btn btn-primary"><i class="fa-solid fa-rocket"></i> ' + esc(t.hero.getStarted) + '</a>' +
      '<a href="' + attr(SITE.whatsapp) + '" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ' + esc(t.hero.whatsapp) + '</a>' +
      '</div>' +
      '<a href="#services" class="scroll-hint"><i class="fa-solid fa-angles-down"></i></a>' +
      '</div></div></section>'
    );
  }
  // Hero highlights the last two words in the gradient.
  function titleHeroHTML(text) {
    var parts = text.trim().split(' ');
    if (parts.length < 3) return titleHTML(text);
    return esc(parts.slice(0, -2).join(' ')) + ' <span class="grad">' + esc(parts.slice(-2).join(' ')) + '</span>';
  }

  function platforms(t) {
    var items = PLATFORMS.map(function (p, i) {
      return (
        '<a href="' + attr(p.url) + '" target="_blank" rel="noopener" class="platform glass reveal" style="transition-delay:' + (i * 60) + 'ms">' +
        '<i class="' + p.icon + '" style="color:' + p.color + '"></i><span>' + esc(p.name) + '</span></a>'
      );
    }).join('');
    return '<section id="platforms"><div class="container">' + head(t, { title: t.platforms.title, sub: t.platforms.subtitle }) +
      '<div class="platforms-grid">' + items + '</div></div></section>';
  }

  function services(t) {
    var items = t.services.items.map(function (s, i) {
      return card(SERVICE_ICONS[i], s.title, s.desc, (i % 3) * 80);
    }).join('');
    return '<section id="services"><div class="container">' +
      head(t, { eyebrow: t.nav.services, title: t.services.title, sub: t.services.subtitle }) +
      '<div class="grid grid-3">' + items + '</div></div></section>';
  }

  function offers(t) {
    var items = t.offers.items.map(function (o, i) {
      var feats = o.features.map(function (f) {
        return '<li><i class="fa-solid fa-circle-check"></i> ' + esc(f) + '</li>';
      }).join('');
      var featured = i === 2;
      var btnClass = i >= 2 ? 'btn-primary' : 'btn-ghost';
      return (
        '<article class="offer glass reveal ' + (featured ? 'featured' : '') + '" style="transition-delay:' + (i * 80) + 'ms">' +
        (featured ? '<span class="offer-badge">' + esc(t.offers.popular) + '</span>' : '') +
        '<h3>' + esc(o.title) + '</h3>' +
        '<div class="offer-price">' + esc(o.price) + '</div>' +
        '<ul class="offer-features">' + feats + '</ul>' +
        '<a href="' + attr(SITE.whatsapp) + '" target="_blank" rel="noopener" class="btn ' + btnClass + '">' + esc(o.cta) + '</a>' +
        '</article>'
      );
    }).join('');
    return '<section id="offers"><div class="container">' +
      head(t, { eyebrow: t.nav.offers, title: t.offers.title, sub: t.offers.subtitle }) +
      '<div class="offers-grid">' + items + '</div></div></section>';
  }

  function why(t) {
    var items = t.why.items.map(function (w, i) {
      return card(WHY_ICONS[i], w.title, w.desc, (i % 3) * 80);
    }).join('');
    return '<section id="about"><div class="container">' +
      head(t, { eyebrow: t.nav.about, title: t.why.title, sub: t.why.subtitle }) +
      '<div class="grid grid-3">' + items + '</div></div></section>';
  }

  function stats(t) {
    var items = t.stats.items.map(function (s, i) {
      return (
        '<div class="stat glass reveal" data-count="' + s.value + '" data-suffix="' + attr(s.suffix) + '">' +
        '<i class="' + STAT_ICONS[i] + '"></i>' +
        '<div class="stat-value">0' + esc(s.suffix) + '</div>' +
        '<div class="stat-label">' + esc(s.label) + '</div></div>'
      );
    }).join('');
    return '<section class="stats"><div class="container"><div class="stats-grid">' + items + '</div></div></section>';
  }

  function contentBranding(t) {
    var items = t.content.items.map(function (c, i) {
      return card(CONTENT_ICONS[i], c.title, c.desc, (i % 3) * 80);
    }).join('');
    return '<section><div class="container">' +
      head(t, { title: t.content.title, sub: t.content.subtitle }) +
      '<div class="grid grid-3">' + items + '</div></div></section>';
  }

  function testimonials(t) {
    var items = t.testimonials.items.map(function (tm, i) {
      return (
        '<article class="testimonial glass reveal" style="transition-delay:' + ((i % 2) * 90) + 'ms">' +
        '<i class="fa-solid fa-quote-left quote-icon"></i>' +
        '<div class="stars">★★★★★</div>' +
        '<p>' + esc(tm.text) + '</p>' +
        '<div class="testimonial-author"><span class="avatar">' + esc(tm.name.charAt(0)) + '</span>' +
        '<div><strong>' + esc(tm.name) + '</strong><span>' + esc(tm.role) + '</span></div></div></article>'
      );
    }).join('');
    return '<section><div class="container">' +
      head(t, { title: t.testimonials.title, sub: t.testimonials.subtitle }) +
      '<div class="grid grid-2">' + items + '</div></div></section>';
  }

  function showcase(t) {
    return (
      '<section><div class="container"><div class="showcase-inner">' +
      '<div class="showcase-text reveal">' +
      '<span class="eyebrow"><i class="fa-brands fa-tiktok"></i> TikTok</span>' +
      '<h2>' + titleHTML(t.showcase.title) + '</h2>' +
      '<p>' + esc(t.showcase.subtitle) + '</p>' +
      '<a href="' + attr(SITE.tiktok) + '" target="_blank" rel="noopener" class="btn btn-primary"><i class="fa-brands fa-tiktok"></i> ' + esc(t.showcase.visit) + '</a>' +
      '</div>' +
      '<div class="showcase-frame glass reveal">' +
      '<iframe title="Yassine Lgnani on TikTok" src="https://www.tiktok.com/embed/@yassine.lg1" loading="lazy" allow="encrypted-media"></iframe>' +
      '</div></div></div></section>'
    );
  }

  function finalCta(t) {
    return (
      '<section class="final-cta"><div class="container"><div class="glass reveal">' +
      '<h2>' + esc(t.finalCta.title) + '</h2>' +
      '<p>' + esc(t.finalCta.subtitle) + '</p>' +
      '<div class="hero-cta">' +
      '<a href="#contact" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> ' + esc(t.finalCta.contact) + '</a>' +
      '<a href="' + attr(SITE.whatsapp) + '" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> ' + esc(t.finalCta.whatsapp) + '</a>' +
      '</div></div></div></section>'
    );
  }

  function contact(t) {
    var cards = [
      { icon: 'fa-solid fa-envelope', label: t.contact.emailLabel, value: SITE.email, href: 'mailto:' + SITE.email, ext: false },
      { icon: 'fa-brands fa-whatsapp', label: t.contact.phoneLabel, value: SITE.whatsappPretty, href: SITE.whatsapp, ext: true },
      { icon: 'fa-brands fa-tiktok', label: t.contact.tiktokLabel, value: SITE.tiktokHandle, href: SITE.tiktok, ext: true },
    ];
    var items = cards.map(function (c, i) {
      return (
        '<a href="' + attr(c.href) + '"' + (c.ext ? ' target="_blank" rel="noopener"' : '') + ' class="contact-card glass reveal" style="transition-delay:' + (i * 80) + 'ms">' +
        '<div class="card-icon"><i class="' + c.icon + '"></i></div>' +
        '<div class="label">' + esc(c.label) + '</div><div class="value">' + esc(c.value) + '</div></a>'
      );
    }).join('');
    return '<section id="contact"><div class="container">' +
      head(t, { eyebrow: t.nav.contact, title: t.contact.title, sub: t.contact.subtitle }) +
      '<div class="contact-grid">' + items + '</div></div></section>';
  }

  function footer(t) {
    var quick = NAV_KEYS.map(function (k) {
      return '<li><a href="#' + k + '">' + esc(t.nav[k]) + '</a></li>';
    }).join('');
    var socials = [
      { icon: 'fa-brands fa-tiktok', url: SITE.tiktok, label: 'TikTok', ext: true },
      { icon: 'fa-brands fa-whatsapp', url: SITE.whatsapp, label: 'WhatsApp', ext: true },
      { icon: 'fa-solid fa-envelope', url: 'mailto:' + SITE.email, label: 'Email', ext: false },
    ].concat(PLATFORMS.filter(function (p) { return p.name !== 'TikTok'; }).map(function (p) {
      return { icon: p.icon, url: p.url, label: p.name, ext: true };
    }));
    var socialHTML = socials.map(function (s) {
      return '<a href="' + attr(s.url) + '"' + (s.ext ? ' target="_blank" rel="noopener"' : '') + ' aria-label="' + attr(s.label) + '" title="' + attr(s.label) + '"><i class="' + s.icon + '"></i></a>';
    }).join('');
    var year = new Date().getFullYear();
    return (
      '<footer class="footer"><div class="container"><div class="footer-grid">' +
      '<div class="footer-brand"><a href="#home" class="brand"><span class="brand-logo">YL</span>' +
      '<span class="brand-name">Yassine <span class="grad">Lgnani</span></span></a>' +
      '<p>' + esc(t.footer.tagline) + '</p></div>' +
      '<div><h4>' + esc(t.footer.quickLinks) + '</h4><ul>' + quick + '</ul></div>' +
      '<div><h4>' + esc(t.footer.followUs) + '</h4><div class="footer-socials">' + socialHTML + '</div></div>' +
      '</div><div class="footer-bottom">' +
      '<span>© ' + year + ' Yassine Lgnani. ' + esc(t.footer.rights) + '</span>' +
      '<span class="dev"><i class="fa-solid fa-code"></i> <span class="grad">' + esc(t.footer.developedBy) + '</span></span>' +
      '</div></div></footer>'
    );
  }

  // ---------- render ----------
  function render() {
    var t = translations[state.lang];
    var html =
      navbar(t) +
      '<main>' +
      hero(t) + services(t) + offers(t) + platforms(t) + stats(t) +
      why(t) + contentBranding(t) + testimonials(t) + showcase(t) + finalCta(t) + contact(t) +
      '</main>' +
      footer(t) +
      '<a href="' + attr(SITE.whatsapp) + '" target="_blank" rel="noopener" class="wa-float" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>';
    document.getElementById('app').innerHTML = html;
    document.getElementById('loaderText').textContent = t.loading + '…';
    wire();
    observeReveal();
    observeCounters();
  }

  // ---------- interactivity ----------
  function wire() {
    var navbarEl = document.getElementById('navbar');
    var onScroll = function () {
      if (window.scrollY > 30) navbarEl.classList.add('scrolled');
      else navbarEl.classList.remove('scrolled');
    };
    onScroll();
    window.removeEventListener('scroll', window.__ylScroll || function () {});
    window.__ylScroll = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });

    document.getElementById('themeBtn').addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('yl-theme', state.theme);
      applyTheme();
      var icon = this.querySelector('i');
      icon.className = 'fa-solid ' + (state.theme === 'dark' ? 'fa-sun' : 'fa-moon');
    });

    var langMenu = document.getElementById('langMenu');
    document.getElementById('langBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    document.addEventListener('click', function () { langMenu.classList.remove('open'); });
    langMenu.querySelectorAll('button[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.lang = b.getAttribute('data-lang');
        localStorage.setItem('yl-lang', state.lang);
        applyLang();
        render();
      });
    });

    var mobileMenu = document.getElementById('mobileMenu');
    var menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuBtn.querySelector('i').className = 'fa-solid ' + (open ? 'fa-xmark' : 'fa-bars');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a[data-close]').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.querySelector('i').className = 'fa-solid fa-bars';
        document.body.style.overflow = '';
      });
    });
  }

  function observeReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (n) { io.observe(n); });
  }

  function observeCounters() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var valEl = el.querySelector('.stat-value');
        var start = performance.now();
        var dur = 1800;
        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          valEl.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat[data-count]').forEach(function (n) { io.observe(n); });
  }

  function applyTheme() { document.documentElement.setAttribute('data-theme', state.theme); }
  function applyLang() {
    var l = LANGUAGES.filter(function (x) { return x.code === state.lang; })[0] || LANGUAGES[0];
    document.documentElement.lang = state.lang;
    document.documentElement.dir = l.dir;
  }

  // ---------- boot ----------
  applyTheme();
  applyLang();
  render();
  window.addEventListener('load', function () {
    setTimeout(function () { document.getElementById('loader').classList.add('hide'); }, 700);
  });
  // Fallback in case load already fired.
  setTimeout(function () { document.getElementById('loader').classList.add('hide'); }, 2000);
})();
