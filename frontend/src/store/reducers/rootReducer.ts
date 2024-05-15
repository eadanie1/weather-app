import { combineReducers } from 'redux';
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  SET_SELECTED_CITY
} from '../actions/weatherActions';
import { WeatherActionTypes, WeatherState } from '../../types/types';

const initialWeatherState: WeatherState = {
  forecast: null,
  loading: false,
  error: null,
  selectedCity: 'Enter a city to show the forecast'
};

const weatherReducer = (state: WeatherState = initialWeatherState, action: WeatherActionTypes): WeatherState => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        forecast: action.payload,
        error: null
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weather: weatherReducer
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
