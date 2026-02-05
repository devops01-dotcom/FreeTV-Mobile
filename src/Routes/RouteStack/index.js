import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../../Screen/LoginScreen";
import { navigationRef } from "../../utils/navigateTo";
import TabNavigation from "../TabNavigation";
import MovieDetailScreen from "../../Screen/MovieDetail";
import VideoScreen from "../../Screen/VideoScreen";
import EducationScreen from "../../Screen/Education";
import ProfileScreen from "../../Screen/Profile";
import { store } from "../../redux/store";
import SubscriptionScreen from "../../Screen/SubscriptionScreen";
import PrivacyPolicy from "../../Screen/PrivacyPolicyScreen";

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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouteStack;