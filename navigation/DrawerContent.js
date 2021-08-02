import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../lang/IMLocalized';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/actions';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View
        style={styles.drawerSection}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <DrawerItemList {...props} />
        <DrawerItem
          label={t('menuOptions.signOut')}
          icon={() => (
            <Ionicons name='exit-outline' size={24} color='#1B141F' />
          )}
          onPress={() => dispatch(logoutAction())}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#E5FDFF',
  },
  drawerSection: {
    marginTop: 15,
  },
  /* buttonText: {
    fontFamily: 'rubik',
    fontSize: 22,
  }, */
});
