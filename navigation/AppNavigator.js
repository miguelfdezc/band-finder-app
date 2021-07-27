import React from 'react';
import { useSelector } from 'react-redux';
import { navigationRef, isReadyRef } from './RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { MenuNavigator, AuthNavigator } from './MainNavigator';

const AppNavigator = () => {
  const authUser = useSelector((app) => app.authUser);

  React.useEffect(() => {
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
      {authUser && <MenuNavigator />}
      {!authUser && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
