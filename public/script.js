"use strict";
/* const lat: number = 51.509865;
const long: number = -0.118092; */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const lat = 59.334591;
const long = 18.06324;
const getLocalTime = (time, timezone) => {
    const localTime = new Date((time + timezone) * 1000);
    const getHours = localTime.getUTCHours();
    const getMinutes = localTime.getUTCMinutes();
    return `${getHours}:${getMinutes}`;
};
const getTemperature = (temp) => Math.round(temp);
const printCurrentWeather = (weather) => {
    const city = document.querySelector('#city');
    const localTime = document.querySelector('#localTime');
    const temperature = document.querySelector('#temperature');
    const weatherDescription = document.querySelector('#weatherDescription');
    city.textContent = weather.city;
    localTime.textContent = weather.localTime;
    temperature.innerHTML = `${weather.temperature.toString()} &#8451`;
    weatherDescription.textContent = weather.weather;
    console.log(weather);
};
// fetch för current
const fetchCurrentWeather = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:3000/api/weather/current/${lat}/${long}`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        console.log(data);
        const currentWeather = {
            city: data.name,
            localTime: getLocalTime(data.dt, data.timezone),
            temperature: getTemperature(data.main.temp),
            weather: data.weather[0].description,
        };
        printCurrentWeather(currentWeather);
    }
    catch (err) {
        // ska vi hantera detta med speciell text? ladda om sidan något gick fel
        throw err;
    }
});
fetchCurrentWeather(lat, long);
//console.log(currentWeather);
// fetch för forcast
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// fetch direct geoCoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
