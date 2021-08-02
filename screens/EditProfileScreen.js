import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { t } from '../lang/IMLocalized';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';

const EditProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>This is the Edit Profile screen!</Text>
    </View>
  );
};

export default EditProfileScreen;

export const screenOptions = (navData) =>
  NavBar(navData, false, 'User', 'person-outline', Ionicons, () => {});

const styles = StyleSheet.create({});
