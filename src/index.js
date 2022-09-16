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
function displayForecast() {
  let foresatElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
              </div>
   `;
  });

  forecastHTML = forecastHTML + `</div>`;

  foresatElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let keyApi = "97f8e93f00107773f88eafd933ce86b7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,daily,alerts,hourly&appid=${keyApi}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast());
}

https: function showTemperature(responce) {
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
  windElement.innerHTML = `Wind: ${responce.data.wind.speed} km/h`;
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

function displayInF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciumTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitElement.classList.add("active-unit");
  celciumElement.classList.remove("active-unit");
}

function displayInC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celciumTemperature;
  fahrenheitElement.classList.remove("active-unit");
  celciumElement.classList.remove("active-unit");
}

let celciumTemperature = null;

let submitElement = document.querySelector("#search-form");
submitElement.addEventListener("submit", searchHandale);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayInF);

let celciumElement = document.querySelector("#celcium");
celciumElement.addEventListener("click", displayInC);

search("Lisbon");
