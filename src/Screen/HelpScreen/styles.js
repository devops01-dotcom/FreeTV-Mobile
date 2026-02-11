import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import { FONTS, WIDTH } from "../../utils/dimension";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 1,
        padding: 12,
        borderRadius: 10,
        // backgroundColor: COLORS.lightCream
    },
    backIcon: {
        height: 20,
        width: 38,
        // backgroundColor:'green',
        tintColor: COLORS.black
    },
    logo: {
        height: 95,
        width: '55%',
        alignSelf: 'center',
        marginBottom: 25,
        marginTop: '25%'
    },
    leftSide: {
        width: '50%',
    },
    centerView: {
        width: '2%',
        alignItems: 'center'
    },
    rightSide: {
        width: '48%',
        marginLeft: 10,
        // alignItems: 'center'
    },
    Heading: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white
    },
    Detail: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsMedium,
        color: COLORS.white
    },
    buttonText: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.black
    },
    backButton: {
        marginTop: 30,
        flexDirection: 'row',
        width: 130,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: WIDTH.w02,
        borderColor: COLORS.yellow,
        borderWidth: 1,
        backgroundColor: COLORS.yellow,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    ScreenButton: {
        marginTop: 30,
        flexDirection: 'row',
        // width: 130,
        // paddingHorizontal: 15,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.yellow,
        borderWidth: 1,
        backgroundColor: COLORS.yellow,
        borderRadius :10,
        paddingRight:10,
        // borderTopLeftRadius: 20,
        // borderBottomRightRadius: 20
    }

})