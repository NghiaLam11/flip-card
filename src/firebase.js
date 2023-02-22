import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBL2LUzkONFLyAYE8R_9n9OFWMVndvwR5A",
    authDomain: "flip-card-906d6.firebaseapp.com",
    projectId: "flip-card-906d6",
    storageBucket: "flip-card-906d6.appspot.com",
    messagingSenderId: "930331483468",
    appId: "1:930331483468:web:1e86a7006f26a83c6843e9",
    measurementId: "G-PB9P2CXSK4"
  };

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();

export {db}