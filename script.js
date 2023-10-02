// Declare API Key
var currentAPIKey = "1a71b98e1ddfb208c0e00950b3f40a9e";
var forecastAPIKey = "db73a07b2486b3f74ea1b415140a0677";

// Function to fetch current weather data for a city
function fetchCurrentWeather(city) {
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${currentAPIKey}&units=imperial`;
    
    return fetch(currentWeatherURL)
    .then(response => {
        if(response.ok) return response.json();
        throw new Error('Failed to fetch current weather data');
    });
}

// Function to fetch 5-day forecast data for a city
function fetchFiveDayForecast(city) {
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${forecastAPIKey}&units=imperial`;
    
    return fetch(fiveDayForecastURL)
    .then(response => {
        if(response.ok) return response.json();
        throw new Error('Failed to fetch five day forecast data');
    });
}

// Function to display current weather data on the webpage
function displayCurrentWeather(data) {
    var currentWeather = document.getElementById('currentweather');
    // Format and display the fetched data
    currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <p>${new Date().toLocaleDateString()}</p>
        <p>Temp: ${data.main.temp} F</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

function displayFiveDayForecast(data) {
    var fiveDayForecast = document.getElementById('5dayforecast');
    var forecastList = data.list;
    
    // Initialize the innerHTML to an empty string
    fiveDayForecast.innerHTML = '';
    
    for(let i = 0; i < forecastList.length; i += 8) { // Here we are skipping every 8th record to get one record per day
        var dailyForecast = forecastList[i];
        
        // Create elements to hold the forecast data
        var forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast';

        var dateEl = document.createElement('p');
        dateEl.textContent = new Date(dailyForecast.dt * 1000).toLocaleDateString(); // Convert timestamp to date string
        forecastDiv.appendChild(dateEl);

        var iconEl = document.createElement('img');
        iconEl.src = `http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png`; // Use the icon code to get the icon URL
        forecastDiv.appendChild(iconEl);

        var tempEl = document.createElement('p');
        tempEl.textContent = `Temp: ${dailyForecast.main.temp} F`;
        forecastDiv.appendChild(tempEl);

        var windEl = document.createElement('p');
        windEl.textContent = `Wind: ${dailyForecast.wind.speed} MPH`;
        forecastDiv.appendChild(windEl);

        var humidityEl = document.createElement('p');
        humidityEl.textContent = `Humidity: ${dailyForecast.main.humidity}%`;
        forecastDiv.appendChild(humidityEl);
        
        // Append the forecastDiv to the fiveDayForecast container
        fiveDayForecast.appendChild(forecastDiv);
    }
}

function handleSearch() {
    var searchInput = document.getElementById('city');
    var city = searchInput.value.trim();
    if(city) {
        searchInput.value = ''; // clear the input value
        fetchCurrentWeather(city)
        .then(data => {
            displayCurrentWeather(data);
            return fetchFiveDayForecast(city);
        })
        .then(data => {
            displayFiveDayForecast(data);
        })
        .catch(error => {
            console.error("Error fetching weather data: ", error);
        });
    }
}

var searchButton = document.getElementById('searchbutton');
searchButton.addEventListener('click', handleSearch);
