var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getLocalTime, getLocalDate, getTemperature, } from '../helpers/helpers.js';
import { printCurrentHoursWeather, printCurrentWeather, } from '../render/render.js';
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
        const timeZone = data.city.timezone;
        const localDate = getLocalDate(Date.now() / 1000, timeZone);
        const todaysIntervals = [];
        data.list.forEach((interval) => {
            const date = getLocalDate(interval.dt, timeZone);
            if (date === localDate) {
                todaysIntervals.push({
                    localTime: getLocalTime(interval.dt, timeZone),
                    temperature: getTemperature(interval.main.temp),
                    weatherIcon: `http://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                });
            }
        });
        console.log('todaysInterval: ', todaysIntervals);
        printCurrentHoursWeather(todaysIntervals);
    }
    catch (err) {
        // ska vi hantera detta med speciell text? ladda om sidan något gick fel
        throw err;
    }
});
