import firebase from 'firebase/app'
// import 'firebase/auth'
import 'firebase/database'
// import 'firebase/storage'
// import admin from "firebase-admin"
const config = {
  apiKey: "AIzaSyDJtVO8ax8BPPhE9CFONsn5lX84eD35hCU",
  authDomain: "smartamateurdb.firebaseapp.com",
  databaseURL: "https://smartamateurdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartamateurdb",
  storageBucket: "smartamateurdb.appspot.com",
  messagingSenderId: "683123563041",
  appId: "1:683123563041:web:5225ed8bfb13898e666160",
  measurementId: "G-9WK9QYSEKV"
}

if (!firebase.apps.length) firebase.initializeApp(config);

export const database = firebase.database()
// export const storage = firebase.storage()
// export const db = admin.firestore();
