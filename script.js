// Selecting HTML elements where data will be displayed
const locationName = document.querySelector('#location-name')
const weatherMain = document.querySelector('#weather-main')
const weatherDescription = document.querySelector('#weather-description')
const weatherIcon = document.querySelector('#weather-icon')
const temp = document.querySelector('#temp')
const feelsLike = document.querySelector('#feels-like')
const tempMin = document.querySelector('#temp-min')
const tempMax = document.querySelector('#temp-max')
const pressure = document.querySelector('#pressure')
const humidity = document.querySelector('#humidity')
const visibility = document.querySelector('#visibility')
const cloudiness = document.querySelector('#cloudiness')
const windSpeed = document.querySelector('#wind-speed')
const windDeg = document.querySelector('#wind-deg')
const windGust = document.querySelector('#wind-gust')
const rain1h = document.querySelector('#rain-1h')
const coordLon = document.querySelector('#coord-lon')
const coordLat = document.querySelector('#coord-lat')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')

// Define the base URL and API key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f289b770394406b9af93f454cc07ddcd';

// Async function 
async function fetchWeatherData(city) {
    // the API URL with the variables I gave to it
    const apiUrl = `${baseURL}?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('City entry unavailable');
        
        const data = await response.json();

        //HTML elements with data from the API
        locationName.textContent = data.name;
        weatherMain.textContent = data.weather[0].main
        weatherDescription.textContent = data.weather[0].description
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = `${data.main.temp} °C`
        feelsLike.textContent = `${data.main.feels_like} °C`
        tempMin.textContent = `${data.main.temp_min} °C`
        tempMax.textContent = `${data.main.temp_max} °C`;
        pressure.textContent = `${data.main.pressure} hPa`;
        humidity.textContent = `${data.main.humidity}%`;
        visibility.textContent = `${data.visibility} m`;
        cloudiness.textContent = `${data.clouds.all}%`;
        windSpeed.textContent = `${data.wind.speed} m/s`;
        windDeg.textContent = `${data.wind.deg}°`;
        windGust.textContent = data.wind.gust ? `${data.wind.gust} m/s` : 'N/A';
        rain1h.textContent = data.rain ? `${data.rain['1h']} mm` : 'No rain';
        coordLon.textContent = data.coord.lon;
        coordLat.textContent = data.coord.lat;
        sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
        sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString()
    } catch (error) {
        console.error('Error fetching weather data:', error);
        locationName.textContent = 'Cannot find city';
    }
}

// Debounce function to limit the API calls while typing
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// Event listener
const cityInput = document.querySelector('#city-input');
cityInput.addEventListener('input', debounce(() => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city); // Fetch weather for the city entered by the user
    }
}, 500)); 

// Fetch weather for a default city when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('Kumasi'); // Default city
});
