// /**
//  * @format
//  */

// // import {AppRegistry} from 'react-native';
// // import App from './App';
// // import {name as appName} from './app.json';

// // AppRegistry.registerComponent(appName, () => App);



// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './src/redux/store';

// const Root = () => (
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// )

// AppRegistry.registerComponent(appName, () => Root);


/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';

// AppRegistry.registerComponent(appName, () => App);
const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
