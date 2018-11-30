import firebase from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyC7lQ1YGJ5VY94_Qnkm2STbsfuJGWMmPJo",
  authDomain: "hanvi-f599c.firebaseapp.com",
  databaseURL: "https://hanvi-f599c.firebaseio.com",
  projectId: "hanvi-f599c",
  storageBucket: "",
  messagingSenderId: "859000050381"
};

export const firebaseBase = firebase.initializeApp(firebaseConfig);
