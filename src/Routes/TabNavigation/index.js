import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
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

const isTablet = DeviceInfo.isTablet();
import HomeScreen from '../../Screen/HomeScreen';
import LiveTVScreen from '../../Screen/LiveTV';
import CinemaScreen from '../../Screen/Cinema';
import MusicScreen from '../../Screen/Music';
import AppTVScreen from '../../Screen/AppTVScreen'
import DevotionalScreen from '../../Screen/Devotional';
import EducationScreen from '../../Screen/Education';
import FavouriteScreen from '../../Screen/FavouriteScreen';
import { useAppSelector } from '../../redux/hooks';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const orientation = useOrientation();
  const { showHomeAds } = useAppSelector((state) => state.commonReducer);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false, // ✅ Ensures all tabs load upfront
        tabBarScrollEnabled: true, // ✅ Enables scroll
      }}
      tabBar={(props) => (
        !showHomeAds ? (
          <ScrollableTabBar {...props} orientation={orientation} />
        ) : null
        // tabBar={(props) => (
        //   <ScrollableTabBar {...props} orientation={orientation} />
      )}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="LiveTV" component={LiveTVScreen} />
      <Tab.Screen name="AppTV" component={AppTVScreen} />
      <Tab.Screen name="Cinema" component={CinemaScreen} />
      <Tab.Screen name="Music" component={MusicScreen} />
      <Tab.Screen name="Devotional" component={DevotionalScreen} />
      <Tab.Screen name="Education" component={EducationScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />

    </Tab.Navigator>
  );
};

const ScrollableTabBar = ({ state, descriptors, navigation, orientation }) => {
  return (
    <View
      style={[
        styles.tabBar,
        {
          display: orientation === 'landscape' ? 'none' : 'flex',
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key.toString()];
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = () => {
            switch (label) {
              case 'Home':
                return isFocused ? IMAGES.activeHomeIcon : IMAGES.homeIcon;
              case 'LiveTV':
                return isFocused ? IMAGES.activeLiveTvIcon : IMAGES.liveTvIcon;
              case 'AppTV':
                return isFocused ? IMAGES.activeAppTV : IMAGES.appTV;
                case 'Cinema':
                return isFocused ? IMAGES.activeCinemaIcon : IMAGES.cinemaIcon;
              case 'Favourite':
                return isFocused ? IMAGES.activeFavouriteIcon : IMAGES.favouriteIcon;
              case 'Devotional':
                return isFocused ? IMAGES.activeDevotionalIcon : IMAGES.devotionalIcon;
              case 'Education':
                return isFocused ? IMAGES.activeBook : IMAGES.Book;
              case 'Music':
                return IMAGES.musicIcon; // same icon, tint changes 
              default:
                return null;
            }
          };

          const getTextColor = () =>
            isFocused ? COLORS.yellow : COLORS.white;

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
                source={getIcon()}
                style={[
                  styles.iconStyle,
                  (label === 'Music' || label === 'Education') && isFocused && { tintColor: COLORS.activeText },
                ]}
                resizeMode="contain"
              />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: isTablet ? 80 : 55,
    backgroundColor: COLORS.primary,
    borderTopWidth: 0,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.sh4,
    minWidth: isTablet ? 150 : 83,
    height: '100%',

  },
  iconStyle: {
    height: isTablet ? 35 : 20,
    width: isTablet ? 35 : 20,
    marginBottom: 4,
  },
  tabLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: FONTS.f12,
    fontFamily: APP_FONTS.PoppinsBold,
  },
});

export default TabNavigation;
