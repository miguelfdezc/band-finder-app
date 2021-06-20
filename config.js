import firebase from 'firebase';
import 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = Constants.manifest.extra;

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();

export { auth };
