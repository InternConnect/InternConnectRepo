// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe3TwmcwhAoSqtNT12XBsHFqFkUxnSx0g",
  authDomain: "internconnectdb.firebaseapp.com",
  projectId: "internconnectdb",
  storageBucket: "internconnectdb.appspot.com",
  messagingSenderId: "445282960631",
  appId: "1:445282960631:web:a2cf595a4f345f62933ff2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
});

export const databaseFB = getFirestore(app);

export const usersRef = collection(databaseFB,'users');
