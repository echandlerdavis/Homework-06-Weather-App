
const form = document.querySelector(".city-search form")
//Should this be to the form or to the button?

form.addEventListener("submit", searchCity)


function searchCity(event){
    event.preventDefault();

    const inputVal = document.getElementById("input").value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=47674ecc040a86a1dbecd25d66a689b6`

    console.log(inputVal);

    fetch(url)
  .then(function(response){
      return response.json()
  })
  .then(function(data) {
    //console.log(data)
    fetchWeather(data)
    searchHistoryBtn(inputVal)
    // do stuff with the data-- log and lattitude...help. Do I need to go through multiple rounds of this to make it work?
  })
  .catch(function(){
   // msg.textContent = "Please search for a valid city";
  })
  // loop through the data so that it only renders info for each card, 6 day total forecast//

}
// Need the above to be stored to local storage and rendered to the search History as buttons

function fetchWeather(location){
  var lat = location.coord.lat;
  var lon = location.coord.lon;
  console.log(lat, lon);

  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=47674ecc040a86a1dbecd25d66a689b6`

  fetch(apiUrl)
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(err){
    console.error(err);
  })
}

var searchHistory = []
function searchHistoryBtn(cityName){
  searchHistory.push(cityName);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));

  // go to local storage
  // 
  // append most recent search

}

function init(){
  var store = localStorage.getItem("search-history");
  if(store){
    searchHistory= JSON.parse(store);
  }
}

init()
//separate function that runs when the page loads that renders a certain number cities from search history