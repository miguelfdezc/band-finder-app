import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { t } from '../../lang/IMLocalized';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { getUserAction } from '../../store/actions';

const Musician = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);

  const {
    actuaciones,
    descripcion,
    fans,
    imagenFondo,
    objectID,
    ubicacion,
    usuario,
    valoracion,
  } = data;

  useEffect(() => {
    dispatch(getUserAction(objectID));
  }, []);

  return (
    <View style={styles.container}>
      {imagenFondo !== '' ? (
        <Image source={{ uri: currentUser.photoURL }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.image}></TouchableOpacity>
      )}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{usuario}</Text>
          <TouchableOpacity
            onPress={() => {
              // console.log('ID:', id);
              // navigation.navigate('Profile', { id })
            }}
          >
            <Feather name='send' size={22} color='black' />
          </TouchableOpacity>
        </View>
        <Text>Actuaciones: {actuaciones}</Text>
        <Text>Fans: {fans}</Text>
        <Text>Valoración: {valoracion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '75%',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  info: {
    width: '100%',
    paddingHorizontal: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTime: {
    color: Colors.grey,
    marginVertical: 5,
  },
  description: {
    color: 'black',
  },
});

export default Musician;
