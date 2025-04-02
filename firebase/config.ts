/* eslint-disable import/named */
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from '@firebase/firestore';
import { Platform } from 'react-native';

// Firebase config
const firebaseConfig: FirebaseOptions = {
  apiKey: Platform.select({
    ios: process.env.EXPO_PUBLIC_FIREBASE_IOS_API_KEY,
    android: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY
  }),
  authDomain: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: Platform.select({
    ios: process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID,
    android: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID
  })
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db: Firestore = getFirestore(app);

export { db };
