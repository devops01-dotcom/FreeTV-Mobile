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
        height: HEIGHT.h05,
        backgroundColor: COLORS.lightCream,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    adBox: {
        height: isTablet ? '40%' : '33%',
        justifyContent: 'center',
    },
    videoBox: {
        aspectRatio: 16 / 9
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
        marginVertical: 10,
        height: '9%',
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    gradientBorder: {
        padding: 1, // stroke width
        borderRadius: 9,
        marginRight: 10,
    },
    languageBoxView: {
        backgroundColor: COLORS.lightPrimaryColor,
        height: '98%',
        minWidth: isTablet ? 120 : 90,
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        // shadowColor: COLORS.black,
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.25, // 25% opacity
        // shadowRadius: 4, // blur
        // elevation: 1, // Required for Android shadow
    },
    dropdownMenu: {
        height: HEIGHT.h07 - 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        paddingHorizontal: 15
    },
    menubar: {
        height: 35,
        width: 35
    },
    dropdownCloseMenu: {
        height: HEIGHT.h07,
        width: 70,
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
        marginTop: 10
    },
    movieDetailBox: {
        height: isTablet ? 150 : HEIGHT.h13,
        width: isTablet ? '32%' : '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    movieImage: {
        height: '88%',
        width: '88%',
        aspectRatio: 16 / 9,
        borderRadius: 10,
    },
    drawerMenu: {
        zIndex: 9,
        backgroundColor: COLORS.lightCream,
        borderRightWidth: 5,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderRightColor: COLORS.borderColor,
        width: isTablet ? '30%' : '45%',
        height: isTablet ? '85%' : '90%',
        position: 'absolute',
        top: 0,
        paddingBottom: 8
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
        fontSize: FONTS.f16,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.black
    },
    liveButton: {
        backgroundColor: COLORS.red,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        position: 'absolute',
        left: 5,
        top: 5
    },
    liveText: {
        fontSize: FONTS.f14,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsMedium
    },
    searchModal: {
        flex: 1,
    },
    channelName: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white
    },

})