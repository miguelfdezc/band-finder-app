import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} type='Ionicons' icon='search' />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
