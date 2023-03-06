const removeDiacritics = require('diacritics').remove;

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

  let filteredCities: HTMLDivElement = document.querySelector(
    '#filteredCities'
  ) as HTMLDivElement;
  filteredCities.textContent = '';

  cities.forEach(city => {
    const filterResults: HTMLDivElement = document.createElement('div');
    const cityWithCountry: string = `${city.name}, ${city.country}`;
    let formattedItemRegEx: string = '';

    let tempFormattedString = cityWithCountry;

    searchTermArr.forEach(term => {
      const pattern = new RegExp(term, 'gi');
      const matches: IterableIterator<RegExpMatchArray> =
        cityWithCountry.matchAll(pattern)!;

      for (const match of matches) {
        formattedItemRegEx = tempFormattedString.replace(
          match[0],
          `<b>${match[0]}</b>`
        );
        tempFormattedString = formattedItemRegEx;
      }
    });

    // Om vi skriver L ta bort Polskt L från databasen för matchning och returnera resultat enligt databas (dvs med polskt L)
    if (formattedItemRegEx === '') {
      const cityWithCountryNoDiacritics = removeDiacritics(cityWithCountry);

      tempFormattedString = cityWithCountryNoDiacritics;

      searchTermArr.forEach(term => {
        const pattern = new RegExp(term, 'gi');
        const matches: IterableIterator<RegExpMatchArray> =
          cityWithCountryNoDiacritics.matchAll(pattern)!;

        for (const match of matches) {
          formattedItemRegEx = `${cityWithCountry.substring(
            0,
            match.index
          )}<b>${cityWithCountry.substring(
            Number(match.index),
            Number(match.index) + searchTermLength
          )}</b>${cityWithCountry.substring(
            Number(match.index) + searchTermLength
          )}`;

          tempFormattedString = formattedItemRegEx;
        }
      });
    }

    //Om diacricits används i inputfältet, ta bort för att matcha mot databas, t ex skriver ett polst l med Los visa resultat som t ex los angeles...
    // Om vi skriver L ta bort Polskt L från databasen för matchning och returnera resultat enligt databas (dvs med polskt L)
    if (formattedItemRegEx === '') {
      tempFormattedString = cityWithCountry;

      searchTermArr.forEach(term => {
        const inputWithNoDiacritics = removeDiacritics(term);
        const pattern = new RegExp(inputWithNoDiacritics, 'gi');
        const matches: IterableIterator<RegExpMatchArray> =
          cityWithCountry.matchAll(pattern)!;

        for (const match of matches) {
          formattedItemRegEx = `${cityWithCountry.substring(
            0,
            match.index
          )}<b>${cityWithCountry.substring(
            Number(match.index),
            Number(match.index) + searchTermLength
          )}</b>${cityWithCountry.substring(
            Number(match.index) + searchTermLength
          )}`;

          tempFormattedString = formattedItemRegEx;
        }
      });
    }

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
