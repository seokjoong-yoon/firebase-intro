import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDCUQylXykfiO4zAFSd8oo49w_dA-iuANw",
    authDomain: "fir-intro-e2910.firebaseapp.com",
    projectId: "fir-intro-e2910",
    storageBucket: "fir-intro-e2910.appspot.com",
    messagingSenderId: "767437487731",
    appId: "1:767437487731:web:01d0a023478737435a7406"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();