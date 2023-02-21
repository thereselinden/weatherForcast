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
    const icon = document.createElement('img');
    const temp = document.createElement('small');

    weatherCard.classList.add('weather-card');

    time.textContent = interval.localTime;
    icon.src = interval.weatherIcon;
    temp.innerHTML = `${interval.temperature.toString()} &#8451`;

    weatherCard.append(time, icon, temp);
    container.appendChild(weatherCard);
  });
};

export const printForecastIntervals = (days: ForecastWeatherOverview[]) => {
  const container = document.querySelector('.forecast') as HTMLDivElement;
  container.innerHTML = '';

  days.forEach(day => {
    const overviewCard = document.createElement('div');
    const weekday = document.createElement('p');
    const icon = document.createElement('img');
    const temp = document.createElement('p');
    const arrowIcon = document.createElement('i');

    overviewCard.classList.add('forecast-overview-card');
    overviewCard.style.display = 'flex';

    arrowIcon.classList.add('fa-solid', 'fa-chevron-down');

    weekday.textContent = day.weekday;
    icon.src = day.weatherIcon;
    temp.innerHTML = `${day.minTemp.toString()}/${day.maxTemp.toString()} &#8451`;

    overviewCard.append(weekday, icon, temp, arrowIcon);
    const detailsTable = printForecastDetails(day.intervals);
    container.append(overviewCard, detailsTable);

    overviewCard.addEventListener('click', () => {
      detailsTable.classList.toggle('hide');
      arrowIcon.classList.toggle('fa-chevron-down');
      arrowIcon.classList.toggle('fa-chevron-up');
    });
  });
};

const printForecastDetails = (intervals: ForecastWeatherDetails[]) => {
  const table = document.createElement('table');
  const tableRowHeading = document.createElement('tr');

  table.classList.add('hide');
  //table.classList.add('forecast-details');

  tableRowHeading.innerHTML = `<th>Time</th><th>Weather</th><th>Temp</th><th>Wind</th><th>Humidity</th>`;
  table.appendChild(tableRowHeading);
  intervals.forEach(interval => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `<td>${interval.time}</td><td><img src="${interval.weatherIcon}"></td><td>${interval.temp}&#8451</td><td>${interval.wind}</td><td>${interval.humidity}</td>`;
    table.appendChild(tableRow);
  });

  return table;
};

export const setBackground = (weather: string, time: string) => {
  let fileName: string = '';
  const container = document.querySelector(
    '.current-weather'
  ) as HTMLDivElement;
  switch (weather) {
    case 'Thunderstorm':
      fileName = '../../public/assets/thunderstorm.jpg';
      break;
    case 'Drizzle':
      fileName = '../../public/assets/rain.jpg';
      break;

    case 'Rain':
      fileName = '../../public/assets/rain.jpg';
      break;

    case 'Snow':
      fileName = '../../public/assets/snow.jpg';
      break;

    case 'Clear':
      fileName = '../../public/assets/sunny.jpg';
      break;

    case 'Clouds':
      fileName = '../../public/assets/cloud.jpg';
      break;
    default:
      fileName = '../../public/assets/mist.jpg';
  }

  container.style.backgroundImage = `url('${fileName}')`;
};
