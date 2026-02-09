import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import { useOrientation } from '../../utils/useOrientation';
import { HEIGHT, WIDTH, SPACING, FONTS } from '../../utils/dimension';
import { APP_FONTS } from '../../utils/fontFamily';
import { COLORS } from '../../utils/color';
import { IMAGES } from '../../assets';
import DeviceInfo from 'react-native-device-info';
import { useAppSelector } from '../../redux/hooks';

const isTablet = DeviceInfo.isTablet();
import HomeScreen from '../../Screen/HomeScreen';
import ProfileScreen from '../../Screen/Profile';
import SubscriptionScreen from '../../Screen/SubscriptionScreen';
import Share from 'react-native-share';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  const { showHomeAds } = useAppSelector((state) => state.commonReducer);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
      }}
      tabBar={(props) => (
        !showHomeAds ? (
          <CustomTabBar {...props} />
        ) : null
        // tabBar={(props) => (
        //   <ScrollableTabBar {...props} orientation={orientation} />
      )}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Subscription" component={SubscriptionScreen} />
      <Tab.Screen name="ShareApp" component={EmptyScreen} />
    </Tab.Navigator>
  );
};
/* Dummy screen for Share App */
const EmptyScreen = () => null;


// const ScrollableTabBar = ({ state, descriptors, navigation, orientation }) => {
const CustomTabBar = ({ state, descriptors, navigation, orientation }) => {

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

  const getIcon = (name, focused) => {
    switch (name) {
      case 'Home':
        return focused ? IMAGES.activeHomeIcon : IMAGES.homeIcon;
      case 'Profile':
        return focused ? IMAGES.Profile : IMAGES.profileInActive;
      case 'Subscription':
        return focused ? IMAGES.subscription : IMAGES.subscriptionInActive;
      case 'ShareApp':
        return focused ? IMAGES.shareApp : IMAGES.shareInActive;
      default:
        return null;
    }
  };

  return (
    <View style={[
      styles.tabBar,
      {
        display: orientation === 'landscape' ? 'none' : 'flex',
      },
    ]}>
      {state.routes.map((route, index) => {
        // const { options } = descriptors[route.key.toString()];
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'ShareApp') {
            onShare();
          } else {
            navigation.navigate(label);
          }
        };

        const getTextColor = () =>
          isFocused ? COLORS.yellow : COLORS.borderColor;

        const getIconColor = () =>
          isFocused ? COLORS.yellow : COLORS.borderColor;

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <Image
              source={getIcon(label, isFocused)}  
              style={[styles.iconStyle,{ tintColor: getIconColor()}
              ]} />
            <Text
              style={[
                styles.tabLabel,
                { color: getTextColor() },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.primary,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.sh4,
    minWidth: isTablet ? 150 : 83,
    height: '120%',
  },
  iconStyle: {
    color: 'red',
    height: isTablet ? 35 : 20,
    width: isTablet ? 35 : 20,
    marginBottom: 4,
  },
  tabLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: FONTS.f16,
    fontFamily: APP_FONTS.PoppinsBold,
    // fontWeight: '900'
  },
});

export default TabNavigation;
