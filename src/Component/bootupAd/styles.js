import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import { FONTS, WIDTH } from "../../utils/dimension";
export default StyleSheet.create({
    ProcessingContainer: {
        // flex: 1,
        // backgroundColor: COLORS.primary,
        // justifyContent: 'center',
        // alignItems: 'center'
           backgroundColor: COLORS.lightCream,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            borderRadius: 15,
            overflow: 'hidden',
            width: '100%',
            alignSelf: 'center'
    },
    skipButton: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        backgroundColor: COLORS.white,
        height: 30,
        width: 80,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3
    },
    skipButtonText: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsSemiBold,
        color: COLORS.black,
        lineHeight: 20
    },
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        aspectRatio: 16 / 9,
      },
})