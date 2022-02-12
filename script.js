const inputSearch = document.getElementById('input');
// console.log(city.textContent);
// console.log(date.textContent);
const api = {
	key: "1b2155c9e1920d0e87dd7b6024e588e0",
	base: "https://api.openweathermap.org/data/2.5/"
}

inputSearch.addEventListener('keypress', evtQuery);

function evtQuery(evt) {
	if (evt.keyCode == 13)
	{
		getResults(inputSearch.value);
	}
}

// call da API com a query (valor digitado na barra de busca)
function getResults(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then(weather => {
			return weather.json();
		}).then(displayResults);
}

function displayResults(weather) {
	console.log(weather);
let date = document.getElementById('date-name');
let city = document.querySelector('.city');
let temp = document.querySelector('.temp-value');
let description = document.querySelector('.description');
let minMax = document.querySelector('.min-max');

// modify the values displayed in the page depending on the API data
description.textContent = weather.weather[0].description;
city.textContent = weather.name + ", " + weather.sys.country;
temp.innerHTML = Math.round(weather.main.temp) + "<span>°c</span";
minMax.textContent = Math.round(weather.main.temp_min) + " °c — " + Math.round(weather.main.temp_max) + " °c";
date.textContent = buildDate();
changeBg(weather);
}

function buildDate() {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
				"October", "November", "December"];
	let daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let today = new Date();
	let dayWeekDate = today.getDay();
	let dayDate = today.getDate();
	let monDate = today.getMonth()+1;
	let yearDate = today.getFullYear();
	// Now we construct the date string that will be displayed
	let dateConstructed = daysWeek[dayWeekDate] + " — " + dayDate + " " + months[monDate] + " " + yearDate; 
	return dateConstructed;
}

function changeBg(weather) {
	let background = document.querySelector('.wrapp-app');
	let iconWeather = parseInt(weather.weather[0].icon);
	if (iconWeather == 1){
		background.style.backgroundImage = "url('./images/clear-sky.jpg')";
	}
	else if (iconWeather > 1 && iconWeather < 5) {
		// console.log(iconWeather);
		background.style.backgroundImage = "url('./images/clouded-sky.jpg')";
	} else if (iconWeather > 8 && iconWeather < 12) {
		background.style.backgroundImage = "url('./images/rainy.jpg')";
	} else {
		background.style.backgroundImage = "url('./images/snow.jpg')";
	}
}