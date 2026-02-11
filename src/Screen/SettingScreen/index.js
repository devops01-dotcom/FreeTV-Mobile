import React, { useCallback, useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import styles from './styles';
import BackHeader from '../../Component/BackHeader';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IMAGES } from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawerContent from '../../Component/DrawerScreen';
import Header from '../../Component/Header';
import DeviceInfo from 'react-native-device-info';
import { navigateTo } from '../../utils/navigateTo';
import { AutoLoginData } from '../../redux/slice/onBoardingSlice';
import RNRestart from 'react-native-restart';



const SettingScreen = ({ navigation }) => {
    const { userProfile } = useAppSelector(ProfileSelector) || {}
    const [showDrawer, setShowDrawer] = useState(false);
    const [progressing, setProgressing] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const appVersion = DeviceInfo.getVersion();
    const dispatch = useAppDispatch();

    const onLogout = () => {
        Alert.alert(
            'Restart App',
            'You will be logged out and the app will restart. Do you want to continue?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(AutoLoginData());
                        RNRestart.restart();
                        // setTimeout(() => resetNavigation('Login'), 100);
                    },
                },
            ]
        );
    };

    const onBackHandler = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {!showDrawer && <Header setShowDrawer={setShowDrawer} showHeader={progressing} setShowAlert={setShowAlert} />}

            {showDrawer ? (
                <CustomDrawerContent setShowDrawer={setShowDrawer} />
            ) : (
                <View>

                    <View style={styles.row}>
                        <View style={styles.leftSide}>
                            <Text style={styles.Heading}>Mobile Number</Text>
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
                            <Text style={styles.Heading}>Pin Code</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.Heading}>:</Text>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={styles.Detail}>{userProfile?.pincode}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.leftSide}>
                            <Text style={styles.Heading}>Validity</Text>
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
                            <Text style={styles.Heading}>Device ID</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.Heading}>:</Text>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={styles.Detail}>{userProfile?.deviceId}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.leftSide}>
                            <Text style={styles.Heading}>Partner ID</Text>
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
                            <Text style={styles.Heading}>App Version</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.Heading}>:</Text>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={styles.Detail}>{appVersion}</Text>
                        </View>
                    </View>

                    {/* <View style={styles.row}>
                        <View style={styles.leftSide}>
                            <Text style={styles.Heading}>packagestatus</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.Heading}>:</Text>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={styles.Detail}>{userProfile?.packagestatus ? 'Active' : 'In Active'}</Text>
                        </View>
                    </View> */}

                    <TouchableOpacity style={styles.backButton} onPress={onBackHandler}>
                        <Text style={styles.buttonText}>Back</Text>
                        <Image
                            source={IMAGES.logout}
                            style={styles.backIcon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ScreenButton} onPress={() => navigateTo('PrivacyPolicy')}>
                        <Image
                            source={IMAGES.privacyPolicy}
                            style={styles.backIcon}
                            resizeMode='contain'
                        />
                        <Text style={styles.buttonText}>Privacy Policy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ScreenButton} onPress={() => navigateTo('Subscription')}>
                        <Image
                            source={IMAGES.subscription}
                            style={styles.backIcon}
                            resizeMode='contain'
                        />
                        <Text style={styles.buttonText}>Buy OTT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ScreenButton} onPress={() => navigateTo('HelpScreen')}>
                        <Image
                            source={IMAGES.subscription}
                            style={styles.backIcon}
                            resizeMode='contain'
                        />
                        <Text style={styles.buttonText}>Help</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ScreenButton} onPress={onLogout}>
                        <Image
                            source={IMAGES.logout}
                            style={styles.backIcon}
                            resizeMode='contain'
                        />
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>

                </View>)}
        </SafeAreaView>
    )
};

export default SettingScreen;