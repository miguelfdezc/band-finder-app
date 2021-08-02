import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>This is the Home screen!</Text>
    </View>
  );
};

export default HomeScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Search', 'search', Ionicons, () => {
    console.log('Buscando...');
  });

const styles = StyleSheet.create({});
