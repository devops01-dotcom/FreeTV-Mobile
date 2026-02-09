import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.lightTransparent,
        backgroundColor: COLORS.drawerblue,
        position: 'absolute',
        height: HEIGHT.h100 *0.90,
        width: WIDTH.w100 * 0.48,
        zIndex: 9,
        overflow: 'hidden',
    },
    logo: {
        height: isTablet ? 70 : 50,
        width: isTablet ? 180 : 120,
        marginLeft: isTablet ? 25 : 15,
        marginBottom: isTablet ? 25 : 15
    },
    drawerItemsContainer: {
        flex: 1,
    },
    drawerItemText: {
        color: COLORS.white,
        fontSize: FONTS.f20,
        fontFamily: APP_FONTS.PoppinsMedium,
    },
    drawerItem: {
        borderRadius: 8,
        marginVertical: 3,
        padding: 2,
        height: HEIGHT.h07
    },
    activeDrawerItem: {
        backgroundColor: COLORS.yellow,
    },
    headerContainer: {
        backgroundColor: COLORS.transparent,
        height: HEIGHT.h04,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
    },
    headerIcon: {
        height: HEIGHT.h100 * 0.06,
        width: WIDTH.w100 * 0.50,
        alignSelf: 'center'
        // borderRadius: 10,
    },
    button: {
        padding: 8,
        borderRadius: 8,
    },
    listText: {
        color: COLORS.white,
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsSemiBold,
        // fontWeight: '900'
    },
    itemIcon: {
        height: isTablet ? 45 : 30,
        width: isTablet ? 45 : 30,
        marginHorizontal: isTablet ? 25 : 15,
        tintColor: COLORS.yellow
    },
    logoutBtn: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.15)',
        alignItems: 'flex-start',
        // activeOpacity: 0.7,
    },

});