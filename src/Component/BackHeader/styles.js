import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export default StyleSheet.create({
    container: {
        //   flex: 1,
        height: isTablet ? 100 : HEIGHT.h05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: '1%',
        // marginTop: 5,
        paddingRight: 5,
        // paddingHorizontal: 5,
        // backgroundColor: 'green',
        // marginBottom: isTablet ? 5 : 10

    },
    leftSide: {
        width:'15%',// 28,
        height: '65%',// 28,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        marginLeft:14,
        marginTop:12
    },
    logo: {
        // paddingBottom: 40,
        height: isTablet ? '70%' : '95%',
        width: '90%',
        marginLeft: isTablet ? 10 : 5
    },
    centerView: {
        width: '60%',
        // height: '85%',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    input: {
        height: isTablet ? '83%' : '65%',
        // width: '70%',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: isTablet ? FONTS.f16 : FONTS.f12,
        //  lineHeight: 22,
        textAlignVertical: 'center',
        color: COLORS.black,
        backgroundColor: COLORS.lightCream
    },
    header: {
        height: '85%',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    backIcon: {

        height: isTablet ? 40 : 18,
        width: isTablet ? 40 : 18,
        justifyContent: 'center',
        alignSelf: 'center'
        // marginLeft: 5,
        // padding:10,
        // borderRadius:8
    },
    backText: {
        fontSize: FONTS.f14,
        color: COLORS.activeText,
        fontFamily: APP_FONTS.PoppinsBold
    },
})