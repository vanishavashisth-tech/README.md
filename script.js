const PRODUCTS = [

  {
    id: 1,
    title: "Men's Slim Fit Cotton Shirt",
    category: "men's clothing",
    price: 899,
    description: "Premium slim fit cotton shirt for everyday wear. Breathable fabric, available in multiple colours.",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 2,
    title: "Men's Casual Denim Jacket",
    category: "men's clothing",
    price: 1799,
    description: "Classic denim jacket with a relaxed fit. Perfect for casual outings and everyday style.",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 3,
    title: "Men's Running Sports Shoes",
    category: "men's clothing",
    price: 2499,
    description: "Lightweight and breathable running shoes with cushioned sole for maximum comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 4,
    title: "Men's Ethnic Kurta Pyjama Set",
    category: "men's clothing",
    price: 1399,
    description: "Premium cotton kurta pyjama set for festivals and celebrations. Easy machine wash care.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 5,
    title: "Men's Formal Slim Trousers",
    category: "men's clothing",
    price: 1099,
    description: "Slim fit formal trousers in premium poly-viscose fabric. Wrinkle and stain resistant.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&auto=format"
  },

  {
    id: 6,
    title: "Women's Floral Kurta Set",
    category: "women's clothing",
    price: 1199,
    description: "Beautiful floral printed kurta set with matching dupatta. Perfect for festivals.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 7,
    title: "Women's Summer Floral Dress",
    category: "women's clothing",
    price: 1599,
    description: "Light and flowy summer dress in vibrant colours. Comfortable for all-day wear.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 8,
    title: "Women's Embroidered Anarkali",
    category: "women's clothing",
    price: 2299,
    description: "Elegant embroidered anarkali dress perfect for weddings and celebrations.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 9,
    title: "Women's Printed Palazzo Set",
    category: "women's clothing",
    price: 899,
    description: "Comfortable palazzo set with vibrant print. Perfect for casual and semi-formal occasions.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop&auto=format"
  },

  {
    id: 10,
    title: "Gold Plated Mangalsutra",
    category: "jewelery",
    price: 3499,
    description: "Traditional gold plated mangalsutra with black beads. Nickel-free and hypoallergenic.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 11,
    title: "Kundan Necklace Set",
    category: "jewelery",
    price: 1899,
    description: "Stunning kundan necklace set with matching earrings. Perfect for bridal wear.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 12,
    title: "Diamond Look Bangles (Set of 6)",
    category: "jewelery",
    price: 799,
    description: "Beautiful diamond-look bangles set. Lightweight, durable and scratch resistant.",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 13,
    title: "Pearl Drop Earrings",
    category: "jewelery",
    price: 599,
    description: "Classic pearl drop earrings with gold-plated base. Elegant for all occasions.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 14,
    title: "Silver Toe Ring Set",
    category: "jewelery",
    price: 399,
    description: "Set of 4 pure silver toe rings. Adjustable size and comfortable all-day wear.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format"
  },

  {
    id: 15,
    title: "Bluetooth Earbuds — 42H Battery",
    category: "electronics",
    price: 1299,
    description: "True wireless earbuds with 42H total playback, IPX4 water resistance and gaming mode.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 16,
    title: "Pro Smartwatch with Calling",
    category: "electronics",
    price: 2499,
    description: "1.72\" HD smartwatch with Bluetooth calling, SpO2 sensor and 7-day battery.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 17,
    title: "32\" Full HD Smart LED TV",
    category: "electronics",
    price: 15999,
    description: "Full HD 1080p smart LED TV with built-in Wi-Fi, Netflix, YouTube and slim bezel.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 18,
    title: "Portable Bluetooth Speaker 10W",
    category: "electronics",
    price: 1499,
    description: "Wireless speaker with 10W output, 8 hours playtime, IPX5 waterproof and mic.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 19,
    title: "65W Fast Charger USB-C",
    category: "electronics",
    price: 699,
    description: "65W turbo charging adapter for all USB-C phones, tablets and laptops.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop&auto=format"
  },
  {
    id: 20,
    title: "Hair Dryer 1200W with Cool Shot",
    category: "electronics",
    price: 1799,
    description: "1200W hair dryer with 2 speed/heat settings, cool shot and concentrator nozzle.",
    image: "https://m.media-amazon.com/images/I/51-mbl3CWKL._AC_UF1000,1000_QL80_.jpg"
  },
];

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

function toINR(price) {
  return '₹' + price.toLocaleString('en-IN');
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

function loadProducts() {
  show(spinnerWrap);
  hide(errorWrap);
  hide(emptyWrap);
  productGrid.innerHTML  = '';
  paginationEl.innerHTML = '';

  setTimeout(() => {
    state.allProducts = PRODUCTS;
    buildCategoryOptions(PRODUCTS);
    loadFavourites();
    applyFilters();
  }, 400);
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
  const isFav = state.favourites.has(p.id);
  const title = p.title.length > 55 ? p.title.slice(0, 55) + '…' : p.title;
  const price = toINR(p.price);

  return `
    <article class="card" data-id="${p.id}">

      <div class="card-img-wrap">
        <span class="card-badge">${esc(p.category)}</span>

        <img
          class="card-img"
          src="${esc(p.image)}"
          alt="${esc(p.title)}"
          loading="lazy"
          onerror="this.src='https://placehold.co/400x400?text=No+Image'"
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
        onerror="this.src='https://placehold.co/400x400?text=No+Image'" />
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

  modalOverlay.style.display   = '';
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
    cartBtn.textContent      = '✓ Added!';
    cartBtn.style.background = '#27ae60';
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
    const id    = Number(favBtn.dataset.id);
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
