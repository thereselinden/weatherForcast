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
