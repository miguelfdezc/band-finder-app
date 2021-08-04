import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Title from '../components/Title';
import { getUserAction } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleLineIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.authUser);
  const currentUser = useSelector((state) => state.currentUser);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserAction(authUser.uid));
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
              <Text style={styles.infoText}>{currentUser.ubicacion}</Text>
              <Text style={styles.infoText}>
                {currentUser.customClaims.type === 'musicos'
                  ? 'Músico'
                  : 'Negocio'}
              </Text>
              <Text style={styles.infoText}>{currentUser.fans} fans</Text>
            </View>
            <Text style={styles.descripcion}>{currentUser.descripcion}</Text>
            <View style={styles.profileOptions}>
              <View style={styles.selectedOption}>
                <Text>Mis publicaciones</Text>
              </View>
              <Text>Me gusta</Text>
              <Text>Listas</Text>
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
    position: 'absolute',
    top: 85,
    width: '100%',
  },
  profileOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 30,
    paddingHorizontal: 16,
  },
  selectedOption: {
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: Colors.blue,
  },
  backgroundImg: {
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
