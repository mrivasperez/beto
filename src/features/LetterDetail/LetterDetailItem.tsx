import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {light} from '../../styles/palette';

const styles = StyleSheet.create({
  container: {
    margin: 24,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: light.white,
    borderRadius: 18,
  },
  image: {width: '90%', height: 300, borderRadius: 12, marginTop: 18},
  wordText: {fontSize: 36, marginVertical: 12},
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
  return (
    <View style={styles.container}>
      <Image source={word.image} style={styles.image} />
      <Text style={styles.wordText}>{word.word}</Text>
    </View>
  );
};

export default LetterDetailItem;
