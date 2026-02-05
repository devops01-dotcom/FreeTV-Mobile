import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const CustomAlert = ({ showAlert, setShowAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false)
    }, 2000)
    return () => {
      clearTimeout(timer);
    };
  }, [showAlert])

  const onBackHandler = useCallback(()=> {
    setShowAlert(false)
  }, [showAlert])

  return (
    <Modal isVisible={showAlert} backdropOpacity={0.4}>
      <View style={styles.container}>
        <Text style={styles.modalText}>Selected stream will begin shortly after a brief advertisement.</Text>
        <TouchableOpacity style={styles.button} onPress={onBackHandler}>
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomAlert;
