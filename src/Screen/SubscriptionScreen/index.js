import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IMAGES } from '../../assets';
import { DateFormat } from '../../utils/timeformat';
import DeviceInfo from 'react-native-device-info';
import Header from '../../Component/Header';
import CustomDrawerContent from '../../Component/DrawerScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../../Component/CustomAlert';
import QRCode from 'react-native-qrcode-svg';
import { fetchBuyOTT, fetchPartnerQr, PartnerDetailSelector } from '../../redux/slice/partnerDetail';

const SubscriptionScreen = ({ navigation }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { userProfile } = useAppSelector(ProfileSelector) || {}
    const [showAlert, setShowAlert] = useState(false);
    const [progressing, setProgressing] = useState(false);
    const appVersion = DeviceInfo.getVersion();
    const { partnerDetail, advertismentDetail, providerDetail, buyOttQrCode } = useAppSelector(PartnerDetailSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBuyOTT())
    }, [])

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
                    <Text style={styles.Heading}>Buy OTT</Text>

                    {buyOttQrCode && <View style={{ alignSelf: 'center' }}> <QRCode value={buyOttQrCode} size={180} /> </View>}
                    <Text style={styles.instruction}>Scan QR code and Buy OTT</Text>

                    {/* <TouchableOpacity style={styles.backButton} onPress={onBackHandler}>
                        <Text style={styles.buttonText}>Back</Text>
                        <Image
                            source={IMAGES.logout}
                            style={styles.backIcon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity> */}

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

export default SubscriptionScreen;

