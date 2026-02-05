import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        // justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 1,
        padding: 12,
        borderRadius: 10,
        // backgroundColor: COLORS.lightCream
    },
    logo: {
        height: 50,
        width: '45%',
        alignSelf: 'center',
        marginBottom: 25,
        marginTop: '25%'
    },
    leftSide: {
        width: '40%',
    },
    centerView: {
        width: '5%',
        alignItems: 'center'
    },
    backIcon: {
        height: 20,
        width: 25,
        marginLeft: 15,
        tintColor: COLORS.black
    },
    rightSide: {
        width: '55%',
        marginLeft: 10,
        alignItems: 'center',
        alignItems: 'flex-start'
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
    }
})