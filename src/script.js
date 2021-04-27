"use strict";

//Key: Private
const api = {
  key: "openweatherapp",
};

//Search Bar
const search = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");

//App Container
const weatherApp = document.querySelector(".weather");

//Weather Detail
const city = document.querySelector(".weather__city");
const temperature = document.querySelector(".weather__temperature");
const highLow = document.querySelector(".weather__hi-low");
const humid = document.querySelector(".weather__humidity");
const windSpeed = document.querySelector(".weather__wind");
const weatherIcon = document.querySelector(".weather__icon");
const descript = document.querySelector(".weather__description");
const invalid = document.querySelector(".weather__error");

//Setup Detail for City
const renderCity = function (data) {
  const { description, icon } = data.weather[0];
  const { temp, temp_min, temp_max, humidity } = data.main;
  const { speed } = data.wind;

  const html = `
     <div class="weather__info">
       <h3 class="weather__city">${data.name}</h3>
       <h2 class="weather__temperature">${Math.trunc(temp)}°F</h2>
       <div class="weather__hi-low">H:${Math.trunc(temp_max)}° L:${Math.trunc(
    temp_min
  )}°</div>
       <div class="weather__description">${description}</div>
       <div class="weather__humidity">Humidity: ${humidity}%</div>
       <div class="weather__wind">Wind Speed: ${speed} mph</div>
     </div>
     <figure class="weather__image">
       <img src="http://openweathermap.org/img/wn/${icon}@2x.png"   
        alt="icon" class="weather__icon" />
     </figure>`;

  document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${data.name})`;

  search.value = "";
  search.blur();

  weatherApp.innerHTML = " ";
  invalid.innerHTML = "";
  weatherApp.insertAdjacentHTML("afterbegin", html);
  weatherApp.style.opacity = 1;
};

//Error message
const renderError = function () {
  const errMsg = `Please enter a valid city.`;

  search.value = "";
  search.blur();

  invalid.innerHTML = "";
  invalid.insertAdjacentText("afterbegin", errMsg);
};

//Download Weather Api
const locate = async function (city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api.key}`
    );
    // console.log(res);
    const data = await res.json();

    renderCity(data);
  } catch (err) {
    renderError();
  }
};

search.addEventListener("keydown", function (e) {
  if (e.key === "Enter") locate(search.value);
});

searchBtn.addEventListener("click", function () {
  locate(search.value);
});
