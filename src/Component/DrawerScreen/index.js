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
import { COLORS } from '../../utils/color';
import commonStyle from '../../utils/commonStyle';
import { IMAGES } from '../../assets';
import DeviceInfo from 'react-native-device-info';
import { DrawerList } from '../../mockData/drawerName';
import RNRestart from 'react-native-restart';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';

const isTablet = DeviceInfo.isTablet();

const CustomDrawerHeader = ({ toggleDrawer }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.button}
        onPress={() => toggleDrawer(false)}
      >
        <FastImage
          source={IMAGES.close}
          style={styles.closeIcon}
          resizeMode={FastImage.resizeMode.contain} />
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
            RNRestart.restart();
            // setTimeout(() => resetNavigation('Login'), 100);
          },
        },
      ]
    );
  };

  const handlePress = (route) => {
    navigateTo(route);
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
    <SafeAreaView style={styles.container}>
      <CustomDrawerHeader toggleDrawer={props.setShowDrawer} />
      <Image source={IMAGES.freeTV} style={styles.logo} resizeMode='contain' />
      <View style={styles.drawerItemsContainer}>
        <FlatList
          data={DrawerList}
          renderItem={renderItem}
          scrollEnabled
          showsVerticalScrollIndicator={isTablet ? true : false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* Logout at Bottom */}
      {/* <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <View style={commonStyle.row}>
          <Image source={IMAGES.logout} style={styles.itemIcon} resizeMode='contain' />
          <Text style={styles.listText}>Logout</Text>
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
