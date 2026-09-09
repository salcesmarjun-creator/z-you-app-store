const catalog = Array.isArray(window.APP_CATALOG) ? window.APP_CATALOG : [];
const grid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const filters = [...document.querySelectorAll('.filter')];
const appModal = document.getElementById('appModal');
const aboutModal = document.getElementById('aboutModal');
let activeFilter = 'all';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function platformLabel(platforms) {
  return platforms.map(p => p === 'windows' ? 'Windows' : p === 'android' ? 'Android' : p).join(' + ');
}

function appIsAvailable(app) {
  return Array.isArray(app.downloads) && app.downloads.some(d => d.available && d.url);
}

function cardTemplate(app) {
  const available = appIsAvailable(app);
  const platformBadges = app.platforms.map(p => `<span class="pill">${escapeHtml(p === 'windows' ? 'Windows' : 'Android')}</span>`).join('');
  return `
    <article class="app-card ${app.featured ? 'featured' : ''}" data-id="${escapeHtml(app.id)}">
      <div class="card-top">
        <div class="app-icon">${escapeHtml(app.icon)}</div>
        <div class="app-title-wrap">
          <div class="card-kicker">${escapeHtml(app.category)}${app.featured ? ' · Featured' : ''}</div>
          <h3>${escapeHtml(app.name)}</h3>
          <div class="meta-inline">${escapeHtml(app.version)} · ${escapeHtml(platformLabel(app.platforms))}</div>
        </div>
      </div>
      <p class="card-desc">${escapeHtml(app.description)}</p>
      <div class="card-bottom">
        <div class="pills">${platformBadges}</div>
        <div class="status ${available ? 'available' : 'soon'}">${available ? 'Available' : 'Publishing'}</div>
      </div>
      <button class="details-btn" data-open="${escapeHtml(app.id)}">View details & download</button>
    </article>`;
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const list = catalog.filter(app => {
    const matchesPlatform = activeFilter === 'all' || app.platforms.includes(activeFilter);
    const haystack = `${app.name} ${app.category} ${app.description} ${app.platforms.join(' ')}`.toLowerCase();
    return matchesPlatform && (!q || haystack.includes(q));
  });

  grid.innerHTML = list.map(cardTemplate).join('');
  resultCount.textContent = `${list.length} app${list.length === 1 ? '' : 's'} shown`;
  emptyState.classList.toggle('hidden', list.length !== 0);

  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openApp(btn.dataset.open));
  });
}

function openApp(id) {
  const app = catalog.find(item => item.id === id);
  if (!app) return;
  document.getElementById('modalIcon').textContent = app.icon;
  document.getElementById('modalKicker').textContent = `${app.category} · ${app.version}`;
  document.getElementById('modalTitle').textContent = app.name;
  document.getElementById('modalDesc').textContent = app.description;
  document.getElementById('modalMeta').innerHTML = app.platforms.map(p => `<span class="pill">${p === 'windows' ? 'Windows' : 'Android'}</span>`).join('');

  const actions = document.getElementById('modalActions');
  actions.innerHTML = '';

  if (app.installNote) {
    const note = document.createElement('div');
    note.className = 'download-note';
    note.textContent = app.installNote;
    actions.appendChild(note);
  }

  app.downloads.forEach(download => {
    if (download.available && download.url) {
      const a = document.createElement('a');
      a.className = 'download-btn';
      a.href = download.url;
      a.download = download.file || '';
      a.textContent = `Download ${download.label}${download.size ? ` · ${download.size}` : ''}`;
      a.setAttribute('rel', 'noopener');
      actions.appendChild(a);
    } else {
      const button = document.createElement('button');
      button.className = 'download-btn disabled';
      button.disabled = true;
      button.textContent = `${download.label} · Publishing`;
      actions.appendChild(button);
    }
  });
  appModal.showModal();
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    render();
  });
});

searchInput.addEventListener('input', render);
document.getElementById('modalClose').addEventListener('click', () => appModal.close());
document.getElementById('aboutBtn').addEventListener('click', () => aboutModal.showModal());
document.getElementById('aboutClose').addEventListener('click', () => aboutModal.close());

[appModal, aboutModal].forEach(dialog => {
  dialog.addEventListener('click', e => {
    const rect = dialog.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });
});

render();
