import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {light} from '../../styles/palette';
import {Letter} from './types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
const styles = StyleSheet.create({
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

const LetterItem = ({letterData}: {letterData: Letter}) => {
  // TODO resolve type error
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePressLetter = () => {
    navigation.navigate('LetterDetail', {letterIndex: letterData.index});
  };

  return (
    <TouchableOpacity
      style={styles.LetterContainer}
      onPress={handlePressLetter}>
      <Text style={styles.LetterItemText}>
        {letterData.value.toUpperCase()}
        {letterData.value}
      </Text>
    </TouchableOpacity>
  );
};

export default LetterItem;
