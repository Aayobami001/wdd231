// ==========================
// MOBILE NAVIGATION
// ==========================
const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});


// ==========================
// FOOTER YEAR + LAST MODIFIED
// ==========================
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastMod").textContent = document.lastModified;


// ==========================
// LOCAL STORAGE – VISITOR MESSAGE
// ==========================
const visitMsg = document.querySelector("#visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMsg.textContent =
    "Welcome! Let us know if you have any questions.";
} else {
  const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    visitMsg.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    visitMsg.textContent = "You last visited 1 day ago.";
  } else {
    visitMsg.textContent = `You last visited ${diffDays} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);


// ==========================
// WEATHER API (Using OpenWeatherMap)
// ==========================

// Replace with your working API key
const API_KEY = "YOUR_API_KEY_HERE";
const CITY = "Lagos,NG";
const weatherBox = document.querySelector("#weatherData");

async function loadWeather() {
  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data unavailable");

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherBox.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" 
           alt="${desc}">
      <p><strong>${temp}°C</strong> — ${desc}</p>
    `;
  } catch (err) {
    weatherBox.textContent = "Unable to load weather data.";
    console.error(err);
  }
}

loadWeather();


// ==========================
// DYNAMIC SPOTLIGHT CAR CARDS
// ==========================
const featureContainer = document.querySelector("#featureContainer");

async function loadSpotlights() {
  try {
    const response = await fetch("./data/spotlights.json");
    if (!response.ok) throw new Error("Spotlight data missing");

    const cars = await response.json();

    // Pick only 3 random spotlight items
    const selected = cars.sort(() => 0.5 - Math.random()).slice(0, 3);

    featureContainer.innerHTML = selected
      .map(
        (car) => `
        <div class="feature-card">
          <img src="images/spotlights/${car.image}" alt="${car.model}">
          <h3>${car.brand} — ${car.model}</h3>
          <p>${car.description}</p>
          <p><strong>Price:</strong> ${car.price}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error(error);
    featureContainer.innerHTML = `<p>Unable to load spotlight cars.</p>`;
  }
}

loadSpotlights();
