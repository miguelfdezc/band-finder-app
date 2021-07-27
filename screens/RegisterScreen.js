import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Title from '../components/Title';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import { t } from '../lang/IMLocalized';
import { signUpAction } from '../store/actions';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

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

  const signUp = () => {
    if (validateForm()) {
      dispatch(signUpAction(usuario, email, password));
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
        onPress={() => navigation.navigate('Login')}
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

export const screenOptions = {
  headerShown: false,
};

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
