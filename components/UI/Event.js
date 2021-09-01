import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { t } from '../../lang/IMLocalized';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Event = ({ data }) => {
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
      <Image source={{ uri: imagen }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{titulo}</Text>
          <Feather name='send' size={22} color='black' />
        </View>
        <Text style={styles.dateTime}>
          {fechaInicio} {horaInicio}
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
    backgroundColor: 'red',
  },
  info: {
    paddingHorizontal: 10,
  },
  header: {
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
