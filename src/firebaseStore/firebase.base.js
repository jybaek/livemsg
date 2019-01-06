import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';

export const firebaseBase = firebase.initializeApp(firebaseConfig);
