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

    const localDate = getLocalDate(Date.now() / 1000, timeZone);

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

    console.log('todaysInterval: ', todaysIntervals);

    printCurrentHoursWeather(todaysIntervals);
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};
