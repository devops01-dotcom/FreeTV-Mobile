import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import { FONTS, WIDTH } from "../../utils/dimension";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },

   

    Heading: {
         marginBottom: 25,
        marginTop: '25%',
        fontSize: FONTS.f27,
        fontFamily: APP_FONTS.PoppinsBlack,
        color: COLORS.white,
        textAlign: 'center'
    },
    instruction: {
        fontSize: FONTS.f18,
        marginTop: 20,
        fontFamily: APP_FONTS.PoppinsMedium,
        color: COLORS.white,
          textAlign: 'center'
    },



})