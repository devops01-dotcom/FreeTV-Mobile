import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT, SPACING, WIDTH } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";
import DeviceInfo from "react-native-device-info";

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
    videoBox: {
        height: isTablet ? '40%' : '27%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        aspectRatio: 16 / 9,
        backgroundColor: 'red'
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        // aspectRatio: 16 / 9
    },
    movieDetailBox: {
        marginVertical: SPACING.sh05,
        height: HEIGHT.h100 * 0.33,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        overflow: 'hidden'
    },
    platButton: {
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
        // height: 60,
        // width: 60,
        // justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 5,
        position: 'absolute',
        top: '60%',
        left: '60%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
 
    },
    addsBox: {
        // height: HEIGHT.h23,
        marginBottom: 10
    },
    movieName: {
        fontSize: FONTS.f27,
        color: COLORS.activeText,
        fontFamily: APP_FONTS.PoppinsBold
    },
    movieDescription: {
        fontSize: FONTS.f14,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsRegular,
        marginBottom: 20,
    },
    movieDetail: {
        fontSize: FONTS.f16,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsMedium,
        width: '100%',
    },
    descriptionText: {
        fontSize: FONTS.f14,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsRegular,
        width: '100%',
    },
    movieHeadingBox: {
        width: '30%',

    },
    movieDescriptionHeading: {
        fontSize: FONTS.f16,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsMedium,
    },
    centerView: {
        width: '5%',
    },
    movieTitleBox: {
        width: '50%',
        paddingLeft: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5
    }


})