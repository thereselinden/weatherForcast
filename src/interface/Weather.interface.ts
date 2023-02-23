export interface CurrentWeather {
  city: string;
  localTime: string;
  temperature: number;
  weather: string;
}

export interface CurrentWeatherIntervals {
  localTime: string;
  temperature: number;
  weatherIcon: string;
  weatherDescription: string;
}

export interface ForecastWeatherOverview {
  date: string;
  weekday: string;
  weatherIcon: string;
  weatherDescription: string;
  minTemp: number;
  maxTemp: number;
  intervals: ForecastWeatherDetails[];
}

export interface ForecastWeatherDetails {
  time: string;
  weatherIcon: string;
  weatherDescription: string;
  temp: number;
  wind: string;
  humidity: string;
}
