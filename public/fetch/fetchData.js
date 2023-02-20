var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getLocalTime, getLocalDate, getTemperature, getLocalDay, } from "../helpers/helpers.js";
import { printCurrentHoursWeather, printCurrentWeather, } from "../render/render.js";
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
// const groupIntervals = (intervals: any[], timeZone: number) => {
//   let intervalsByDate: any[] = [[]];
//   let indexIntervals: number = 0;
//   let tempLocalDate: string = getLocalDate(intervals[0].dt, timeZone);
//   intervals.forEach(interval => {
//     const intervalLocalDate = getLocalDate(interval.dt, timeZone);
//     if (tempLocalDate !== intervalLocalDate) {
//       indexIntervals++;
//       tempLocalDate = intervalLocalDate;
//       console.log('templocaldate', tempLocalDate);
//       intervalsByDate.push([]);
//     }
//     intervalsByDate[indexIntervals].push(interval);
//   });
//   console.log('intervalsbydate', intervalsByDate);
// };
const groupIntervals = (intervals, timeZone) => {
    let intervalsByDate = [];
    let tempLocalDate = getLocalDate(intervals[0].dt, timeZone);
    let tempForecastDay;
    let tempIntervals = [];
    let tempMinTemp = 0;
    let tempMaxTemp = 0;
    for (let i = 0; i < intervals.length; i++) {
        const intervalLocalDate = getLocalDate(intervals[i].dt, timeZone); // detta intervalls datum
        let nextIntervalLocalDate; // nästa intervalls datum (kolla om intervallet är sista, då finns ingen nästa)
        i !== intervals.length - 1
            ? (nextIntervalLocalDate = getLocalDate(intervals[i + 1].dt, timeZone))
            : (nextIntervalLocalDate = "");
        if (i === 0 || tempLocalDate !== intervalLocalDate) {
            // ny dag - första intervallet för dag
            tempMinTemp = intervals[i].main.temp_min;
            tempMaxTemp = intervals[i].main.temp_max;
        }
        if (tempMinTemp > intervals[i].main.temp_min)
            // kolla min temp
            tempMinTemp = intervals[i].main.temp_min;
        if (tempMaxTemp < intervals[i].main.temp_max)
            // kolla max temp
            tempMaxTemp = intervals[i].main.temp_max;
        tempIntervals.push(intervals[i]); // lägg in intervaldetaljer i temp array
        //TODO: Gör iordning innehållet först enligt interface
        if (i === intervals.length - 1 || tempLocalDate !== nextIntervalLocalDate) {
            // sista intervallet för dag
            tempForecastDay = {
                // Skapa objekt som håller översikt för dag och array med intervalldetaljer
                date: intervalLocalDate,
                weekday: getLocalDay(intervals[i].dt, timeZone),
                weatherIcon: `http://openweathermap.org/img/wn/${intervals[0].weather[0].icon}@2x.png`,
                minTemp: tempMinTemp,
                maxTemp: tempMaxTemp,
                intervals: tempIntervals,
            };
            intervalsByDate.push(tempForecastDay); // lägg till dagsobjektet i array som håller alla dagar
            tempLocalDate = nextIntervalLocalDate; // stega upp datum
            tempIntervals = []; // nollställ temp-arrayen för interval-detaljer
        }
    }
    console.log("intervalsbydate", intervalsByDate);
};
