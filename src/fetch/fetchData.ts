import {
  getLocalTime,
  getLocalDate,
  getTemperature,
} from '../helpers/helpers.js';
import {
  CurrentWeather,
  CurrentWeatherIntervals,
} from '../interface/Weather.interface';
import {
  printCurrentHoursWeather,
  printCurrentWeather,
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

    const time = getLocalTime(Date.now() / 1000, data.timezone);

    const currentWeather: CurrentWeather = {
      city: data.name,
      localTime: time,
      temperature: getTemperature(data.main.temp),
      weather: data.weather[0].description,
    };

    printCurrentWeather(currentWeather);
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
    //console.log('forecast data: ', data);

    const timeZone = data.city.timezone;
    const localDate = getLocalDate(Date.now() / 1000, timeZone);

    groupIntervals(data.list, timeZone);

    const todaysIntervals: CurrentWeatherIntervals[] = [];

    data.list.forEach((interval: any) => {
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
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};

const groupIntervals = (intervals: any[], timeZone: number) => {
  let intervalsByDate: any[] = [[]];
  let indexIntervals: number = 0;
  let tempLocalDate: string = getLocalDate(intervals[0].dt, timeZone);

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
