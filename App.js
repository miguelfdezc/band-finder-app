import 'react-native-gesture-handler';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { t, init } from './lang/IMLocalized';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import PerfilScreen from './screens/PerfilScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: 'white' },
  headerTitleStyle: { color: 'black' },
};

const fetchFonts = () => {
  return Font.loadAsync({
    'source-sans-pro': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
  });
};

export default function App() {
  init();
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='Perfil'
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen
          name={t('screenTitles.login')}
          component={LoginScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={t('screenTitles.register')}
          component={RegisterScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={t('screenTitles.home')}
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen name='Menu' component={MenuScreen}></Stack.Screen>
        <Stack.Screen
          name={t('screenTitles.profile')}
          component={PerfilScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
