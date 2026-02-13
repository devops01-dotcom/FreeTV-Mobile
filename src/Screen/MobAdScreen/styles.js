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
    liveTvIcon: {
        height: HEIGHT.h08,
        width: HEIGHT.h08,
        marginRight: 10,
        // elevation: 5
    },
    appIcon: {
        height: 120,
        width: 220,
        marginTop: 10,
        marginBottom: 120,
        alignSelf: 'center'
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