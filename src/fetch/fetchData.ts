import {
  getLocalTime,
  getLocalDate,
  getTemperature,
  getLocalDay,
} from '../helpers/helpers.js';
import {
  CurrentWeather,
  CurrentWeatherIntervals,
  ForecastWeatherDetails,
  ForecastWeatherOverview,
} from '../interface/Weather.interface';
import {
  printCurrentHoursWeather,
  printCurrentWeather,
  printForecastIntervals,
  setBackground,
} from '../render/render.js';

// fetch för current
export const fetchCurrentWeather = async (
  lat: number,
  long: number
): Promise<void> => {
  const url = `http://localhost:3000/api/weather/${lat}/${long}?mode=weather`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const weatherGroup = data.weather[0].main;

    //  console.log('current data', data.weather[0].main);

    const time = getLocalTime(Date.now() / 1000, data.timezone);

    const currentWeather: CurrentWeather = {
      city: data.name,
      localTime: time,
      temperature: getTemperature(data.main.temp),
      weather: data.weather[0].description,
    };

    printCurrentWeather(currentWeather);
    setBackground(weatherGroup, time);
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};

// fetch för current
export const fetchForecastIntervals = async (
  lat: number,
  long: number
): Promise<void> => {
  const url = `http://localhost:3000/api/weather/${lat}/${long}?mode=forecast`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const timeZone = data.city.timezone;
    const localDate = getLocalDate(Date.now() / 1000, timeZone);

    const intervalsByDate: ForecastWeatherOverview[] = groupIntervals(
      data.list,
      timeZone
    );

    const todaysIntervals: CurrentWeatherIntervals[] = [];

    const firstEightIntervals = data.list.slice(0, 8);

    firstEightIntervals.forEach((interval: any) => {
      todaysIntervals.push({
        localTime: getLocalTime(interval.dt, timeZone),

        temperature: getTemperature(interval.main.temp),
        weatherIcon: `http://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
      });
    });

    printCurrentHoursWeather(todaysIntervals);
    printForecastIntervals(intervalsByDate);
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};

const groupIntervals = (intervals: any[], timeZone: number) => {
  console.log(intervals);

  let intervalsByDate: any[] = [];
  let localDate: string = getLocalDate(intervals[0].dt, timeZone);
  let dayForecast: ForecastWeatherOverview;
  let intervalsByDay: any[] = [];
  let minTemp: number = 0;
  let maxTemp: number = 0;

  for (let i = 0; i < intervals.length; i++) {
    const intervalLocalDate: string = getLocalDate(intervals[i].dt, timeZone); // detta intervalls datum

    let nextIntervalLocalDate: string; // nästa intervalls datum (kolla om intervallet är sista, då finns ingen nästa)
    i !== intervals.length - 1
      ? (nextIntervalLocalDate = getLocalDate(intervals[i + 1].dt, timeZone))
      : (nextIntervalLocalDate = '');

    if (i === 0 || localDate !== intervalLocalDate) {
      localDate = intervalLocalDate; // stega upp datum
      // ny dag - första intervallet för dag
      minTemp = intervals[i].main.temp;
      maxTemp = intervals[i].main.temp;
    }

    if (minTemp > intervals[i].main.temp)
      // kolla min temp
      minTemp = intervals[i].main.temp;

    if (maxTemp < intervals[i].main.temp)
      // kolla max temp
      maxTemp = intervals[i].main.temp;

    const dayInterval: ForecastWeatherDetails = {
      time: getLocalTime(intervals[i].dt, timeZone),
      weatherIcon: `http://openweathermap.org/img/wn/${intervals[i].weather[0].icon}@2x.png`,
      temp: getTemperature(intervals[i].main.temp),
      wind: intervals[i].wind.speed,
      humidity: intervals[i].main.humidity,
    };

    intervalsByDay.push(dayInterval); // lägg in intervaldetaljer i temp array

    //TODO: Gör iordning innehållet först enligt interface

    if (i === intervals.length - 1 || localDate !== nextIntervalLocalDate) {
      // sista intervallet för dag
      const numberOfIntervals = intervalsByDay.length;
      const index = Math.round(numberOfIntervals / 2) - 1;

      dayForecast = {
        // Skapa objekt som håller översikt för dag och array med intervalldetaljer
        date: intervalLocalDate,
        weekday: getLocalDay(intervals[i].dt, timeZone),
        weatherIcon: intervalsByDay[index].weatherIcon, // TODO: Välj icon från mitt på dagen
        minTemp: getTemperature(minTemp),
        maxTemp: getTemperature(maxTemp),
        intervals: intervalsByDay,
      };

      intervalsByDate.push(dayForecast); // lägg till dagsobjektet i array som håller alla dagar

      intervalsByDay = []; // nollställ temp-arrayen för interval-detaljer
    }
  }
  console.log('intervals by date: ', intervalsByDate);

  return intervalsByDate;
};
