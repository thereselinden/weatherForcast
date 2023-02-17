import { fetchCurrentWeather, fetchForecastIntervals, } from '../fetch/fetchData.js';
const lat = 59.334591;
const long = 18.06324;
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
export const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showActual, showFallback, options);
    }
    else {
        alert('Geolocation is not supported by this browser.');
        fetchCurrentWeather(lat, long);
        fetchForecastIntervals(lat, long);
    }
};
const showActual = (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    fetchCurrentWeather(lat, lon);
    fetchForecastIntervals(lat, lon);
    // set cookies for coords or localstorage so we dont have to ask next time
};
// If permission denied, show weather on fallback coordinates
function showFallback(error) {
    fetchCurrentWeather(lat, long);
    fetchForecastIntervals(lat, long);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            console.log('The request to get user location timed out.');
            break;
        default:
            console.log('An unknown error occurred.');
            break;
    }
}
