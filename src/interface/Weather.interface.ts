export interface CurrentWeather {
  city: string;
  localTime: string;
  temperature: number;
  weather: string;
  // mfl
}

export interface CurrentWeatherIntervals {
  localTime: string;
  temperature: number;
  weatherIcon: string;
}

export interface forecastWeatherOverview {
  date: string;
  weekday: string;
  weatherIcon: string;
  minTemp: number;
  maxTemp: number;
}

export interface forecastWeatherDetails {
  time: string;
  weatherIcon: string;
  temp: number;
  wind: string;
  humidity: string;
}
