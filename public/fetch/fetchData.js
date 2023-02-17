var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getLocalTime, getTemperature } from '../helpers/helpers.js';
import { printCurrentWeather } from '../render/render.js';
// fetch för current
export const fetchCurrentWeather = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:3000/api/weather/${lat}/${long}?mode=weather`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
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
// fetch för current
export const fetchForecastIntervals = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:3000/api/weather/${lat}/${long}?mode=forecast`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        //const timeZone = data.city.timezone;
        const today = new Date().toISOString().slice(0, 10);
        const todaysIntervals = [];
        data.list.forEach((interval) => {
            if (interval.dt_txt.includes(today)) {
                todaysIntervals.push({
                    localTime: getLocalTime(interval.dt),
                    temperature: getTemperature(interval.main.temp),
                    weatherIcon: `http://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                });
                console.log('interval object', interval);
            }
            return;
        });
        console.log('today', todaysIntervals);
    }
    catch (err) {
        // ska vi hantera detta med speciell text? ladda om sidan något gick fel
        throw err;
    }
});
//console.log(currentWeather);
