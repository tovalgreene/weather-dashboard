//API KEY -- db73a07b2486b3f74ea1b415140a0677
var forecastAPIKey = "db73a07b2486b3f74ea1b415140a0677";
var forecast;

var currentAPIKey = "1a71b98e1ddfb208c0e00950b3f40a9e";
var current;

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

fetch(queryURL); 