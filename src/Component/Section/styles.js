import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, SPACING, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({

  categoriesText: {
    color: COLORS.yellow,
    fontSize: FONTS.f20,
    fontFamily: APP_FONTS.PoppinsBold,
    // fontWeight: '900'
  },
  seeMoreText: {
    color: COLORS.black,
    fontSize: FONTS.f14,
    fontFamily: APP_FONTS.PoppinsBold,
    // fontWeight :'900'
  },
  liveTvIconBox: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginRight: 10,
     overflow: 'hidden',
     marginBottom: 5,
  },

});
