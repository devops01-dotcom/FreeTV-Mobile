
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
  BackHandler,
} from 'react-native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AutoLoginData, fetchLogin, fetchLoginWithMacid, fetchOtp } from '../../redux/slice/onBoardingSlice';
import { COLORS } from '../../utils/color';
import DeviceInfo from 'react-native-device-info';
import { formatCountdownTime } from '../../utils/timeformat';
// import { Ionicons } from '@react-native-vector-icons/ionicons';
import { IMAGES } from '../../assets';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';
import { APP_FONTS } from '../../utils/fontFamily';
import { navigateTo } from '../../utils/navigateTo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const phoneRef = useRef(null);
  const pinCodeRef = useRef(null);
  const otpRef = useRef(null);
  const [showOtp, setShowOtp] = useState(false)
  const [pinCode, setPincode] = useState('')
  const [otp, setOtp] = useState('')
  const [macID, setMacID] = useState(null)
  const [deviceID, setDeviceId] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [showExitAppModal, setShowExitAppModal] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchMacAddress = async () => {
    };
    fetchMacAddress();
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      if (showOtp) {
        setShowOtp(false); // Close detail view
        return true; // Prevent default back behavior
      }
      else {
        BackHandler.exitApp()
      }
      return false; // Allow default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );

    return () => backHandler.remove();
  }, [showOtp]);

  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setDeviceId('75fc1fc55e397a1a')
      // setDeviceId(uniqueId);
    });
  }, [])
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);


  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsRemaining]);

  const authenticates = useCallback(() => {
    setErrorMessage(null)
    let data = {
      phone,
      macId: deviceID,
      deviceId: deviceID,
      app_type: 'FREETVMOB'
    }
    dispatch(fetchLogin(data)).then((res) => {
      if (res.payload.data.data.msg === 'Otp Sent Successfully' && !res.payload.data.data.success) {
        setSecondsRemaining(180)
        setShowOtp(true)
        setTimeout(() => {
          otpRef.current?.focus()
        }, 500)
        return
      }
      if (!res.payload.data.data.success) {
        setErrorMessage(res.payload.data.data.msg)
        return
      }
    })
  }, [dispatch, phone]);


  const onOtpHandler = useCallback((text) => {
    setErrorMessage(null)
    let data = {
      phone,
      macId: deviceID,
      deviceId: deviceID,
      pincode: pinCode,
      otp: text,
      app_type: 'FREETVMOB'
    }
    dispatch(fetchOtp(data)).then((res) => {
      if (!res.payload.data.data.success) {
        setErrorMessage(res.payload.data.data.msg)
        return
      }
    })
  }, [dispatch, otp, pinCode]);

  useEffect(() => {
    if (showOtp) {
      otpRef.current?.focus()
      return
    }
    else {
      phoneRef.current?.focus()
      return
    }
  }, [showOtp, otpRef, showExitAppModal, setShowOtp])

  const handleOtpChange = useCallback((text) => {
    setOtp(text);
    if (text.length === 4) {
      onOtpHandler(text)
      Keyboard.dismiss()

    }
  }, [otp]);

  const handlePhoneChange = (text) => {
    setPhone(text);
    if (text.length === 10) {
      pinCodeRef.current?.focus();
    }
    // if (pinCode.length === 6) {
    //   Keyboard.dismiss()
    //   // pinCodeRef.current?.focus();
    // }
  };

  // const handlePhoneChange = () => {
  //   setErrorMessage(null)
  //   pinCodeRef.current?.focus();
  // };

  const handlePinChange = () => {
    if (pinCode.length === 6) {
      Keyboard.dismiss()
      setErrorMessage(null)

    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const data = {
        macId: deviceID,
        deviceId: deviceID,
        app_type: 'FREETVMOB'
      };
      if (deviceID) {
        dispatch(fetchLoginWithMacid(data)).then((res) => {
          if (!res.payload.data.data.status) {
            dispatch(AutoLoginData());
          }
        });
      }
    }, [deviceID, dispatch])
  );



  return (
    <>
      {!showOtp ?
        <View style={styles.container}>
          <KeyboardAwareScrollView
            behavior={'height'}>
            <Image source={IMAGES.appLogo} style={styles.appIcon} resizeMode='contain' />
            <Text style={styles.loginText}  > Activate</Text>
            {errorMsg && <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={[styles.otpInstruction, { color: COLORS.red, paddingBottom: 10 }]}>{errorMsg}</Text>
            </View>}

            <View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.row}>
                  <View style={styles.textInputButton}>
                    <Text style={styles.codeDetailText}>+91</Text>
                  </View>
                  <TextInput
                    ref={phoneRef}
                    style={styles.textInput}
                    placeholder="Phone Number"
                    textAlignVertical='center'
                    placeholderTextColor={COLORS.black}
                    value={phone}
                    keyboardType='numeric'
                    // onChangeText={setPhone}
                    onChangeText={handlePhoneChange}

                    // onSubmitEditing={handlePhoneChange}
                    maxLength={10}
                  />
                </View>

                <View style={{ width: '80%' }}>
                  <Text style={styles.otpInstruction}>{`*Please enter 10 digit mobile number\n*मोबाईल नंबर के 10 अंको को दर्ज करें.`}</Text>
                </View>
              </View>
            </View>

            <View style={{ marginVertical: 30 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.row}>
                  <View style={[styles.textInputButton, { width: '28%' }]}>
                    <Text style={styles.codeDetailText}>Pin Code</Text>
                  </View>
                  <TextInput
                    ref={pinCodeRef}
                    style={[styles.textInput, { width: '64%' }]}
                    placeholder="Pin Code"
                    textAlignVertical='center'
                    placeholderTextColor={COLORS.black}
                    value={pinCode}
                    maxLength={6}
                    keyboardType='numeric'
                    onChangeText={setPincode} // Call the handler
                    onSubmitEditing={handlePinChange} // Call the handler

                  />
                </View>

                <View style={{ width: '80%' }}>
                  <Text style={styles.otpInstruction}>{`*Please enter your Area pin code number\n*अपने एरीया का पिन कोड दर्ज करें.`}</Text>
                </View>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.termsAndCondition}>
                By proceeding, you confirm that you are at least 18 years old and{' '}
                <View style={styles.inline}>
                  {/* <Ionicons name="checkbox" size={18} color={COLORS.white} /> */}
                </View>{' '}agree
                to our
                <Text style={styles.bold} onPress={() => navigateTo('PrivacyPolicy')}> Privacy Policy</Text> and
                <Text style={styles.bold} onPress={() => navigateTo('PrivacyPolicy')}> Terms of Use.</Text>
              </Text>
            </View>
            {pinCode.length === 6 && phone.length === 10 && <TouchableOpacity style={styles.button} onPress={authenticates}>
              <Text style={[styles.buttonText, { fontFamily: APP_FONTS.PoppinsBold }]}>Get OTP</Text>
            </TouchableOpacity>}
          </KeyboardAwareScrollView>
        </View>

        :
        <View style={styles.container}>
          <KeyboardAwareScrollView
            behavior={'height'}>
            <Image source={IMAGES.appLogo} style={styles.appIcon} resizeMode='contain' />
            <Text style={styles.loginText}> Activate</Text>
            {errorMsg && <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={[styles.otpInstruction, { color: COLORS.red, paddingBottom: 10 }]}>{errorMsg}</Text>
            </View>}

            <View style={[styles.row, { marginBottom: 5 }]}>
              <View style={[styles.textInputButton, { width: '28%' }]}>
                <Text style={styles.codeDetailText}>
                  OTP
                </Text>
              </View>
              <TextInput
                ref={otpRef}
                style={[styles.textInput, { width: '64%' }]}
                placeholder="OTP"
                keyboardType='numeric'
                placeholderTextColor={COLORS.black}
                value={otp}
                maxLength={4}
                onChangeText={handleOtpChange}
              // onSubmitEditing={handleOtpChange}

              />
            </View>
            <View style={{ width: '80%' }}>
              <Text style={styles.otpInstruction}>{`*Please enter OTP received on your Mobile.\n *मोबाईल पर प्राप्त OTP को दर्ज करें.`}</Text>
            </View>
            <View style={[styles.row, { marginVertical: 15 }]}>
              <View style={[styles.textInputButton, { width: '28%' }]}>
                <Text style={styles.codeDetailText}>
                  {formatCountdownTime(secondsRemaining)}
                </Text>
              </View>

              <TouchableOpacity style={[styles.textInput, { width: '64%' }]} onPress={authenticates}>
                <Text style={styles.buttonText}>
                  Resend Otp
                </Text>
              </TouchableOpacity>
            </View>

          </KeyboardAwareScrollView>
        </View>

      }
    </>

  );
};

export default LoginScreen;

