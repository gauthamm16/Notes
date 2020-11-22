import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD521S2eiJJIeoKm5r5GyTaen7eUHrjRlI",
    authDomain: "evernote-clone-8d7bf.firebaseapp.com",
    databaseURL: "https://evernote-clone-8d7bf.firebaseio.com",
    projectId: "evernote-clone-8d7bf",
    storageBucket: "evernote-clone-8d7bf.appspot.com",
    messagingSenderId: "346079214609",
    appId: "1:346079214609:web:1a5d158e19ad26080145b0",
    measurementId: "G-2BNMYNXSXQ"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

export default db;
