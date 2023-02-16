import { fetchCurrentWeather } from '../fetch/fetchData.js';

const inputSearch = document.querySelector('#citySearch') as HTMLInputElement;

inputSearch.addEventListener('input', () => {
  showResults(filterCities(inputSearch.value), inputSearch.value.length);
});

type Coordinates = { lon: number; lat: number };
interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinates;
}
// lagra data i variabel
export let storedCities: City[] = [];

export const loadFile = async () => {
  const response = await fetch('../../city.list.json');
  const data = await response.json();
  storedCities = data;
};

// Filtera input sökning mot datan
const filterCities = (searchStr: string) => {
  let result: City[] = [];
  if (searchStr.length < 1) return result;

  result = storedCities.filter(city => {
    return city.name.toLowerCase().startsWith(searchStr.toLowerCase());
  });

  result.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  return result;
};

const showResults = (cities: City[], termLength?: number) => {
  let filteredCities: HTMLDivElement = document.querySelector(
    '#filteredCities'
  ) as HTMLDivElement;
  filteredCities.textContent = '';

  cities.forEach(city => {
    const filterResults: HTMLDivElement = document.createElement('div');
    const cityWithCountry: string = `${city.name}, ${city.country}`;
    let formattedItem: string = '';
    if (termLength && termLength > 0) {
      formattedItem = `<b>${cityWithCountry.substring(
        0,
        termLength
      )}</b>${cityWithCountry.substring(termLength)}</b>`;
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
