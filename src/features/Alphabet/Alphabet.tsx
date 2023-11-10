import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {alphabet_es} from '../../alphabet/es';
import LetterItem from './LetterItem';

const styles = StyleSheet.create({
  AlphabetContainer: {margin: 12},
  AlphabetColumnWrapper: {flex: 1, justifyContent: 'space-around'},
});

const Alphabet = () => {
  const alphabetData = alphabet_es;
  return (
    <SafeAreaView>
      <FlatList
        data={alphabetData}
        renderItem={item => <LetterItem letterData={item.item} />}
        numColumns={3}
        style={styles.AlphabetContainer}
        columnWrapperStyle={styles.AlphabetColumnWrapper}
      />
    </SafeAreaView>
  );
};

export default Alphabet;
