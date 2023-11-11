import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Welcome from './screen/welcome';
import Login from './screen/login';
import UserLogin from './screen/UserLogin';
import MainScreen from './screen/Main';
import BottomStack from './screen/Home';
import OrderHistoryNew from './screen/orderhistorynew';
import NewOrder from './screen/neworder';
import PriceList from './screen/pricelist';
const Stack = createNativeStackNavigator();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isNew, setisNew] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [initialRoute, setinitialRoute] = useState('');


  const onAuthStateChanged = async () => {
    const firstTime = await AsyncStorage.getItem('newlogin');
    if (firstTime) {
      setinitialRoute('SignInContainer');
    } else {
      setinitialRoute('ClientSign');
      AsyncStorage.setItem('newlogin', 'true');
    }

    // const { currentUser } = auth();
    // console.log(currentUser)
    // if (currentUser) {
    //   setinitialRoute('SignInContainer');
    // } else {

    //   setinitialRoute('ClientSign');
    // }
  }

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount

    onAuthStateChanged();
  }, []);

  const SignInContainer = ({ navigation }) => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserLogin" component={UserLogin} />
      </Stack.Navigator>
    );
  };

  const ClientSign = ({ navigation }) => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Welcome} />
        {/* <Stack.Screen name="LoginApp" component={Login} /> */}
      </Stack.Navigator>
    );
  };

  const LoggedInContainer = ({ navigation }) => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Options" component={BottomStack} /> */}
        <Stack.Screen name="OrderHistoryNew" component={OrderHistoryNew} />
        <Stack.Screen name="NewOrder" component={NewOrder} />
      </Stack.Navigator>
    );
  };
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6FA" />
      {initialRoute && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ClientSign" component={ClientSign} />
            <Stack.Screen
              name="LoggedInContainer"
              component={LoggedInContainer}
            />
            <Stack.Screen name="SignInContainer" component={SignInContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

