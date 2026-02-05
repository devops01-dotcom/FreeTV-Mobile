import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    videoContainer: {
        flex: 1,
        pointerEvents: 'box-none', // Ensures that the Video component doesn't block touch events
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        aspectRatio: 16 / 9,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    listContainer: {
        position: 'absolute',
        top: 0, // Adjust according to where you want the list
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.red,
        opacity: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: WIDTH.w56,
        // backgroundColor: 'red'
    },
    channelBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: COLORS.lightCream,
        height: HEIGHT.h100 * 0.06,
        marginVertical: 3
    },
    channelIcon: {
        height: HEIGHT.h100 * 0.05,
        width: HEIGHT.h100 * 0.05,
        marginRight: 10
    },
  
    channelName: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white
    },
    errorText: {
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsSemiBold,
        textAlign: 'center'
      },
      videoErrorContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center'
      }
})