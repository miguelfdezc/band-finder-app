import React, { useState } from 'react';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { init } from './lang/IMLocalized';
import AppNavigator from './navigation/AppNavigator';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './store/reducers';
import rootSaga from './store/sagas';

const fetchFonts = () => {
  return Font.loadAsync({
    'source-sans-pro': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
  });
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default function App() {
  init();
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
