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
  const searchTermLength: number = searchTerm.length;
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

    const startIndex = cityWithCountry
      .toLowerCase()
      // .normalize('NFD')
      // .replace(/[\u0300-\u036f]/g, '')
      .search(
        searchTermArr[0].toLowerCase()
        //   .normalize('NFD')
        // .replace(/[\u0300-\u036f]/g, '')
      );
    console.log('startindex', startIndex);
    console.log('searchtermlength', searchTermLength);
    console.log('citywithcountry', cityWithCountry);
    console.log('----------------');

    formattedItem = `${cityWithCountry.substring(
      0,
      startIndex
    )}<b>${cityWithCountry.substring(
      startIndex,
      searchTermLength
    )}</b>${cityWithCountry.substring(startIndex + searchTermLength)}`;
    //}
    //filterResults.innerHTML = formattedItem;
    filterResults.innerHTML = cityWithCountry;
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
