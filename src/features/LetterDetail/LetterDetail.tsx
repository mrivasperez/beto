import React from 'react';

import {FlatList, View} from 'react-native';
import {alphabet_es} from '../../alphabet/es';
import {RootStackParamList} from '../../App';
import {RouteProp, useRoute} from '@react-navigation/native';
import LetterDetailItem from './LetterDetailItem';

// const styles = StyleSheet.create({});

const LetterDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LetterDetail'>>();

  const letterData = alphabet_es[route.params.letterIndex];

  console.log(letterData.data.words);

  return (
    <View>
      <FlatList
        data={letterData.data.words}
        renderItem={item => <LetterDetailItem word={item.item} />}
      />
    </View>
  );
};

export default LetterDetail;
