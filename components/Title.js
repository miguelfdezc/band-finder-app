import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = (props) => {
  return <Text style={styles.title}>{props.children}</Text>;
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

export default Title;
