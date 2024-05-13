// import { combineReducers } from 'redux';
// import weatherReducer from './weatherReducer';

// const rootReducer = combineReducers({
//   weather: weatherReducer,
//   // add other reducers here if you have more
// });

// export default rootReducer;

// rootReducer.js

import { combineReducers } from 'redux';
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE
} from '../actions/weatherActions';

const initialWeatherState = {
  forecast: null,
  loading: false,
  error: null
};

const weatherReducer = (state = initialWeatherState, action) => {
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weather: weatherReducer
});

export default rootReducer;
