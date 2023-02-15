import { loadFile } from './cities/citites.js';
import { getLocation } from './geoLocation/geoLocation.js';
getLocation();
loadFile();
// fetch för forcast
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// fetch direct geoCoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
