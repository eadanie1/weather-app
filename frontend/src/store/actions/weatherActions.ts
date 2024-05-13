import axios from 'axios';

// Action types
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

// Action creators
export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST
});

export const fetchWeatherSuccess = (forecast) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: forecast
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error
});

export const setSelectedCity = (city) => ({
  type: SET_SELECTED_CITY,
  payload: city
});

export const fetchWeather = (city) => async (dispatch) => {
  dispatch(fetchWeatherRequest());
  try {
    
    const response = await axios.post(`http://localhost:3000/forecast`, { city });
    dispatch(setSelectedCity(city));
    dispatch(fetchWeatherSuccess(response.data.forecast));
  } catch (error) {
    dispatch(fetchWeatherFailure(error.message));
  }
};
