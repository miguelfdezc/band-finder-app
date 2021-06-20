import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,

    backgroundColor: '#E5FDFF',
    borderWidth: 1,
    borderColor: '#61DBFB',
    borderRadius: 4,
  },
  buttonText: {
    fontFamily: 'rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    color: '#7C7381',
  },
});

export default CustomButton;
