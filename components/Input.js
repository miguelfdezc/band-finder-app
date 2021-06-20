import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInput = (props) => {
  return <TextInput {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 38,
    backgroundColor: '#F5F4F6',
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default CustomInput;
