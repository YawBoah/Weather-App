const apiKey = "cd65c280162425589e7bce0b64f08145";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
    }
    const data = await response.json();

    console.log(data);

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    weatherIcon.src = getWeatherIconSrc(weatherMain);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function getWeatherIconSrc(weatherMain) {
  switch (weatherMain) {
    case "Clouds":
      return "images/cloudy.png";
    case "Clear":
      return "images/clear.png";
    case "Rain":
      return "images/rain.png";
    case "Snow":
      return "images/snowy.png";
    case "Drizzle":
      return "images/drizzle.png";
    case "Mist":
      return "images/mist.png";
    default:
      return "images/default.png"; 
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});