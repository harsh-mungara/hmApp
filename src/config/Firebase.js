import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCsmj044eB09Eki1UdzjUcnWSPUt9wtAhQ',
  authDomain: 'harshdemo-e8691.firebaseapp.com',
  projectId: 'harshdemo-e8691',
  storageBucket: 'harshdemo-e8691.appspot.com',
  messagingSenderId: '498828534271',
  appId: '1:498828534271:web:ed5c6bf922912775a407ca',
  measurementId: 'G-87D15GFCQC',
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const setting = firebase
  .firestore()
  .settings({experimentalForceLongPolling: true});
