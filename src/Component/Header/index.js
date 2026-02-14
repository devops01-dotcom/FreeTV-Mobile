import React from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import { IMAGES } from '../../assets';
import { COLORS } from '../../utils/color';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';

const isTablet = DeviceInfo.isTablet();

const Header = ({
    // showHeader,
    setShowDrawer,
    // setShowAlert
}) => {

    const onShowHeader = () => {
        // if (showHeader) {
        //     return setShowAlert(true)
        // }
        // else {
            setShowDrawer(true)
        // }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { borderColor: COLORS.yellow }]}
                onPress={onShowHeader}
            >
                {/* <Icon name='menu' size={isTablet ? 55 : 30} color={COLORS.white} /> */}
            <FastImage source={IMAGES.menu}  resizeMode={FastImage.resizeMode.contain} style={styles.menubar}/>
            </TouchableOpacity>
            <View style={styles.centerView}>
                <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' />
            </View>
            {/* <View
                style={[styles.button, { borderWidth: 0, justifyContent: 'center', alignItems: 'flex-end' }]}
            // onPress={onSearchItem}
            >
                {!logo && <Icon name='search' size={30} color={COLORS.white} />}
            </View> */}
        </View>

        // </View>
    );
};


export default Header;
