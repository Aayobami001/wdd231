import { places } from "../data/places.mjs";

// Elements
const grid = document.getElementById('discoverGrid');
const visitMessage = document.getElementById('visitMessage');
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalAddress = document.getElementById('modalAddress');
const modalDesc = document.getElementById('modalDesc');
const modalClose = modal.querySelector('.modal-close');

// --- Render cards into the grid (8 cards)
function renderCards(items) {
  grid.innerHTML = ''; // clear

  items.forEach((item, index) => {
    // create card using required elements: h2, figure, address, p, button
    const card = document.createElement('article');
    card.className = 'place-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-index', index);

    const title = document.createElement('h2');
    title.textContent = item.title;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `images/${item.image}`;
    img.alt = item.title;
    img.loading = 'lazy';
    img.width = 300;
    img.height = 200;
    img.onerror = () => img.src = 'images/placeholder-business.png';
    figure.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = item.address;

    const p = document.createElement('p');
    p.textContent = item.description;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'learn-btn';
    btn.textContent = 'Learn more';
    btn.addEventListener('click', () => openModal(item));

    // append in semantically ordered way
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(addr);
    card.appendChild(p);
    card.appendChild(btn);

    grid.appendChild(card);
  });
}

// --- Modal open/close
function openModal(item) {
  modalTitle.textContent = item.title;
  modalImage.src = `images/${item.image}`;
  modalImage.alt = item.title;
  modalAddress.textContent = item.address;
  modalDesc.textContent = item.description;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

// close handlers
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
});

// --- Last visit logic using localStorage
const LAST_VISIT_KEY = 'discover-last-visit';

function showVisitMessage() {
  const now = Date.now();
  const last = localStorage.getItem(LAST_VISIT_KEY);

  if (!last) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diffMs = now - Number(last);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 24 * 60 * 60 * 1000) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  // store current timestamp for next visit
  localStorage.setItem(LAST_VISIT_KEY, String(now));
}

// --- Init
document.addEventListener('DOMContentLoaded', () => {
  renderCards(places);
  showVisitMessage();
});

// set current year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyrightYear');
  const lastEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastEl) lastEl.textContent = document.lastModified || 'Unknown';
});