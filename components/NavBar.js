import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Brand from './Brand';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const NavBar = ({ navigation, type, icon }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.brand}>
        <Brand />
      </View>
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
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
    minHeight: 50,
  },
  brand: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  icon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
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
