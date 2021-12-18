import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Title from '../components/Title';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import { t } from '../lang/IMLocalized';
import { signUpAction } from '../store/actions';
import Colors from '../constants/Colors';
import SwitchSelector from 'react-native-switch-selector';
import { useForm, Controller } from 'react-hook-form';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState('musicos');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuario: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (data) => {
    const { usuario, email, password, repeatPassword } = data;
    if (validateForm(password, repeatPassword)) {
      dispatch(signUpAction(usuario, email, password, selectedOption));
    }
  };

  const registerOptions = {
    usuario: {
      required: 'Usuario es obligatorio',
      maxLength: {
        value: 10,
        message: 'Usuario debe tener como máximo 10 caracteres',
      },
    },
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
    repeatPassword: {
      required: 'Contraseña es obligatoria',
      minLength: {
        value: 8,
        message: 'Contraseña debe tener al menos 8 caracteres',
      },
    },
  };

  const validateForm = (password, repeatPassword) => {
    if (password !== repeatPassword) {
      Alert.alert(t('validations.passwordRepeat'));
      return false;
    } else return true;
  };

  const options = [
    { label: t('registerScreen.musician'), value: 'musicos' },
    { label: t('registerScreen.business'), value: 'negocios' },
  ];

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Title>{t('registerScreen.title')}</Title>
      <View style={styles.inputContainer}>
        <View style={styles.profileOptions}>
          <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => setSelectedOption(value)}
            selectedColor='black'
            selectedTextStyle={styles.selectedOption}
            buttonColor='transparent'
          />
        </View>
        <Text>{t('registerScreen.usernameTitle')}</Text>
        <Controller
          control={control}
          rules={registerOptions.usuario}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={t('registerScreen.usernameExample')}
              autoFocus
              type='text'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='usuario'
        />
        {errors.usuario && (
          <Text style={{ color: 'red' }}>{errors.usuario.message}</Text>
        )}
        <Text>{t('registerScreen.emailTitle')}</Text>
        <Controller
          control={control}
          rules={registerOptions.email}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={t('registerScreen.emailExample')}
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
        <Text>{t('registerScreen.passwordTitle')}</Text>
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
        <Text>{t('registerScreen.repeatPasswordTitle')}</Text>
        <Controller
          control={control}
          rules={registerOptions.repeatPassword}
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
          name='repeatPassword'
        />
        {errors.repeatPassword && (
          <Text style={{ color: 'red' }}>{errors.repeatPassword.message}</Text>
        )}
      </View>
      <View style={{ height: 20 }} />
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        title={t('registerScreen.submitButton')}
      />
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
  profileOptions: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
    marginBottom: 10,
  },
  selectedOption: {
    height: 25,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: Colors.blue,
  },
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
