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
  //const searchTermLength: number = searchTerm.length;
  //console.log('termarray', searchTermArr);

  let filteredCities: HTMLDivElement = document.querySelector(
    '#filteredCities'
  ) as HTMLDivElement;
  filteredCities.textContent = '';

  cities.forEach(city => {
    const filterResults: HTMLDivElement = document.createElement('div');
    const cityWithCountry: string = `${city.name}, ${city.country}`;
    //let formattedItem: string = '';
    let formattedItemRegEx: string = '';

    //! TA BORT UTKOMMENTERAD KOD
    /*********** 
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
    // console.log('startindex', startIndex);
    // console.log('searchtermlength', searchTermLength);
    // console.log('citywithcountry', cityWithCountry);
    // console.log('----------------');

    formattedItem = `${cityWithCountry.substring(
      0,
      startIndex
    )}<b>${cityWithCountry.substring(
      startIndex,
      searchTermLength
    )}</b>${cityWithCountry.substring(startIndex + searchTermLength)}`;
    //}
    *************/
    let tempFormattedString = cityWithCountry;

    //\p{L}

    searchTermArr.forEach(term => {
      //const regexPattern = /\dfkfkri/
      const pattern = new RegExp(term, 'gi');
      const matches: IterableIterator<RegExpMatchArray> =
        cityWithCountry.matchAll(pattern)!;
      console.log('matches', matches);

      for (const m of matches) {
        console.log('m', m);

        formattedItemRegEx = tempFormattedString.replace(
          m[0],
          `<b>${m[0]}</b>`
        );
        tempFormattedString = formattedItemRegEx;
      }
    });
    // const text = 'new ';
    //const pattern = /\bnew \b/gi;
    // console.log('pattern1', pattern1);
    //const pattern = new RegExp('^.+?\\s');
    //const pattern: RegExp = /\b(new y)\w*/gi;
    //const pattern = new RegExp('\\b(' + searchTerm + ')\\+?\\s', 'gi');
    // console.log('pattern', pattern.test(searchTerm));

    //const pattern2 = new RegExp(searchTerm, );

    //const matches: RegExpMatchArray = cityWithCountry.match(pattern)!;
    //console.log(matches);

    // const match: RegExpMatchArray = cityWithCountry.match(
    //   new RegExp(searchTerm, 'i')

    // )!;
    // console.log('match', match);

    //filterResults.innerHTML = formattedItem;
    //filterResults.innerHTML = cityWithCountry;
    filterResults.innerHTML = formattedItemRegEx;
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
