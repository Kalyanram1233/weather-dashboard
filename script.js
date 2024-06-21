const apiKey = '62021ae2debdc58e2a7404fbfbf67dc3';
const weatherDashboard = document.getElementById('weather-dashboard');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');

async function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) return alert('Please enter a location');
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const weatherData = await response.json();

        if (weatherData.cod !== 200) throw new Error(weatherData.message);
        
        displayCurrentWeather(weatherData);

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayCurrentWeather(data) {
    currentWeatherDiv.innerHTML = `
        <div class="weather-item">
            <h2>Current Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        </div>
    `;
}

function displayForecast(data) {
    forecastDiv.innerHTML = '<h2>Forecast</h2>';
    const forecastItems = data.list.slice(0, 5).map(item => {
        const date = new Date(item.dt * 1000);
        return `
            <div class="weather-item">
                <p>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
                <p>Temperature: ${item.main.temp}°C</p>
                <p>Weather: ${item.weather[0].description}</p>
            </div>
        `;
    }).join('');
    forecastDiv.innerHTML += forecastItems;
}


