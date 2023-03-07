interface Config {
  url: {
    API_URL: string;
  };
}

const prod: Config = {
  url: {
    API_URL: 'https://weather-forecast-2023.herokuapp.com/',
  },
};

const dev: Config = {
  url: {
    API_URL: 'http://localhost:3000/',
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
