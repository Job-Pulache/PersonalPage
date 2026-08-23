/* ════════════════════════════════════════════════════
   JOB PULACHE CARREÑO — PERFIL PROFESIONAL — JS
   100% funcional en el navegador (sin backend): todo el
   estado interactivo se guarda en localStorage/sessionStorage.
════════════════════════════════════════════════════ */

/* ───────── TOASTS ───────── */
const toastStack = document.getElementById('toastStack');
function showToast(message) {
  if (!toastStack) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  toastStack.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

/* ───────── THEME ───────── */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('jpc_theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('jpc_theme', next);
});

/* ───────── SCROLL PROGRESS ───────── */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ───────── NAV SHADOW ───────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.boxShadow = window.scrollY > 40 ? '0 2px 14px rgba(0,0,0,.12)' : 'none';
}, { passive: true });

/* ───────── DROPDOWNS (nav profile + more menu) ───────── */
function setupDropdown(wrapperEl, btnEl) {
  if (!wrapperEl || !btnEl) return;
  btnEl.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !wrapperEl.classList.contains('open');
    document.querySelectorAll('.nav-profile.open,.more-menu.open').forEach(el => el.classList.remove('open'));
    if (willOpen) wrapperEl.classList.add('open');
  });
}
setupDropdown(document.getElementById('navProfile'), document.getElementById('navAvatarBtn'));
setupDropdown(document.querySelector('.more-menu'), document.getElementById('moreBtn'));
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-profile.open,.more-menu.open').forEach(el => el.classList.remove('open'));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.nav-profile.open,.more-menu.open,.reaction-wrap.open').forEach(el => el.classList.remove('open'));
});

/* ───────── MOBILE MENU ───────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const tabMenuBtn = document.getElementById('tabMenuBtn');
function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
}
hamburger.addEventListener('click', toggleMobileMenu);
if (tabMenuBtn) tabMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenu.querySelectorAll('.mm-link').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); hamburger.classList.remove('active');
}));

/* ───────── ACTIVE SECTION HIGHLIGHT (nav + tab bar) ───────── */
const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
const navItems = document.querySelectorAll('.nav-item[data-target]');
const tabItems = document.querySelectorAll('.tab-item[data-target]');
const setActive = (id) => {
  navItems.forEach(el => el.classList.toggle('active', el.dataset.target === id));
  tabItems.forEach(el => el.classList.toggle('active', el.dataset.target === id));
};
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(sec => sectionObserver.observe(sec));

/* ───────── REVEAL ON SCROLL ───────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12 });
function observeReveal(el) {
  el.classList.add('reveal');
  revealObserver.observe(el);
}
document.querySelectorAll('.card, .post-card, .exp-item, .interest-item').forEach(observeReveal);

/* ───────── RINGS + COMMIT BARS (animate once visible) ───────── */
function animateRing(el) {
  const target = parseInt(el.dataset.target, 10);
  const circle = el.querySelector('.ring-fill');
  if (!circle) return;
  const pct = Math.min(target / 12, 1);
  const circumference = 100.5;
  circle.style.strokeDashoffset = circumference - circumference * pct;
}
document.querySelectorAll('.commit-fill').forEach(bar => { bar.style.width = '0%'; });
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.mini-ring').forEach(animateRing);
    entry.target.querySelectorAll('.commit-fill').forEach(bar => { bar.style.width = bar.dataset.w + '%'; });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });
const statsCard = document.querySelector('.stats-card');
if (statsCard) statsObserver.observe(statsCard);

/* ───────── PROFILE VIEWS ───────── */
(function profileViews() {
  const el = document.getElementById('profileViews');
  if (!el) return;
  let count = parseInt(localStorage.getItem('jpc_views') || '0', 10);
  if (!count) count = 238;
  if (!sessionStorage.getItem('jpc_visited')) {
    count += 1;
    sessionStorage.setItem('jpc_visited', '1');
    localStorage.setItem('jpc_views', String(count));
  }
  el.textContent = count.toLocaleString('es-PE');
})();

/* ───────── CONNECT BUTTON ───────── */
const connectBtn = document.getElementById('connectBtn');
if (connectBtn) {
  if (localStorage.getItem('jpc_connected') === '1') {
    connectBtn.textContent = '✓ Solicitud enviada';
    connectBtn.disabled = true;
    connectBtn.classList.add('btn-outline');
    connectBtn.classList.remove('btn-primary');
  }
  connectBtn.addEventListener('click', () => {
    connectBtn.textContent = '✓ Solicitud enviada';
    connectBtn.disabled = true;
    connectBtn.classList.add('btn-outline');
    connectBtn.classList.remove('btn-primary');
    localStorage.setItem('jpc_connected', '1');
    showToast('Solicitud de conexión enviada a Job 👋');
  });
}

