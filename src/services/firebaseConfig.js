import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  browserLocalPersistence 
} from 'firebase/auth';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWFchQQczXKMisUZfamJ1W4vDxWrZGl_M",
  authDomain: "mobile1-a14e4.firebaseapp.com",
  projectId: "mobile1-a14e4",
  storageBucket: "mobile1-a14e4.firebasestorage.app",
  messagingSenderId: "297850741287",
  appId: "1:297850741287:web:af8887e73d1a265732e402",
  measurementId: "G-DK4P8630PS"
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
} else {
  const { getReactNativePersistence } = require('firebase/auth');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { app, auth };
