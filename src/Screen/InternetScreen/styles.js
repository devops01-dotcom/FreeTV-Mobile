import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import { FONTS } from "../../utils/dimension";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    detail: {
        fontSize: FONTS.f27,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsMedium,
        letterSpacing: 2
    }
})