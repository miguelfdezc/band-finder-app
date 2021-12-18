import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
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
import EditProfileScreen, {
  screenOptions as editProfileScreenOptions,
} from '../screens/EditProfileScreen';
import CreatePostScreen, {
  screenOptions as createPostScreenOptions,
} from '../screens/CreatePostScreen';
import EditPostScreen, {
  screenOptions as editPostScreenOptions,
} from '../screens/EditPostScreen';
import EventsScreen, {
  screenOptions as eventsScreenOptions,
} from '../screens/EventsScreen';
import CreateEventScreen, {
  screenOptions as createEventScreenOptions,
} from '../screens/CreateEventScreen';
import EventScreen, {
  screenOptions as eventScreenOptions,
} from '../screens/EventScreen';
import EditEventScreen, {
  screenOptions as editEventScreenOptions,
} from '../screens/EditEventScreen';
import BandsScreen, {
  screenOptions as bandsScreenOptions,
} from '../screens/BandsScreen';
import CreateBandScreen, {
  screenOptions as createBandScreenOptions,
} from '../screens/CreateBandScreen';
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from '../screens/SearchScreen';
import MatchBandScreen, {
  screenOptions as matchBandScreenOptions,
} from '../screens/MatchBandScreen';
import ManageBandsScreen, {
  screenOptions as manageBandsScreenOptions,
} from '../screens/ManageBandsScreen';
import EditBandScreen, {
  screenOptions as editBandScreenOptions,
} from '../screens/EditBandScreen';

import Colors from '../constants/Colors';
import { t } from '../lang/IMLocalized';
import { DrawerContent } from './DrawerContent';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    color: 'black',
  },
  headerTintColor: 'black',
};

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomeStackNavigator.Screen
        name='Home'
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <HomeStackNavigator.Screen
        name='CreatePost'
        component={CreatePostScreen}
        options={createPostScreenOptions}
      />
      <HomeStackNavigator.Screen
        name='EditPost'
        component={EditPostScreen}
        options={editPostScreenOptions}
      />
    </HomeStackNavigator.Navigator>
  );
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

const SearchStackNavigator = createStackNavigator();

export const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SearchStackNavigator.Screen
        name='Search'
        component={SearchScreen}
        options={searchScreenOptions}
      />
    </SearchStackNavigator.Navigator>
  );
};

const EventsStackNavigator = createStackNavigator();

export const EventsNavigator = () => {
  return (
    <EventsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <EventsStackNavigator.Screen
        name='Events'
        component={EventsScreen}
        options={eventsScreenOptions}
      />
      <EventsStackNavigator.Screen
        name='CreateEvent'
        component={CreateEventScreen}
        options={createEventScreenOptions}
      />
      <EventsStackNavigator.Screen
        name='Event'
        component={EventScreen}
        options={eventScreenOptions}
      />
      <HomeStackNavigator.Screen
        name='EditEvent'
        component={EditEventScreen}
        options={editEventScreenOptions}
      />
    </EventsStackNavigator.Navigator>
  );
};

const BandsStackNavigator = createStackNavigator();

export const BandsNavigator = () => {
  return (
    <BandsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <BandsStackNavigator.Screen
        name='Bands'
        component={BandsScreen}
        options={bandsScreenOptions}
      />
      <BandsStackNavigator.Screen
        name='CreateBand'
        component={CreateBandScreen}
        options={createBandScreenOptions}
      />
      <BandsStackNavigator.Screen
        name='MatchBand'
        component={MatchBandScreen}
        options={matchBandScreenOptions}
      />
      <BandsStackNavigator.Screen
        name='ManageBands'
        component={ManageBandsScreen}
        options={manageBandsScreenOptions}
      />
      <BandsStackNavigator.Screen
        name='EditBand'
        component={EditBandScreen}
        options={editBandScreenOptions}
      />
    </BandsStackNavigator.Navigator>
  );
};

const MenuDrawerNavigator = createDrawerNavigator();

export const MenuNavigator = () => {
  return (
    <MenuDrawerNavigator.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <MenuDrawerNavigator.Screen
        name='HomeNavigator'
        component={HomeNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons name='home-outline' size={24} color='#1B141F' />
          ),
          drawerLabel: t('screenTitles.home'),
        }}
      />
      <MenuDrawerNavigator.Screen
        name='ProfileNavigator'
        component={ProfileNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons name='person-outline' size={24} color='#1B141F' />
          ),
          drawerLabel: t('screenTitles.profile'),
        }}
      />
      <MenuDrawerNavigator.Screen
        name='SearchNavigator'
        component={SearchNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons name='search' size={24} color='#1B141F' />
          ),
          drawerLabel: t('screenTitles.search'),
        }}
      />
      <MenuDrawerNavigator.Screen
        name='EventsNavigator'
        component={EventsNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons name='calendar-outline' size={24} color='#1B141F' />
          ),
          drawerLabel: t('screenTitles.events'),
        }}
      />
      <MenuDrawerNavigator.Screen
        name='BandsNavigator'
        component={BandsNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons name='people-outline' size={24} color='#1B141F' />
          ),
          drawerLabel: t('screenTitles.bands'),
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

const styles = StyleSheet.create({
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  button: {
    marginLeft: 20,
  },
  buttonText: {
    fontFamily: 'rubik',
    fontSize: 22,
  },
});
