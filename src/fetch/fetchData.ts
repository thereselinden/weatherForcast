import { getLocalTime, getTemperature } from '../helpers/helpers.js';
import {
  CurrentWeather,
  CurrentWeatherIntervals,
} from '../interface/Weather.interface';
import { printCurrentWeather } from '../render/render.js';

// fetch för current
export const fetchCurrentWeather = async (
  lat: number,
  long: number
): Promise<void> => {
  const url = `http://localhost:3000/api/weather/${lat}/${long}?mode=weather`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const currentWeather: CurrentWeather = {
      city: data.name,
      localTime: getLocalTime(data.dt, data.timezone),
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
    const timeZone = data.city.timezone;

    const today = new Date().toISOString().slice(0, 10);

    const todaysIntervals: CurrentWeatherIntervals[] = [];

    data.list.forEach((interval: any) => {
      if (interval.dt_txt.includes(today)) {
        todaysIntervals.push({
          localTime: getLocalTime(interval.dt, timeZone),
          temperature: getTemperature(interval.main.temp),
          weatherIcon: `http://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
        });
        console.log('interval object', interval);
      }
      return;
    });

    console.log('today', todaysIntervals);
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};

//console.log(currentWeather);
