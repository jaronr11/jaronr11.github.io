const endpoint_weather = "https://api.open-meteo.com/v1/forecast";
const endpoint_geo_convert = "https://api.api-ninjas.com/v1/geocoding";
let current = {
    city_name: "",
    long: "",
    lat: "",
    wind: "",
    windDir: ""
}

let vars = {
    wind_bool: false,
    wind_direction: false
}

function getUserLocationWeather() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
function success(position) {
    current.lat = position.coords.latitude;
    current.long = position.coords.longitude;
    current.city_name = "Location";
    document.getElementById("city-name-input").value = "";
    getWeather();
}
function error(err) {
    console.log(err);
    alert("Error getting user location" + err.message);
}
async function getInput() {
    const cityField = document.getElementById("city-name-input")
    const city_name = cityField.value;
    if (!city_name) {
        alert("Please enter a city name!");
        return;
    }
    current.city_name = city_name;
    console.log(city_name);
    await convertGeo(current.city_name);
    getWeather();
}


async function convertGeo(city_name) {
    try {
        const response = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(city_name)}&limit=1`
          );
        const json = await response.json();
        const first = json.features[0];
        const [lon, lat] = first.geometry.coordinates;
        current.long = lon;
        current.lat = lat;
        
    } catch (error) {
        return;
    }
}

async function getWeather() {
    try {
        console.log(current.lat);
        console.log(current.long);
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + current.lat + "&longitude=" + current.long + "&current_weather=true");
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        const weather = json.current_weather.temperature; 
        console.log(json);
        current.wind = json.current_weather.windspeed;
        current.windDir = json.current_weather.winddirection;

        displayWeather(weather);
    }
    catch(err) {
        console.log(err);
        alert("Please enter a valid city name.");
    }
}

function displayWeather(weather) {
    const disp = document.getElementById("weather-output");
    disp.textContent = "Temperature: " + weather + " °C";
    if (vars.wind_bool) {
        const windDisp = document.getElementById("wind-output");
        windDisp.textContent = "Windspeed: " + current.wind + " km/h";
    }
    if (vars.wind_direction) {
        const windDisp = document.getElementById("windDir-output");
        windDisp.textContent = "Wind Direction: " + current.windDir + "°";
    }
}

function enableWindSpeed() {
    vars.wind_bool = !vars.wind_bool
    const windDisp = document.getElementById("wind-output");
    windDisp.textContent = "Windspeed:"
    
}

function enableWindDir() {
    vars.wind_direction = !vars.wind_direction
    const windDisp = document.getElementById("windDir-output");
    windDisp.textContent = "Wind Direction:"
    
}
