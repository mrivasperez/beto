import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {alphabet_es} from '../../alphabet/es';
import {RootStackParamList} from '../../App';
import {RouteProp, useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({});

const LetterDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'LetterDetail'>>();

  const letterData = alphabet_es[route.params.letterIndex];

  console.log(letterData);

  return (
    <View>
      <Text>LetterDetail</Text>
    </View>
  );
};

export default LetterDetail;
