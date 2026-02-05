import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, SPACING, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  liveTVCategoriesBox: {
    paddingHorizontal: HEIGHT.h100 * 0.015,
    height: HEIGHT.h15,
    justifyContent: 'center',
  },
  categoriesText: {
    color: COLORS.yellow,
    fontSize: FONTS.f20,
    fontFamily: APP_FONTS.PoppinsBold,
  },
  seeMoreText: {
    color: COLORS.black,
    fontSize: FONTS.f14,
    fontFamily: APP_FONTS.PoppinsBold,
  },
  liveTvIconBox: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 3,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    //  borderWidth: 1,
     overflow: 'hidden',
     marginBottom: 5,

  },
  sectionContainer: {
    marginVertical: 5,
    marginLeft: 10
  },
  liveTvIcon: {
    height: HEIGHT.h08,
    width: HEIGHT.h08,
    marginRight: 10,
    // elevation: 5
  },
  categoriesBox: {
    paddingHorizontal: HEIGHT.h100 * 0.015,
    height: HEIGHT.h15,
    marginBottom: 5,
    justifyContent: 'center',
  },

});
