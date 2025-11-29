// Insert timestamp on form load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();
});

// Modal Logic
const modalLinks = document.querySelectorAll(".open-modal");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

modalLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.modal);
    target.style.display = "block";
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

window.onclick = function(e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

// set current year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyrightYear');
  const lastEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastEl) lastEl.textContent = document.lastModified || 'Unknown';
});


// Thank You page | Form Informations
const params = new URLSearchParams(window.location.search);

  document.getElementById('first').textContent = params.get('first');
  document.getElementById('last').textContent = params.get('last');
  document.getElementById('email').textContent = params.get('email');
  document.getElementById('phone').textContent = params.get('phone');
  document.getElementById('organization').textContent = params.get('organization');
  document.getElementById('timestamp').textContent = params.get('timestamp');