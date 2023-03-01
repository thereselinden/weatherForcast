import {
  CurrentWeather,
  CurrentWeatherIntervals,
  ForecastWeatherOverview,
  ForecastWeatherDetails,
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
  temperature.innerHTML = `${weather.temperature.toString()}&#176`;
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
    const icon = document.createElement('img');
    const temp = document.createElement('small');

    weatherCard.classList.add('weather-card');

    time.textContent = interval.localTime;
    icon.src = interval.weatherIcon;
    temp.innerHTML = `${interval.temperature.toString()}&#176`;

    icon.setAttribute('alt', interval.weatherDescription);

    weatherCard.append(time, icon, temp);
    container.appendChild(weatherCard);
  });
};

export const printForecastIntervals = (days: ForecastWeatherOverview[]) => {
  const container = document.querySelector('.forecast') as HTMLDivElement;
  const heading = document.createElement('small');
  heading.innerHTML = '5-days forecast weather';

  container.innerHTML = '';
  container.append(heading);

  days.forEach(day => {
    const overviewCard = document.createElement('div');
    const weekday = document.createElement('p');
    const icon = document.createElement('img');
    const temp = document.createElement('p');
    const arrowIcon = document.createElement('i');

    overviewCard.classList.add('forecast-overview-card');

    arrowIcon.classList.add('fa-solid', 'fa-chevron-down');

    weekday.textContent = day.weekday;
    icon.src = day.weatherIcon;
    temp.innerHTML = `${day.minTemp.toString()}/${day.maxTemp.toString()}&#176`;

    icon.setAttribute('alt', day.weatherDescription);

    overviewCard.append(weekday, icon, temp, arrowIcon);
    const detailsTable = printForecastDetails(day.intervals);
    container.append(overviewCard, detailsTable);

    overviewCard.addEventListener('click', () => {
      detailsTable.classList.toggle('hide');
      arrowIcon.classList.toggle('fa-chevron-down');
      arrowIcon.classList.toggle('fa-chevron-up');
    });
  });
  removeLoader();
};

const printForecastDetails = (intervals: ForecastWeatherDetails[]) => {
  const table = document.createElement('table');
  const tableRowHeading = document.createElement('tr');

  table.classList.add('hide');

  tableRowHeading.innerHTML = `<th>Time</th><th>Weather</th><th>Temp</th><th>Wind <span>m/s</span></th><th>Humidity <span>%</span></th>`;
  table.appendChild(tableRowHeading);
  intervals.forEach(interval => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `<td>${interval.time}</td><td><img src="${interval.weatherIcon}" alt="${interval.weatherDescription}"></td><td>${interval.temp}&#176</td><td>${interval.wind}</td><td>${interval.humidity}</td>`;
    table.appendChild(tableRow);
  });

  return table;
};

export const setBackground = (weather: string, time: string) => {
  let fileName: string = '';
  const container = document.querySelector(
    '.current-weather'
  ) as HTMLDivElement;

  let videoExists: boolean = false;

  let video = document.querySelector('video') as HTMLVideoElement;

  if (video) videoExists = true;

  if (!videoExists) video = document.createElement('video') as HTMLVideoElement;

  const body = document.querySelector('body') as HTMLBodyElement;

  video.innerHTML = '';
  switch (weather) {
    case 'Thunderstorm':
      fileName = '/assets/videos/thunderstorm-304.mp4';
      break;
    case 'Drizzle':
      fileName = '/assets/videos/rain-28236.mp4';
      break;

    case 'Rain':
      fileName = '/assets/videos/rain-28236.mp4';
      break;

    case 'Snow':
      fileName = '/assets/videos/snow-7090.mp4';
      break;

    case 'Clear':
      fileName = '/assets/videos/sun-36816.mp4';

      break;

    case 'Clouds':
      fileName = '/assets/videos/cloud-3186.mp4';
      break;
    default:
      fileName = '/assets/videos/mist-2166.mp4';
  }

  // body.style.backgroundImage = `url('${fileName}')`;

  video.src = fileName;
  video.autoplay = true;
  video.controls = false;
  video.muted = true;
  video.loop = true;

  //container.prepend(video);

  if (!videoExists) {
    body.prepend(video);
  }
};

const removeLoader = () => {
  const loader = document.querySelector('.loader-container') as HTMLDivElement;
  loader.style.display = 'none';
};
