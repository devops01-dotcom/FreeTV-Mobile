// components/Section.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import commonStyle from '../../utils/commonStyle';
import styles from './styles';

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View style={commonStyle.spaceRow}>
        <Text style={styles.categoriesText}>{title}</Text>
        <TouchableOpacity style={styles.liveTvIconBox} onPress={onPress}>
          <Text style={styles.seeMoreText}>SEE MORE</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default React.memo(Section);