/* ───────── SHARE PROFILE (more menu) ───────── */
const shareProfileBtn = document.getElementById('shareProfileBtn');
if (shareProfileBtn) {
  shareProfileBtn.addEventListener('click', async () => {
    const url = window.location.href.split('#')[0];
    if (navigator.share) {
      try { await navigator.share({ title: 'Job Pulache Carreño', url }); return; } catch (e) { /* cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Enlace del perfil copiado ✓');
    } catch (e) {
      showToast('No se pudo copiar el enlace');
    }
  });
}

/* ───────── ENDORSEMENTS (skills) ───────── */
const endorsements = JSON.parse(localStorage.getItem('jpc_endorsements') || '{}');
document.querySelectorAll('#endorseList li').forEach(li => {
  const skill = li.dataset.skill;
  const base = parseInt(li.dataset.base, 10);
  const countEl = li.querySelector('.endorse-count');
  const btn = li.querySelector('.endorse-btn');
  if (endorsements[skill]) {
    countEl.textContent = base + 1;
    btn.textContent = '✓ Validado';
    btn.classList.add('done');
  }
  btn.addEventListener('click', () => {
    if (endorsements[skill]) return;
    endorsements[skill] = true;
    localStorage.setItem('jpc_endorsements', JSON.stringify(endorsements));
    countEl.textContent = base + 1;
    btn.textContent = '✓ Validado';
    btn.classList.add('done');
    btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
    showToast(`Validaste "${skill}"`);
  });
});

/* ───────── FOLLOW BUTTONS (interests) ───────── */
const follows = JSON.parse(localStorage.getItem('jpc_follows') || '{}');
document.querySelectorAll('.follow-btn').forEach((btn, i) => {
  const key = 'interest_' + i;
  if (follows[key]) { btn.textContent = '✓ Siguiendo'; btn.classList.add('done'); }
  btn.addEventListener('click', () => {
    const following = btn.classList.contains('done');
    if (following) {
      btn.textContent = '+ Seguir';
      btn.classList.remove('done');
      delete follows[key];
    } else {
      btn.textContent = '✓ Siguiendo';
      btn.classList.add('done');
      follows[key] = true;
    }
    localStorage.setItem('jpc_follows', JSON.stringify(follows));
  });
});

/* ═══════════════════════════════════════════
   REACCIONES (estilo LinkedIn + Facebook)
═══════════════════════════════════════════ */
const REACTION_EMOJI = { like: '👍', love: '❤️', insight: '💡', support: '👏', celebrate: '🎉' };
const REACTION_LABEL = { like: 'Me gusta', love: 'Me encanta', insight: 'Interesante', support: 'Apoyo', celebrate: 'Celebrar' };
const postReactions = JSON.parse(localStorage.getItem('jpc_post_reactions') || '{}');

function renderReaction(footer) {
  const postId = footer.dataset.post;
  const base = parseInt(footer.dataset.baseReactions, 10) || 0;
  const wrap = footer.querySelector('.reaction-wrap');
  const mainBtn = wrap.querySelector('.react-main');
  const emojiEl = mainBtn.querySelector('.react-emoji');
  const labelEl = mainBtn.querySelector('.react-label');
  const totalEl = wrap.querySelector('.reaction-total');
  const current = postReactions[postId];
  const total = base + (current ? 1 : 0);
  totalEl.textContent = total + ' reacciones';
  if (current) {
    emojiEl.textContent = REACTION_EMOJI[current];
    labelEl.textContent = REACTION_LABEL[current];
    mainBtn.classList.add('reacted');
  } else {
    emojiEl.textContent = '👍';
    labelEl.textContent = 'Reaccionar';
    mainBtn.classList.remove('reacted');
  }
}

function setupReactions(footer) {
  const postId = footer.dataset.post;
  const wrap = footer.querySelector('.reaction-wrap');
  const mainBtn = wrap.querySelector('.react-main');
  const picker = wrap.querySelector('.reaction-picker');

  renderReaction(footer);

  mainBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (postReactions[postId]) {
      delete postReactions[postId];
      localStorage.setItem('jpc_post_reactions', JSON.stringify(postReactions));
      renderReaction(footer);
      wrap.classList.remove('open');
    } else {
      wrap.classList.toggle('open');
    }
  });

  picker.querySelectorAll('button').forEach(emoBtn => {
    emoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      postReactions[postId] = emoBtn.dataset.emo;
      localStorage.setItem('jpc_post_reactions', JSON.stringify(postReactions));
      renderReaction(footer);
      wrap.classList.remove('open');
      mainBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 300 });
    });
  });

  document.addEventListener('click', () => wrap.classList.remove('open'));
}

/* ───────── COMENTARIOS ───────── */
const postComments = JSON.parse(localStorage.getItem('jpc_comments') || '{}');

