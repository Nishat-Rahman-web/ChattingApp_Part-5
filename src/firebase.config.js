// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Hb0dQqp2UgXWBcEfAVmMOD_tvqpKKrM",
  authDomain: "chattingapp-9a4d5.firebaseapp.com",
  projectId: "chattingapp-9a4d5",
  storageBucket: "chattingapp-9a4d5.appspot.com",
  messagingSenderId: "834640966501",
  appId: "1:834640966501:web:c70de128b3a8718120678c",
  measurementId: "G-9E7H4S3P0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app