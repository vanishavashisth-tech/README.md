'use strict';

const API = 'https://fakestoreapi.com/products';
const PAGE_SIZE = 8;

let data = {
  all: [],
  shown: [],
  cart: {},         
  saved: new Set(),
  page: 1,
  query: '',
  cat: 'all',
  sortBy: 'default',
  maxPrice: 1000,
  savedOnly: false,
};

const g = id => document.getElementById(id);

const el = {
  navbar:      g('navbar'),
  loader:      g('loader'),
  errBox:      g('errorState'),
  emptyBox:    g('emptyState'),
  grid:        g('productGrid'),
  countTxt:    g('productCount'),
  search:      g('searchInput'),
  searchClear: g('searchClear'),
  chips:       g('chipRow'),
  sort:        g('sortSelect'),
  slider:      g('maxPrice'),
  sliderVal:   g('priceDisplay'),
  savedCheck:  g('showFavOnly'),
  favBtn:      g('favBtn'),
  favBadge:    g('favCount'),
  cartBtn:     g('cartBtn'),
  cartBadge:   g('cartCount'),
  darkBtn:     g('themeToggle'),
  pages:       g('pagination'),
  modalWrap:   g('modalBackdrop'),
  modalBody:   g('modalBody'),
  modalClose:  g('modalClose'),
  cartWrap:    g('cartBackdrop'),
  cartDrawer:  g('cartDrawer'),
  cartClose:   g('cartClose'),
  cartList:    g('cartItems'),
  cartEmpty:   g('cartEmpty'),
  cartFoot:    g('cartFooter'),
  cartTotal:   g('cartTotal'),
  cartQty:     g('cartItemCount'),
  retryBtn:    g('retryBtn'),
  toasts:      g('toastWrap'),
  heroCount:   g('totalProductsStat'),
};


document.addEventListener('DOMContentLoaded', () => {
  restoreTheme();
  loadStorage();
  bindAll();
  fetchProducts();
});


async function fetchProducts() {
  toggleLoader(true);
  hideErr();

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const products = await res.json();
    data.all = products;

    if (el.heroCount) el.heroCount.textContent = products.length;

    const topPrice = Math.ceil(Math.max(...products.map(p => p.price)) * 83);
    el.slider.max = topPrice;
    el.slider.value = topPrice;
    data.maxPrice = topPrice;
    el.sliderVal.textContent = topPrice;

    makeCategoryChips(products);
    runFilters();

  } catch (err) {
    showErr();
    console.error('fetch failed:', err);
  } finally {
    toggleLoader(false);
  }
}


function makeCategoryChips(products) {
  const cats = [...new Set(products.map(p => p.category))];

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.cat = cat;
    btn.textContent = cat;
    btn.addEventListener('click', () => setCategory(cat));
    el.chips.appendChild(btn);
  });
}

function setCategory(cat) {
  data.cat = cat;
  el.chips.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('chip--active', c.dataset.cat === cat);
  });
  runFilters();
}


