import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Title from '../components/Title';
import Brand from '../components/Brand';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import Text from '../components/Text';
import { Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { t } from '../lang/IMLocalized';
import { loginAction } from '../store/actions';
import { useForm, Controller } from 'react-hook-form';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(loginAction(email, password));
  };

  const registerOptions = {
    email: {
      required: 'Email es obligatorio',
      pattern: {
        value:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        message: 'Email debe ser válido',
      },
    },
    password: {
      required: 'Contraseña es obligatoria',
      minLength: {
        value: 8,
        message: 'Contraseña debe tener al menos 8 caracteres',
      },
    },
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
        <Controller
          control={control}
          rules={registerOptions.email}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={t('loginScreen.emailExample')}
              autoFocus
              type='email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
        {errors.email && (
          <Text style={{ color: 'red' }}>{errors.email.message}</Text>
        )}
        <Text>{t('loginScreen.passwordTitle')}</Text>
        <Controller
          control={control}
          rules={registerOptions.password}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder='********'
              secureTextEntry
              type='password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='password'
        />
        {errors.password && (
          <Text style={{ color: 'red' }}>{errors.password.message}</Text>
        )}
      </View>
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        title={t('loginScreen.submitButton')}
      />
      <Text style={{ fontFamily: 'rubik', fontSize: 16, marginVertical: 10 }}>
        {t('loginScreen.ctaRegister')}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Register')}
      >
        <View>
          <Text style={styles.buttonText}>
            {t('loginScreen.redirectRegister')}
          </Text>
        </View>
      </TouchableOpacity>
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
  buttonText: {
    fontFamily: 'rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#2D9CDB',
  },
});
