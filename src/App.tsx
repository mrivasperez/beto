import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alphabet from './features/Alphabet/Alphabet';
import LetterDetail from './features/LetterDetail/LetterDetail';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Alphabet">
        <Stack.Screen
          name="Alphabet"
          component={Alphabet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LetterDetail"
          component={LetterDetail}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
