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
