// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-873af.firebaseapp.com",
  projectId: "blogapp-873af",
  storageBucket: "blogapp-873af.appspot.com",
  messagingSenderId: "76642668432",
  appId: "1:76642668432:web:d79e5f7ba09e895148ad15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