function runFilters() {
  let items = data.all;

  if (data.cat !== 'all') {
    items = items.filter(p => p.category === data.cat);
  }

  if (data.query) {
    const q = data.query.toLowerCase();
    items = items.filter(p =>
      p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  items = items.filter(p => (p.price * 83) <= data.maxPrice);

  if (data.savedOnly) {
    items = items.filter(p => data.saved.has(p.id));
  }

  items = items.slice().sort((a, b) => {
    switch (data.sortBy) {
      case 'price-asc':   return a.price - b.price;
      case 'price-desc':  return b.price - a.price;
      case 'rating-desc': return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      case 'title-asc':   return a.title.localeCompare(b.title);
      default:            return 0;
    }
  });

  data.shown = items;
  data.page = 1;
  drawGrid();
}


function drawGrid() {
  const total = data.shown.length;
  const pages = Math.ceil(total / PAGE_SIZE);

  el.countTxt.textContent = total === 0
    ? ''
    : `${total} product${total !== 1 ? 's' : ''}${data.query ? ` matching "${data.query}"` : ''}`;

  if (total === 0) {
    el.emptyBox.style.display = 'flex';
    el.grid.style.display     = 'none';
    el.pages.innerHTML        = '';
    return;
  }

  el.emptyBox.style.display = 'none';
  el.grid.style.display     = 'grid';

  const from = (data.page - 1) * PAGE_SIZE;
  const pageItems = data.shown.slice(from, from + PAGE_SIZE);

  el.grid.innerHTML = pageItems.map(buildCard).join('');
  attachCardEvents();
  buildPager(pages);
}


function buildCard(p) {
  const liked    = data.saved.has(p.id);
  const rate     = p.rating?.rate ?? 0;
  const reviews  = p.rating?.count ?? 0;
  const fillPct  = (rate / 5 * 100).toFixed(1);

  let badge = '';
  if (p.price > 500) badge = '<span class="card-badge card-badge--sale">SALE</span>';
  else if (p.id <= 5) badge = '<span class="card-badge card-badge--new">NEW</span>';

  return `
    <article class="card" data-id="${p.id}">
      ${badge}

      <button class="card-save fav-btn ${liked ? 'saved' : ''}" data-id="${p.id}"
              aria-label="${liked ? 'Remove from saved' : 'Save product'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <div class="card-img-wrap">
        <img class="card-img" src="${p.image}" alt="${safe(p.title)}" loading="lazy"
             onerror="this.src='https://placehold.co/300x300/f0ede8/888?text=No+Image'" />
        <div class="card-quick-view view-btn" data-id="${p.id}">Quick View</div>
      </div>

      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h2 class="card-title">${safe(p.title)}</h2>
        <div class="card-rating">
          <div class="stars-track" aria-label="${rate} out of 5 stars">
            <span class="stars-empty">★★★★★</span>
            <span class="stars-filled" style="width:${fillPct}%">★★★★★</span>
          </div>
          <span class="rating-meta">${rate.toFixed(1)} (${reviews})</span>
        </div>
      </div>

      <div class="card-footer">
        <span class="card-price">₹${(p.price * 83).toFixed(2)}</span>
        <button class="card-add-btn add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    </article>
  `;
}

function attachCardEvents() {
  el.grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleSaved(Number(btn.dataset.id), btn);
    });
  });

  el.grid.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(Number(btn.dataset.id));
    });
  });

  el.grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.id), btn);
    });
  });
}


// --- saved items ---

function toggleSaved(id, triggerEl) {
  if (data.saved.has(id)) {
    data.saved.delete(id);
    notify('Removed from saved', 'info');
  } else {
    data.saved.add(id);
    notify('❤ Saved!', 'success');
  }

  if (triggerEl) {
    triggerEl.classList.add('pop');
    triggerEl.addEventListener('animationend', () => triggerEl.classList.remove('pop'), { once: true });
  }

  persist();
  updateSavedBadge();

  // if we're in saved-only mode, re-filter so removed items disappear
  if (data.savedOnly) {
    runFilters();
  } else {
    el.grid.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(b => {
      b.classList.toggle('saved', data.saved.has(id));
    });
  }
}

function updateSavedBadge() {
  el.favBadge.textContent = data.saved.size;
}


// --- cart ---

function addToCart(id, btn) {
  const product = data.all.find(p => p.id === id);
  if (!product) return;

  if (data.cart[id]) {
    data.cart[id].qty++;
  } else {
    data.cart[id] = { product, qty: 1 };
  }

  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('added');
    }, 1400);
  }

  persist();
  refreshCartBadge();
  drawCartItems();
  notify(`${product.title.slice(0, 30)}… added`, 'success');
}

function removeFromCart(id) {
  delete data.cart[id];
  persist();
  refreshCartBadge();
  drawCartItems();
}

function changeQty(id, diff) {
  if (!data.cart[id]) return;
  data.cart[id].qty += diff;
  if (data.cart[id].qty <= 0) { removeFromCart(id); return; }
  persist();
  refreshCartBadge();
  drawCartItems();
}

function refreshCartBadge() {
  const n = Object.values(data.cart).reduce((acc, item) => acc + item.qty, 0);
  el.cartBadge.textContent = n;
  el.cartQty.textContent   = n;
}

