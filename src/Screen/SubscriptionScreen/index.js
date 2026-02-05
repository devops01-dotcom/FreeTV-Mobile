import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import BackHeader from '../../Component/BackHeader';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import { useAppSelector } from '../../redux/hooks';
import { IMAGES } from '../../assets';

const SubscriptionScreen = ({ navigation }) => {
    const { userProfile } = useAppSelector(ProfileSelector) || {}


    const onBackHandler = useCallback(() => {
        navigation.goBack()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <BackHeader onBackHandler={onBackHandler}
                onlyBack={true}
            />
            <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' />

            <View style={styles.row}>
                <View style={styles.leftSide}>
                    <Text style={styles.Heading}>PackExpiryDate</Text>
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.Heading}>:</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.Detail}>{userProfile?.PackExpiryDate}</Text>
                </View>
            </View>
            


            <View style={styles.row}>
                <View style={styles.leftSide}>
                    <Text style={styles.Heading}>PartnerID</Text>
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.Heading}>:</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.Detail}>{userProfile?.PartnerID}</Text>
                </View>
            </View>


            <View style={styles.row}>
                <View style={styles.leftSide}>
                    <Text style={styles.Heading}>mobile_number</Text>
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.Heading}>:</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.Detail}>{userProfile?.mobile_number}</Text>
                </View>
            </View>


            <View style={styles.row}>
                <View style={styles.leftSide}>
                    <Text style={styles.Heading}>packagestatus</Text>
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.Heading}>:</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.Detail}>{userProfile?.packagestatus ? 'Active' : 'In Active'}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={onBackHandler}>
                <Text style={styles.buttonText}>Back</Text>
                <Image
                    source={IMAGES.logout}
                    style={styles.backIcon}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default SubscriptionScreen;
