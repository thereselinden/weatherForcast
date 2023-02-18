import { getLocalTime, getTemperature } from '../helpers/helpers.js';
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

    // TODO: Behöver göra någon form av uträkning på lokaltid
    // TODO: För när vi visar intervaller framåt, så kollas det på lokaltid hos oss
    // TODO: Vilket gör att när vi söker "Phuket" så får vi intervaller från 12.00, 15.00 även fast passerat lokalt
    // TODO: Data retunerar inte någon tid. Utan vi behöver kolla tiden hos oss. Ta bort 3600 för att få GMT 0
    // TODO: Sen göra en uträkning för att se vad den lokala tiden är och därifrån endast ta med ifall det är dagens datum och tiden framåt

    const today = new Date().toISOString().slice(0, 10); // returnerar datum
    const todaysIntervals: CurrentWeatherIntervals[] = [];

    data.list.forEach((interval: any) => {
      if (interval.dt_txt.includes(today)) {
        todaysIntervals.push({
          localTime: getLocalTime(interval.dt, timeZone), // api retunerar tiden i GMT 0 vi behöver hantera detta med timeZone
          temperature: getTemperature(interval.main.temp),
          weatherIcon: `http://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
        });
      }
      return;
    });

    console.log('todaysInterval: ', todaysIntervals);

    printCurrentHoursWeather(todaysIntervals);
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};
