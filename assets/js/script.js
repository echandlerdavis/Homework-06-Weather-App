
const form = document.querySelector(".city-search form")
const button = document.querySelector(".city-city button")
var inputVal;
form.addEventListener("submit", searchCity)
//button.addEventListener(".click-city", searchCity)
//Uses input value, calls functions that fetch weather
function searchCity(event){
    event.preventDefault();
    
    inputVal = document.getElementById("input").value;
    inputVal.trim()
    
    // put what's below this in separate function, call function in searchCity and the for search history buttons. 
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=47674ecc040a86a1dbecd25d66a689b6&units=imperial`

    console.log(inputVal);

    fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(data) {
    fetchWeather(data)
    searchHistoryBtn(inputVal)
  })
  .catch(function(){
   // msg.textContent = "Please search for a valid city";
  })
}

const currentDay = document.querySelector(".currentDayWeather");
const fiveDay = document.querySelector(".fiveDayWeather")

//Gets the weather via lon lat, appends data to the dashboard as cards. 
function fetchWeather(location){
  var lat = location.coord.lat;
  var lon = location.coord.lon;
  console.log(lat, lon);

  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=5e4132e862a54a3999e9243ce383c907&units=imperial`

  fetch(apiUrl)
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    console.log(data);
    const current = data.current;
    const daily = data.daily;
    console.log(current);
    console.log(daily);
    console.log(current.weather[0])

   currentDay.innerHTML = `
      <card id = "current-day">
        <h2>${inputVal}</h2>
        <ul>
          <li><img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" /></li>
          <li>Temp: ${current.temp}</li>
          <li>Humidity: ${current.humidity}%</li>
          <li>Wind Speed: ${current.wind_speed}</li>
          <li>UV Index:${current.uvi} </li>
        </ul>
      </card>
      </div>`

    var cards = "";
    for (var i = 0; i < 6; i++) {
      cards = cards + `<card class="small-card" id="five-day">
      <h2>City Name</h2>
      <ul>
        <li><img src="https://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png" /></li>
        <li>Temp:${daily[i].temp}</li>
        <li>Humidity:${daily[i].temp}%</li>
        <li>Wind Speed:${daily[i].temp}</li>
        <li>UV Index:${daily[i].temp}</li>
      </ul>
    </card>`
    }

    fiveDay.innerHTML = cards;

 
  })
  .catch(function(err){
    console.error(err);
  })
}



      //WHEN I view current weather conditions for that city
//ure weat/THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view futher conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
  //  }


var searchHistory = []

//Creates a button for each search history item. 
function searchHistoryBtn(cityName){
  searchHistory.push(cityName);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));

}
//if (cityName is not in search history)
var historyList = document.getElementById("search-buttons")
function init(){
  var store = localStorage.getItem("search-history");
  if(store){
    searchHistory= JSON.parse(store);
  }
  
  for (var i = 0; i < searchHistory.length; i++) {
    var createBtn = document.createElement('button');
    // createBtn.addClass("click-city")
    
    createBtn.textContent = searchHistory[i];

    historyList.appendChild(createBtn);
    historyList.addEventListener("submit", searchCity)
    //add a class to the buttons, put an event listener on a class 
    //class=clickablecity
    //function that listens for 
  }
  //can make the div scrollable
  //how do i make it stop after 5 items?
  //max length?
  ;
  //function that puts the button value in the input
}

//history button clicker function
//function historyGo(event) {
 // var btn = event.target.id;
 // inputVal = btn.text;
 // console.log(inputVal);
//}
init()
//separate function that runs when the page loads that renders a certain number cities from search history