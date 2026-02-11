import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../../Screen/LoginScreen";
import { navigationRef } from "../../utils/navigateTo";
import TabNavigation from "../TabNavigation";
import MovieDetailScreen from "../../Screen/MovieDetail";
import VideoScreen from "../../Screen/VideoScreen";
import ProfileScreen from "../../Screen/Profile";
import { store } from "../../redux/store";
import SubscriptionScreen from "../../Screen/SubscriptionScreen";
import PrivacyPolicy from "../../Screen/PrivacyPolicyScreen";
import LiveTVScreen from "../../Screen/LiveTV";
import AppTVScreen from "../../Screen/AppTVScreen";
import CinemaScreen from "../../Screen/Cinema";
import MovieScreen from '../../Screen/Movies';
import MusicScreen from "../../Screen/Music";
import DevotionalScreen from "../../Screen/Devotional";
import EducationScreen from "../../Screen/Education";
import FavouriteScreen from "../../Screen/FavouriteScreen";
import SettingScreen from "../../Screen/SettingScreen";
import HelpScreen from "../../Screen/HelpScreen";

// import { useAppSelector } from "../redux/hooks";
// import { AuthSelector } from "../redux/slice/onBoardingSlice";

const Stack = createNativeStackNavigator();

const RouteStack = () => {
     const getStore = store.getState();
     const {token} = getStore?.AuthReducer?.loginData || ""
    // const {isLogedIn} = useAppSelector(AuthSelector);
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={token ? 'Home' : "Login"}
                // initialRouteName="Home"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                    name={'Home'}
                    component={TabNavigation}
                />
                <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
                <Stack.Screen name="Video" component={VideoScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Subscription" component={SubscriptionScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="LiveTVScreen" component={LiveTVScreen} />
                <Stack.Screen name="AppTVScreen" component={AppTVScreen} />
                <Stack.Screen name="CinemaScreen" component={CinemaScreen} />
                <Stack.Screen name="MovieScreen" component={MovieScreen} />
                <Stack.Screen name="MusicScreen" component={MusicScreen} />
                <Stack.Screen name="DevotionalScreen" component={DevotionalScreen} />
                <Stack.Screen name="EducationScreen" component={EducationScreen} />
                <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
                <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen name="HelpScreen" component={HelpScreen} />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouteStack;