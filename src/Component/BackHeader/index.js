import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets';
import DeviceInfo from 'react-native-device-info';
import { COLORS } from '../../utils/color';

const isTablet = DeviceInfo.isTablet();

const BackHeader = ({
    onBackHandler,
    name,
    placeholder,
    onChangeText,
    onlyBack
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftSide} onPress={onBackHandler}>
                {/* <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' /> */}
                <View style={styles.leftLogo}>
                  <FastImage
                    source={IMAGES.back}
                    style={styles.backIcon}
                    resizeMode={FastImage.resizeMode.contain}
                />
                </View>
            </TouchableOpacity>
            <View style={styles.centerView}>
                {!onlyBack && <TextInput
                    name={name || ''}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.white}
                    onChangeText={onChangeText}
                    style={styles.input} />}
            </View>

                {/* <Text style={styles.backText}>Back</Text> */}
            <View style={styles.header} onPress={onBackHandler}>
                <FastImage
                    source={IMAGES.freeTV}
                    style={styles.logo}
                    resizeMode={FastImage.resizeMode.contain}
                /> 
            </View>
        </View>
    )
};

export default BackHeader;
