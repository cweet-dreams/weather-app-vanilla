function formateDate(timestamp) {
  let data = new Date(timestamp);
  console.log(data);
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

function showTemperature(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let conditionsElemet = document.querySelector("#conditions");
  let timeElement = document.querySelector("#time");
  temperatureElement.innerHTML = Math.round(responce.data.main.temp);
  humidityElement.innerHTML = `Humidity: ${responce.data.main.humidity}`;
  conditionsElemet.innerHTML = responce.data.weather[0].main;
  windElement.innerHTML = `Wind: ${responce.data.wind.speed}`;
  cityElement.innerHTML = `${responce.data.name}, ${responce.data.sys.country}`;
  timeElement.innerHTML = formateDate(responce.data.dt * 1000);
}
let keyApi = "00ceb4c1a676b6d772176beae74069d4";
cityName = "Kharkiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyApi}&units=metric`;

axios.get(apiUrl).then(showTemperature);
