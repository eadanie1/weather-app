import axios from 'axios';

// Action types
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
const city = 'Stockholm';
const countryCode = 'se';
let location = `${city},${countryCode}`;

// Action creators
export const fetchWeather = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
      
      if (response.status === 200) {
        dispatch({
          type: FETCH_WEATHER_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: FETCH_WEATHER_FAILURE,
          error: 'Failed to fetch weather data',
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_WEATHER_FAILURE,
        error: error.message,
      });
    }
  };
};
