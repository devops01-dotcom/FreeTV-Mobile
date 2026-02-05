import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/color';
import { APP_FONTS } from '../../utils/fontFamily';
import { FONTS } from '../../utils/dimension';

export default StyleSheet.create({
  parentContainer: {position: 'absolute'},
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '95%',
    paddingVertical: 35,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  modalText: {
    fontFamily: APP_FONTS.PoppinsRegular,
    color: COLORS.black,
    fontSize: FONTS.f16
  },
  button: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 15
  },
   modalButtonText: {
    fontFamily: APP_FONTS.PoppinsBold,
    color: COLORS.black,
    fontSize: FONTS.f16
  },

});