import { NativeModules } from 'react-native';

const { MacAddressModule } = NativeModules;
const { WifiModule } = NativeModules;
const { AppLauncher } = NativeModules;

export const getMacAddress = async () => {
  try {
    const macAddress = await MacAddressModule.getMacAddress();
    return macAddress;
  } catch (error) {
    console.error("Failed to get MAC address:", error);
    return null;
  }
};




export const getWifiMacAddress = async () => {
  try {
    const macAddress = await WifiModule.getMacAddress();
    return macAddress;
  } catch (error) {
    console.error("Error fetching MAC address:", error);
    return null
  }
};


export const openAppOrStore = async (packageName, playStoreUrl) => {
  try {
    const result = await AppLauncher.openApp(packageName, playStoreUrl);
  } catch (error) {
    console.error("Error:=======", error);
  }
};

