import { getLocalTime, getTemperature } from '../helpers/helpers.js';
import { CurrentWeather } from '../interface/CurrentWeather.interface';
import { printCurrentWeather } from '../render/render.js';

// fetch för current
export const fetchCurrentWeather = async (
  lat: number,
  long: number
): Promise<void> => {
  const url = `http://localhost:3000/api/weather/current/${lat}/${long}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

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
//fetchCurrentWeather(lat, long);
//console.log(currentWeather);
