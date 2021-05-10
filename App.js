import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Global from './Global';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  let url = Global.url;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/holaMundo`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.message);
        console.error('Ha habido un error!', error);
      });
  }, [url, message]);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
