import {
  CurrentWeather,
  CurrentWeatherIntervals,
} from '../interface/Weather.interface';

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

export const printCurrentHoursWeather = (
  intervals: CurrentWeatherIntervals[]
) => {
  const container = document.querySelector('#currentHours') as HTMLDivElement;
  container.innerHTML = '';

  intervals.forEach(interval => {
    const weatherCard = document.createElement('div');
    const time = document.createElement('p');
    const icon = document.createElement('img') as HTMLImageElement;
    const temp = document.createElement('small');

    weatherCard.classList.add('weather-card');

    time.textContent = interval.localTime;
    icon.src = interval.weatherIcon;
    temp.innerHTML = `${interval.temperature.toString()} &#8451`;

    weatherCard.append(time, icon, temp);
    container.appendChild(weatherCard);
  });
};
