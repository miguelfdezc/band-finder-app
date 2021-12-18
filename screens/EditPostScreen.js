import React, { useState, useEffect, useRef } from 'react';
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
import { Video } from 'expo-av';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import CustomButton from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config';
import { useForm, Controller } from 'react-hook-form';

import { LogBox } from 'react-native';
import { editPostAction, getPostAction } from '../store/actions';

LogBox.ignoreLogs(['Setting a timer']);

const EditPostScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const editPost = useSelector((state) => state.post.publicacion);
  const [post, setPost] = useState({
    usuario: '',
    imagen: '',
    video: '',
    descripcion: '',
  });

  useEffect(() => {
    dispatch(getPostAction(id));
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      descripcion: editPost.descripcion,
    },
  });

  const onSubmit = (data) => {
    const { descripcion } = data;
    dispatch(editPostAction(id, { ...post, descripcion }));
  };

  const registerOptions = {
    descripcion: {
      maxLength: {
        value: 150,
        message: 'Descripción debe tener como máximo 150 caracteres',
      },
    },
  };

  useEffect(() => {
    setPost({
      usuario: editPost.usuario,
      imagen: editPost.imagen,
      video: editPost.video,
      descripcion: editPost.descripcion,
    });
  }, [editPost]);

  useEffect(() => {
    if (post.descripcion) setValue('descripcion', post.descripcion);
  }, [post]);

  const uploadFile = async (tipo) => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: tipo === 'video' ? 'Videos' : 'Images',
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

    const ref = storage.ref().child(`${currentUser.uid}/posts/${Date.now()}`);

    const snapshot = await ref.put(blob, {
      contentType: tipo === 'imagen' ? 'image/png' : 'video/mp4',
    });

    const remoteURL = await snapshot.ref.getDownloadURL();

    if (tipo === 'imagen') setPost({ ...post, imagen: remoteURL });
    else if (tipo === 'video') setPost({ ...post, video: remoteURL });

    return remoteURL;
  };

  return (
    <ScrollView style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      <View style={styles.title}>
        <Title>{t('editPostScreen.title')}</Title>
      </View>
      {post.video.length === 0 && (
        <View style={styles.profileImgContainer}>
          {post.imagen.length > 0 && (
            <Image source={{ uri: post.imagen }} style={styles.profileImg} />
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
      )}
      {post.imagen.length === 0 && (
        <View style={styles.profileImgContainer}>
          <TouchableOpacity
            style={styles.changeImage}
            onPress={() => uploadFile('video')}
          >
            <Ionicons
              name='videocam-outline'
              size={50}
              color='#1B141F'
              style={styles.cameraIcon}
            />
            <Text style={styles.blueText}>{t('globals.uploadVideo')}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputContainer}>
        {!!post.video && (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: post.video,
            }}
            useNativeControls
            resizeMode='cover'
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
        <View>
          <Text>{t('editPostScreen.descriptionTitle')}</Text>
          <Controller
            control={control}
            rules={registerOptions.descripcion}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                placeholder={t('createPostScreen.descriptionExample')}
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
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title={t('globals.saveBtn')}
        />
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default EditPostScreen;

export const screenOptions = (navData) =>
  NavBar(navData, false, 'User', 'person-outline', Ionicons, () => {});

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    marginHorizontal: 16,
    borderRadius: 8,
  },
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