function drawCartItems() {
  const items = Object.values(data.cart);

  if (!items.length) {
    el.cartEmpty.style.display = 'flex';
    el.cartFoot.style.display  = 'none';
    el.cartList.querySelectorAll('.cart-item').forEach(r => r.remove());
    return;
  }

  el.cartEmpty.style.display = 'none';
  el.cartFoot.style.display  = 'block';

  const total = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  el.cartTotal.textContent = `₹${(total * 83).toFixed(2)}`;

  el.cartList.querySelectorAll('.cart-item').forEach(r => r.remove());

  items.forEach(({ product: p, qty }) => {
    const row = document.createElement('div');
    row.className  = 'cart-item';
    row.dataset.id = p.id;
    row.innerHTML  = `
      <div class="cart-item-img">
        <img src="${p.image}" alt="${safe(p.title)}" onerror="this.src='https://placehold.co/64x64/f0ede8/888'" />
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${safe(p.title)}</p>
        <p class="cart-item-price">₹${(p.price * qty * 83).toFixed(2)}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-id="${p.id}" data-d="-1">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" data-id="${p.id}" data-d="1">+</button>
          <button class="cart-item-remove" data-id="${p.id}">Remove</button>
        </div>
      </div>
    `;
    el.cartList.insertBefore(row, el.cartEmpty);
  });

  el.cartList.querySelectorAll('.qty-btn').forEach(b => {
    b.addEventListener('click', () => changeQty(Number(b.dataset.id), Number(b.dataset.d)));
  });

  el.cartList.querySelectorAll('.cart-item-remove').forEach(b => {
    b.addEventListener('click', () => removeFromCart(Number(b.dataset.id)));
  });
}


// --- modal ---

function openModal(id) {
  const p = data.all.find(prod => prod.id === id);
  if (!p) return;

  const liked   = data.saved.has(id);
  const rate    = p.rating?.rate ?? 0;
  const reviews = p.rating?.count ?? 0;
  const pct     = (rate / 5 * 100).toFixed(1);

  el.modalBody.innerHTML = `
    <div class="m-img-wrap">
      <img src="${p.image}" alt="${safe(p.title)}"
           onerror="this.src='https://placehold.co/400x300/f0ede8/888?text=No+Image'" />
    </div>
    <div class="m-meta">
      <span class="m-cat">${p.category}</span>
      <span class="m-id">#${p.id}</span>
    </div>
    <h2 class="m-title">${safe(p.title)}</h2>
    <div class="m-rating-row">
      <div class="stars-track" aria-label="${rate} out of 5 stars">
        <span class="stars-empty">★★★★★</span>
        <span class="stars-filled" style="width:${pct}%">★★★★★</span>
      </div>
      <span class="m-rating-score">${rate.toFixed(1)}</span>
      <span class="m-rating-count">${reviews} reviews</span>
    </div>
    <div class="m-price-row">
      <span class="m-price">₹${(p.price * 83).toFixed(2)}</span>
      <span class="m-price-note">✓ In Stock &amp; Ready to Ship</span>
    </div>
    <hr class="m-divider" />
    <p class="m-desc-label">Description</p>
    <p class="m-desc">${safe(p.description ?? 'No description available.')}</p>
    <div class="m-actions">
      <button class="btn btn--primary m-cart-btn modal-add-cart" data-id="${p.id}">Add to Cart</button>
      <button class="m-save-btn modal-save-btn ${liked ? 'saved' : ''}" data-id="${p.id}" aria-label="Save">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  `;

  el.modalBody.querySelector('.modal-add-cart').addEventListener('click', function() {
    addToCart(id, this);
  });

  const saveBtn = el.modalBody.querySelector('.modal-save-btn');
  saveBtn.addEventListener('click', function() {
    toggleSaved(id, this);
    this.classList.toggle('saved', data.saved.has(id));
    this.querySelector('svg').setAttribute('fill', data.saved.has(id) ? 'currentColor' : 'none');
  });

  el.modalWrap.style.display  = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  el.modalWrap.style.display   = 'none';
  document.body.style.overflow = '';
}


function openCart() {
  drawCartItems();
  el.cartWrap.style.display    = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  el.cartWrap.style.display    = 'none';
  document.body.style.overflow = '';
}


