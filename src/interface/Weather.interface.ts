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

export interface ForecastWeatherOverview {
  date: string;
  weekday: string;
  weatherIcon: string;
  minTemp: number;
  maxTemp: number;
  intervals: ForecastWeatherDetails[];
}

export interface ForecastWeatherDetails {
  time: string;
  weatherIcon: string;
  temp: number;
  wind: string;
  humidity: string;
}
