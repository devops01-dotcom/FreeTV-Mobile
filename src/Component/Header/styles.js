import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT, SPACING, WIDTH  } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();


export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.transparent,
        height: isTablet ? 90 : HEIGHT.h100 * 0.06,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: WIDTH.w100,
    },
    heading: {
        color: COLORS.white,
        fontSize: FONTS.f27,
        fontFamily: APP_FONTS.PoppinsMedium,
        // marginHorizontal: SPACING.sw05
    },
    menubar: {
       height: 35,
        width: 35
    },
 
    button: {
        height: HEIGHT.h100 * 0.05,
        borderRadius: 8,
        width: '15%',
        justifyContent: 'center',
        paddingLeft: 15

    },
    logo: {
        height: '65%', 
        width: '35%',
    },
    centerView: {
        width: '85%',
        alignItems: 'center',
        paddingRight: '10%',
        // backgroundColor: 'red'
    },
    input: {
        height: HEIGHT.h100 * 0.06, 
        width:'60%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.white,
        color: COLORS.white,
        paddingHorizontal: 10,
        fontFamily: APP_FONTS.MardotoRegular 
    },
})