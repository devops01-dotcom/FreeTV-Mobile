import { IMAGES } from "../assets";

const DrawerList = [
    {
        id : 1,
        name : "PROFILE",
        img : IMAGES.Profile,
        route:"ProfileScreen"
    },
    {
        id : 2,
        name : "SUBSCRIPTION",
        img : IMAGES.subscription,
        route:"SubscriptionScreen"
    },
    {
        id : 3,
        name : "PRIVACY POLICY",
        img : IMAGES.privacyPolicy,
        route:"PrivacyPolicy"
    },
    {
        id : 4,
        name : "SHARE APP",
        img : IMAGES.shareApp,
        route:"ShareProfile"
    },
    // {
    //     id : 5,
    //     name : "HELP and SUPPORT",
    //     img : IMAGES.Help,
    //     route:"ShareProfile"
    // },
    // {
    //     id : 6,
    //     name : "Activate TV",
    //     img : IMAGES.TV,
    //     route:"ShareProfile"
    // },
    {
        id : 5,
        name : "LOG OUT",
        img : IMAGES.logout,
        route:"Logout"
    },
   
]

export default DrawerList;