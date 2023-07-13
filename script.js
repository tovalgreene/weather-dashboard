var city = `Atlanta`;
var date = `9/13/22`;
var temp = `76.62 F`;
var wind = `8.43 MPH`;
var humidity = `44%`;

   
function fetchWeatherData(){
    var currentAPIKey = "1a71b98e1ddfb208c0e00950b3f40a9e";
    var APIURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    
    return fetch(APIURL)
    .then(response => {
       return response.json();
    })
}

function displayCurrentWeather(city){
    var currentWeather = document.getElementById('currentweather');
    currentWeather.innerHTML = `
    <h2>${city}</h2>
    <p>${date}</p>
    <p>Temp: ${temp}</p>
    <p>Wind: ${wind}</p>
    <p>Humidity: ${humidity}</p>
    `;
}