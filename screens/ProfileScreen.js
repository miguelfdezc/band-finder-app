import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Title from '../components/Title';
import { getPostsUserAction, getUserAction } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import Post from '../components/UI/Post';

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const posts = useSelector((state) => state.post.publicaciones);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserAction(authUser.uid));
      dispatch(getPostsUserAction(authUser.uid));
    }
  }, [props, isFocused]);

  useEffect(() => {
    setIsCurrentUser(currentUser && Object.keys(currentUser).length !== 0);
  }, [currentUser]);

  return (
    <View style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      {isCurrentUser && (
        <>
          {!!currentUser.imagenFondo && (
            <Image
              source={{ uri: currentUser.imagenFondo }}
              style={styles.backgroundImg}
            />
          )}
          <View style={styles.container}>
            <View style={styles.profileImgContainer}>
              {!!currentUser.photoURL && (
                <Image
                  source={{ uri: currentUser.photoURL }}
                  style={styles.profileImg}
                />
              )}
            </View>
            <View style={styles.title}>
              <Title>{currentUser.usuario}</Title>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>
                {currentUser.ubicacion.length > 0
                  ? currentUser.ubicacion
                  : 'Ciudad, País'}
              </Text>
              <Text style={styles.infoText}>
                {currentUser.customClaims.type === 'musicos'
                  ? 'Músic@'
                  : 'Negocio'}
              </Text>
              {currentUser.customClaims.type === 'musicos' && (
                <Text style={styles.infoText}>
                  {currentUser.fans ?? 0} fans
                </Text>
              )}
            </View>
            <Text style={styles.descripcion}>
              {currentUser.descripcion.length > 0
                ? currentUser.descripcion
                : 'Texto de descripción...'}
            </Text>
            <View style={styles.profileOptions}>
              <View style={styles.selectedOption}>
                <Text>
                  {currentUser.customClaims.type === 'musicos'
                    ? 'Mis publicaciones'
                    : 'Mis eventos'}
                </Text>
              </View>
              <View>
                <Text>Me gusta</Text>
              </View>
              <View>
                <Text>Listas</Text>
              </View>
            </View>
            <View>
              <FlatList
                data={posts}
                renderItem={(item) => <Post data={item} />}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Edit', 'pencil', SimpleLineIcons, () => {
    navData.navigation.navigate('EditProfile');
  });

const styles = StyleSheet.create({
  container: {
    top: 85,
    width: '100%',
  },
  profileOptions: {
    flex: 1,
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  selectedOption: {
    height: 25,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: Colors.blue,
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
    marginTop: 15,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  infoText: {
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#7C7381',
  },
  descripcion: {
    marginHorizontal: 16,
    marginVertical: 20,
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
  },
});
