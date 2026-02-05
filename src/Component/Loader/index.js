import React, { useMemo } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { BarIndicator } from 'react-native-indicators';
// import { selectLoader } from '../../redux/slice/loadingSlice';
import { COLORS } from '../../utils/color';
import styles from './styles';
import { useAppSelector } from '../../redux/hooks';
import { selectLoader } from '../../redux/slice/loadingSlice';



const Loader = ({ loading }) => {
  const loginData = useAppSelector(selectLoader);

  // Use memoized value for color to avoid recalculations
  const indicatorColor = useMemo(() => COLORS.white, []);

  // Determine whether the loader should be shown
  const isVisible = loading ?? loginData;

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7}>
      <View style={styles.container}>
        <BarIndicator color={indicatorColor} size={30} />
      </View>
    </Modal>
  );
};

export default Loader;
