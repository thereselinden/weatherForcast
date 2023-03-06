import { showResults } from './cities/citites';
import { fetchFilteredCities } from './fetch/fetchData';
import { getLocation } from './geoLocation/geoLocation';

(async () => {
  getLocation();
})();

const inputSearch = document.querySelector('#citySearch') as HTMLInputElement;

inputSearch.addEventListener('input', async () => {
  let filteredCities = [];
  if (inputSearch.value.length > 2) {
    filteredCities = await fetchFilteredCities(inputSearch.value);
  }
  showResults(filteredCities, inputSearch.value);
});
