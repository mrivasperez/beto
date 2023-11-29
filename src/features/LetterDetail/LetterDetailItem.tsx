import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {light} from '../../styles/palette';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
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
}: {
  word: {
    word: string;
    sentence: string;
    image: any;
    wordMp3: any;
    sentenceMp3: any;
  };
}) => {
  const wordSound = new Sound(word.wordMp3);
  const sentenceSound = new Sound(word.sentenceMp3);

  return (
    <View style={styles.container}>
      <Text style={styles.wordText}>{word.word}</Text>
      <Image source={word.image} style={styles.image} />
      <Text style={styles.wordSentence}>{word.sentence}</Text>
    </View>
  );
};

export default LetterDetailItem;
