import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Band from '../components/UI/Band';
import * as Localization from 'expo-localization';
import * as genres_en from '../assets/data/genres_en.json';
import * as genres_es from '../assets/data/genres_es.json';
import * as instruments_en from '../assets/data/instruments_en.json';
import * as instruments_es from '../assets/data/instruments_es.json';
import { getBandsByFounderAction } from '../store/actions';

const ManageBandsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const myBands = useSelector((state) => state.band.myBands);

  const [allGenres, setAllGenres] = useState([]);
  const [allInstruments, setAllInstruments] = useState([]);

  useEffect(() => {
    const locale = Localization.locale.substring(0, 2);
    if (locale === 'en') {
      setAllGenres(genres_en.genres);
      setAllInstruments(instruments_en.instruments);
    } else if (locale === 'es') {
      setAllGenres(genres_es.genres);
      setAllInstruments(instruments_es.instruments);
    }
    dispatch(getBandsByFounderAction(authUser.uid, authUser.uid));
  }, []);

  return (
    <View
      style={{
        margin: 0,
        paddingTop: 40,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Title style={styles.title}>Manage Bands</Title>
      <View style={{ flex: 1, marginVertical: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width * 0.95,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FlatList
            data={myBands}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => (
              <Band
                data={item}
                allGenres={allGenres}
                allInstruments={allInstruments}
              />
            )}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ManageBandsScreen;

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
