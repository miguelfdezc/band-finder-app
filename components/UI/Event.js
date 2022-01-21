import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { t } from '../../lang/IMLocalized';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { deleteEventAction } from '../../store/actions';

const Event = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const authUser = useSelector((state) => state.auth.authUser);

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
      <View style={styles.centeredView}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderBottomColor: Colors.grey,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('EditEvent', { id });
                }}
              >
                <Ionicons name='build' size={24} color='#ffc107' />
                <Text style={{ color: '#ffc107' }}>{t('globals.editBtn')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderBottomColor: Colors.grey,
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                onPress={() => dispatch(deleteEventAction(id, authUser.uid))}
              >
                <Ionicons name='trash' size={24} color='red' />
                <Text style={{ color: 'red' }}>{t('globals.deleteBtn')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons name='close' size={24} color='black' />
                <Text style={{ color: 'black' }}>{t('globals.exitBtn')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
          {authUser.uid === usuario && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name='ellipsis-vertical'
                size={20}
                color={Colors.grey}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.dateTime}>
          {moment(fechaInicio).format('DD')} {moment(fechaInicio).format('MMM')}{' '}
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
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '50%',
    height: '25%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
