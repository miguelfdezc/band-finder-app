import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { MenuNavigator, AuthNavigator } from './MainNavigator';

const AppNavigator = () => {
  const authUser = useSelector((app) => app.authUser);

  return (
    <NavigationContainer>
      {authUser && <MenuNavigator />}
      {!authUser && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
