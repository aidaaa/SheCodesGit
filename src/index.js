let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let current_btn = document.querySelector("#current_btn");
let search_btn = document.querySelector("#search_btn");
let input = document.querySelector("#city-input");

function configureTime() {
  let now = new Date();
  let hour = now.getHours();
  hour = hour < 10 ? `0${hour}` : hour;

  let min = now.getMinutes();
  min = min < 10 ? `0${min}` : min;

  let day = days[now.getDay()];

  let time = `${day} ${hour}:${min}`;
  let dateSpan = document.querySelector("#date-span");
  dateSpan.innerHTML = time;
}

function configureCurrentLocationData(data) {
  console.log(data);
  let cityName = document.querySelector("#current-city-name");
  let cityTemp = document.querySelector("#current-city-temp");
  let cityHumidity = document.querySelector("#current-city-humidity");
  let cityWind = document.querySelector("#current-city-wind");
  let weather = document.querySelector("#weather-span");

  cityName.innerHTML = data.data.name;
  cityTemp.innerHTML = Math.round(data.data.main.temp);
  cityWind.innerHTML = data.data.wind.speed + "km/h";
  cityHumidity.innerHTML = data.data.main.humidity + "%";
  weather.innerHTML = data.data.weather[0].description;
}

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&}&units=${units}`;
  axios.get(apiUrl).then(configureCurrentLocationData);
}

current_btn.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
});

search_btn.addEventListener("click", (event) => {
  event.preventDefault();
  let city = input.value;
  console.log(city);
  if (city.length > 0) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&}&units=${units}`;
    axios.get(apiUrl).then(configureCurrentLocationData);
  }
});

configureTime();
