import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction, updateFansAction } from '../../store/actions';

const Musician = ({ data, navigation }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [fans, setFans] = useState([]);

  let {
    actuaciones,
    descripcion,
    imagenFondo,
    objectID,
    ubicacion,
    usuario,
    valoracion,
  } = data;

  useEffect(() => {
    setFans(data.fans);
    dispatch(getUserAction(objectID));
  }, []);

  return (
    <View style={styles.container}>
      {imagenFondo !== '' ? (
        <Image source={{ uri: currentUser.photoURL }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.image}></TouchableOpacity>
      )}
      <View style={styles.info}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('User', {
                id: objectID,
              });
            }}
          >
            <Text style={styles.title}>{usuario}</Text>
          </TouchableOpacity>
          {typeof fans !== 'undefined' && Array.isArray(fans) && (
            <TouchableOpacity
              onPress={() => {
                setFans(
                  fans.includes(authUser.uid)
                    ? [...fans.filter((f) => f !== authUser.uid)]
                    : [...fans, authUser.uid]
                );
                dispatch(
                  updateFansAction(authUser.uid, {
                    usuario: objectID,
                  })
                );
              }}
            >
              <Ionicons
                name={`person-${
                  fans.includes(authUser.uid) ? 'remove' : 'add'
                }-outline`}
                size={22}
                color='black'
              />
            </TouchableOpacity>
          )}
        </View>
        <Text>Actuaciones: {actuaciones}</Text>
        <Text>Fans: {fans.length ?? 0}</Text>
        <Text>Valoración: {valoracion}</Text>
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

export default Musician;
