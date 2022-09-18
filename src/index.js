function formateDate(timestamp) {
  let data = new Date(timestamp);

  let hours = data.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesady",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[data.getDay()];

  return `${day} ${hours}:${minutes}`;
}
function formatDayName(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let foresatElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
                <div class="weather-forecast-date">${formatDayName(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}℃</span> /
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )} ℃</span>
                </div>
              </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  foresatElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let keyApi = "97f8e93f00107773f88eafd933ce86b7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,alerts,hourly&appid=${keyApi}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let conditionsElemet = document.querySelector("#conditions");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  celciumTemperature = Math.round(responce.data.main.temp);
  temperatureElement.innerHTML = celciumTemperature;
  humidityElement.innerHTML = `Humidity: ${responce.data.main.humidity}%`;
  conditionsElemet.innerHTML = responce.data.weather[0].main;
  windElement.innerHTML = `Wind: ${Math.round(responce.data.wind.speed)} km/h`;
  cityElement.innerHTML = `${responce.data.name}, ${responce.data.sys.country}`;
  timeElement.innerHTML = formateDate(responce.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].main}@2x.png`
  );

  getForecast(responce.data.coord);
}

function search(cityName) {
  let keyApi = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyApi}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function searchHandale(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let celciumTemperature = null;

let submitElement = document.querySelector("#search-form");
submitElement.addEventListener("submit", searchHandale);

search("Lisbon");
