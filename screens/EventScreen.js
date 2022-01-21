import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { t } from '../lang/IMLocalized';
import {
  getEventAction,
  getEventsSubscribedAction,
  getUserAction,
  updateSubscribedAction,
} from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import CustomButton from '../components/Button';

const EventScreen = (props) => {
  const { id } = props.route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const event = useSelector((state) => state.event.evento);
  const eventsSubscribed = useSelector((state) => state.event.eventosSuscrito);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    if (isFocused) {
      dispatch(getEventAction(id));
      dispatch(getEventsSubscribedAction(authUser.uid));
    }
  }, [props, isFocused]);

  useEffect(() => {
    switch (event.tipo) {
      case 'puntual':
        setType(t('eventScreen.punctual'));
        break;
      case 'diario':
        setType(t('eventScreen.daily'));
        break;
      case 'semanal':
        setType(t('eventScreen.weekly'));
        break;
      case 'mensual':
        setType(t('eventScreen.monthly'));
        break;
      default:
        break;
    }
    if (event.usuario) dispatch(getUserAction(event.usuario));
  }, [event]);

  useEffect(() => {
    setIsSubscribed(eventsSubscribed.some((value) => value.id === id));
  }, [eventsSubscribed]);

  return (
    <ScrollView style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      {!!currentUser.imagenFondo && (
        <Image
          source={{ uri: currentUser.imagenFondo }}
          style={styles.backgroundImg}
        />
      )}
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          {!!currentUser.imagenPerfil && (
            <Image
              source={{ uri: currentUser.imagenPerfil }}
              style={styles.profileImg}
            />
          )}
        </View>
        {!!currentUser.displayName && currentUser.displayName.length > 0 && (
          <View style={styles.title}>
            <Text style={{ fontSize: 24 }}>{currentUser.displayName}</Text>
          </View>
        )}
        <View style={styles.info}>
          {!!currentUser.ubicacion && currentUser.ubicacion.length > 0 && (
            <Text style={styles.infoText}>{currentUser.ubicacion}</Text>
          )}
          <Text style={styles.infoText}>{event.ubicacion}</Text>
        </View>
        <View style={styles.event}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {event.titulo}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text>{type}</Text>
            <Text>
              {moment(event.fechaInicio).format('DD MMM YYYY')}
              {' - '}
              {moment(event.fechaFin).format('DD MMM YYYY')}
            </Text>
            <Text>
              {moment(event.horaInicio).format('HH:mm')}
              {' - '}
              {moment(event.horaFin).format('HH:mm')}
            </Text>
          </View>
          <View style={styles.imgContainer}>
            {event.imagen !== '' ? (
              <Image source={{ uri: event.imagen }} style={styles.image} />
            ) : (
              <TouchableOpacity style={styles.image}></TouchableOpacity>
            )}
          </View>
          <Text>{event.descripcion}</Text>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          {event.asistentes && (
            <Text>
              {event.asistentes.length} {t('eventScreen.assistants')}
            </Text>
          )}
          <CustomButton
            onPress={() => {
              dispatch(
                updateSubscribedAction(id, authUser.uid, event.fechaInicio)
              );
            }}
            title={
              isSubscribed
                ? t('eventScreen.unsubscribe')
                : t('eventScreen.subscribe')
            }
          />
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default EventScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Events', 'calendar-outline', Ionicons, () => {});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 285,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  container: {
    top: 85,
    width: '100%',
  },
  backgroundImg: {
    position: 'absolute',
    width: '100%',
    height: 135,
  },
  profileImgContainer: {
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
  title: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoText: {
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#7C7381',
  },
  event: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imgContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
