import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { navigateTo, resetNavigation } from '../../utils/navigateTo';
import { setCustomDrawerItem } from '../../redux/slice/commonAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Icon from '@react-native-vector-icons/ionicons'
import { COLORS } from '../../utils/color';
import styles from './styles';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import DrawerList from '../../mockData/drawerName';
import commonStyle from '../../utils/commonStyle';
import { AutoLoginData } from '../../redux/slice/onBoardingSlice';
import { IMAGES } from '../../assets';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';

const isTablet = DeviceInfo.isTablet();


const CustomDrawerHeader = ({toggleDrawer}) => {
  return (
    <View style={styles.headerContainer}>
         {/* <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' /> */}

      <TouchableOpacity style={styles.button}
        onPress={() => toggleDrawer(false)}
      >
        <Icon name='close' size={ isTablet ? 55 : 35} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const dispatch = useAppDispatch()


  const onShare = async () => {
    const options = {
      title: 'Share FREETVPLUS App',
      message: 'You should check out this amazing app!',
      url: 'https://play.google.com/store/apps/details?id=com.freetvinmob.app', // Replace with your app's actual store link
      // For iOS, you might also include:
      // social: Share.Social.WHATSAPP, // To share directly to a specific app if desired
      // failOnCancel: false, // Don't throw an error if the user cancels
    };

    try {
      await Share.open(options);
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  const handlePress = (item) => {
    switch (item) {
      case 'PROFILE':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('LiveTv');
        navigateTo('Profile')
        break;
      case 'SUBSCRIPTION':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        navigateTo('Subscription');
        break;
      case 'PRIVACY POLICY':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        navigateTo('PrivacyPolicy'); 
        break;
      case 'SHARE APP':
        // dispatch(fetchPolicy())
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('TermsScreen', { type: item });
        onShare()
        break;
        case 'LOG OUT' :
          Alert.alert(
        'Confirm Logout',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: () => {
              dispatch(AutoLoginData());
              setTimeout(() => {
                resetNavigation('Login');
              }, 100);
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
          // dispatch(AutoLoginData())
          // setTimeout(() => {
          //   resetNavigation('Login')
          // }, 100)
          break;
      default:
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('RateApp', { name: item });
        break;
    }
  };

  const renderDrawerItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handlePress(item.name)}
      >
        <View style={commonStyle.row}>
          <Image source={item.img} style={styles.itemIcon} resizeMode='contain' />
        <Text style={styles.listText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomDrawerHeader toggleDrawer={props.setShowDrawer}/>
      <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' /> 
      <View style={styles.drawerItemsContainer}>
        <FlatList
          data={DrawerList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDrawerItem}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={dynamicStyles.drawerContent}
        />
      </View>
    </View>
  );
};



export default CustomDrawerContent;
