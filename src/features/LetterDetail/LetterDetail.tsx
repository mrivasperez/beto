import React, {useState} from 'react';

import {FlatList, View} from 'react-native';
import {alphabet_es} from '../../alphabet/es';
import {RootStackParamList} from '../../App';
import {RouteProp, useRoute} from '@react-navigation/native';
import LetterDetailItem from './LetterDetailItem';

// const styles = StyleSheet.create({});

const LetterDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LetterDetail'>>();
  const letterData = alphabet_es[route.params.letterIndex];

  const [outlinedWordIndex, setOutlinedWordIndex] = useState<
    number | undefined
  >();

  return (
    <View>
      <FlatList
        data={letterData.data.words}
        renderItem={({item, index}) => (
          <LetterDetailItem
            word={{...item, index}}
            outlinedWordIndex={outlinedWordIndex}
            setOutlinedWordIndex={setOutlinedWordIndex}
          />
        )}
      />
    </View>
  );
};

export default LetterDetail;
