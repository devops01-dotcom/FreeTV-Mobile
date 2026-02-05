// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slice/loadingSlice';
import commonReducer from './slice/commonAction';
import AuthReducer from './slice/onBoardingSlice';
import ProfileReducer from './slice/profileSlice';
import CategoriesReducer from './slice/liveTvCategories';
import FavouriteAppReducer from './slice/favouriteapp';
import AddlaunchReducer from './slice/addlaunch';
import WatchVideoReducer from './slice/watchVideo';
import MoviesReducer from './slice/moviesSlice';
import FreeTvSeriesReducer from './slice/freeTvSeriesSlice';
import AppTVReducer from './slice/appTvSlice';
import EducationReducer from './slice/educationSlice';
import MusicReducer from './slice/musicSlice';
import DevotionalReducer from './slice/devotionalSlice';
import freeTVActionReducer from './slice/freeTvCommonAction';
import PartnerDetailReducer from './slice/partnerDetail'
import BootupAdViewReducer from './slice/bootupadview'


import {
  userAuthReducerPersistConfig,
  userProfileReducerPersistConfig,
  liveTvCategoriesReducerPersistConfig,
  FavouriteAppReducerPersistConfig,
  WatchVideoReducerPersistConfig,
  AddLaunchPersistConfig,
  FreeTvReducerPersistConfig
} from '../utils/persistData';
import { persistReducer } from 'redux-persist';


const appReducer = combineReducers({
  loading: loadingReducer,
  commonReducer,
  BootupAdViewReducer,
  freeTVActionReducer: persistReducer(FreeTvReducerPersistConfig, freeTVActionReducer),
  AuthReducer: persistReducer(userAuthReducerPersistConfig, AuthReducer),
  ProfileReducer:  persistReducer(userProfileReducerPersistConfig, ProfileReducer),
  CategoriesReducer: persistReducer(liveTvCategoriesReducerPersistConfig, CategoriesReducer),
  FavouriteAppReducer: persistReducer(FavouriteAppReducerPersistConfig, FavouriteAppReducer),
  AddlaunchReducer: persistReducer(AddLaunchPersistConfig, AddlaunchReducer),
  WatchVideoReducer: persistReducer(WatchVideoReducerPersistConfig, WatchVideoReducer),
  MoviesReducer,
  FreeTvSeriesReducer,
  AppTVReducer,
  EducationReducer,
  MusicReducer,
  DevotionalReducer,
  PartnerDetailReducer,

  // AddPropertyReducer: persistReducer(userPropertyReducerPersistConfig, AddPropertyReducer),

});

const rootReducer = (state, action) => {
  // if (action.type === RESET_STATE) {
  //   state = undefined; // Reset the entire state
  // }
  return appReducer(state, action);
};

export default rootReducer; 
