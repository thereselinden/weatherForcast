export const printCurrentWeather = (weather) => {
    const city = document.querySelector('#city');
    const localTime = document.querySelector('#localTime');
    const temperature = document.querySelector('#temperature');
    const weatherDescription = document.querySelector('#weatherDescription');
    city.textContent = weather.city;
    localTime.textContent = weather.localTime;
    temperature.innerHTML = `${weather.temperature.toString()} &#8451`;
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
        temp.innerHTML = `${interval.temperature.toString()} &#8451`;
        weatherCard.append(time, icon, temp);
        container.appendChild(weatherCard);
    });
};
