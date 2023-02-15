/* const lat: number = 51.509865;
const long: number = -0.118092; */

const lat: number = 59.334591;
const long: number = 18.06324;

interface CurrentWeather {
  city: string;
  localTime: string;
  temperature: number;
  weather: string;
  // mfl
}

const getLocalTime = (time: number, timezone: number): string => {
  const localTime = new Date((time + timezone) * 1000);
  const getHours = localTime.getUTCHours();
  const getMinutes = localTime.getUTCMinutes();

  return `${getHours}:${getMinutes}`;
};

const getTemperature = (temp: number): number => Math.round(temp);

const printCurrentWeather = (weather: CurrentWeather) => {
  const city = document.querySelector('#city') as HTMLHeadingElement;
  const localTime = document.querySelector('#localTime') as HTMLHeadingElement;
  const temperature = document.querySelector(
    '#temperature'
  ) as HTMLParagraphElement;
  const weatherDescription = document.querySelector(
    '#weatherDescription'
  ) as HTMLParagraphElement;

  city.textContent = weather.city;
  localTime.textContent = weather.localTime;
  temperature.innerHTML = `${weather.temperature.toString()} &#8451`;
  weatherDescription.textContent = weather.weather;

  console.log(weather);
};

// fetch för current
const fetchCurrentWeather = async (
  lat: number,
  long: number
): Promise<void> => {
  const url = `http://localhost:3000/api/weather/current/${lat}/${long}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const currentWeather: CurrentWeather = {
      city: data.name,
      localTime: getLocalTime(data.dt, data.timezone),
      temperature: getTemperature(data.main.temp),
      weather: data.weather[0].description,
    };

    printCurrentWeather(currentWeather);
  } catch (err) {
    // ska vi hantera detta med speciell text? ladda om sidan något gick fel
    throw err;
  }
};
fetchCurrentWeather(lat, long);
//console.log(currentWeather);

// fetch för forcast
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// fetch direct geoCoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
