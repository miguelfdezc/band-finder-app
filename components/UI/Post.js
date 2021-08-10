import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
  Modal,
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {
  deletePostAction,
  updateLikesAction,
  updateSharedAction,
} from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Post = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const [showComments, setShowComments] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    descripcion,
    id,
    imagen,
    likes,
    shared,
    usuario,
    video,
    username,
    userImg,
    comentarios,
  } = data.item;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
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
                  navigation.navigate('EditPost', { id });
                }}
              >
                <Ionicons name='build' size={24} color='#ffc107' />
                <Text style={{ color: '#ffc107' }}>Editar</Text>
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
                onPress={() => dispatch(deletePostAction(id, authUser.uid))}
              >
                <Ionicons name='trash' size={24} color='red' />
                <Text style={{ color: 'red' }}>Eliminar</Text>
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
                <Text style={{ color: 'black' }}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: userImg }} style={styles.profileImg} />
          <Text>{username}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name='ellipsis-vertical' size={20} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      {!!imagen ? (
        <Image source={{ uri: imagen }} style={styles.backgroundImg} />
      ) : (
        !!video && (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: video,
            }}
            // shouldPlay
            useNativeControls
            resizeMode='cover'
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )
      )}
      <View style={styles.iconBar}>
        <TouchableOpacity
          style={styles.iconGroup}
          onPress={() => dispatch(updateLikesAction(authUser.uid, id))}
        >
          {likes.includes(authUser.uid) ? (
            <Ionicons name='heart' size={24} color='red' />
          ) : (
            <Ionicons name='heart-outline' size={24} color='black' />
          )}
          <Text>{likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconGroup}
          onPress={() => {
            dispatch(updateSharedAction(id));
            onShare();
          }}
        >
          <Ionicons name='share-social-outline' size={24} color='black' />
          <Text>{shared}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconGroup}
          onPress={() => setShowComments(!showComments)}
        >
          <Ionicons name='chatbox-outline' size={24} color='black' />
          <Text>{comentarios.length}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.descripcion}>{descripcion}</Text>
      {!!comentarios && comentarios.length > 0 && (
        <View style={{ paddingVertical: 10 }}>
          <FlatList
            data={showComments ? comentarios : [comentarios[0]]}
            renderItem={({ item }) => (
              <View
                style={{
                  height: 'auto',
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text>{item.username}</Text>
                <Text
                  style={{ color: Colors.grey, width: 300 }}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                >
                  {item.texto}
                </Text>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 15,
    textAlign: 'center',
  },
  container: {
    // height: 400,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  backgroundImg: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  video: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    marginRight: 10,
  },
  iconBar: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 16,
    marginTop: 6,
    width: '30%',
  },
  descripcion: {
    width: '100%',
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: 'justify',
  },
  iconGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 30,
  },
});

export default Post;
