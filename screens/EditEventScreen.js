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
  Platform,
  LogBox,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import CustomButton from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { storage } from '../config';
import moment from 'moment';
import { getEventAction, updateEventAction } from '../store/actions';
import { useForm, Controller } from 'react-hook-form';

LogBox.ignoreLogs(['Setting a timer']);

const EditEventScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const editEvent = useSelector((state) => state.event.evento);
  const [event, setEvent] = useState({
    titulo: '',
    tipo: 'puntual',
    imagen: '',
    ubicacion: '',
    descripcion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    horaInicio: new Date(),
    horaFin: new Date(),
  });
  const [showInitDate, setShowInitDate] = useState(false);
  const [showInitHour, setShowInitHour] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showEndHour, setShowEndHour] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      titulo: editEvent.titulo,
      ubicacion: editEvent.ubicacion,
      descripcion: editEvent.descripcion,
    },
  });

  const onSubmit = (data) => {
    const { titulo, ubicacion, descripcion } = data;
    dispatch(
      updateEventAction(event.id, { ...event, titulo, ubicacion, descripcion })
    );
  };

  const registerOptions = {
    titulo: {
      required: 'Título es obligatorio',
      maxLength: {
        value: 30,
        message: 'Título debe tener como máximo 30 caracteres',
      },
    },
    ubicacion: {
      required: 'Ubicación es obligatorio',
      maxLength: {
        value: 50,
        message: 'Ubicación debe tener como máximo 50 caracteres',
      },
    },
    descripcion: {
      maxLength: {
        value: 150,
        message: 'Descripción debe tener como máximo 150 caracteres',
      },
    },
  };

  useEffect(() => {
    dispatch(getEventAction(id));
  }, []);

  useEffect(() => {
    setEvent({
      id: editEvent.id,
      usuario: authUser.uid,
      titulo: editEvent.titulo,
      tipo: editEvent.tipo,
      imagen: editEvent.imagen,
      ubicacion: editEvent.ubicacion,
      descripcion: editEvent.descripcion,
      fechaInicio: new Date(editEvent.fechaInicio),
      fechaFin: new Date(editEvent.fechaFin),
      horaInicio: new Date(editEvent.horaInicio),
      horaFin: new Date(editEvent.horaFin),
    });
  }, [editEvent]);

  useEffect(() => {
    if (event.titulo) {
      setValue('titulo', event.titulo);
    }
    if (event.ubicacion) {
      setValue('ubicacion', event.ubicacion);
    }
    if (event.descripcion) {
      setValue('descripcion', event.descripcion);
    }
  }, [event]);

  const uploadFile = async () => {
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

    const ref = storage.ref().child(`${currentUser.uid}/events/${Date.now()}`);

    const snapshot = await ref.put(blob, {
      contentType: 'image/png',
    });

    const remoteURL = await snapshot.ref.getDownloadURL();

    setEvent({ ...event, imagen: remoteURL });

    return remoteURL;
  };

  return (
    <ScrollView style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      <View style={styles.title}>
        <Title>{t('editEventScreen.title')}</Title>
      </View>
      <View style={styles.profileImgContainer}>
        {event.imagen !== '' && (
          <Image source={{ uri: event.imagen }} style={styles.profileImg} />
        )}
        <TouchableOpacity
          style={styles.changeImage}
          onPress={() => uploadFile('imagen')}
        >
          <Ionicons
            name='camera-outline'
            size={50}
            color='#1B141F'
            style={styles.cameraIcon}
          />
          <Text style={styles.blueText}>{t('globals.uploadImage')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text>Tipo</Text>
          <Picker
            selectedValue={event.tipo}
            onValueChange={(text) => setEvent({ ...event, tipo: text })}
            style={styles.input}
          >
            <Picker.Item label='Puntual' value='puntual' />
            <Picker.Item label='Diario' value='diario' />
            <Picker.Item label='Semanal' value='semanal' />
            <Picker.Item label='Mensual' value='mensual' />
          </Picker>
        </View>
        <View>
          <Text>{t('createEventScreen.titleTitle')}</Text>
          <Controller
            control={control}
            rules={registerOptions.titulo}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('createEventScreen.titleExample')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='titulo'
          />
          {errors.titulo && (
            <Text style={{ color: 'red' }}>{errors.titulo.message}</Text>
          )}
        </View>
        <View>
          <Text>{t('createEventScreen.locationTitle')}</Text>
          <Controller
            control={control}
            rules={registerOptions.ubicacion}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={t('createEventScreen.locationExample')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='ubicacion'
          />
          {errors.ubicacion && (
            <Text style={{ color: 'red' }}>{errors.ubicacion.message}</Text>
          )}
        </View>
        <View>
          <Text style={{ marginLeft: 10 }}>
            {t('createEventScreen.initDateTime')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={styles.dateTime}
              onPress={() => setShowInitDate(true)}
            >
              <Text>{moment(event.fechaInicio).format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateTime}
              onPress={() => setShowInitHour(true)}
            >
              <Text>{moment(event.horaInicio).format('HH:mm')}</Text>
            </TouchableOpacity>
          </View>
          {showInitDate && (
            <DateTimePicker
              value={event.fechaInicio}
              mode='date'
              is24Hour={true}
              display='default'
              onChange={(_, value) => {
                if (value) {
                  setEvent({ ...event, fechaInicio: value });
                  if (Platform.OS === 'android') setShowInitDate(false);
                }
              }}
            />
          )}
          {showInitHour && (
            <DateTimePicker
              value={event.horaInicio}
              mode='time'
              is24Hour={true}
              display='default'
              onChange={(_, value) => {
                if (value) {
                  setEvent({ ...event, horaInicio: value });
                  if (Platform.OS === 'android') setShowInitHour(false);
                }
              }}
            />
          )}
        </View>
        <View>
          <Text style={{ marginLeft: 10 }}>
            {t('createEventScreen.endDateTime')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={styles.dateTime}
              onPress={() => setShowEndDate(true)}
            >
              <Text>{moment(event.fechaFin).format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateTime}
              onPress={() => setShowEndHour(true)}
            >
              <Text>{moment(event.horaFin).format('HH:mm')}</Text>
            </TouchableOpacity>
          </View>
          {showEndDate && (
            <DateTimePicker
              value={event.fechaFin}
              mode='date'
              is24Hour={true}
              display='default'
              onChange={(_, value) => {
                if (value) {
                  setEvent({ ...event, fechaFin: value });
                  if (Platform.OS === 'android') setShowEndDate(false);
                }
              }}
            />
          )}
          {showEndHour && (
            <DateTimePicker
              value={event.horaFin}
              mode='time'
              is24Hour={true}
              display='default'
              onChange={(_, value) => {
                if (value) {
                  setEvent({ ...event, horaFin: value });
                  if (Platform.OS === 'android') setShowEndHour(false);
                }
              }}
            />
          )}
        </View>
        <View>
          <Text>{t('createEventScreen.descriptionTitle')}</Text>
          <Controller
            control={control}
            rules={registerOptions.descripcion}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                placeholder={t('createEventScreen.descriptionExample')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='descripcion'
          />
          {errors.descripcion && (
            <Text style={{ color: 'red' }}>{errors.descripcion.message}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.blueText}>{t('globals.cancelBtn')}</Text>
        </TouchableOpacity>
        <CustomButton onPress={handleSubmit(onSubmit)} title='Guardar' />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default EditEventScreen;

export const screenOptions = (navData) =>
  NavBar(navData, false, 'Events', 'calendar-outline', Ionicons, () => {});

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
