import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { COLORS } from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../../Component/BackHeader';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BootupAdViewSelector } from '../../redux/slice/bootupadview';
import { AuthSelector } from "../../redux/slice/onBoardingSlice";
import { useAppSelector } from "../../redux/hooks";
import { HEIGHT } from '../../utils/dimension';

const BootupAds = React.lazy(() => import('../../Component/bootupAd'));


const isTablet = DeviceInfo.isTablet();

const MobAdScreen = () => {
    const [search, setSearch] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const { bootupData } = useAppSelector(BootupAdViewSelector);
    const [progressing, setProgressing] = useState(true);
    const { loginData } = useAppSelector(AuthSelector);

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgressing(false);
            loginData?.token
                ? navigation.navigate('Home')
                : navigation.navigate('Login')
            dispatch(setShowHomeAds(false))
        }, 30000,);
        return () => clearTimeout(timer); // cleanup timer
    }, [bootupData]);

    const onBackHandler = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image source={IMAGES.appLogo} style={styles.appIcon} resizeMode='contain' />
                <View style={{ height: HEIGHT.h25, marginBottom: 20 }}>
                    <BootupAds setProgressing={setProgressing} bootupData={bootupData} />
                </View>
        </SafeAreaView>
    )
};


export default MobAdScreen;

