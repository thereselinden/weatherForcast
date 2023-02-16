var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchCurrentWeather } from '../fetch/fetchData.js';
const inputSearch = document.querySelector('#citySearch');
inputSearch.addEventListener('input', () => {
    showResults(filterCities(inputSearch.value), inputSearch.value.length);
});
// lagra data i variabel
export let storedCities = [];
export const loadFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('../../city.list.json');
    const data = yield response.json();
    storedCities = data;
});
// Filtera input sökning mot datan
const filterCities = (searchStr) => {
    let result = [];
    if (searchStr.length < 1)
        return result;
    result = storedCities.filter(city => {
        return city.name.toLowerCase().startsWith(searchStr.toLowerCase());
    });
    result.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });
    return result;
};
const showResults = (cities, termLength) => {
    let filteredCities = document.querySelector('#filteredCities');
    filteredCities.textContent = '';
    cities.forEach(city => {
        const filterResults = document.createElement('div');
        const cityWithCountry = `${city.name}, ${city.country}`;
        let formattedItem = '';
        if (termLength && termLength > 0) {
            formattedItem = `<b>${cityWithCountry.substring(0, termLength)}</b>${cityWithCountry.substring(termLength)}</b>`;
        }
        filterResults.innerHTML = formattedItem;
        filterResults.classList.add('resultItem');
        filterResults.addEventListener('click', () => {
            inputSearch.value = cityWithCountry;
            filteredCities.textContent = '';
            fetchCurrentWeather(city.coord.lat, city.coord.lon);
        });
        filteredCities.appendChild(filterResults);
    });
};
