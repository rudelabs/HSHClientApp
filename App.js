/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from './screen/welcome';
import Login from './screen/login';
import MainScreen from './screen/Main';
import BottomStack from './screen/Home';
import OrderHistoryNew from './screen/orderhistorynew';
import NewOrder from './screen/neworder';
import PriceList from './screen/pricelist';
const Stack = createNativeStackNavigator();
const App = () => {
  return(
    <NavigationContainer>
       <StatusBar
    backgroundColor="#c8e1ff47"
    barStyle="dark-content"
  />
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Welcome} />
      <Stack.Screen name="Options" component={BottomStack} />
      <Stack.Screen name="LoginApp" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App;
