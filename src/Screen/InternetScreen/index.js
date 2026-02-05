import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";



const InternetScreen = ({ isConnected, setIsConnected }) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Add a delay of 3 seconds before updating the connection status
      setTimeout(() => {
        setIsConnected(state.isConnected);
      }, 3000); // 3000ms = 3 seconds
    });

    return () => unsubscribe();
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.detail}>Internet is not connected</Text>
      </View>
    </View>
  );
};

export default InternetScreen;
