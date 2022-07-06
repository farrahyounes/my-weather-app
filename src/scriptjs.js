function dateTime(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let currentDate = date.getDate();
  let time = date.getHours();
  if (time < 10) time = "0" + time;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  return `${day}, ${month} ${currentDate} ${time}:${minutes}`;
}
let dataClock = document.querySelector("#curr-date");
let currentTime = new Date();
dataClock.innerHTML = dateTime(currentTime);

function showLocTemp(response) {
  let city = response.data.name;
  let cityChoosen = document.querySelector("#city");
  cityChoosen.innerHTML = `${city}`;

  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#actualdegree");
  currentTemp.innerHTML = `${temp}`;

  let description = response.data.weather[0].description;
  let descriptionText = document.querySelector("#description");
  descriptionText.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity} %`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsElement = document.querySelector("#feelslike");
  feelsElement.innerHTML = `${feelsLike} °C`;

  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${windSpeed} km/hr`;
}

function displayCityTemp(city) {
  let apiKey = "04e252e3e98f65a4c18907e95ddf02cb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocTemp);
}

function pushSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  displayCityTemp(city);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", pushSubmit);

function showPlace(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.latitude;

  let apiKey = "04e252e3e98f65a4c18907e95ddf02cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showLocTemp);
}

function getExactLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPlace);
}

let locationBtn = document.querySelector("#current-location-button");
locationBtn.addEventListener("click", getExactLoc);

navigator.geolocation.getCurrentPosition(showPlace);
