
const form = document.querySelector(".city-search form")

form.addEventListener("submit", searchCity)

function searchCity(event){
    event.preventDefault();
    const inputVal = document.getElementById("input").value;
    console.log(inputVal);
}

var url = ''
fetch(url)
  .then(response => response.json())
  .then(function(data) {
    // do stuff with the data
  })
  .catch(function(){
    msg.textContent = "Please search for a valid city 😩";
  });