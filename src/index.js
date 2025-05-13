function currentTemperature(response) {
  
    let currentTemperatureValue = document.querySelector("#current-temperature-value");
    let cityElement = document.querySelector("#current-city");
    currentTemperatureValue.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
  
  }
  
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
   let city = searchInputElement.value;
  let apiKey = "a60b443a2tfe8a73acf74oa85192b9bc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(currentTemperature);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  