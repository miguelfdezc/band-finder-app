import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { navigationRef, isReadyRef } from './RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { MenuNavigator, AuthNavigator } from './MainNavigator';

const AppNavigator = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const isAuthUser = !!authUser && Object.keys(authUser).length !== 0;

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      {isAuthUser && <MenuNavigator />}
      {!isAuthUser && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
