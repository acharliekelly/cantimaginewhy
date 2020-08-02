import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import aboutReducer from './aboutReducer';
import connectReducer from './connectReducer';
import galleryReducer from './galleryReducer';
import geoReducer from './geoReducer';
import mainReducer from './mainReducer';
import navReducer from './navReducer';
import productReducer from './productReducer';
import progressReducer from './progressReducer';
import tagsReducer from './tagsReducer';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  mainReducer,
  navReducer,
  galleryReducer,
  progressReducer,
  geoReducer,
  productReducer,
  tagsReducer,
  connectReducer,
  aboutReducer
});

export default createRootReducer;