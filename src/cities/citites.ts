import {
  fetchCurrentWeather,
  fetchFilteredCities,
  fetchForecastIntervals,
} from '../fetch/fetchData';

const inputSearch = document.querySelector('#citySearch') as HTMLInputElement;

inputSearch.addEventListener('input', async () => {
  if (inputSearch.value.length > 2) {
    const filteredCities = await fetchFilteredCities(inputSearch.value);
    showResults(filteredCities, inputSearch.value.length);
  }
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

// export const loadFile = async () => {
//   const response = await fetch('http://localhost:3000/api/cities');
//   const data = await response.json();
//   storedCities = data;
// };

// // Filtera input sökning mot datan
// const filterCities = (searchStr: string) => {
//   let result: City[] = [];
//   if (searchStr.length < 1) return result;

//   result = storedCities.filter(city => {
//     return city.name.toLowerCase().startsWith(searchStr.toLowerCase());
//   });

//   result.sort((a, b) => {
//     return a.name > b.name ? 1 : -1;
//   });
//   return result;
// };

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
      const { lat, lon } = city.coord;
      inputSearch.value = '';
      filteredCities.textContent = '';
      fetchCurrentWeather(lat, lon);
      fetchForecastIntervals(lat, lon);
    });
    filteredCities.appendChild(filterResults);
  });
};
