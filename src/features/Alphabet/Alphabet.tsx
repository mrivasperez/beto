import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {alphabet_es} from '../../alphabet/es';
import LetterItem, {LetterItemSeparator} from './LetterItem';

const styles = StyleSheet.create({
  AlphabetContainer: {},
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
        ItemSeparatorComponent={LetterItemSeparator}
      />
    </SafeAreaView>
  );
};

export default Alphabet;
