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
  };
  
  function searchCity(city) {
    let apiKey = "a60b443a2tfe8a73acf74oa85192b9bc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    
    axios.get(apiUrl).then(currentTemperature);
  }

  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
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

  function getForecast(city) {
    let apikey = "a60b443a2tfe8a73acf74oa85192b9bc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  }


  function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

   days.forEach(function(day) {
    forecastHtml = forecastHtml + 
    `
      <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">🌤️</div>    
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>15°</strong>
           </div>
          <div class="forecast-temperature">9°</div>
        </div>
      </div>
    `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  searchCity("New York");
  displayForecast();

 
  