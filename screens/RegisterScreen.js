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
import Constants from 'expo-constants';
import axios from 'axios';
import { t } from '../lang/IMLocalized';

const RegisterScreen = ({ navigation }) => {
  const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {}, []);

  const validateForm = () => {
    if (!usuario || !email || !password || !repeatPassword) {
      alert(t('validations.emptyFields'));
      return false;
    }
    if (password !== repeatPassword) {
      alert(t('validations.passwordRepeat'));
      return false;
    }
    return true;
  };

  const signUp = async () => {
    if (validateForm()) {
      await axios
        .post(`${API_BASE_PATH}/register/musicos`, { usuario, email, password })
        .then(() => navigation.navigate(t('screenTitles.login')))
        .catch((err) => alert(err));
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Title>Regístrate</Title>
      <StatusBar style='light' />
      <View style={styles.inputContainer}>
        <Text>{t('registerScreen.usernameTitle')}</Text>
        <CustomInput
          placeholder={t('registerScreen.usernameExample')}
          autoFocus
          type='text'
          value={usuario}
          onChangeText={(text) => setUsuario(text)}
        />
        <Text>{t('registerScreen.emailTitle')}</Text>
        <CustomInput
          placeholder={t('registerScreen.emailExample')}
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>{t('registerScreen.passwordTitle')}</Text>
        <CustomInput
          placeholder='********'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text>{t('registerScreen.repeatPasswordTitle')}</Text>
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
      <CustomButton onPress={signUp} title={t('registerScreen.submitButton')} />
      <View style={{ height: 20 }} />
      <Text style={{ fontFamily: 'rubik', fontSize: 16, marginVertical: 10 }}>
        {t('registerScreen.ctaLogin')}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate(t('screenTitles.login'))}
      >
        <View>
          <Text style={styles.buttonText}>
            {t('registerScreen.redirectLogin')}
          </Text>
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
