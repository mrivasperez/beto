import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {light} from '../../styles/palette';
import {Letter} from './types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../App';
import Sound from 'react-native-sound';

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
    fontWeight: '600',
  },
});

const LetterItem = ({letterData}: {letterData: Letter}) => {
  // const navigation = useNavigation<StackNavigation>();
  Sound.setCategory('Playback');
  const letterSound = new Sound(letterData.mp3);
  const handlePressLetter = () => {
    return letterSound.play(success => {
      if (success) {
        console.log('it work');
      } else {
        console.log('noi workl');
      }
    });
    // navigation.navigate('LetterDetail', {
    //   letterIndex: letterData.index,
    //   letterValue: `${letterData.value.toUpperCase()}${letterData.value}`,
    // });
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
