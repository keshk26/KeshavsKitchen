import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyANJIJXbOBAouNjj6kKeq5LvGws9McQLlU',
  authDomain: 'keshavskitchen-6ab64.firebaseapp.com',
  databaseURL: 'https://keshavskitchen-6ab64.firebaseio.com',
  projectId: 'keshavskitchen-6ab64',
  storageBucket: 'keshavskitchen-6ab64.appspot.com',
  appId: '1:493242086959:ios:570d5414720d09a3a5f8da',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
