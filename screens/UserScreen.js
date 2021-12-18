import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import {
  getEventsUserAction,
  getPostsUserAction,
  getUserAction,
} from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import Post from '../components/UI/Post';
import Event from '../components/UI/Event';

const UserScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const posts = useSelector((state) => state.post.publicaciones);
  const events = useSelector((state) => state.event.eventosUsuario);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (isFocused) dispatch(getUserAction(id));
  }, [isFocused]);

  useEffect(() => {
    setIsCurrentUser(currentUser && Object.keys(currentUser).length !== 0);
    if (currentUser && Object.keys(currentUser).length !== 0) {
      dispatch(
        currentUser.customClaims.type === 'musicos'
          ? getPostsUserAction(id)
          : getEventsUserAction(id, id)
      );
    }
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
                  : t('profileScreen.locationExample')}
              </Text>
              <Text style={styles.infoText}>
                {currentUser.customClaims.type === 'musicos'
                  ? t('profileScreen.musician')
                  : t('profileScreen.business')}
              </Text>
              {currentUser.customClaims.type === 'musicos' && (
                <Text style={styles.infoText}>
                  {currentUser.fans.length ?? 0} {t('profileScreen.followers')}
                </Text>
              )}
            </View>
            <Text style={styles.descripcion}>
              {currentUser.descripcion.length > 0
                ? currentUser.descripcion
                : t('profileScreen.descriptionExample')}
            </Text>
            <View style={styles.profileOptions}>
              <View style={styles.selectedOption}>
                <Text>
                  {currentUser.customClaims.type === 'musicos'
                    ? t('profileScreen.posts')
                    : t('profileScreen.events')}
                </Text>
              </View>
              <View>
                <Text>{t('profileScreen.liked')}</Text>
              </View>
              <View>
                <Text>{t('profileScreen.lists')}</Text>
              </View>
            </View>
            <View>
              <FlatList
                data={
                  currentUser.customClaims.type === 'musicos' ? posts : events
                }
                renderItem={(item) =>
                  currentUser.customClaims.type === 'musicos' ? (
                    <Post data={item} />
                  ) : (
                    <Event data={item} />
                  )
                }
                contentContainerStyle={{ paddingBottom: 620 }}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default UserScreen;

export const screenOptions = (navData) =>
  NavBar(navData, true, 'Follow', `person-outline`, Ionicons, () => {});
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
