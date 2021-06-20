import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Brand from './Brand';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const NavBar = ({ navigation, type, icon }) => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.replace('Menu')}
      >
        <Ionicons name='menu' size={24} color='#1B141F' />
      </TouchableOpacity>
      <Brand />
      <TouchableOpacity style={styles.icon}>
        {type === 'Ionicons' && (
          <Ionicons name={icon} size={24} color='#1B141F' />
        )}
        {type === 'SimpleLineIcons' && (
          <SimpleLineIcons name={icon} size={24} color='#1B141F' />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    minHeight: 50,
  },
  icon: {
    paddingHorizontal: 10,
  },
  menuTitle: {
    fontFamily: 'source-sans-pro',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: '#000000',
  },
});

export default NavBar;
