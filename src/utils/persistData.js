// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const userAuthReducerPersistConfig = {
//     key: 'athReducer',
//     storage: AsyncStorage,
//     blacklist: ['auth'],
//   };

//   export const userProfileReducerPersistConfig = {
//     key: 'profileReducer',
//     storage: AsyncStorage,
//     blacklist: ['auth'],
//   };
  
//   export const liveTvCategoriesReducerPersistConfig = {
//     key: 'liveTvReducerCategories',
//     storage: AsyncStorage,
//     blacklist: ['auth'],
//   };

//   export const userPropertyReducerPersistConfig = {
//     key: 'propertyReducer',
//     storage: AsyncStorage,
//     blacklist: ['auth'],
//   };


//   export const FavouriteAppReducerPersistConfig = {
//     key: 'FavouriteAppReducer',
//     storage: AsyncStorage,
//     blacklist: ['auth'],
//   };


//  export const WatchVideoReducerPersistConfig = {
//   key: 'WatchVideoReducer',
//   storage: AsyncStorage,
//   blacklist: ['auth'],
//  };
//  export const AddLaunchPersistConfig = {
//   key: 'AddLaunchReducer',
//   storage: AsyncStorage,
//   blacklist: ['auth'],
//  };

//  export const FreeTvReducerPersistConfig = {
//   key: 'FreeTvReducer',
//   storage: AsyncStorage,
//   blacklist: ['auth'],
//  };


 


 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'AuthReducer',
    'ProfileReducer',
    'FavouriteAppReducer',
    'continueWatchReducer',
    'freeTVActionReducer',
    'WatchVideoReducer',
    'AddlaunchReducer',
    'CategoriesReducer'
  ],
};
