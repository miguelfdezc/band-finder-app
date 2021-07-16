import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config';
import { t } from '../lang/IMLocalized';

const MenuScreen = ({ navigation }) => {
  const menuOptions = [
    {
      title: t('screenTitles.home'),
      onPress: () => navigation.navigate(t('screenTitles.home')),
      icon: 'home-outline',
    },
    {
      title: t('screenTitles.profile'),
      onPress: () => navigation.navigate(t('screenTitles.profile')),
      icon: 'person-outline',
    },
    {
      title: t('menuOptions.signOut'),
      onPress: () =>
        auth
          .signOut()
          .then(() => navigation.replace(t('screenTitles.login')))
          .catch((error) => {
            alert(error.message);
          }),
      icon: 'exit-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('menuOptions.goBack')}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        {menuOptions.map((option) => (
          <TouchableOpacity
            key={option.title}
            activeOpacity={0.6}
            onPress={option.onPress}
            style={styles.option}
          >
            <Ionicons name={option.icon} size={24} color='#1B141F' />
            <View style={styles.button}>
              <Text style={styles.buttonText}>{option.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    marginVertical: 20,
    width: '60%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  option: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    marginLeft: 20,
  },
  buttonText: {
    fontFamily: 'rubik',
    fontSize: 22,
  },
});