function initials(name) {
  return (name || 'V').trim().charAt(0).toUpperCase();
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderComments(postId) {
  const list = document.getElementById('comments-list-' + postId);
  if (!list) return;
  const comments = postComments[postId] || [];
  if (!comments.length) {
    list.innerHTML = '<p class="comments-empty">Sé el primero en comentar este proyecto.</p>';
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment-row">
      <div class="comment-avatar">${initials(c.name)}</div>
      <div class="comment-bubble">
        <strong>${escapeHtml(c.name || 'Visitante')}</strong>
        ${escapeHtml(c.text)}
        <span class="comment-time">${c.time}</span>
      </div>
    </div>`).join('');
}

function setupComments(footer, panel) {
  const postId = footer.dataset.post;
  const baseCount = parseInt(footer.dataset.baseComments, 10) || 0;
  const cmtBtn = footer.querySelector('.cmt-btn');
  const cmtCountEl = cmtBtn.querySelector('.cmt-count');
  const form = panel.querySelector('.comment-form');

  function updateCount() {
    const extra = (postComments[postId] || []).length;
    cmtCountEl.textContent = baseCount + extra;
  }
  updateCount();
  renderComments(postId);

  cmtBtn.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    cmtBtn.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) panel.querySelector('.comment-text')?.focus({ preventScroll: true });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('.comment-name');
    const textInput = form.querySelector('.comment-text');
    const text = textInput.value.trim();
    if (!text) return;
    if (!postComments[postId]) postComments[postId] = [];
    postComments[postId].push({ name: nameInput.value.trim(), text, time: 'ahora' });
    localStorage.setItem('jpc_comments', JSON.stringify(postComments));
    renderComments(postId);
    updateCount();
    textInput.value = '';
    showToast('Comentario publicado');
  });
}

function setupShare(footer) {
  const btn = footer.querySelector('.share-btn');
  btn.addEventListener('click', async () => {
    const url = window.location.href.split('#')[0] + '#projects';
    if (navigator.share) {
      try { await navigator.share({ title: 'Proyecto de Job Pulache Carreño', url }); return; } catch (e) { /* cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Enlace del proyecto copiado ✓');
    } catch (e) {
      showToast('No se pudo copiar el enlace');
    }
  });
}

function initPostInteractions(footer) {
  const panel = footer.nextElementSibling;
  setupReactions(footer);
  if (panel && panel.classList.contains('comments-panel')) setupComments(footer, panel);
  setupShare(footer);
}
document.querySelectorAll('.post-actions').forEach(initPostInteractions);

/* ═══════════════════════════════════════════
   COMPOSER — libreta de visitas (guestbook)
═══════════════════════════════════════════ */
const composerOpen = document.getElementById('composerOpen');
const composerForm = document.getElementById('composerForm');
const composerCancel = document.getElementById('composerCancel');
const composerName = document.getElementById('composerName');
const composerText = document.getElementById('composerText');
const guestbookFeed = document.getElementById('guestbookFeed');

if (composerOpen && composerForm) {
  composerOpen.addEventListener('click', () => {
    composerForm.hidden = false;
    composerOpen.parentElement.hidden = true;
    composerText.focus();
  });
  composerCancel.addEventListener('click', () => {
    composerForm.hidden = true;
    composerOpen.parentElement.hidden = false;
    composerForm.reset();
  });
  composerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = composerText.value.trim();
    if (!text) return;
    const entry = { id: Date.now(), name: composerName.value.trim(), text, time: 'justo ahora' };
    const guestbook = JSON.parse(localStorage.getItem('jpc_guestbook') || '[]');
    guestbook.unshift(entry);
    localStorage.setItem('jpc_guestbook', JSON.stringify(guestbook));
    renderGuestbookEntry(entry, true);
    composerForm.reset();
    composerForm.hidden = true;
    composerOpen.parentElement.hidden = false;
    showToast('Tu nota se publicó en este navegador ✓');
  });
}

function renderGuestbookEntry(entry, prepend) {
  const postId = 'guest-' + entry.id;
  const article = document.createElement('article');
  article.className = 'post-card guest-post';
  article.dataset.tags = 'nota visitante';
  article.innerHTML = `
    <header class="post-head">
      <div class="post-avatar-fallback">${initials(entry.name)}</div>
      <div>
        <strong>${escapeHtml(entry.name || 'Visitante')}</strong>
        <span>dejó una nota · <em>${escapeHtml(entry.time)}</em></span>
      </div>
    </header>
    <p class="post-text">${escapeHtml(entry.text)}</p>
    <footer class="post-actions" data-post="${postId}" data-base-reactions="0" data-base-comments="0">
      <div class="reaction-wrap">
        <button class="react-main" aria-haspopup="true"><span class="react-emoji">👍</span><span class="react-label">Reaccionar</span></button>
        <div class="reaction-picker" role="menu">
          <button data-emo="like" title="Me gusta">👍</button>
          <button data-emo="love" title="Me encanta">❤️</button>
          <button data-emo="insight" title="Interesante">💡</button>
          <button data-emo="support" title="Apoyo">👏</button>
          <button data-emo="celebrate" title="Celebrar">🎉</button>
        </div>
        <span class="reaction-total">0 reacciones</span>
      </div>
      <button class="cmt-btn" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none"><path d="M4 6.5A1.5 1.5 0 015.5 5h13A1.5 1.5 0 0120 6.5v9a1.5 1.5 0 01-1.5 1.5H9l-4 3.2V17H5.5A1.5 1.5 0 014 15.5v-9z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg><span class="cmt-count">0</span> comentarios</button>
      <button class="share-btn"><svg viewBox="0 0 24 24" fill="none"><path d="M15 5l5 5-5 5M20 10H10a6 6 0 00-6 6v1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Compartir</button>
    </footer>
    <div class="comments-panel" id="comments-${postId}" hidden>
      <div class="comments-list" id="comments-list-${postId}"></div>
      <form class="comment-form" data-post="${postId}">
        <input type="text" class="comment-name" placeholder="Tu nombre (opcional)" autocomplete="off">
        <div class="comment-input-row">
          <input type="text" class="comment-text" placeholder="Añade un comentario…" autocomplete="off" required>
          <button type="submit">Publicar</button>
        </div>
      </form>
    </div>`;
  if (prepend) guestbookFeed.prepend(article); else guestbookFeed.appendChild(article);
  observeReveal(article);
  article.classList.add('in');
  initPostInteractions(article.querySelector('.post-actions'));
}

if (guestbookFeed) {
  const saved = JSON.parse(localStorage.getItem('jpc_guestbook') || '[]');
  saved.forEach(entry => renderGuestbookEntry(entry, false));
}

/* ═══════════════════════════════════════════
   LIGHTBOX (historias / momentos)
═══════════════════════════════════════════ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, title) {
  lightboxImg.src = src;
  lightboxImg.alt = title;
  lightboxCaption.textContent = title;
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add('open'));
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightbox.hidden = true; }, 250);
}
document.querySelectorAll('.story-item').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.img, btn.dataset.title));
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox(); });

/* ═══════════════════════════════════════════
   BÚSQUEDA (desktop + móvil, sincronizadas)
═══════════════════════════════════════════ */
function applySearch(q) {
  q = q.trim().toLowerCase();
  document.querySelectorAll('.post-card').forEach(card => {
    const tags = (card.dataset.tags || '') + ' ' + card.textContent.toLowerCase();
    card.style.display = tags.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('#endorseList li').forEach(li => {
    const skill = li.dataset.skill.toLowerCase();
    li.style.display = skill.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.style.opacity = q && !pill.textContent.toLowerCase().includes(q) ? '.25' : '1';
  });
}
const searchInput = document.getElementById('siteSearch');
const searchInputMobile = document.getElementById('siteSearchMobile');
if (searchInput) searchInput.addEventListener('input', () => { applySearch(searchInput.value); if (searchInputMobile) searchInputMobile.value = searchInput.value; });
if (searchInputMobile) searchInputMobile.addEventListener('input', () => { applySearch(searchInputMobile.value); if (searchInput) searchInput.value = searchInputMobile.value; });

/* ───────── CONTACT FORM (mailto — 100% funcional sin backend) ───────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');
    success.classList.remove('show');
    error.classList.remove('show');
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    if (!nombre || !email || !mensaje) { error.classList.add('show'); return; }

    const subject = encodeURIComponent(asunto || `Contacto desde el perfil — ${nombre}`);
    const body = encodeURIComponent(`${mensaje}\n\n— ${nombre} (${email})`);
    window.location.href = `mailto:contacto@jobpulachecarreno.dev?subject=${subject}&body=${body}`;

    success.classList.add('show');
    contactForm.reset();
  });
}

/* ───────── NETWORK CANVAS (cover banner — nodos conectados) ───────── */
(function networkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  const NODE_COUNT = 42;
  const LINK_DIST = 130;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      r: (Math.random() * 1.6 + 1) * devicePixelRatio
    }));
  }
  function step() {
    ctx.clearRect(0, 0, w, h);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST * devicePixelRatio) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / (LINK_DIST * devicePixelRatio)) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
    });
    requestAnimationFrame(step);
  }
  resize(); initNodes(); step();
  window.addEventListener('resize', () => { resize(); initNodes(); }, { passive: true });
})();

/* ───────── DISCOVERY CHIPS ───────── */
document.querySelectorAll('.discovery-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.discovery-chip').forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
  });
});
