const productGrid    = document.getElementById('productGrid');
const spinnerWrap    = document.getElementById('spinnerWrap');
const errorWrap      = document.getElementById('errorWrap');
const emptyWrap      = document.getElementById('emptyWrap');
const paginationEl   = document.getElementById('pagination');
const resultsText    = document.getElementById('resultsText');
const searchInput    = document.getElementById('searchInput');
const clearBtn       = document.getElementById('clearBtn');
const categorySelect = document.getElementById('categorySelect');
const sortSelect     = document.getElementById('sortSelect');
const showFavBtn     = document.getElementById('showFavBtn');
const favCountEl     = document.getElementById('favCount');
const themeBtn       = document.getElementById('themeBtn');
const modalOverlay   = document.getElementById('modalOverlay');
const modalBody      = document.getElementById('modalBody');
const modalClose     = document.getElementById('modalClose');
const retryBtn       = document.getElementById('retryBtn');
const resetBtn       = document.getElementById('resetBtn');

const state = {
  allProducts:  [],
  filtered:     [],
  favourites:   new Set(),
  currentPage:  1,
  perPage:      8,
  query:        '',
  category:     'all',
  sort:         'default',
  showFavOnly:  false,
};

const API_URL = 'https://fakestoreapi.com/products';

const USD_TO_INR = 83;

function toINR(usdPrice) {
  const inr = usdPrice * USD_TO_INR;
  return '₹' + inr.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function show(el) { el.style.display = 'flex'; }
function hide(el) { el.style.display = 'none'; }

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function loadProducts() {
  show(spinnerWrap);
  hide(errorWrap);
  hide(emptyWrap);
  productGrid.innerHTML  = '';
  paginationEl.innerHTML = '';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    const products = await response.json();
    state.allProducts = products;

    buildCategoryOptions(products);
    loadFavourites();
    applyFilters();

  } catch (error) {
    hide(spinnerWrap);
    show(errorWrap);
    console.error('Fetch failed:', error.message);
  }
}

function buildCategoryOptions(products) {
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  const optionsHTML = uniqueCategories
    .map(cat => `<option value="${cat}">${capitalize(cat)}</option>`)
    .join('');

  categorySelect.innerHTML =
    `<option value="all">All Categories</option>` + optionsHTML;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function applyFilters() {
  let result = state.allProducts;

  if (state.showFavOnly) {
    result = result.filter(p => state.favourites.has(p.id));
  }

  if (state.category !== 'all') {
    result = result.filter(p => p.category === state.category);
  }

  if (state.query) {
    const q = state.query.toLowerCase();
    result = result.filter(p => p.title.toLowerCase().includes(q));
  }

  result = [...result].sort((a, b) => {
    if (state.sort === 'price-low')  return a.price - b.price;
    if (state.sort === 'price-high') return b.price - a.price;
    if (state.sort === 'name-az')    return a.title.localeCompare(b.title);
    if (state.sort === 'name-za')    return b.title.localeCompare(a.title);
    return 0;
  });

  state.filtered    = result;
  state.currentPage = 1;
  renderPage();
}

function renderPage() {
  hide(spinnerWrap);

  const total      = state.filtered.length;
  const totalPages = Math.ceil(total / state.perPage);
  const start      = (state.currentPage - 1) * state.perPage;
  const pageItems  = state.filtered.slice(start, start + state.perPage);

  resultsText.textContent = total === 0
    ? ''
    : `Showing ${start + 1}–${Math.min(start + state.perPage, total)} of ${total} products`;

  if (pageItems.length === 0) {
    productGrid.innerHTML  = '';
    paginationEl.innerHTML = '';
    show(emptyWrap);
    hide(errorWrap);
    return;
  }

  hide(emptyWrap);
  productGrid.innerHTML = pageItems.map(buildCardHTML).join('');
  buildPagination(totalPages);
}

function buildCardHTML(p) {
  const isFav  = state.favourites.has(p.id);
  const title  = p.title.length > 55 ? p.title.slice(0, 55) + '…' : p.title;
  const price  = toINR(p.price);   

  return `
    <article class="card" data-id="${p.id}">

      <div class="card-img-wrap">
        <span class="card-badge">${esc(p.category)}</span>

        <img
          class="card-img"
          src="${esc(p.image)}"
          alt="${esc(p.title)}"
          loading="lazy"
          onerror="this.src='https://placehold.co/160x160?text=No+Image'"
        />

        <button
          class="card-fav-btn ${isFav ? 'saved' : ''}"
          data-id="${p.id}"
          data-action="fav"
          title="${isFav ? 'Remove from favourites' : 'Add to favourites'}"
        >${isFav ? '❤️' : '🤍'}</button>
      </div>

      <div class="card-body">
        <p class="card-category">${esc(p.category)}</p>
        <h2 class="card-title">${esc(title)}</h2>
        <p class="card-price">${price}</p>
      </div>

      <div class="card-footer">
        <button class="btn-cart" data-id="${p.id}" data-action="cart">Add to Cart</button>
        <button class="btn-view" data-id="${p.id}" data-action="view">View</button>
      </div>

    </article>
  `;
}

function buildPagination(total) {
  if (total <= 1) { paginationEl.innerHTML = ''; return; }

  paginationEl.innerHTML = Array.from({ length: total }, (_, i) => i + 1)
    .map(n => `
      <button
        class="page-btn ${n === state.currentPage ? 'active' : ''}"
        data-page="${n}"
        ${n === state.currentPage ? 'disabled' : ''}
      >${n}</button>
    `)
    .join('');
}

function toggleFavourite(id) {
  if (state.favourites.has(id)) {
    state.favourites.delete(id);
  } else {
    state.favourites.add(id);
  }
  saveFavourites();
  updateFavBadge();

  if (state.showFavOnly) applyFilters();
  else renderPage();
}

function saveFavourites() {
  localStorage.setItem('luxe_favourites', JSON.stringify([...state.favourites]));
}

function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem('luxe_favourites') || '[]');
    state.favourites = new Set(saved);
  } catch {
    state.favourites = new Set();
  }
  updateFavBadge();
}

