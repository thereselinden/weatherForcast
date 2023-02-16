var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadFile, storedCities } from './cities/citites.js';
import { getLocation } from './geoLocation/geoLocation.js';
(() => __awaiter(void 0, void 0, void 0, function* () {
    getLocation();
    yield loadFile();
    console.log('storedcities i script', storedCities);
}))();
// fetch för forcast
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// fetch direct geoCoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
