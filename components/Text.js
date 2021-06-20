import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = (props) => {
  return (
    <Text style={{ ...props.styles, ...styles.title }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 28,
    lineHeight: 39,
    color: '#000000',
  },
});

export default CustomText;
