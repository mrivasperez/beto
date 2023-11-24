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
  HighlightLetterItemText: {
    backgroundColor: light.blueberry100,
  },
});

const LetterItem = ({
  letterData,
  highlightedLetterIndex,
  setHighlightedLetterIndex,
}: {
  letterData: Letter;
  highlightedLetterIndex?: number;
  setHighlightedLetterIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigation = useNavigation<StackNavigation>();
  const letterSound = new Sound(letterData.mp3);

  const handlePressLetter = () => {
    if (highlightedLetterIndex === letterData.index) {
      return navigation.navigate('LetterDetail', {
        letterIndex: letterData.index,
        letterValue: `${letterData.value.toUpperCase()}${letterData.value}`,
      });
    }

    letterSound.play(success => {
      if (success) {
        setHighlightedLetterIndex(letterData.index);
        return letterSound.release();
      } else {
        setHighlightedLetterIndex(undefined);
      }
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.LetterContainer,
        highlightedLetterIndex === letterData.index &&
          styles.HighlightLetterItemText,
      ]}
      onPress={handlePressLetter}>
      <Text style={styles.LetterItemText}>
        {letterData.value.toUpperCase()}
        {letterData.value}
      </Text>
    </TouchableOpacity>
  );
};

export default LetterItem;
