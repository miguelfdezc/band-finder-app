import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';
import Title from '../components/Title';
import { auth } from '../config';
import { Image } from 'react-native-elements';
import Constants from 'expo-constants';
import axios from 'axios';

const PerfilScreen = ({ navigation }) => {
  const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const { uid } = auth.currentUser;
    axios
      .get(`${API_BASE_PATH}/usuarios/${uid}?uid=${uid}`)
      .then((response) => setUsuario(response.data.user))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    console.log(usuario);
  }, [usuario]);

  return (
    <View style={{ margin: 0, backgroundColor: 'white', height: 'auto' }}>
      <NavBar navigation={navigation} type='SimpleLineIcons' icon='pencil' />
      <Image source={usuario?.imagenFondo} style={styles.backgroundImg} />
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          <Image source={usuario?.photoURL} style={styles.profileImg} />
        </View>
        <View style={styles.title}>
          <Title>{usuario?.usuario}</Title>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{usuario?.ubicacion}</Text>
          <Text style={styles.infoText}>
            {usuario?.customClaims.tipo === 'musicos' ? 'Músico' : 'Negocio'}
          </Text>
          <Text style={styles.infoText}>{usuario?.fans} fans</Text>
        </View>
        <Text style={styles.descripcion}>{usuario?.descripcion}</Text>
      </View>
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    top: '-50px',
    height: 'auto',
  },
  backgroundImg: {
    width: '100%',
    height: '135px',
  },
  profileImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderWidth: 4,
    borderRadius: '50%',
    borderColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  infoText: {
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#7C7381',
  },
  descripcion: {
    marginHorizontal: 16,
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
  },
});
