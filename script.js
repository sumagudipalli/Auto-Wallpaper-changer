const wallpapers = [
  
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80', // Nature
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80', // Ocean
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80', // Mountains
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80', // Forest
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1920&q=80', // Sky
  'https://images.unsplash.com/photo-1465146633011-14f8e0781093?auto=format&fit=crop&w=1920&q=80', // River
  'https://images.unsplash.com/photo-1558470598-a5dda9640f68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1455156218388-5e61b526818b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
 ]


let currentWallpaper = 0;

function changeWallpaper() {
  document.body.style.backgroundImage = `url('${wallpapers[currentWallpaper]}')`;
  currentWallpaper = (currentWallpaper + 1) % wallpapers.length;
}
setInterval(changeWallpaper, 5000);
changeWallpaper();

function updateDateTime() {
  const now = new Date();

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  if (timeEl) timeEl.innerText = timeStr;
  if (dateEl) dateEl.innerText = dateStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

  const ApiKey = 'your_api_key'; // Replace with your real Finnhub API key
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT'];
  const stockContainer = document.getElementById('stock-container');

  async function fetchStockPrice(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${ApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.c ? parseFloat(data.c).toFixed(2) : 'N/A';
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error);
      return 'Error';
    }
  }

  async function updateStockPrices() {
    stockContainer.innerHTML = '';
    for (const symbol of stockSymbols) {
      const price = await fetchStockPrice(symbol);
      const stockEl = document.createElement('div');
      stockEl.className = 'stock';
      stockEl.textContent = `${symbol}: ${price === 'N/A' || price === 'Error' ? price : `$${price}`}`;
      stockContainer.appendChild(stockEl);
    }
  }

  updateStockPrices();
  setInterval(updateStockPrices, 300000); // Update every 5 minutes
  // Hardcoded sprint data

function updateSprintStatus() {
  const statuses = [
    "Design phase",
    "In Development",
    "Testing",
    "Sprint Review",
    "Deployed"
  ];
  const sprintEl = document.getElementById("sprint-status");
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  if (sprintEl) sprintEl.innerText = randomStatus;
}
updateSprintStatus();
const apiKey = 'your_api_key'; // Replace with your OpenWeatherMap API key

function fetchWeather() {
  if (!navigator.geolocation) {
    updateWeatherFallback("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Weather fetch failed");
          return response.json();
        })
        .then(data => {
          const temp = Math.round(data.main.temp);
          const weatherMain = data.weather[0].main;
          document.getElementById("temperature").innerText = `⛅ ${temp}°C`;
          document.getElementById("condition").innerText = `${getWeatherIcon(weatherMain)} ${weatherMain}`;
        })
        .catch(() => updateWeatherFallback("⚠️ Weather unavailable"));
    },
    () => updateWeatherFallback("⚠️ Geolocation error")
  );
}

function updateWeatherFallback(message) {
  const tempEl = document.getElementById("temperature");
  const condEl = document.getElementById("condition");

  if (tempEl && condEl) {
    tempEl.innerText = "🌡️ --";
    condEl.innerText = message;
  }
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "clear": return "☀️";
    case "snow": return "❄️";
    case "thunderstorm": return "⛈️";
    default: return "🌈";
  }
}


fetchWeather(); 
