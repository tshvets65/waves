import { combineReducers } from 'redux';
import user from './user.js';
import products from './products';
import site from './site.js';

const rootReducer = combineReducers({
  user,
  products,
  site
});

export default rootReducer;