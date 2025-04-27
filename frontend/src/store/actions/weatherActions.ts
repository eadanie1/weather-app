import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { Weather, WeatherState } from '../../types/types';

// Action types
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

// Action creators
export const fetchWeatherRequest = (): { type: string } => ({
  type: FETCH_WEATHER_REQUEST
});

export const fetchWeatherSuccess = (forecast: Weather[]): { type: string, payload: Weather[] } => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: forecast
});

export const fetchWeatherFailure = (error: string): { type: string, payload: string } => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error
});

export const setSelectedCity = (city: string): { type: string, payload: string } => ({
  type: SET_SELECTED_CITY,
  payload: city
});

export const fetchWeather = (city: string) => async (dispatch: Dispatch):Promise<WeatherState | void> => {
  dispatch(fetchWeatherRequest());
  try {
    const response = await axios.post(`https://weather-app-jrb3.vercel.app/api/forecast`, { city });

    dispatch(setSelectedCity(city));
    dispatch(fetchWeatherSuccess(response.data.forecast));
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data.message) {
      dispatch(fetchWeatherFailure(axiosError.response.data.message));
    } else {
      dispatch(fetchWeatherFailure("An error occurred while fetching weather data"));
    }
  }
};
