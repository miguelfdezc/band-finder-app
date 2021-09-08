import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { t } from '../lang/IMLocalized';
import Title from '../components/Title';
import { getEventsAction } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import Event from '../components/UI/Event';

const EventsScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authUser = useSelector((state) => state.auth.authUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const events = useSelector((state) => state.event.eventos);

  useEffect(() => {
    if (isFocused) {
      dispatch(getEventsAction());
    }
  }, [props, isFocused]);

  return (
    <View style={{ margin: 0, backgroundColor: 'white', height: '100%' }}>
      <Title style={styles.title}>{t('eventsScreen.title')}</Title>
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={events}
          renderItem={(item) => <Event data={item} />}
        />
      </View>
    </View>
  );
};

export default EventsScreen;

export const screenOptions = (navData) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return currentUser.customClaims.type === 'negocios'
    ? NavBar(navData, true, 'Add', 'add', Ionicons, () => {
        navData.navigation.navigate('CreateEvent');
      })
    : NavBar(navData, true, 'Events', 'calendar-outline', Ionicons, () => {});
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingVertical: 30,
  },
});
