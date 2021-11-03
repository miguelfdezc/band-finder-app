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
  FlatList,
} from 'react-native';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import CustomInput from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import CustomButton from '../components/Button';
import * as FileSystem from 'expo-file-system';
// import * as firebase from 'firebase/app';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config';

import { LogBox } from 'react-native';
import { editUserAction } from '../store/actions';
import { Picker } from '@react-native-picker/picker';
import * as Localization from 'expo-localization';
import * as genres_en from '../assets/data/genres_en.json';
import * as genres_es from '../assets/data/genres_es.json';
import * as instruments_en from '../assets/data/instruments_en.json';
import * as instruments_es from '../assets/data/instruments_es.json';

LogBox.ignoreLogs(['Setting a timer']);

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const [editUser, setEditUser] = useState({
    photoURL: '',
    imagenFondo: '',
    usuario: '',
    displayName: '',
    ubicacion: '',
    descripcion: '',
    phoneNumber: '',
    generos: [],
    instrumentos: [],
  });

  const [showGenre, setShowGenre] = useState(false);
  const [showInstrument, setShowInstrument] = useState(false);

  const [allGenres, setAllGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const [allInstruments, setAllInstruments] = useState([]);
  const [instruments, setInstruments] = useState([]);

  const [levels, setLevels] = useState([
    { title: 'Principiante', key: 'principiante' },
    { title: 'Intermedio', key: 'intermedio' },
    { title: 'Avanzado', key: 'avanzado' },
  ]);

  const [genero, setGenero] = useState(genres[0] ? genres[0].key : '');
  const [instrumento, setInstrumento] = useState(
    instruments[0] ? instruments[0].key : ''
  );
  const [nivel, setNivel] = useState(levels[0] ? levels[0].key : '');

  useEffect(() => {
    if (genres[0]) setGenero(genres[0].key);
  }, [genres]);

  useEffect(() => {
    if (instruments[0]) setInstrumento(instruments[0].key);
  }, [instruments]);

  useEffect(() => {
    if (levels[0]) setNivel(levels[0].key);
  }, [levels]);

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

    setEditUser({
      photoURL: currentUser.photoURL,
      imagenFondo: currentUser.imagenFondo,
      usuario: currentUser.usuario,
      displayName: currentUser.displayName,
      ubicacion: currentUser.ubicacion,
      descripcion: currentUser.descripcion,
      phoneNumber: currentUser.phoneNumber,
      generos: currentUser.generos,
      instrumentos: currentUser.instrumentos,
    });
  }, []);

  const uploadImage = async (tipo) => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
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

    const ref = storage.ref().child(`${tipo}/${currentUser.uid}`);

    const snapshot = await ref.put(blob, { contentType: 'image/png' });

    const remoteURL = await snapshot.ref.getDownloadURL();

    if (tipo === 'profileImg')
      setEditUser({ ...editUser, photoURL: remoteURL });
    else if (tipo === 'backgroundImg')
      setEditUser({ ...editUser, imagenFondo: remoteURL });

    return remoteURL;
  };

  return (
    <ScrollView style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      <View style={styles.title}>
        <Title>{t('editProfileScreen.title')}</Title>
      </View>
      <View style={styles.profileImgContainer}>
        {!!editUser.photoURL && (
          <Image
            source={{ uri: editUser.photoURL ?? currentUser.photoURL }}
            style={styles.profileImg}
          />
        )}
        <TouchableOpacity
          style={styles.changeImage}
          onPress={() => uploadImage('profileImg')}
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
        {!!editUser.imagenFondo && (
          <Image
            source={{ uri: editUser.imagenFondo ?? currentUser.imagenFondo }}
            style={styles.profileImg}
          />
        )}
        <TouchableOpacity
          style={styles.changeImage}
          onPress={() => uploadImage('backgroundImg')}
        >
          <Ionicons
            name='camera-outline'
            size={50}
            color='#1B141F'
            style={styles.cameraIcon}
          />
          <Text style={styles.blueText}>{t('globals.changeBackground')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text>{t('editProfileScreen.usernameTitle')}</Text>
          <CustomInput
            placeholder={t('editProfileScreen.usernameExample')}
            autoFocus
            type='text'
            value={editUser.usuario}
            onChangeText={(text) => setEditUser({ ...editUser, usuario: text })}
          />
        </View>
        <View>
          <Text>{t('editProfileScreen.nameTitle')}</Text>
          <CustomInput
            placeholder={t('editProfileScreen.nameExample')}
            type='text'
            value={editUser.displayName}
            onChangeText={(text) =>
              setEditUser({ ...editUser, displayName: text })
            }
          />
        </View>
        <View>
          <Text>{t('editProfileScreen.locationTitle')}</Text>
          <CustomInput
            placeholder={t('editProfileScreen.locationExample')}
            type='text'
            value={editUser.ubicacion}
            onChangeText={(text) =>
              setEditUser({ ...editUser, ubicacion: text })
            }
          />
        </View>
        <View>
          <Text>{t('editProfileScreen.descriptionTitle')}</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
            placeholder={t('editProfileScreen.descriptionExample')}
            value={editUser.descripcion}
            onChangeText={(text) =>
              setEditUser({ ...editUser, descripcion: text })
            }
          />
        </View>
        <View>
          <Text>{t('editProfileScreen.phoneTitle')}</Text>
          <CustomInput
            placeholder={t('editProfileScreen.phoneExample')}
            type='text'
            value={editUser.phoneNumber}
            onChangeText={(text) =>
              setEditUser({ ...editUser, phoneNumber: text })
            }
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
              data={editUser.generos}
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
                  <Picker.Item label={item.title} value={item.key} key={key} />
                ))}
              </Picker>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setEditUser({
                    ...editUser,
                    generos: [...editUser.generos, genero],
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
              data={editUser.instrumentos}
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
                      allInstruments.find((value) => value.key === item.nombre)
                        .title
                    }{' '}
                    {item.nivel}
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
              <View style={{ flexDirection: 'column' }}>
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
                <Picker
                  selectedValue={nivel}
                  onValueChange={(text) => setNivel(text)}
                  style={{ width: 200 }}
                >
                  {levels.map((item, key) => (
                    <Picker.Item
                      label={item.title}
                      value={item.key}
                      key={key}
                    />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setEditUser({
                    ...editUser,
                    instrumentos: [
                      ...editUser.instrumentos,
                      { nombre: instrumento, nivel: nivel },
                    ],
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
          onPress={() => dispatch(editUserAction(currentUser.uid, editUser))}
          title={t('globals.saveBtn')}
        />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default EditProfileScreen;

export const screenOptions = (navData) =>
  NavBar(navData, false, 'User', 'person-outline', Ionicons, () => {});

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
});
