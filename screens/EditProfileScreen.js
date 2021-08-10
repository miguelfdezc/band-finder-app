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
  });

  useEffect(() => {
    setEditUser({
      photoURL: currentUser.photoURL,
      imagenFondo: currentUser.imagenFondo,
      usuario: currentUser.usuario,
      displayName: currentUser.displayName,
      ubicacion: currentUser.ubicacion,
      descripcion: currentUser.descripcion,
      phoneNumber: currentUser.phoneNumber,
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
        reject(new TypeError('Network request failed'));
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
        <Title>Editar Perfil</Title>
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
          <Text style={styles.blueText}>Cambiar icono</Text>
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
          <Text style={styles.blueText}>Cambiar fondo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text>Usuario</Text>
          <CustomInput
            placeholder='usuario'
            autoFocus
            type='text'
            value={editUser.usuario}
            onChangeText={(text) => setEditUser({ ...editUser, usuario: text })}
          />
        </View>
        <View>
          <Text>Nombre</Text>
          <CustomInput
            placeholder='Nombre Apellidos'
            type='text'
            value={editUser.displayName}
            onChangeText={(text) =>
              setEditUser({ ...editUser, displayName: text })
            }
          />
        </View>
        <View>
          <Text>Ubicación</Text>
          <CustomInput
            placeholder='Ciudad, País'
            type='text'
            value={editUser.ubicacion}
            onChangeText={(text) =>
              setEditUser({ ...editUser, ubicacion: text })
            }
          />
        </View>
        <View>
          <Text>Descripción</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
            placeholder='Texto de descripción...'
            value={editUser.descripcion}
            onChangeText={(text) =>
              setEditUser({ ...editUser, descripcion: text })
            }
          />
        </View>
        <View>
          <Text>Teléfono</Text>
          <CustomInput
            placeholder='*34 123 456 789'
            type='text'
            value={editUser.phoneNumber}
            onChangeText={(text) =>
              setEditUser({ ...editUser, phoneNumber: text })
            }
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Text style={styles.blueText}>Cancelar</Text>
        <CustomButton
          onPress={() => dispatch(editUserAction(currentUser.uid, editUser))}
          title='Guardar'
        />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

/* 

  "usuario": "musico1",
  "displayName": "Jane Doe",
  "ubicacion": "Mi caaaaasa",
  "descripcion": "Descripcion editada...",
  "phoneNumber": "+11234567890",
  "photoURL": "http://www.example.com/12345678/photo.png",
  "imagenFondo": "https://via.placeholder.com/100x100.png?text=Imagen+Fondo",

*/

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
});
