import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  // add other reducers here if you have more
});

export default rootReducer;
