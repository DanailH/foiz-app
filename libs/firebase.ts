import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
