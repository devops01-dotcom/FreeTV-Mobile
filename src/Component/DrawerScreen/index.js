import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppDispatch } from '../../redux/hooks';
import { AutoLoginData } from '../../redux/slice/onBoardingSlice';
import { navigateTo, resetNavigation } from '../../utils/navigateTo';
import styles from './styles';
import Icon from '@react-native-vector-icons/ionicons'
import { DrawerList } from '../DrawerScreen/drawer'
import { COLORS } from '../../utils/color';
import commonStyle from '../../utils/commonStyle';
import { IMAGES } from '../../assets';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

const CustomDrawerHeader = ({ toggleDrawer }) => {
  return (
    <View style={styles.headerContainer}>
      {/* <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' /> */}

      <TouchableOpacity style={styles.button}
        onPress={() => toggleDrawer(false)}
      >
        <Icon name='close' size={isTablet ? 55 : 35} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(AutoLoginData());
            setTimeout(() => resetNavigation('Login'), 100);
          },
        },
      ]
    );
  };

  const handlePress = (route) => {
  navigateTo(route);
};

  const handlePress1 = (item) => {
    switch (item) {
      case 'LIVE TV':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('LiveTV');
        navigateTo('LiveTV')
        break;
      // case 'SUBSCRIPTION':
      //   // dispatch(setCustomDrawerItem(item));
      //   // props.setShowDrawer(false);
      //   navigateTo('Subscription');
      //   break;
      // case 'PRIVACY POLICY':
      //   // dispatch(setCustomDrawerItem(item));
      //   // props.setShowDrawer(false);
      //   navigateTo('PrivacyPolicy'); 
      //   break;
      // case 'SHARE APP':
      // dispatch(fetchPolicy())
      // dispatch(setCustomDrawerItem(item));
      // props.setShowDrawer(false);
      // navigateTo('TermsScreen', { type: item });
      // onShare()
      // break;
      // dispatch(AutoLoginData())
      // setTimeout(() => {
      //   resetNavigation('Login')
      // }, 100)
      default:
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('RateApp', { name: item });
        break;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => handlePress(item.route)}
    >
      <View style={commonStyle.row}>
        <Image source={item.img} style={styles.itemIcon} resizeMode='contain' />
        <Text style={styles.listText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomDrawerHeader toggleDrawer={props.setShowDrawer} />
      <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' />
      <View style={styles.drawerItemsContainer}>
        <FlatList
          data={DrawerList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* Logout at Bottom */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <View style={commonStyle.row}>
          <Image source={IMAGES.logout} style={styles.itemIcon} resizeMode='contain' />
          <Text style={styles.listText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;
