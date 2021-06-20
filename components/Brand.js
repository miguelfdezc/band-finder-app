import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Brand = () => {
  return <Text style={styles.brand}>Band Finder</Text>;
};

const styles = StyleSheet.create({
  brand: {
    fontFamily: 'source-sans-pro',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: '#000000',
  },
});

export default Brand;
