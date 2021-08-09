import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
// import admin from "firebase-admin"
const config = {
  apiKey: "AIzaSyBh_424FQePP4UDi9LkDjlY8yh-JaUxSPw",
  authDomain: "smartntcxidb.firebaseapp.com",
  databaseURL: "https://smartntcxidb-default-rtdb.firebaseio.com",
  projectId: "smartntcxidb",
  storageBucket: "smartntcxidb.appspot.com",
  messagingSenderId: "217207738118",
  appId: "1:217207738118:web:c82b1a19ca6b022206d887",
  measurementId: "G-NJF30XXD3R"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''

export const database = firebase.database()
// export const storage = firebase.storage()
// export const db = admin.firestore();
