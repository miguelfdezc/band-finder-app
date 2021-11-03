import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { t } from '../../lang/IMLocalized';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const Band = ({ data, allGenres, allInstruments }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { id, nombre, imagenPerfil, generos, instrumentos, nivel, distancia } =
    data.item;

  return (
    <View style={styles.container}>
      {imagenPerfil !== '' ? (
        <Image source={{ uri: imagenPerfil }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.image}></TouchableOpacity>
      )}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{nombre}</Text>
          <TouchableOpacity
            onPress={() => {
              // console.log('ID:', id);
              // Send band request
            }}
          >
            <Feather name='send' size={22} color='black' />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{parseFloat(distancia.toFixed(2))} km</Text>
          <Text style={styles.description}>Nivel: {nivel}</Text>
        </View>
        {isLoaded && (
          <>
            <View
              style={{
                flexDirection: 'row',
                width: 250,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={generos}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={{
                        borderColor: '#F0E5F1',
                        borderRadius: 50,
                        backgroundColor: '#F5F4F6',
                        paddingHorizontal: 2,
                        minWidth: 50,
                        fontSize: 14,
                        height: 24,
                        textAlign: 'center',
                        lineHeight: 24,
                        marginRight: 10,
                      }}
                    >
                      {allGenres.find((value) => value.key === item).title}
                    </Text>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: 250,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 5,
              }}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={instrumentos}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={{
                        borderColor: '#F0E5F1',
                        borderRadius: 50,
                        backgroundColor: '#F5F4F6',
                        paddingHorizontal: 2,
                        minWidth: 50,
                        fontSize: 14,
                        height: 24,
                        textAlign: 'center',
                        lineHeight: 24,
                        marginRight: 10,
                      }}
                    >
                      {allInstruments.find((value) => value.key === item).title}
                    </Text>
                  </View>
                )}
              />
            </View>
          </>
        )}
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

export default Band;
