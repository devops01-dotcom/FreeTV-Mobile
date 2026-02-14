import React, { useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import { IMAGES } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import DeviceIfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BootupAdViewSelector } from '../../redux/slice/bootupadview';
import { AuthSelector } from "../../redux/slice/onBoardingSlice";
import { useAppSelector } from "../../redux/hooks";
import Video from 'react-native-video';

const MobAdScreen = () => {
    const { bootupData } = useAppSelector(BootupAdViewSelector);
    const { loginData } = useAppSelector(AuthSelector);

    const handleVideoEnd = useCallback(() => {
        loginData?.token
            ? navigation.navigate('Home')
            : navigation.navigate('Login')
    }, []);

    const handleVideoError = useCallback((error) => {
        loginData?.token
            ? navigation.navigate('Home')
            : navigation.navigate('Login')
    }, []);


    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            loginData?.token
                ? navigation.navigate('Home')
                : navigation.navigate('Login')
        }, 30000,);
        return () => clearTimeout(timer); // cleanup timer
    }, [bootupData]);


    return (
        <SafeAreaView style={styles.container}>
            <Image source={IMAGES.appLogo} style={styles.appIcon} resizeMode='contain' />
            <View style={{ flex: 1 }}>
            <Video
                source={{ uri: bootupData?.ad_url }}
                style={styles.video}
                onEnd={handleVideoEnd}
                // repeat
                onError={(er) => {
                    // console.log('object video err', er)
                    handleVideoError
                }}
                adTagUrl={bootupData?.googlead_url}
            />
            </View>
        </SafeAreaView>
    )
};


export default MobAdScreen;

