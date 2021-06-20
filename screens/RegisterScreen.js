import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Title from '../components/Title';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import Global from '../Global';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {}, []);

  const validateForm = () => {
    if (!usuario || !email || !password || !repeatPassword) {
      alert('Error: faltan campos del formulario por rellenar');
      return false;
    }
    if (password !== repeatPassword) {
      alert('Error: las contraseñas introducidas no coinciden');
      return false;
    }
    return true;
  };

  const signUp = async () => {
    if (validateForm()) {
      await axios
        .post(`${Global.url}/register/musicos`, { usuario, email, password })
        .then(() => navigation.navigate('Inicio de sesión'))
        .catch((err) => alert(err));
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Title>Regístrate</Title>
      <StatusBar style='light' />
      <View style={styles.inputContainer}>
        <Text>usuario</Text>
        <CustomInput
          placeholder='usuario123'
          autoFocus
          type='text'
          value={usuario}
          onChangeText={(text) => setUsuario(text)}
        />
        <Text>email</Text>
        <CustomInput
          placeholder='usuario@email.com'
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
        />
        <Text>repetir contraseña</Text>
        <CustomInput
          placeholder='********'
          secureTextEntry
          type='password'
          value={repeatPassword}
          onChangeText={(text) => setRepeatPassword(text)}
          onSubmitEditing={signUp}
        />
      </View>
      <View style={{ height: 20 }} />
      <CustomButton onPress={signUp} title='Registrarme' />
      <View style={{ height: 20 }} />
      <Text style={{ fontFamily: 'rubik', fontSize: 16, marginVertical: 10 }}>
        ¿Ya tienes una cuenta?
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Inicio de sesión')}
      >
        <View>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: { width: 300 },
  menuTitle: {
    fontFamily: 'source-sans-pro',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: '#000000',
  },
  buttonText: {
    fontFamily: 'rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#2D9CDB',
  },
});
