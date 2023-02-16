import { CurrentWeather } from '../interface/CurrentWeather.interface';

export const printCurrentWeather = (weather: CurrentWeather) => {
  const city = document.querySelector('#city') as HTMLHeadingElement;
  const localTime = document.querySelector('#localTime') as HTMLHeadingElement;
  const temperature = document.querySelector(
    '#temperature'
  ) as HTMLParagraphElement;
  const weatherDescription = document.querySelector(
    '#weatherDescription'
  ) as HTMLParagraphElement;

  city.textContent = weather.city;
  localTime.textContent = weather.localTime;
  temperature.innerHTML = `${weather.temperature.toString()} &#8451`;
  weatherDescription.textContent = weather.weather;
};
