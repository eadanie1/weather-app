import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, SET_SELECTED_CITY } from "../store/actions/weatherActions";

export interface Weather {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export interface WeatherState {
    forecast: Weather[] | null;
    loading: boolean;
    error: string | null;
    selectedCity: string;
}

export interface FetchWeatherRequestAction {
  type: typeof FETCH_WEATHER_REQUEST;
}

export interface FetchWeatherSuccessAction {
  type: typeof FETCH_WEATHER_SUCCESS;
  payload: Weather[];
}

export interface FetchWeatherFailureAction {
  type: typeof FETCH_WEATHER_FAILURE;
  payload: string;
}

export interface SetSelectedCityAction {
  type: typeof SET_SELECTED_CITY;
  payload: string;
}

export type WeatherActionTypes =
  | FetchWeatherRequestAction
  | FetchWeatherSuccessAction
  | FetchWeatherFailureAction
  | SetSelectedCityAction;