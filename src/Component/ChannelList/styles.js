import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    container: {
        height: HEIGHT.h10,
        // width: 140,
        marginRight: 8,
        aspectRatio: 16 / 9,
        borderRadius: 10,
        marginTop: 1,
        elevation: 5
    },
    itemName: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '100%', // or any fixed height
        borderRadius: 5,
    },
})