
const form = document.querySelector(".city-search form")

form.addEventListener("submit", searchCity)


function searchCity(event){
    event.preventDefault();

    const inputVal = document.getElementById("input").value;
    inputVal.trim()
    
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

const currentDay = document.querySelector(".currentDayWeatehr");
const fiveDay = document.querySelector(".fiveDayWeather")

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
function searchHistoryBtn(cityName){
  searchHistory.push(cityName);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));

}
var historyList = document.getElementById("search-buttons")
function init(){
  var store = localStorage.getItem("search-history");
  if(store){
    searchHistory= JSON.parse(store);
  }
  
  for (var i = 0; i < 6; i++) {
    var createBtn = document.createElement('button');
    
    createBtn.textContent = searchHistory[i];
   

    historyList.appendChild(createBtn);
  }
  //how do i make it stop after 5 items?
  //max length?
  createBtn.addEventListener("submit", searchCity);
  //function that puts the button value in the input
}

init()
//separate function that runs when the page loads that renders a certain number cities from search history