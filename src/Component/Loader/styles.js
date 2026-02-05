import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/color';

export default StyleSheet.create({
  parentContainer: {position: 'absolute'},
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    height: 100,
    width: 100,
    borderRadius: 10
  },
});