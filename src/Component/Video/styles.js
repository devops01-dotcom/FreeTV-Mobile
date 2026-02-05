import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
import { WIDTH } from "../../utils/dimension";
const { height, width } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export default StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',

  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    aspectRatio: 16 / 9
  },
  backgroundVideoView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    aspectRatio: 16 / 9,
    // flex: 1
    // width: '100%',
    // height: '100%'
  },
  errorText: {
    color: COLORS.white,
    fontFamily: APP_FONTS.PoppinsBold,
    textAlign: 'center'
  },
  videoErrorContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  playPauseButton: {
    height: '15%',
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

