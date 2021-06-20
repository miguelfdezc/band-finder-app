import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Title from '../components/Title';
import Brand from '../components/Brand';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import Text from '../components/Text';
import { Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.navigate('Home');
      }
    });

    return unsubscribe;
  }, []);

  const validateForm = () => {
    if (!email || !password) {
      alert('Error: faltan campos del formulario por rellenar');
      return false;
    }
    return true;
  };

  const signIn = async () => {
    if (validateForm()) {
      await auth.signInWithEmailAndPassword(email, password).catch((error) => {
        alert(error.message);
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Brand />
      <Image
        source={require('../assets/Playlist-pana.png')}
        style={{ width: 411, height: 305, borderRadius: 8 }}
      />
      <Title>Inicio de sesión</Title>
      <View style={styles.inputContainer}>
        <Text>email</Text>
        <CustomInput
          placeholder='usuario@gmail.com'
          autoFocus
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>contraseña</Text>
        <CustomInput
          placeholder='********'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <CustomButton onPress={signIn} title='Iniciar sesión' />
      <Text>¿Todavía no tienes una cuenta?</Text>
      <CustomButton
        onPress={() => navigation.navigate('Regístrate')}
        title='Registrarme'
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: { width: 300 },
});