function updateFavBadge() {
  favCountEl.textContent = state.favourites.size;
}

function openModal(id) {
  const p = state.allProducts.find(prod => prod.id === id);
  if (!p) return;

  const isFav = state.favourites.has(p.id);

  modalBody.innerHTML = `
    <div class="modal-img-wrap">
      <img class="modal-img" src="${esc(p.image)}" alt="${esc(p.title)}"
        onerror="this.src='https://placehold.co/200x200?text=No+Image'" />
    </div>
    <p class="modal-category">${esc(p.category)}</p>
    <h2 class="modal-title">${esc(p.title)}</h2>
    <p class="modal-price">${toINR(p.price)}</p>
    <p class="modal-desc">${esc(p.description)}</p>
    <div class="modal-actions">
      <button class="btn-primary" style="flex:1" data-id="${p.id}" data-action="modal-cart">
        Add to Cart
      </button>
      <button
        class="modal-fav-btn ${isFav ? 'saved' : ''}"
        data-id="${p.id}"
        data-action="modal-fav"
      >${isFav ? '❤️ Saved' : '🤍 Save'}</button>
    </div>
  `;

  modalOverlay.style.display = '';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.style.display   = 'none';
  document.body.style.overflow = '';
}

function initTheme() {
  const saved = localStorage.getItem('luxe_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('luxe_theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
}

const handleSearch = debounce(function (e) {
  state.query = e.target.value.trim();
  clearBtn.style.display = state.query ? 'block' : 'none';
  applyFilters();
}, 350);

searchInput.addEventListener('input', handleSearch);

clearBtn.addEventListener('click', function () {
  searchInput.value      = '';
  state.query            = '';
  clearBtn.style.display = 'none';
  applyFilters();
  searchInput.focus();
});

categorySelect.addEventListener('change', function (e) {
  state.category = e.target.value;
  applyFilters();
});

sortSelect.addEventListener('change', function (e) {
  state.sort = e.target.value;
  applyFilters();
});

showFavBtn.addEventListener('click', function () {
  state.showFavOnly = !state.showFavOnly;
  showFavBtn.classList.toggle('active', state.showFavOnly);
  applyFilters();
});

document.getElementById('favBtn').addEventListener('click', function () {
  state.showFavOnly = !state.showFavOnly;
  showFavBtn.classList.toggle('active', state.showFavOnly);
  applyFilters();
});

themeBtn.addEventListener('click', toggleTheme);
retryBtn.addEventListener('click', loadProducts);

resetBtn.addEventListener('click', function () {
  searchInput.value      = '';
  categorySelect.value   = 'all';
  sortSelect.value       = 'default';
  state.query            = '';
  state.category         = 'all';
  state.sort             = 'default';
  state.showFavOnly      = false;
  clearBtn.style.display = 'none';
  showFavBtn.classList.remove('active');
  applyFilters();
});

productGrid.addEventListener('click', function (e) {
  const favBtn  = e.target.closest('[data-action="fav"]');
  const cartBtn = e.target.closest('[data-action="cart"]');
  const viewBtn = e.target.closest('[data-action="view"]');
  const card    = e.target.closest('.card');

  if (favBtn) {
    e.stopPropagation();
    toggleFavourite(Number(favBtn.dataset.id));
    return;
  }

  if (cartBtn) {
    e.stopPropagation();
    cartBtn.textContent       = '✓ Added!';
    cartBtn.style.background  = '#27ae60';
    setTimeout(() => {
      cartBtn.textContent      = 'Add to Cart';
      cartBtn.style.background = '';
    }, 1400);
    return;
  }

  if (viewBtn || card) {
    const id = Number((viewBtn || card).dataset.id);
    openModal(id);
  }
});

modalBody.addEventListener('click', function (e) {
  const cartBtn = e.target.closest('[data-action="modal-cart"]');
  const favBtn  = e.target.closest('[data-action="modal-fav"]');

  if (cartBtn) {
    cartBtn.textContent = '✓ Added!';
    setTimeout(() => { cartBtn.textContent = 'Add to Cart'; }, 1400);
  }

  if (favBtn) {
    const id  = Number(favBtn.dataset.id);
    toggleFavourite(id);
    const isFav = state.favourites.has(id);
    favBtn.textContent = isFav ? '❤️ Saved' : '🤍 Save';
    favBtn.classList.toggle('saved', isFav);
  }
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) closeModal();
});

paginationEl.addEventListener('click', function (e) {
  const btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled) return;
  state.currentPage = Number(btn.dataset.page);
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    searchInput.focus();
  }
});

initTheme();
loadProducts();