function currentTemperature(response) {
    let currentTemperatureValue = document.querySelector("#current-temperature-value");
    let cityElement = document.querySelector("#current-city");
    let temperature = response.data.temperature.current;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    currentTemperatureValue.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
 
    getForecast(response.data.city);
  };
  
  function searchCity(city) {
    let apiKey = "a60b443a2tfe8a73acf74oa85192b9bc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    
    axios.get(apiUrl).then(currentTemperature);
  }

  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
   
    searchCity(searchInputElement.value);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    
  
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
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return days[day];
  }

  function getForecast(city) {
    let apiKey = "a60b443a2tfe8a73acf74oa85192b9bc";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(displayForecast);
    console.log(apiUrl);
  }

  function displayForecast(response) {
    console.log(response.data);
 
    let forecastHtml = "";

   response.data.daily.forEach(function(day, index) {
    if (index < 5) {
      forecastHtml = forecastHtml + 
      `
      <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
          <img src ="${day.condition.icon_url}" class="forecast-icon" />  
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
           </div>
          <div class="forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>
      `;
    }
  });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  searchCity("Ghana");
 
  

 
  