
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
import { AutoLoginData, fetchLogin, fetchLoginWithMacid, fetchLoginWithPin, fetchOtp } from '../../redux/slice/onBoardingSlice';
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
import FastImage from 'react-native-fast-image';
import BackHeader from '../../Component/BackHeader';
import { logger } from 'react-native-reanimated/lib/typescript/common';

const LoginScreen = ({ navigation }) => {
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
  const [isPhone, setIsPhone] = useState(true);
  const [isPincode, setIsPincode] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validPinCode, setValidPinCode] = useState(false);
  const [validOTP, setValidOTP] = useState(false);
  const dispatch = useAppDispatch()
  const inputRefs = useRef([]);


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
      setDeviceId('75fc1fc55e397a1a222')
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

  useEffect(() => {
    if (phone.length === 10) return setValidNumber(true)
    else return setValidNumber(false)
  }, [phone])

  useEffect(() => {
    if (pinCode.length === 6) return setValidPinCode(true)
    else return setValidPinCode(false)
  }, [pinCode])

  useEffect(() => {
    if (otp.length === 4) return setValidOTP(true)
    else return setValidOTP(false)
  }, [otp])


  // const authenticates = useCallback(() => {
  //   setErrorMessage(null)
  //   let data = {
  //     phone,
  //     macId: deviceID,
  //     deviceId: deviceID,
  //     app_type: 'FREETVMOB'
  //   }
  //   dispatch(fetchLogin(data)).then((res) => {
  //     if (res.payload.data.data.msg === 'Otp Sent Successfully' && !res.payload.data.data.success) {
  //       setSecondsRemaining(180)
  //       setShowOtp(true)
  //       setTimeout(() => {
  //         otpRef.current?.focus()
  //       }, 500)
  //       return
  //     }
  //     if (!res.payload.data.data.success) {
  //       setErrorMessage(res.payload.data.data.msg)
  //       return
  //     }
  //   })
  // }, [dispatch, phone]);

  const resendOtp = useCallback(() => {
    setErrorMessage(null);
    const data = {
      phone,
      macId: macID ? macID : deviceID,
      deviceId: deviceID,
      app_type: 'FREETVMOB',
    };
    dispatch(fetchLogin(data))
    .then((res) => {
      const result = res.payload?.data?.data;
      
      // if (result.error_code === 105) {
      //   setIsPhone(false)
      //   setIsPincode(true)
      //   setPincode('')
      //   return
      // }
      // else {
      //   setErrorMessage(result?.msg);
      // }
    });
  }, []);


  const authenticates = useCallback(() => {
    setErrorMessage(null);
    const data = {
      phone,
      macId: macID ? macID : deviceID,
      deviceId: deviceID,
      app_type: 'FREETVMOB',
    };
    dispatch(fetchLogin(data)).then((res) => {
      const result = res.payload?.data?.data;
      if (result.error_code === 105) {
        setIsPhone(false)
        setIsPincode(true)
        setPincode('')
        return
      }
      else {
        setErrorMessage(result?.msg);
      }
    });
  }, [dispatch, isPhone, validNumber]);


  const authenticatePinCode = useCallback(() => {
    setErrorMessage(null);
    // ✅ Pincode validation (6 digits, only numbers)
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pinCode)) {
      setErrorMessage("Please enter a valid 6-digit pincode");
      return;
    }
    const data = {
      phone,
      pincode: pinCode,
      macId: macID ? macID : deviceID,
      deviceId: deviceID,
      app_type: 'FREETVMOB',
    };
    dispatch(fetchLoginWithPin(data)).then((res) => {
      const result = res.payload?.data?.data;
      if (result.msg === 'Otp Sent Successfully') {
        setSecondsRemaining(180);
        setIsPhone(false)
        setIsPincode(false)
        setIsOtp(true)
        setOtp('')
      }
      else {
        setErrorMessage(result?.msg);
      }
    });
  }, [dispatch, isPincode, pinCode]);

  const onOtpHandler = useCallback(() => {
    setErrorMessage(null);
    const data = {
      phone,
      macId: macID ? macID : deviceID,
      deviceId: deviceID,
      pincode: pinCode,
      otp: otp,
      app_type: 'FREETVMOB',
    };
    dispatch(fetchOtp(data)).then((res) => {
      if (!res.payload.data.data.success) {
        setErrorMessage(res.payload.data.data.msg);
      }
    });
  }, [dispatch, macID, deviceID, setIsOtp, phone, isPincode, otp]);




  // const onOtpHandler = useCallback((text) => {
  //   setErrorMessage(null)
  //   let data = {
  //     phone,
  //     macId: deviceID,
  //     deviceId: deviceID,
  //     pincode: pinCode,
  //     otp: text,
  //     app_type: 'FREETVMOB'
  //   }
  //   dispatch(fetchOtp(data)).then((res) => {
  //     if (!res.payload.data.data.success) {
  //       setErrorMessage(res.payload.data.data.msg)
  //       return
  //     }
  //   })
  // }, [dispatch, otp, pinCode]);

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

  const handleOtpChange = useCallback((text, index) => {
    const newOtp = otp.split('');
    newOtp[index] = text;
    const finalOtp = newOtp.join('');
    setOtp(finalOtp);

    // Move to next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // If last digit entered
    if (finalOtp.length === 4 && !finalOtp.includes('')) {
      onOtpHandler(finalOtp);
      Keyboard.dismiss();
    }
  }, [otp]);

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  // const handlePhoneChange = (text) => {
  //   setPhone(text);
  //   if (text.length === 10) {
  //     pinCodeRef.current?.focus();
  //   }
  //   // if (pinCode.length === 6) {
  //   //   Keyboard.dismiss()
  //   //   // pinCodeRef.current?.focus();
  //   // }
  // };

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

  const goGackToLogin = useCallback(() => {
    setIsPincode(false)
    setPincode('')
    setIsPhone(true)
    setErrorMessage(null)
  }, [])


  const goGackToPinCode = useCallback(() => {
    setIsOtp(false)
    setOtp('')
    setIsPhone(false)
    setIsPincode(true)
    setErrorMessage(null)

  }, [])


  return (
    <>
      {/* {!showOtp ? */}
      {isPhone &&
        <View style={styles.container}>
          <KeyboardAwareScrollView
            behavior={'height'}>
            <Image source={IMAGES.appLogo} style={[styles.appIcon, { marginTop: 20 }]} resizeMode='contain' />
            <Text style={styles.ActiveText}  > Activate</Text>
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
                    placeholderTextColor={COLORS.grey}
                    value={phone}
                    keyboardType='numeric'
                    onChangeText={setPhone}
                    // onChangeText={handlePhoneChange}
                    // onSubmitEditing={handlePhoneChange}
                    maxLength={10}
                  />
                </View>

                <View style={{ width: '80%' }}>
                  <Text style={styles.otpInstruction}>{`*Please enter 10 digit mobile number\n*मोबाईल नंबर के 10 अंको को दर्ज करें.`}</Text>
                </View>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.termsAndCondition}>
                By proceeding, you confirm that you are at least 18 years old and{' '}
                <View style={styles.inline}>
                  {/* <Ionicons name="checkbox" size={18} color={COLORS.white} /> */}
                  <FastImage source={IMAGES.square} style={{ height: 15, width: 15 }} />
                </View>{' '}agree
                to our
                <Text style={styles.bold} onPress={() => navigateTo('PrivacyPolicy')}> Privacy Policy</Text> and
                <Text style={styles.bold} onPress={() => navigateTo('PrivacyPolicy')}> Terms of Use.</Text>
              </Text>
            </View>
            <Text style={styles.loginText}> DeviceId: {deviceID}</Text>
            {/* {phone.length === 10 &&  */}
            {(validNumber && !errorMsg) &&
              <TouchableOpacity style={styles.button} onPress={authenticates}>
                <Text style={[styles.buttonText, { fontFamily: APP_FONTS.PoppinsBold }]}>Next</Text>
              </TouchableOpacity>}
          </KeyboardAwareScrollView>
        </View>}


      {isPincode && <View style={styles.container}>
        <BackHeader onBackHandler={goGackToLogin} onlyBack={true} />
        <KeyboardAwareScrollView
          behavior={'height'}>
          <Image source={IMAGES.appLogo} style={styles.appIcon} resizeMode='contain' />
          <Text style={styles.ActiveText}>Phone No: {phone}</Text>
          {errorMsg && <View style={{ width: '90%', alignSelf: 'center' }}>
            <Text style={[styles.otpInstruction, { color: COLORS.red, paddingBottom: 10 }]}>{errorMsg}</Text>
          </View>}

          <View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.row}>
                <View style={[styles.textInputButton, { width: '28%' }]}>
                  <Text style={styles.codeDetailText}>Pin Code</Text>
                </View>
                <TextInput
                  ref={pinCodeRef}
                  style={[styles.textInput, { width: '64%' }]}
                  placeholder="110001"
                  textAlignVertical='center'
                  placeholderTextColor={COLORS.grey}
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
                <FastImage source={IMAGES.square} style={{ height: 15, width: 15 }} />
              </View>{' '}agree
              to our
              <Text style={styles.bold} onPress={() => navigateTo('PrivacyPolicy')}> Privacy Policy</Text> and
              <Text style={styles.bold} onPress={() => navigateTo('PrivacyPolicy')}> Terms of Use.</Text>
            </Text>
          </View>
          {pinCode.length === 6 && phone.length === 10 && <TouchableOpacity style={styles.button} onPress={authenticatePinCode}>
            <Text style={[styles.buttonText, { fontFamily: APP_FONTS.PoppinsBold }]}>Get OTP</Text>
          </TouchableOpacity>}
        </KeyboardAwareScrollView>
      </View>}


      {isOtp && <View style={styles.container}>
        <BackHeader onBackHandler={goGackToPinCode} onlyBack={true} />
        <KeyboardAwareScrollView
          behavior={'height'}>
          <Image source={IMAGES.appLogo} style={styles.appIcon} resizeMode='contain' />
          <Text style={styles.ActiveText}>Phone No: {phone}</Text>
          {errorMsg && <View style={{ width: '90%', alignSelf: 'center' }}>
            <Text style={[styles.otpInstruction, { color: COLORS.red, paddingBottom: 10 }]}>{errorMsg}</Text>
          </View>}

          <View style={[styles.row, { marginBottom: 5 }]}>
            <View style={[styles.textInputButton, { width: '28%' }]}>
              <Text style={styles.codeDetailText}>
                OTP
              </Text>
            </View>
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

          </View>
          <Text style={styles.loginText}>DeviceId: {deviceID}</Text>
          <Text style={styles.otpInstruction}>{`*Please enter OTP received on your Mobile.\n *मोबाईल पर प्राप्त OTP को दर्ज करें.`}</Text>
          <View style={[styles.row, { marginVertical: 15 }]}>
            <View style={[styles.textInputButton, { width: '28%' }]}>
              <Text style={styles.codeDetailText}>
                {formatCountdownTime(secondsRemaining)}
              </Text>
            </View>

            {secondsRemaining === 0 ?
              <TouchableOpacity style={[styles.textInput, { width: '64%', }]} onPress={authenticatePinCode}>
                <Text style={styles.buttonText}>
                  Resend Otp
                </Text>
              </TouchableOpacity>
              : <View style={[styles.textInput, {
                width: '64%',
                backgroundColor: COLORS.grey,
              }]}>
                <Text style={styles.buttonText}>
                  Resend Otp
                </Text>
              </View>}


          </View>

          <TouchableOpacity style={[styles.button, { paddingHorizontal: 25, }]} onPress={onOtpHandler}>
            <Text style={[styles.buttonText, { fontFamily: APP_FONTS.PoppinsBold }]}>OK</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>}


    </>

  );
};

export default LoginScreen;

