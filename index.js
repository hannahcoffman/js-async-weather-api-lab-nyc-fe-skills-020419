const API_KEY = "9d24d77e476276943dd49c4ab3d451fb"

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault()
  // what do you do when they click submit? 
  // step 1. grab the city they entered in the text box
  const input = document.getElementById('city')
  const city = input.value
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=imperial')
  // pass options to api add the ? and then q for query 
  .then((data) => {return data.json()})
  .then( (json) => {displayCurrentWeather(json)})
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  // need to get main.temp
  const currentTemp = json.main.temp
  const tempContainer = document.getElementById('temp')
  tempContainer.innerHTML = currentTemp
  
  const low = document.getElementById('low')
  const high = document.getElementById('high')
  const humidity = document.getElementById('humidity')
  const cloudCover = document.getElementById('cloudCover')
  low.innerHTML = json.main.temp_min
  high.innerHTML = json.main.temp_max
  humidity.innerHTML = json.main.humidity
  cloudCover.innerHTML = json.clouds.all
  
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
 fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY + '&units=imperial')
 .then( (data) => {return data.json()})
 .then( (json) => {displayFiveDayForecast(json)})
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json)
  // have 40/39 forecasts and we want to make divs for each of them 
 // regular for loop = for(let i=0; i <40; i++){
 const forecasts = json.list
 
 let startingString =''
 for (let forecast of forecasts){
   // make a box 
   // 1. document.createElement = document.createElement('div') when you do this it will always stay there.
   // 2. set innerHTML to be a string it will clear out and replace everything in that
   let divString = "<div><p>" + forecast.main.temp_min + "</p>" + 
   "<p>" + forecast.main.temp_max + "</p>" +
   "<p>" + forecast.dt_txt + "</p> </div>"
   startingString += divString
 }
 const aside = document.getElementById('five-day')
 aside.innerHTML = startingString
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
document.addEventListener('submit', handleFormSubmit)
})
