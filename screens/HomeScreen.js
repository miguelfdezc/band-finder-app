import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';
import { t } from '../lang/IMLocalized';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>This is the Home screen!</Text>
    </View>
  );
};

export default HomeScreen;

export const screenOptions = {
  headerShown: true,
  headerTitle: t('screenTitles.home'),
};

const styles = StyleSheet.create({});
