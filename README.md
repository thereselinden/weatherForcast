# Weather forcast
> This is a pair programming project done by me and [Johan Brynielsson](https://github.com/johanbry). The purpose of this project was to practice Vanilla Typescript outside original school projects. We are using OpenWeatherApi to display current and 5-days forecast weather and their Geocoding API to search on cities around the world. 


> In this app you will be asked to share your location to see weather at your current position. If declined, fallback coordinates are Stockholm. Use the input field to search on cities around the world, after 3 characthers an autocomplete list will be shown. Your input string will be bold in the autocomplete list. Searched city will show its current time using UTC-time. 


> We are using MongoDB Atlas to store data fetched from the Geocodeing API. 


## Learning objectives 
* Using Typescript on both frontend and backend.
* How to hide API key by using a proxy server
* How to use webpack to bundle files.
* How to use MongoDB Atlas and create searchIndex to autocomplete city search
* How to handle diacritics when searching for citites
* How to display localtime depending on city searched 
* How to use the ``Navigator.geolocation`` to get current postion of the device 


## View the site live 
[The app is deployed at Netlify](https://weatherappjt.netlify.app/)

## Tech used
* Typescript 
* API 
* Navigator.Geolocation
* Webpack


## Improvments
> If we had more time we would like to add extra features

* Make it possible to navigate autocomplete list using the keyboard

