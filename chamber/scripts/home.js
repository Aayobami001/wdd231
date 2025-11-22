// responsive nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('primary-nav');

  if (!menuButton || !nav) return;

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const spotlightContainer = document.getElementById('spotlightContainer');
  const weatherCurrent = document.getElementById('weatherCurrent');
  const weatherForecast = document.getElementById('weatherForecast');

  // fetching members and displaying 2-3 random silver/gold members
  async function loadSpotlights() {
    try {
      const res = await fetch('data/members.json');
      if (!res.ok) throw new Error('Failed to load members');
      const members = await res.json();

      // filter silver/gold (membership 2 or 3)
      const eligible = members.filter(m => m.membership >= 2);
      if (eligible.length === 0) {
        spotlightContainer.innerHTML = '<p class="muted">No featured members currently.</p>';
        return;
      }

      // shuffle and pick up to 3
      const shuffled = eligible.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(3, shuffled.length));

      // render cards
      spotlightContainer.innerHTML = '';
      selected.forEach(member => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';
        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name} photo" loading="lazy" onerror="this.src='images/placeholder-business.png'">
          <div class="spot-meta">
            <h3>${member.name}</h3>
            <p><strong>${member.category}</strong></p>
            <p>${truncate(member.description, 140)}</p>
            <p class="small"><a href="directory.html">View Profile</a></p>
          </div>
        `;
        spotlightContainer.appendChild(card);
      });

    } catch (err) {
      console.error(err);
      spotlightContainer.innerHTML = '<p class="error">Unable to load spotlights.</p>';
    }
  }

  // simple truncate helper
  function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + '…' : str;
  }

  // Weather placeholders (my API later)
//   function displayWeatherPlaceholders() {
//     const nowHtml = `
//       <p class="muted">75°F — Partly Cloudy</p>
//       <p>High: 85° &nbsp; Low: 52°</p>
//       <p>Humidity: 34%</p>
//       <p>Sunrise: 7:30am &nbsp; Sunset: 6:59pm</p>
//     `;
//     weatherCurrent.innerHTML = nowHtml;

//     const forecastHtml = `
//       <p><strong>Today:</strong> 90°F</p>
//       <p><strong>Wednesday:</strong> 89°F</p>
//       <p><strong>Thursday:</strong> 68°F</p>
//     `;
//     weatherForecast.innerHTML = forecastHtml;
//   }

//   // init
//   loadSpotlights();
//   displayWeatherPlaceholders();
});

// = WEATHER API FUNCTIONALITY =
const weatherContainer = document.querySelector('.weather-box');

// My API key
const API_KEY = "797abab4ce921f4728692eb96215984f";
const CITY = "Lagos";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Weather data not found");

        const data = await response.json();

        // Extract needed fields
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const icon = data.weather[0].icon;

        // Inject into UI
        weatherContainer.innerHTML = `
            <h3>Weather in ${CITY}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Conditions:</strong> ${desc}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind:</strong> ${wind} m/s</p>
        `;
    } catch (error) {
        console.error("Weather error:", error);
        weatherContainer.innerHTML = `<p>Unable to load weather data.</p>`;
    }
}

getWeather();


// = THREE-DAY FORECAST =

// My API key
const My_KEY = "797abab4ce921f4728692eb96215984f";

// Coordinates for Lagos, Nigeria
const lat = 6.5244;
const lon = 3.3792;

// OpenWeather 5-day/3-hour forecast API
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

const forecastBox = document.querySelector(".forecast-box");

async function loadForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error("Unable to load forecast");

        const data = await response.json();

        // API returns 40 entries (3-hour intervals)
        // Extract the forecast for roughly the same time each day (12:00)
        const threeDay = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        forecastBox.innerHTML = `
            <h3>3-Day Forecast</h3>
            <div class="forecast-grid">
                ${threeDay.map(day => {
                    const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
                    return `
                        <div class="forecast-card">
                            <h4>${date}</h4>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
                            <p><strong>${day.main.temp.toFixed(0)}°C</strong></p>
                            <p>${day.weather[0].description}</p>
                        </div>
                    `;
                }).join("")}
            </div>
        `;

    } catch (error) {
        console.error("Forecast error:", error);
        forecastBox.innerHTML = "<p>Unable to load 3-day forecast.</p>";
    }
}

loadForecast();

// set current year and last modified
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyrightYear');
  const lastEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastEl) lastEl.textContent = document.lastModified || 'Unknown';
});