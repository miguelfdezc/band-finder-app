import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Title from '../components/Title';
import { getUserAction } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const currentUser = useSelector((state) => state.currentUser);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    dispatch(getUserAction(authUser.uid));
  }, []);

  useEffect(() => {
    setIsCurrentUser(currentUser && Object.keys(currentUser).length !== 0);
  }, [currentUser]);

  return (
    <View style={{ margin: 0, backgroundColor: 'white', height: 'auto' }}>
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
              <Text style={styles.infoText}>{currentUser.ubicacion}</Text>
              <Text style={styles.infoText}>
                {currentUser.customClaims.type === 'musicos'
                  ? 'Músico'
                  : 'Negocio'}
              </Text>
              <Text style={styles.infoText}>{currentUser.fans} fans</Text>
            </View>
            <Text style={styles.descripcion}>{currentUser.descripcion}</Text>
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
  /* container: {
    top: '-50px',
    height: 'auto',
  }, */
  backgroundImg: {
    width: '100%',
    height: '135px',
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
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  infoText: {
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#7C7381',
  },
  descripcion: {
    marginHorizontal: 16,
    fontFamily: 'rubik',
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
  },
});
