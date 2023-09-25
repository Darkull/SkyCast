"use strict";

const apikey = "35de801035467dcb899bac4c3339aea6";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  // preventing reload on btn click
  event.preventDefault();
  //   storing input value
  const cityValue = cityInputEl.value;
  console.log(cityValue);

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    // fetched data for specific city/nation
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // converted data to json format to use in site
    const data = await response.json();

    // getting the data I need
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `wind speed: ${data.wind.speed} m/s`,
    ];

    console.log(details);
    console.log(description);
    console.log(temperature);

    // Replacing With Realtime Data
    weatherDataEl.querySelector(".icon").innerHTML = `<img
    src="https://openweathermap.org/img/wn/${icon}.png"
    alt="Weather Icon"
  />`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";

    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later.";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
