import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import { useAppSelector } from '../../redux/hooks';
import { IMAGES } from '../../assets';
import { DateFormat } from '../../utils/timeformat';
import DeviceInfo from 'react-native-device-info';
import Header from '../../Component/Header';
import CustomDrawerContent from '../../Component/DrawerScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../../Component/CustomAlert';


const ProfileScreen = ({ navigation }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { userProfile } = useAppSelector(ProfileSelector) || {}
    const [showAlert, setShowAlert] = useState(false);
    const [progressing, setProgressing] = useState(false);
    const appVersion = DeviceInfo.getVersion();


    const onBackHandler = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            {!showDrawer && <Header setShowDrawer={setShowDrawer} showHeader={progressing} setShowAlert={setShowAlert} />}
            {showDrawer ? (
                <CustomDrawerContent setShowDrawer={setShowDrawer} />
            ) : (
                <>
                    {/* <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' /> */}

                    <View style={styles.row}>
                        <View style={styles.leftSide}>
                            <Text style={styles.Heading}>Mobile No</Text>
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
                            <Text style={styles.Heading}>Pincode</Text>
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
                            <Text style={styles.Heading}>Device Id</Text>
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
                            <Text style={styles.Heading}>Pack ExpiryDate</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.Heading}>:</Text>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={styles.Detail}>{DateFormat(userProfile?.PackExpiryDate)}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.leftSide}>
                            <Text style={styles.Heading}>APP Version</Text>
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
                    <Text style={styles.Heading}>Privacy Policy:</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text
                        style={[styles.Detail, { color: COLORS.activeText, textDecorationLine: 'underline' }]}
                        onPress={() => {
                            // Navigate to privacy policy screen or open link
                            // Example: Linking.openURL('https://example.com/privacy-policy');
                        }}
                    >
                        View
                    </Text>
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

                    <CustomAlert
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    />
                </>
            )
            }
        </SafeAreaView>
    )
};

export default ProfileScreen;
