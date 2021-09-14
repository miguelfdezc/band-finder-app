import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import { navigationRef } from '../navigation/RootNavigation';

const BandsScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [location, setLocation] = useState('');
  const [genre, setGenre] = useState('');

  /* useEffect(() => {
    if (isFocused) {
    }
  }, [props, isFocused]); */

  return (
    <View style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Image
          source={require('../assets/Rockband-amico.png')}
          style={{ width: 231, height: 216 }}
        />
      </View>
      <Title style={styles.title}>{t('bandsScreen.title')}</Title>
      <View style={styles.inputContainer}>
        <Text>{t('bandsScreen.locationTitle')}</Text>
        <CustomInput
          placeholder={t('bandsScreen.locationExample')}
          autoFocus
          type='text'
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Text>{t('bandsScreen.genreTitle')}</Text>
        <CustomInput
          placeholder={t('bandsScreen.genreExample')}
          type='text'
          value={genre}
          onChangeText={(text) => setGenre(text)}
        />
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <CustomButton
            onPress={() => {
              // navigation.navigate('FindBand', { location, genre })
            }}
            title={t('globals.searchBtn')}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          // navigation.navigate('CreateBand')
        }}
        style={{
          borderColor: 'black',
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingVertical: 30,
        }}
      >
        <Ionicons name='add-circle-outline' size={60} color='black' />
        <Text style={styles.buttonText}>{t('bandsScreen.createBand')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BandsScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Bands', 'people-outline', Ionicons, () => {});

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  inputContainer: { width: 300, alignSelf: 'center' },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#2D9CDB',
  },
});
