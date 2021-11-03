import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Slider } from 'react-native-elements';
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
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import * as Localization from 'expo-localization';
import * as genres_en from '../assets/data/genres_en.json';
import * as genres_es from '../assets/data/genres_es.json';
import * as instruments_en from '../assets/data/instruments_en.json';
import * as instruments_es from '../assets/data/instruments_es.json';
import { matchBandAction } from '../store/actions';
import Band from '../components/UI/Band';

const MatchBandScreen = ({ route, navigation }) => {
  const { location, genero } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const matchingBands = useSelector((state) => state.match.bands);

  const [distanciaMax, setDistanciaMax] = useState(50);
  const [instrumento, setInstrumento] = useState();

  const [instruments, setInstruments] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allInstruments, setAllInstruments] = useState([]);

  useEffect(() => {
    if (instruments[0]) setInstrumento(instruments[0].key);
  }, [instruments]);

  useEffect(() => {
    const locale = Localization.locale.substring(0, 2);
    if (locale === 'en') {
      setAllGenres(genres_en.genres);
      setAllInstruments(instruments_en.instruments);
      setInstruments(instruments_en.instruments);
    } else if (locale === 'es') {
      setAllGenres(genres_es.genres);
      setAllInstruments(instruments_es.instruments);
      setInstruments(instruments_es.instruments);
    }

    const request = {
      ubicacion: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      distanciaMax,
      instrumento,
      genero,
      usuario: authUser.uid,
    };
    dispatch(matchBandAction(request));
  }, []);

  useEffect(() => {
    const request = {
      ubicacion: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      distanciaMax,
      instrumento,
      genero,
      usuario: authUser.uid,
    };
    dispatch(matchBandAction(request));
  }, [instrumento, distanciaMax]);

  return (
    <View
      style={{
        margin: 0,
        paddingTop: 40,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Title style={styles.title}>{t('bandsScreen.title')}</Title>
      <View style={{ flex: 1, marginVertical: 5 }}>
        <View style={styles.inputContainer}>
          <Text>Distancia máxima (km)</Text>
          <Text>{distanciaMax} km</Text>
          <Slider
            value={distanciaMax}
            onValueChange={setDistanciaMax}
            maximumValue={50}
            minimumValue={5}
            step={5}
            allowTouchTrack
            thumbStyle={{ height: 20, width: 20, backgroundColor: Colors.blue }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Instrumento</Text>
          <View style={{ flexDirection: 'row', width: 200 }}>
            <Picker
              selectedValue={instrumento}
              onValueChange={(text) => setInstrumento(text)}
              style={{ width: 200 }}
            >
              {instruments.map((item, key) => (
                <Picker.Item label={item.title} value={item.key} key={key} />
              ))}
            </Picker>
          </View>
        </View>
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
            data={matchingBands}
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

export default MatchBandScreen;

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
