import React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Alphabet from './features/Alphabet/Alphabet';
import LetterDetail from './features/LetterDetail/LetterDetail';

// Define navigation routes and params
export type RootStackParamList = {
  Alphabet: undefined;
  LetterDetail: {letterIndex: number; letterValue: string};
};

// Define global navigation props
export type StackNavigation = NavigationProp<RootStackParamList>;

// Create navigation stack
const Stack = createNativeStackNavigator<RootStackParamList>();

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
          options={({route}) => ({
            title: String(route.params.letterValue),
            headerBackTitleVisible: false,
            headerTitleStyle: {fontSize: 24},
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
