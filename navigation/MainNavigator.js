import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from '../screens/HomeScreen';
import LoginScreen, {
  screenOptions as loginScreenOptions,
} from '../screens/LoginScreen';
import RegisterScreen, {
  screenOptions as registerScreenOptions,
} from '../screens/RegisterScreen';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from '../screens/ProfileScreen';

import Colors from '../constants/Colors';
import { auth } from '../config';
import { t } from '../lang/IMLocalized';
import NavBar from '../components/NavBar';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? 'white' : '',
  },
  headerTitleStyle: {
    color: 'black',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen
        name='Profile'
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={editProfileScreenOptions}
      />
    </ProfileStackNavigator.Navigator>
  );
};

const MenuDrawerNavigator = createDrawerNavigator();

export const MenuNavigator = () => {
  return (
    <MenuDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => {
                  auth
                    .signOut()
                    .then(() => navigation.replace('Login'))
                    .catch((error) => {
                      alert(error.message);
                    });
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <MenuDrawerNavigator.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={24}
              color='#1B141F'
            />
          ),
          headerShown: true,
          headerTitle: (props) => (
            <NavBar type='Ionicons' icon='search' {...props} />
          ),
        }}
      />
      <MenuDrawerNavigator.Screen
        name='Profile'
        component={ProfileNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </MenuDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Login'
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <AuthStackNavigator.Screen
        name='Register'
        component={RegisterScreen}
        options={registerScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
