import {
  fetchCurrentWeather,
  fetchForecastIntervals,
} from '../fetch/fetchData';

const inputSearch = document.querySelector('#citySearch') as HTMLInputElement;

type Coordinates = { lon: number; lat: number };
interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinates;
}

export const showResults = (cities: City[], searchTerm: string) => {
  let searchTermArr: string[] = [];
  searchTermArr = searchTerm.split(' ');
  console.log('termarray', searchTermArr);

  let filteredCities: HTMLDivElement = document.querySelector(
    '#filteredCities'
  ) as HTMLDivElement;
  filteredCities.textContent = '';

  cities.forEach(city => {
    const filterResults: HTMLDivElement = document.createElement('div');
    const cityWithCountry: string = `${city.name}, ${city.country}`;
    let formattedItem: string = '';

    //if (searchTermArr[0] && searchTermArr[0].length > 0) {
    const startIndex = cityWithCountry.indexOf(searchTermArr[0]);
    console.log('startindex', startIndex);

    //   formattedItem = `<b>${cityWithCountry.substring(
    //     0,
    //     termLength
    //   )}</b>${cityWithCountry.substring(termLength)}</b>`;
    //}
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
