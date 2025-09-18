// ======== Weather Section =========
const weatherContainer = document.getElementById("weather-container");
const apiKey = "d6f5822ea7b0ff4aa5b3507d4d16112e"; 
const city = "Lagos";
const units = "metric"; // Celsius

async function fetchWeather() {
  try {
    // Current weather
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();

    // Forecast (3-day)
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    displayWeather(weatherData, forecastData);
  } catch (error) {
    weatherContainer.innerHTML = "<p>Unable to load weather data.</p>";
    console.error(error);
  }
}

function displayWeather(current, forecast) {
  weatherContainer.innerHTML = `
    <p><strong>Now:</strong> ${current.main.temp.toFixed(1)}°C, ${current.weather[0].description}</p>
    <h3>3-Day Forecast</h3>
  `;

  // pick 12:00 time for next 3 days
  const days = forecast.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  days.forEach(day => {
    const date = new Date(day.dt_txt);
    const temp = day.main.temp.toFixed(1);
    const desc = day.weather[0].description;
    weatherContainer.innerHTML += `
      <div class="weather-day">
        <span>${date.toDateString()}</span>
        <span>${temp}°C, ${desc}</span>
      </div>
    `;
  });
}

fetchWeather();


// ======== Spotlights Section =========
const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const res = await fetch("data/members(2).json"); // adjust path if needed
    const members = await res.json();

    // filter gold or silver
    const filtered = members.filter(m => 
      m.membership.toLowerCase() === "gold" || 
      m.membership.toLowerCase() === "silver"
    );

    // random shuffle
    const shuffled = filtered.sort(() => 0.5 - Math.random());

    // pick 2 or 3 members
    const spotlights = shuffled.slice(0, 3);

    displaySpotlights(spotlights);
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Unable to load members.</p>";
    console.error(error);
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";
  members.forEach(m => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="logo-wrap"><img src="${m.image}" alt="${m.name} logo"></div>
      <h2>${m.name}</h2>
      <p>${m.address}</p>
      <p>📞 ${m.phone}</p>
      <a href="${m.website}" target="_blank">Visit Website</a>
      <p><em>${m.membership} Member</em></p>
    `;
    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();


// ======== Footer Year + Last Modified =========
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
