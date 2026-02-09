import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    input: {
        // height: HEIGHT.h05,
        backgroundColor: COLORS.drawerblue,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    adBox: {
        height: isTablet ? '40%' : '30%',
        justifyContent: 'center',
    },
    videoBox: {
        aspectRatio: 16 / 9,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        aspectRatio: 16 / 9
    },
    mainBox: {
        height: isTablet ? '60%' : '67%',
    },
    languageBox: {
        height: '9%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    languageBoxView: {
        backgroundColor: COLORS.drawerblue,
        height: '85%',
        minWidth: isTablet ? 120 : 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 4, // blur
        elevation: 4, // Required for Android shadow
    },
    dropdownMenu: {
        height: HEIGHT.h07 - 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        paddingHorizontal: 15
    },
    dropdownCloseMenu: {
        height: HEIGHT.h07,
        width: isTablet ? 100 : 45,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    channelListView: {
        flex: 1,
        paddingBottom: 10,
        zIndex: 1
    },
    columnWrapper: {
        justifyContent: 'space-between', // Space between columns
        marginHorizontal: 10,
    },
    movieDetailBox: {
        height: isTablet ? 150 : HEIGHT.h13,
        width: isTablet ? '32%' : '48%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10
    },
    movieImage: {
        height: '88%',
        width: '88%',
        aspectRatio: 16 / 9,
        borderRadius: 10,
    },
    drawerMenu: {
        zIndex: 9,
        backgroundColor: COLORS.primary,
        borderRightWidth: 4,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderRightColor: COLORS.borderColor,
        width: isTablet ? '30%' : '40%',
        // height: isTablet ? HEIGHT.h100 * 0.46 : HEIGHT.h100 * 0.56,
        height: isTablet ? '85%' : '90%',
        position: 'absolute',
        top: 0,
        paddingBottom: 4
    },
    categoriesBoxView: {
        backgroundColor: COLORS.black,
        height: isTablet ? 70 : 47.5,
        width: '100%',
        justifyContent: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 1, // blur
        elevation: 1,
        marginBottom:15
    },
    categoriesBoxListView: {
        backgroundColor: COLORS.lightBlue,
        height: '98%',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 1, // blur
        elevation: 1,
    },
    categoriesName: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.black,
        // fontWeight:'900'
    },
    channelName: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white,
        // fontWeight:'900'
    },
    searchModal: {
        flex: 1,
    }

})