import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { setSignalStrength, setSignalType } from './src/redux/slice/loadingSlice';
import FlashMessage from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';
import RouteStack from './src/Routes/RouteStack';
import InternetScreen from './src/Screen/InternetScreen';
import Loader from './src/Component/Loader';
import { fetchClearUserCache, fetchProfile } from './src/redux/slice/profileSlice';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';
import { COLORS } from './src/utils/color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchBootupAdView } from './src/redux/slice/bootupadview';
import mobileAds from 'react-native-google-mobile-ads';


const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  const dispatch = useAppDispatch();
  const version = DeviceInfo.getVersion();

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
    // setTimeout(() => SplashScreen.hide(), 2000);
    dispatch(fetchBootupAdView())
  }, []);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Ads initialized----------');
      });
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchClearUserCache()).then(() => {
        const data = {
          app_type: 'FREETVMOB',
          app_version: version,
        };
        dispatch(fetchProfile(data));
      });
    }, 2 * 60 * 60 * 1000); // runs every 2 hours

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  useEffect(() => {
    const data = {
      app_type: 'FREETVMOB',
      app_version: version,
    };
    dispatch(fetchProfile(data))
  }, [dispatch])


  // useEffect(() => {
  //   axios.get('http://client.freetvindia.com/getapkfolder/')
  //     .then(response => {
  //       const url = response.data.data;
  //       const stringUrl = typeof url === 'string' ? url : String(url);
  //       const regex = /(\d+\.\d+)\.apk$/;
  //       const match = stringUrl.match(regex);

  //       if (match) {
  //         // Dispatch new app details to Redux
  //         dispatch(setNewAppDetail({
  //           currentAppVersion: version, // Assume 'version' is defined elsewhere
  //           appVersion: match[1],
  //           newAppUrl: stringUrl
  //         }));
  //       } else {
  //         console.log("Version not found");
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);


  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //     dispatch(setSignalType(state.type));
  //     if (state.details && 'strength' in state.details) {
  //       const strength = state.details.strength;
  //       dispatch(setSignalStrength(strength));
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [dispatch]);

  return (
    <>
      {isConnected ? (
        <>
          <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar
              barStyle="light-content"
              backgroundColor='transparent'
              translucent={true}
            // barStyle={statusBarStyle}
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RouteStack />
            </GestureHandlerRootView>
            <Loader />
            <FlashMessage position="top" />
          </SafeAreaView>

        </>
      ) : (
        <InternetScreen isConnected={isConnected} setIsConnected={setIsConnected} />
      )}
    </>
  );
};

export default App;