export interface ForecastCity {
  city: string;
}

export interface Weather {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export interface WeatherState {
    forecast: Weather[] | null;
}

export interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface GroupedData {
  [ date: string ]: ForecastEntry[];
}

export interface ErrorResponse {
  message: string;
}