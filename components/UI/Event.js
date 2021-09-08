import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from '../../lang/IMLocalized';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { getEventAction } from '../../store/actions';

const Event = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    id,
    fechaFin,
    descripcion,
    usuario,
    titulo,
    horaInicio,
    tipo,
    ubicacion,
    fechaInicio,
    imagen,
    horaFin,
    asistentes,
  } = data.item;

  return (
    <View style={styles.container}>
      {imagen !== '' ? (
        <Image source={{ uri: imagen }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.image}></TouchableOpacity>
      )}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{titulo}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Event', { id });
            }}
          >
            <Feather name='send' size={22} color='black' />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateTime}>
          {moment(fechaInicio).format('DD')} {moment(fechaInicio).format('MMM')}
          {moment(horaInicio).format('HH:mm')}
        </Text>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.description}>
          {descripcion}
        </Text>
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

export default Event;
