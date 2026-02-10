import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets';
import DeviceInfo from 'react-native-device-info';
import Header from '../../Component/Header';


const isTablet = DeviceInfo.isTablet();

const BackHeader = ({
    onBackHandler,
    name,
    placeholder,
    onChangeText,
    onlyBack
}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [progressing, setProgressing] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    return (
        <View style={styles.container}>
            {/* {!showDrawer && <Header setShowDrawer={setShowDrawer} showHeader={progressing} setShowAlert={setShowAlert} />} */}
            <View style={styles.leftSide}>
                <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' />
            </View>
            <View style={styles.centerView}>
                {!onlyBack && <TextInput
                    name={name || ''}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    style={styles.input} />}
            </View>
            <TouchableOpacity style={styles.header} onPress={onBackHandler}>
                {/* <Text style={styles.backText}>Back</Text> */}
                <FastImage
                    source={IMAGES.logout}
                    style={styles.backIcon}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
        </View>
    )
};

export default BackHeader;
