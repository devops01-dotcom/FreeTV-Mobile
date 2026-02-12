import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistor } from '../redux/store';
import RNRestart from 'react-native-restart';
import FastImage from 'react-native-fast-image';
import { Alert } from 'react-native';

export const handleLogout = async () => {
  try {
    // 3️⃣ async storage clear
    await AsyncStorage.clear();

    // 1️⃣ redux-persist data clear
    await persistor.purge();

    // 2️⃣ ensure state write complete
    await persistor.flush();

    FastImage.clearMemoryCache();

    FastImage.clearDiskCache();

    // 4️⃣ small delay before restart (VERY IMPORTANT)
    setTimeout(() => {
      RNRestart.Restart();
    }, 500); // 300–700ms best for Android TV

  } catch (e) {
    console.log('Logout error', e);
  }
};
