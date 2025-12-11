// ================================
// AutoHub Inventory Page Script
// ================================

// IMPORT DATA (ES Module)
import cars from "../data/cars.mjs";

// DOM ELEMENTS
const grid = document.querySelector(".grid");
const brandFilter = document.querySelector("#brandFilter");
const yearFilter = document.querySelector("#yearFilter");

// MODAL ELEMENTS
const modal = document.querySelector("#carModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

// ================================
// INITIALIZE PAGE
// ================================
document.addEventListener("DOMContentLoaded", () => {
  loadCars(cars);           // display inventory
  populateFilters(cars);    // build filter dropdowns
  attachFilterListeners();  // activate filter interactions
});


// ================================
// LOAD & DISPLAY CAR CARDS
// ================================
function loadCars(carList) {
  grid.innerHTML = ""; // clear existing

  carList.forEach(car => {
    const card = document.createElement("div");
    card.classList.add("car-card");

    card.innerHTML = `
      <img src="images/cars/${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
      <div class="car-info">
        <h3>${car.brand} ${car.model}</h3>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Mileage:</strong> ${car.mileage.toLocaleString()} km</p>
        <p><strong>Fuel:</strong> ${car.fuel}</p>
        <p class="price">$${car.price.toLocaleString()}</p>
        <button class="details-btn" data-id="${car.id}">View Details</button>
      </div>
    `;

    grid.appendChild(card);
  });

  activateModals();
}


// ================================
// POPULATE FILTER OPTIONS
// ================================
function populateFilters(data) {
  // Brands
  const brands = [...new Set(data.map(car => car.brand))];
  brands.sort().forEach(b => {
    const option = document.createElement("option");
    option.value = b;
    option.textContent = b;
    brandFilter.appendChild(option);
  });

  // Years
  const years = [...new Set(data.map(car => car.year))];
  years.sort((a, b) => b - a).forEach(y => {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearFilter.appendChild(option);
  });
}


// ================================
// FILTER HANDLING
// ================================
function attachFilterListeners() {
  brandFilter.addEventListener("change", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
}

function applyFilters() {
  const brandVal = brandFilter.value;
  const yearVal = yearFilter.value;

  let filtered = [...cars];

  if (brandVal !== "all") {
    filtered = filtered.filter(c => c.brand === brandVal);
  }

  if (yearVal !== "all") {
    filtered = filtered.filter(c => c.year == yearVal);
  }

  loadCars(filtered);
}


// ================================
// MODAL — VIEW DETAILS
// ================================
function activateModals() {
  const detailButtons = document.querySelectorAll(".details-btn");

  detailButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const car = cars.find(c => c.id == id);

      showModal(car);

      // LocalStorage usage
      localStorage.setItem("lastViewedCar", `${car.brand} ${car.model}`);
    });
  });
}

function showModal(car) {
  modal.style.display = "flex";

  modalContent.innerHTML = `
    <h2>${car.brand} ${car.model}</h2>
    <img src="images/cars/${car.image}" alt="${car.brand} ${car.model}">
    
    <p><strong>Year:</strong> ${car.year}</p>
    <p><strong>Mileage:</strong> ${car.mileage.toLocaleString()} km</p>
    <p><strong>Fuel Type:</strong> ${car.fuel}</p>
    <p><strong>Transmission:</strong> ${car.transmission}</p>
    <p><strong>Engine:</strong> ${car.engine}</p>
    <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>

    <button id="closeModal" class="close-btn">Close</button>
  `;

  document.querySelector("#closeModal").addEventListener("click", () => {
    modal.style.display = "none";
  });
}


// Close modal if clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// ================================
// ERROR HANDLING TEMPLATE EXAMPLE
// (necessary for project requirements)
// ================================
async function getExternalData() {
  try {
    const response = await fetch("some-api-url");

    if (!response.ok) {
      throw new Error("API Error: " + response.status);
    }

    const result = await response.json();
    console.log(result);

  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

// ==========================
// FOOTER YEAR + LAST MODIFIED
// ==========================
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastMod").textContent = document.lastModified;
