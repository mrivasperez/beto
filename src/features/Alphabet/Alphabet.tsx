import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {alphabet_es} from '../../alphabet/es';
import LetterItem from './LetterItem';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  AlphabetContainer: {margin: 12},
  AlphabetColumnWrapper: {flex: 1, justifyContent: 'space-around'},
});

const Alphabet = () => {
  Sound.setCategory('Playback');

  const alphabetData = alphabet_es;
  const [highlightedLetterIndex, setHighlightedLetterIndex] =
    useState<number>();

  return (
    <SafeAreaView>
      <FlatList
        data={alphabetData}
        renderItem={item => (
          <LetterItem
            letterData={item.item}
            highlightedLetterIndex={highlightedLetterIndex}
            setHighlightedLetterIndex={setHighlightedLetterIndex}
          />
        )}
        numColumns={3}
        style={styles.AlphabetContainer}
        columnWrapperStyle={styles.AlphabetColumnWrapper}
      />
    </SafeAreaView>
  );
};

export default Alphabet;
