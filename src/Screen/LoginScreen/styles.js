import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";


export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    appIcon: {
        height: 150,
        width: 220,
        marginTop: 10,
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    textInput: {
        width: '72%',
        height: HEIGHT.h05,
        backgroundColor: COLORS.inputBox,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        fontSize: FONTS.f16,
        color: COLORS.black,
        fontFamily: APP_FONTS.PoppinsMedium,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    input: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsMedium,
        color: COLORS.black,
        width: '90%', textAlign: 'center'
    },
    textInputButton: {
        minWidth: '20%',
        height: HEIGHT.h05,
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: WIDTH.w02,
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        backgroundColor: COLORS.inputBox,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    button: {
        // width: 200,
        paddingHorizontal: 15,
        height: HEIGHT.h05,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: WIDTH.w02,
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        marginVertical: 20,
        backgroundColor: COLORS.yellow,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: FONTS.f18,
        color: COLORS.black,
        fontFamily: APP_FONTS.PoppinsMedium,
    },
    termsAndCondiion: {
        fontSize: FONTS.f14,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsMedium,
        marginHorizontal: 15,
        alignItems: 'center'
    },
    countryInput: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsMedium,
        color: COLORS.black,
        backgroundColor: COLORS.inputBox,
        width: '100%',
        height: '100%',
        lineHeight: 24,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        textAlign: 'center'
    },
    loginText: {
        color: COLORS.white,
        justifyContent: 'center',
        marginBottom: 5,
        // fontSize: FONTS.f27,
        fontSize: 20,
        fontFamily: APP_FONTS.PoppinsBold,
        alignItems: 'center',
        textAlign: 'center'
    },

    ActiveText: {
        color: COLORS.white,
        justifyContent: 'center',
        marginBottom: 10,
        fontSize: FONTS.f27,
        fontFamily: APP_FONTS.PoppinsBold,
        alignItems: 'center',
        textAlign: 'center'
    },
    otpInstruction: {
        fontSize: FONTS.f14,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsSemiBold,
        textAlign: 'center',
        marginTop: 15,
    },
    codeDetailText: {
        fontSize: FONTS.f16,
        fontFamily: APP_FONTS.PoppinsMedium,
        color: COLORS.black,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    textContainer: {
        padding: 25,
    },
    termsAndCondition: {
        fontSize: FONTS.f14,
        color: COLORS.white,
        textAlignVertical: 'center',
        lineHeight: 20,
        textAlign: 'center'
    },
    inline: {
        height: 18,
        paddingTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // textAlign: 'center',
    },
    bold: {
        fontFamily: APP_FONTS.PoppinsBold,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '64%',
    },

    otpInput: {
        width: 45,
        height: 50,
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.white,
    },

})









