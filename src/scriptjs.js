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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul class="right-list">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        ` <li class="forecast">
                <div class="day-info">
                  <p>${formatDay(forecastDay.dt)}</p>
                    <span> ${Math.round(forecastDay.temp.max)}° </span>
                    <span class="lower-temp"> ${Math.round(
                      forecastDay.temp.min
                    )}° </span>
                </div>
                <img src="./images/${
                  forecastDay.weather[0].icon
                }.gif" alt="" width="40">
              </li>`;
    }
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(response.data);
}
function getForecast(coordinates) {
  let apiKey = "04e252e3e98f65a4c18907e95ddf02cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showLocTemp(response) {
  let cityChoosen = document.querySelector("#city");
  cityChoosen.innerHTML = `${response.data.name}`;

  let currentTemp = document.querySelector("#actualdegree");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;

  let descriptionText = document.querySelector("#description");
  descriptionText.innerHTML = `${response.data.weather[0].description}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let visibilityElement = document.querySelector("#visibility");
  visibilityElement.innerHTML = `${response.data.visibility / 1000} km`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/hr`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `./images/${response.data.weather[0].icon}.gif`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("width", "50px");

  celsiusTemperature = response.data.main.temp;

  let cloudElement = document.querySelector("#cloudiness-percent");
  cloudElement.innerHTML = `${response.data.clouds.all}%`;

  getForecast(response.data.coord);
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

//current button
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

//function call
displayCityTemp("Cairo");
