//let now = new Date();
//let date = now.getDate();

let searchCity = document.querySelector("#searchCity-inputElement");
let currentCity = document.querySelector("#current-city");
let dateDetails = document.querySelector("#current-date");

function refreshWeather(response) {
  let city = response.data.city;
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.temperature.current);
  let currentMeasure = document.querySelector("#current-measure");
  let descriptionElement = document.querySelector("#currentDescription");
  let description = response.data.condition.description;
  description = description.toUpperCase();
  let humidityElement = document.querySelector("#currentHumidity");
  let humidity = response.data.temperature.humidity;
  let windspeedElement = document.querySelector("#currentWindspeed");
  let windspeed = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);

  currentCity.innerHTML = `${city}`;
  dateDetails.innerHTML = formatDate(date);
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed} Km/h`;
  temperatureElement.innerHTML = `${temperature}`;
  currentMeasure.innerHTML = ` °C`;
  document.getElementById("iconImage").src = response.data.condition.icon_url;
  document.getElementById("iconImage").alt = response.data.condition.icon;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (minutes === 0) {
    minutes = "00";
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  return `${day} ${hours}:${minutes},`;
}
function responseCity(city) {
  let apiKey = `f0c1a84ba5f0b6db3obaf7359402cfct`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(refreshWeather);
}
function getForecast(city) {
  let apiKey = `f0c1a84ba5f0b6db3obaf7359402cfct`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&unit=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">☀️</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">15°c</div>
      <div class="weather-forecast-temperature">
        <strong>29°c</strong>
      </div>
    </div>
    <div class="weather-forecast-condition">few clouds</div>
  </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  responseCity(searchCity.value);
}

let formCity = document.querySelector("#searchCity");
formCity.addEventListener("submit", handleSearchSubmit);

responseCity("Brisbane");
