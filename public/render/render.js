export const printCurrentWeather = (weather) => {
    const city = document.querySelector('#city');
    const localTime = document.querySelector('#localTime');
    const temperature = document.querySelector('#temperature');
    const weatherDescription = document.querySelector('#weatherDescription');
    city.textContent = weather.city;
    localTime.textContent = weather.localTime;
    temperature.innerHTML = `${weather.temperature.toString()}&#176`;
    weatherDescription.textContent = weather.weather;
};
export const printCurrentHoursWeather = (intervals) => {
    const container = document.querySelector('#currentHours');
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
        weatherCard.append(time, icon, temp);
        container.appendChild(weatherCard);
    });
};
export const printForecastIntervals = (days) => {
    const container = document.querySelector('.forecast');
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
const printForecastDetails = (intervals) => {
    const table = document.createElement('table');
    const tableRowHeading = document.createElement('tr');
    table.classList.add('hide');
    tableRowHeading.innerHTML = `<th>Time</th><th>Weather</th><th>Temp</th><th>Wind</th><th>Humidity</th>`;
    table.appendChild(tableRowHeading);
    intervals.forEach(interval => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td>${interval.time}</td><td><img src="${interval.weatherIcon}"></td><td>${interval.temp}&#176</td><td>${interval.wind}</td><td>${interval.humidity}</td>`;
        table.appendChild(tableRow);
    });
    return table;
};
export const setBackground = (weather, time) => {
    let fileName = '';
    const container = document.querySelector('.current-weather');
    let videoExists = false;
    let video = document.querySelector('video');
    if (video)
        videoExists = true;
    if (!videoExists)
        video = document.createElement('video');
    console.log(video);
    const body = document.querySelector('body');
    video.innerHTML = '';
    switch (weather) {
        case 'Thunderstorm':
            //fileName = '../../public/assets/alternative/thunderstorm.jpg';
            fileName = '../../public/assets/videos/thunderstorm-304.mp4';
            break;
        case 'Drizzle':
            //fileName = '../../public/assets/alternative/rain.jpg';
            fileName = '../../public/assets/videos/rain-28236.mp4';
            break;
        case 'Rain':
            //fileName = '../../public/assets/alternative/rain.jpg';
            fileName = '../../public/assets/videos/rain-28236.mp4';
            break;
        case 'Snow':
            //fileName = '../../public/assets/alternative/snow.jpg';
            fileName = '../../public/assets/videos/snow-9999.mp4';
            break;
        case 'Clear':
            // fileName = '../../public/assets/alternative/sun.jpg';
            fileName = '../../public/assets/videos/sun-36816.mp4';
            break;
        case 'Clouds':
            //fileName = '../../public/assets/alternative/cloud.jpg';
            fileName = '../../public/assets/videos/cloud-3186.mp4';
            break;
        default:
            //fileName = '../../public/assets/alternative/mist.jpg';
            fileName = '../../public/assets/videos/mist-2166.mp4';
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
