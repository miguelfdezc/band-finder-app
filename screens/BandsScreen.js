import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import { useIsFocused } from '@react-navigation/native';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import * as Localization from 'expo-localization';
import * as genres_en from '../assets/data/genres_en.json';
import * as genres_es from '../assets/data/genres_es.json';

const BandsScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [ciudad, setCiudad] = useState('');

  const [genres, setGenres] = useState([]);

  const [genero, setGenero] = useState('');

  useEffect(() => {
    if (genres[0]) setGenero(genres[0].key);
  }, [genres]);

  const [showMap, setShowMap] = useState(false);

  const handleMapRegionChange = async (mapRegion) => setLocation(mapRegion);

  useEffect(() => {
    const locale = Localization.locale.substring(0, 2);
    if (locale === 'en') setGenres(genres_en.genres);
    else if (locale === 'es') setGenres(genres_es.genres);

    const manageLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
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
          <View style={{ height: 150, padding: 20, alignSelf: 'center' }}>
            <CustomButton
              onPress={async () => {
                const geoInfo = await Location.reverseGeocodeAsync({
                  latitude: location.latitude,
                  longitude: location.longitude,
                });
                setCiudad(`${geoInfo[0].city}, ${geoInfo[0].country}`);
                setShowMap(false);
              }}
              title={t('createBandScreen.acceptBtn')}
            />
          </View>
        </View>
      ) : (
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
              onFocus={() => setShowMap(true)}
              style={styles.input}
              placeholder={t('createBandScreen.locationExample')}
              value={ciudad}
            />
            <View style={{ flex: 1, marginVertical: 5 }}>
              <Text>{t('bandsScreen.genreTitle')}</Text>
              <View style={{ flexDirection: 'row', width: 200 }}>
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
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', width: 200, height: 50 }}
            ></View>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <CustomButton
                onPress={() => {
                  navigation.navigate('MatchBand', { location, genero });
                }}
                title={t('globals.searchBtn')}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('CreateBand')}
            style={{
              borderColor: 'black',
              borderTopWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingVertical: 15,
            }}
          >
            <Ionicons name='add-circle-outline' size={60} color='black' />
            <Text style={styles.buttonText}>{t('bandsScreen.createBand')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default BandsScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Bands', 'people-outline', Ionicons, () => {
    navData.navigation.navigate('ManageBands');
  });

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
