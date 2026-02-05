import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { WIDTH } from "../../utils/dimension";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightCream,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
    width: WIDTH.w320 + 10,
    alignSelf: 'center'
  },
})