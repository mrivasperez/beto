import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {light} from '../../styles/palette';
import {Letter} from './types';
const styles = StyleSheet.create({
  LetterItemSeparator: {
    // width: 24,
  },
  LetterContainer: {
    margin: 12,
    padding: 18,
    backgroundColor: '#fafafa',
    borderRadius: 6,
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LetterItemText: {
    color: light.black900,
    fontSize: 24,
  },
});

export const LetterItemSeparator = () => (
  <View style={styles.LetterItemSeparator} />
);

const LetterItem = ({letterData}: {letterData: Letter}) => {
  return (
    <TouchableOpacity style={styles.LetterContainer}>
      <Text style={styles.LetterItemText}>
        {letterData.value.toUpperCase()}
        {letterData.value}
      </Text>
    </TouchableOpacity>
  );
};

export default LetterItem;
