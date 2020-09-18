import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAKf-gaKUGBOl-hvJf9J7-WSnp9XqjUpXI",
    authDomain: "todo-react-firebase-93586.firebaseapp.com",
    databaseURL: "https://todo-react-firebase-93586.firebaseio.com",
    projectId: "todo-react-firebase-93586",
    storageBucket: "todo-react-firebase-93586.appspot.com",
    messagingSenderId: "213669082335",
    appId: "1:213669082335:web:224ff48a4fc2bfb19a256a",
    measurementId: "G-MTYXJL5X33"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();

export default db;