import { createStore, applyMiddleware } from 'redux';
import { thunk } from  'redux-thunk'; // Importing default export

import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
