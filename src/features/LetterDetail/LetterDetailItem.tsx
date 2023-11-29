import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {light} from '../../styles/palette';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  outlined: {
    borderWidth: 2,
    borderColor: light.blueberry100,
  },
  container: {
    margin: 24,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: light.white,
    borderRadius: 18,
  },
  image: {width: '90%', height: 300, borderRadius: 12},
  wordText: {fontSize: 36, marginVertical: 12},
  wordSentence: {fontSize: 24, padding: 12},
});

const LetterDetailItem = ({
  word,
  outlinedWordIndex,
  setOutlinedWordIndex,
}: {
  word: {
    word: string;
    sentence: string;
    image: any;
    wordMp3: any;
    sentenceMp3: any;
    index: number;
  };
  outlinedWordIndex: number | undefined;
  setOutlinedWordIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const wordSound = new Sound(word.wordMp3);
  const sentenceSound = new Sound(word.sentenceMp3);

  const handlePressLetterItem = () => {
    console.log(word.index, outlinedWordIndex);

    if (outlinedWordIndex === undefined || outlinedWordIndex !== word.index) {
      setOutlinedWordIndex(word.index);
      return wordSound.play();
    }
    return sentenceSound.play();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        outlinedWordIndex === word.index && styles.outlined,
      ]}
      onPress={handlePressLetterItem}>
      <Text style={styles.wordText}>{word.word}</Text>
      <Image source={word.image} style={styles.image} />
      <Text style={styles.wordSentence}>{word.sentence}</Text>
    </TouchableOpacity>
  );
};

export default LetterDetailItem;
