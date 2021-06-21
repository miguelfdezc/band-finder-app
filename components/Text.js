import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = (props) => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
});

export default CustomText;
