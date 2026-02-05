import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { COLORS } from '../../utils/colors';
import styles from './styles';
import Icon from '@react-native-vector-icons/ionicons'
import HTMLView from 'react-native-htmlview';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import WebView from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import BackHeader from '../../Component/BackHeader';


const PrivacyPolicy = ({ navigation, route }) => {
  // const { type } = route.params || {}
  // const [htmlData, setHtmlData] = useState()
  // const [showWebView, setShowWebView] = useState(false)
//   const { Terms } = useAppSelector(PrivacyAndPolicySelector)
//   const { Policy } = useAppSelector(PrivacyAndPolicySelector)
//   const { Contactus } = useAppSelector(PrivacyAndPolicySelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

//   useEffect(() => {
//     switch (type) {
//       case 'Terms':
//           setHtmlData(Terms)
//         break
//       case 'Privacy Policy':
//           setHtmlData(Policy)
//         break
//       case 'Contact US':
//           setHtmlData(Contactus)
//         break
//       default:
//         setHtmlData('')
//     }
//   }, [type, htmlData, Terms, Policy, Contactus])

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  //   // return () => backHandler.remove();
  //   return () => { BackHandler.removeEventListener('hardwareBackPress', handleBackPress) };
  // }, []);


  // const handleBackPress = React.useCallback(() => {
  //   // if (showWebView) {
  //   //   setShowWebView(false);
  //   //   return true;
  //   // }
  //   // else {
  //     navigation.goBack()
  //     return true;
  //   // }
  // }, []);

     const onBackHandler = useCallback(() => {
          navigation.goBack()
      }, [])

  // const onWebViewHandler = () => {
  //   dispatch(showLoader())
  //   setShowWebView(true)
  //   setTimeout(() => {
  //     dispatch(hideLoader())
  //   }, 1000)
  // }
  return (
    <View style={styles.container}>
         <BackHeader onlyBack={true} onBackHandler={onBackHandler}/>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          onPress={handleBackPress}>
          <Icon name='arrow-back' size={30} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: COLORS.white }]}>{type}</Text>
      </View> */}

      {/* {showWebView ? */}
         {/* <WebView source={{ uri: htmlData?.URL }} style={{ flex: 1 }} /> */}
         <WebView source={{ uri: 'https://freetvplus.in/comprehensive-user-agreement-privacy-protection-policy/' }} style={{ flex: 1 }} />

        {/* :
        <View style={styles.htmlView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {htmlData?.URL && <Text style={styles.urlText} onPress={onWebViewHandler}>{htmlData?.URL}</Text>}
            {htmlData?.message && <HTMLView
              value={htmlData?.message}
              stylesheet={styles}
            />}
            <View style={{ height: 100 }} />
          </ScrollView>
        </View>} */}

        </View>
  );
};

export default PrivacyPolicy;