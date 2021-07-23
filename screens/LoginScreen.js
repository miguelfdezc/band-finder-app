import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Title from '../components/Title';
import Brand from '../components/Brand';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import Text from '../components/Text';
import { Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../config';
import { t } from '../lang/IMLocalized';
import { loginAction } from '../store/actions';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      alert(t('validations.emptyFields'));
      return false;
    }
    return true;
  };

  const signIn = async () => {
    if (validateForm()) {
      dispatch(loginAction(email, password));
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <View style={{ height: 100 }} />
      <Brand />
      <Image
        source={require('../assets/Playlist-pana.png')}
        style={{ width: 411, height: 305, borderRadius: 8 }}
      />
      <Title>{t('loginScreen.loginTitle')}</Title>
      <View style={styles.inputContainer}>
        <Text>{t('loginScreen.emailTitle')}</Text>
        <CustomInput
          placeholder={t('loginScreen.emailExample')}
          autoFocus
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>{t('loginScreen.passwordTitle')}</Text>
        <CustomInput
          placeholder='********'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <CustomButton onPress={signIn} title={t('loginScreen.submitButton')} />
      <Text>{t('loginScreen.ctaRegister')}</Text>
      <CustomButton
        onPress={() => navigation.navigate('Register')}
        title={t('loginScreen.redirectRegister')}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
});
