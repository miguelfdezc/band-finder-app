import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={props.IconComponent ?? Ionicons}
      iconSize={24}
      color='black'
    />
  );
};

const NavBar = (
  navData,
  toggleDrawer = false,
  title,
  iconName,
  IconComponent,
  onPress
) => {
  let nav = {
    headerTitle: 'Band Finder',
    headerTitleStyle: styles.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title={title}
          IconComponent={IconComponent}
          iconName={iconName}
          onPress={onPress}
        />
      </HeaderButtons>
    ),
  };
  if (toggleDrawer) {
    nav = {
      ...nav,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
  }
  return nav;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'source-sans-pro',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: '#000000',
  },
});

export default NavBar;