function buildPager(totalPages) {
  if (totalPages <= 1) { el.pages.innerHTML = ''; return; }

  const cur   = data.page;
  const range = getRange(cur, totalPages);

  const middle = range.map(n =>
    n === '…'
      ? `<span class="page-ellipsis">…</span>`
      : `<button class="page-btn ${n === cur ? 'active' : ''}" data-page="${n}">${n}</button>`
  ).join('');

  el.pages.innerHTML =
    `<button class="page-btn" data-page="${cur - 1}" ${cur === 1 ? 'disabled' : ''}>← Prev</button>` +
    middle +
    `<button class="page-btn" data-page="${cur + 1}" ${cur === totalPages ? 'disabled' : ''}>Next →</button>`;

  el.pages.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const n = Number(btn.dataset.page);
      if (n >= 1 && n <= totalPages) {
        data.page = n;
        drawGrid();
        el.grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function getRange(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const r = [1];
  if (cur > 3) r.push('…');
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) r.push(i);
  if (cur < total - 2) r.push('…');
  r.push(total);
  return r;
}


function restoreTheme() {
  if (localStorage.getItem('luxe_theme') === 'dark') {
    document.body.classList.add('dark');
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('luxe_theme', isDark ? 'dark' : 'light');
}


function notify(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.innerHTML = `<span class="toast-dot"></span><span>${msg}</span>`;
  el.toasts.appendChild(t);

  setTimeout(() => {
    t.classList.add('leaving');
    t.addEventListener('animationend', () => t.remove(), { once: true });
  }, 3000);
}



function persist() {
  localStorage.setItem('luxe_saved', JSON.stringify([...data.saved]));
  localStorage.setItem('luxe_cart', JSON.stringify(data.cart));
}

function loadStorage() {
  try {
    const saved = localStorage.getItem('luxe_saved');
    if (saved) JSON.parse(saved).forEach(id => data.saved.add(id));

    const cart = localStorage.getItem('luxe_cart');
    if (cart) data.cart = JSON.parse(cart);
  } catch(e) {
    console.warn('storage restore failed, starting fresh', e);
  }

  updateSavedBadge();
  refreshCartBadge();
}


function debounce(fn, ms = 320) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function safe(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

function toggleLoader(on) { el.loader.style.display = on ? 'flex' : 'none'; }
function showErr()        { el.errBox.style.display = 'flex'; }
function hideErr()        { el.errBox.style.display = 'none'; }


function bindAll() {

  window.addEventListener('scroll', () => {
    el.navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  el.search.addEventListener('input', debounce(e => {
    data.query = e.target.value.trim();
    el.searchClear.classList.toggle('visible', data.query.length > 0);
    runFilters();
  }));

  el.searchClear.addEventListener('click', () => {
    el.search.value = '';
    data.query = '';
    el.searchClear.classList.remove('visible');
    runFilters();
  });

  el.slider.addEventListener('input', e => {
    data.maxPrice = Number(e.target.value);
    el.sliderVal.textContent = data.maxPrice;
    runFilters();
  });

  el.sort.addEventListener('change', e => {
    data.sortBy = e.target.value;
    runFilters();
  });

  el.savedCheck.addEventListener('change', e => {
    data.savedOnly = e.target.checked;
    el.favBtn.classList.toggle('fav-active', data.savedOnly);
    runFilters();
  });

  el.favBtn.addEventListener('click', () => {
    data.savedOnly = !data.savedOnly;
    el.savedCheck.checked = data.savedOnly;
    el.favBtn.classList.toggle('fav-active', data.savedOnly);
    runFilters();
    if (data.savedOnly) notify(`Showing ${data.saved.size} saved item(s)`, 'info');
  });

  el.cartBtn.addEventListener('click', openCart);
  el.cartClose.addEventListener('click', closeCart);

  el.cartWrap.addEventListener('click', e => {
    if (!el.cartDrawer.contains(e.target)) closeCart();
  });

  el.darkBtn.addEventListener('click', toggleTheme);

  el.modalClose.addEventListener('click', closeModal);
  el.modalWrap.addEventListener('click', e => {
    if (e.target === el.modalWrap) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (el.modalWrap.style.display === 'flex') closeModal();
    if (el.cartWrap.style.display !== 'none')  closeCart();
  });

  el.retryBtn.addEventListener('click', () => {
    hideErr();
    fetchProducts();
  });
}
