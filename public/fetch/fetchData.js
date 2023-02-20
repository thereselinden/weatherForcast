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
        const time = getLocalTime(Date.now() / 1000, data.timezone);
        const currentWeather = {
            city: data.name,
            localTime: time,
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
        //console.log('forecast data: ', data);
        const timeZone = data.city.timezone;
        const localDate = getLocalDate(Date.now() / 1000, timeZone);
        // let forecastOverview: forecastWeatherOverview[] = data.map(interval => {
        //   return {
        //     date: localDate,
        //     weekday: getLocalDay(interval.dt, timeZone),
        //     weatherIcon: ,// för klockan 12:00,
        //     minTemp: , // leta i funktion som sorterar dagens alla temp,
        //   }
        // })
        // let forecastIntervals: forecastWeatherDetails[] = data.list.map(interval => {
        //   return {
        //     // date: localDate,
        //     // weekday: getLocalDay(interval.dt, timeZone),
        //     weatherIcon: interval.weather[0].icon,
        //     temp: interval.main.temp, // retunera min för hela dagens intervaller
        //     time:
        //   };
        // });
        groupIntervals(data.list, timeZone);
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
        //console.log('todaysInterval: ', todaysIntervals);
        printCurrentHoursWeather(todaysIntervals);
    }
    catch (err) {
        // ska vi hantera detta med speciell text? ladda om sidan något gick fel
        throw err;
    }
});
const groupIntervals = (intervals, timeZone) => {
    let intervalsByDate = [[]];
    let indexIntervals = 0;
    let tempLocalDate = getLocalDate(intervals[0].dt, timeZone);
    intervals.forEach(interval => {
        const intervalLocalDate = getLocalDate(interval.dt, timeZone);
        if (tempLocalDate !== intervalLocalDate) {
            indexIntervals++;
            tempLocalDate = intervalLocalDate;
            console.log('templocaldate', tempLocalDate);
            intervalsByDate.push([]);
        }
        intervalsByDate[indexIntervals].push(interval);
    });
    console.log('intervalsbydate', intervalsByDate);
};
