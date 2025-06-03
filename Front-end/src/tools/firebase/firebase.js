// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const APIKEY = process.env.REACT_APP_FIREBASE_APIKEY;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "apptiq-67e11.firebaseapp.com",
  projectId: "apptiq-67e11",
  storageBucket: "apptiq-67e11.firebasestorage.app",
  messagingSenderId: "1048030593510",
  appId: "1:1048030593510:web:997d7796ede842540bd627",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
