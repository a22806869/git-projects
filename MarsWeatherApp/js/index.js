const API_KEY = 'z3WZrhqzsR5yQSbzuIYkuZmmgCuTrheycmExrscE';
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;


const previousWeatherToggle = document.querySelector('.show-previous-weather');

const previousWeather = document.querySelector('.previous-weather');

previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather')
})

function getWeather(weather) {
    fetch(API_URL).then(res => res.json().then(data => console.log(data)))
}

getWeather();