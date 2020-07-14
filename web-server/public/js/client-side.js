const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const info = document.querySelector("#weather-data");
info.textContent = "On Search ,your weather data shows here";
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = searchText.value;
  info.setAttribute("style", "color:palegreen;");
  info.textContent = "Loading...";
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((weatherData) => {
      if (weatherData.data) {
        info.textContent = weatherData.data;
      } else {
        info.setAttribute("style", "color:red;");
        info.textContent = "! Invalid location..Enter a valid one";
      }
    });
  });
});
