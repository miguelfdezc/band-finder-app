import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import CustomButton from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config';
import { createBandAction } from '../store/actions';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import * as genres_en from '../assets/data/genres_en.json';
import * as genres_es from '../assets/data/genres_es.json';
import * as instruments_en from '../assets/data/instruments_en.json';
import * as instruments_es from '../assets/data/instruments_es.json';

LogBox.ignoreLogs(['Setting a timer']);

const CreateBandScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [band, setBand] = useState({
    usuario: authUser.uid,
    nombre: '',
    descripcion: '',
    nivel: 'principiante',
    fechaFundacion: new Date(),
    ubicacion: {},
    ciudad: '',
    generos: [],
    instrumentos: [],
    imagenPerfil: '',
    imagenFondo: '',
    actuaciones: 0,
    valoracion: 0.0,
    fans: 0,
  });

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showMap, setShowMap] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [showInstrument, setShowInstrument] = useState(false);

  useEffect(() => {
    const locale = Localization.locale.substring(0, 2);
    if (locale === 'en') {
      setAllGenres(genres_en.genres);
      setGenres(genres_en.genres);
      setAllInstruments(instruments_en.instruments);
      setInstruments(instruments_en.instruments);
    } else if (locale === 'es') {
      setAllGenres(genres_es.genres);
      setGenres(genres_es.genres);
      setAllInstruments(instruments_es.instruments);
      setInstruments(instruments_es.instruments);
    }

    const manageLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        let position = await Location.getCurrentPositionAsync({});
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        Alert.alert(error);
      }
    };
    manageLocation();
  }, []);

  const uploadFile = async (type) => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [1, 1],
      });

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError(t('validations.network')));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', pickerResult.uri, true);
        xhr.send(null);
      });

      const ref = storage.ref().child(`${authUser.uid}/bands/${Date.now()}`);

      const snapshot = await ref.put(blob, {
        contentType: 'image/png',
      });

      const remoteURL = await snapshot.ref.getDownloadURL();

      if (type === 'imagenPerfil')
        setBand({ ...band, imagenPerfil: remoteURL });
      else if (type === 'imagenFondo')
        setBand({ ...band, imagenFondo: remoteURL });

      return remoteURL;
    } catch (error) {
      Alert.prompt(error);
    }
  };

  const handleMapRegionChange = async (mapRegion) => setLocation(mapRegion);

  const [allGenres, setAllGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const [allInstruments, setAllInstruments] = useState([]);
  const [instruments, setInstruments] = useState([]);

  const [genero, setGenero] = useState(genres[0] ? genres[0].key : '');
  const [instrumento, setInstrumento] = useState(
    instruments[0] ? instruments[0].key : ''
  );

  useEffect(() => {
    if (genres[0]) setGenero(genres[0].key);
  }, [genres]);

  useEffect(() => {
    if (instruments[0]) setInstrumento(instruments[0].key);
  }, [instruments]);

  return (
    <>
      {showMap ? (
        <View style={styles.container}>
          <MapView
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - 150,
            }}
            onRegionChange={handleMapRegionChange}
            showsMyLocationButton
            showsUserLocation
            zoomControlEnabled
            zoomEnabled
          >
            <Marker coordinate={location} />
          </MapView>
          <View style={{ height: 150, padding: 20 }}>
            <CustomButton
              onPress={async () => {
                const geoInfo = await Location.reverseGeocodeAsync(location);
                setBand({
                  ...band,
                  ciudad: `${geoInfo[0].city}, ${geoInfo[0].country}`,
                  ubicacion: location,
                });
                setShowMap(false);
              }}
              title={t('createBandScreen.acceptBtn')}
            />
          </View>
        </View>
      ) : (
        <ScrollView
          style={{ margin: 0, backgroundColor: 'white', height: '100%' }}
        >
          <View style={styles.title}>
            <Title>{t('createBandScreen.title')}</Title>
          </View>
          <View style={styles.profileImgContainer}>
            {band.imagenPerfil !== '' && (
              <Image
                source={{ uri: band.imagenPerfil }}
                style={styles.profileImg}
              />
            )}
            <TouchableOpacity
              style={styles.changeImage}
              onPress={() => uploadFile('imagenPerfil')}
            >
              <Ionicons
                name='camera-outline'
                size={50}
                color='#1B141F'
                style={styles.cameraIcon}
              />
              <Text style={styles.blueText}>{t('globals.changeIcon')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileImgContainer}>
            {band.imagenFondo !== '' && (
              <Image
                source={{ uri: band.imagenFondo }}
                style={styles.profileImg}
              />
            )}
            <TouchableOpacity
              style={styles.changeImage}
              onPress={() => uploadFile('imagenFondo')}
            >
              <Ionicons
                name='camera-outline'
                size={50}
                color='#1B141F'
                style={styles.cameraIcon}
              />
              <Text style={styles.blueText}>
                {t('globals.changeBackground')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <Text>{t('createBandScreen.nameTitle')}</Text>
              <TextInput
                style={styles.input}
                placeholder={t('createBandScreen.nameExample')}
                value={band.nombre}
                onChangeText={(text) => setBand({ ...band, nombre: text })}
              />
            </View>
            <View>
              <Text>{t('createBandScreen.levelTitle')}</Text>
              <Picker
                selectedValue={band.nivel}
                onValueChange={(text) => setBand({ ...band, nivel: text })}
                style={styles.input}
              >
                <Picker.Item label='Principiante' value='principiante' />
                <Picker.Item label='Intermedio' value='intermedio' />
                <Picker.Item label='Avanzado' value='avanzado' />
              </Picker>
            </View>
            <View>
              <Text>{t('createBandScreen.locationTitle')}</Text>
              <TextInput
                onFocus={() => setShowMap(true)}
                style={styles.input}
                placeholder={t('createBandScreen.locationExample')}
                value={band.ciudad}
              />
            </View>
            <View>
              <Text>{t('createBandScreen.descriptionTitle')}</Text>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                placeholder={t('createBandScreen.descriptionExample')}
                value={band.descripcion}
                onChangeText={(text) => setBand({ ...band, descripcion: text })}
              />
            </View>
            <View style={{ flex: 1, marginVertical: 5 }}>
              <Text>{t('createBandScreen.genresTitle')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={band.generos}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Text
                        style={{
                          borderColor: '#F0E5F1',
                          borderRadius: 50,
                          backgroundColor: '#F5F4F6',
                          paddingHorizontal: 2,
                          minWidth: 50,
                          fontSize: 14,
                          height: 32,
                          textAlign: 'center',
                          lineHeight: 32,
                          marginHorizontal: 5,
                        }}
                      >
                        {allGenres.find((value) => value.key === item).title}
                      </Text>
                    </View>
                  )}
                />
                {genres.length > 0 && (
                  <TouchableOpacity onPress={() => setShowGenre(true)}>
                    <Ionicons name='add-outline' size={40} color='black' />
                  </TouchableOpacity>
                )}
              </View>
              {showGenre && genres.length > 0 && (
                <View style={{ flexDirection: 'row' }}>
                  <Picker
                    selectedValue={genero}
                    onValueChange={(text) => setGenero(text)}
                    style={{ width: 200 }}
                  >
                    {genres.map((item, key) => (
                      <Picker.Item
                        label={item.title}
                        value={item.key}
                        key={key}
                      />
                    ))}
                  </Picker>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setBand({
                        ...band,
                        generos: [...band.generos, genero],
                      });
                      setGenres(genres.filter((value) => value.key !== genero));
                      setShowGenre(false);
                    }}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>
                        {t('createBandScreen.addBtn')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{ flex: 1, marginVertical: 5 }}>
              <Text>{t('createBandScreen.instrumentsTitle')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={band.instrumentos}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Text
                        style={{
                          borderColor: '#F0E5F1',
                          borderRadius: 50,
                          backgroundColor: '#F5F4F6',
                          paddingHorizontal: 2,
                          minWidth: 50,
                          fontSize: 14,
                          height: 32,
                          textAlign: 'center',
                          lineHeight: 32,
                          marginHorizontal: 5,
                        }}
                      >
                        {
                          allInstruments.find((value) => value.key === item)
                            .title
                        }
                      </Text>
                    </View>
                  )}
                />
                {instruments.length > 0 && (
                  <TouchableOpacity onPress={() => setShowInstrument(true)}>
                    <Ionicons name='add-outline' size={40} color='black' />
                  </TouchableOpacity>
                )}
              </View>
              {showInstrument && instruments.length > 0 && (
                <View style={{ flexDirection: 'row' }}>
                  <Picker
                    selectedValue={instrumento}
                    onValueChange={(text) => setInstrumento(text)}
                    style={{ width: 200 }}
                  >
                    {instruments.map((item, key) => (
                      <Picker.Item
                        label={item.title}
                        value={item.key}
                        key={key}
                      />
                    ))}
                  </Picker>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setBand({
                        ...band,
                        instrumentos: [...band.instrumentos, instrumento],
                      });
                      setInstruments(
                        instruments.filter((value) => value.key !== instrumento)
                      );
                      setShowInstrument(false);
                    }}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>
                        {t('createBandScreen.addBtn')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.blueText}>{t('globals.cancelBtn')}</Text>
            </TouchableOpacity>
            <CustomButton
              onPress={() => dispatch(createBandAction(band))}
              title={t('globals.createBtn')}
            />
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </>
  );
};

export default CreateBandScreen;

export const screenOptions = (navData) =>
  NavBar(navData, false, 'Events', 'calendar-outline', Ionicons, () => {});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 100,
    backgroundColor: '#E5FDFF',
    borderWidth: 1,
    borderColor: '#61DBFB',
    borderRadius: 4,
  },
  buttonText: {
    fontFamily: 'rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 21,
    color: '#7C7381',
  },
  title: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  blueText: {
    marginHorizontal: 16,
    fontFamily: 'rubik',
    fontSize: 18,
    lineHeight: 22,
    color: Colors.button,
    textAlign: 'center',
  },
  changeImage: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  cameraIcon: {
    textAlign: 'center',
  },
  input: {
    width: 300,
    backgroundColor: '#F5F4F6',
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dateTime: {
    width: 140,
    marginHorizontal: 10,
    backgroundColor: '#F5F4F6',
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textArea: {
    width: 300,
    backgroundColor: '#F5F4F6',
    textAlignVertical: 'top',
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonsContainer: {
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
