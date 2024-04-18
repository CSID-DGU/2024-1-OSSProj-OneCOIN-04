// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKgoL1HLE3n3ipjT0YkqrkqPrY1-lz4mw",
  authDomain: "minsimcatch.firebaseapp.com",
  projectId: "minsimcatch",
  storageBucket: "minsimcatch.appspot.com",
  messagingSenderId: "1091165635053",
  appId: "1:1091165635053:web:8e8d268bdab50b47e5e7e4",
  measurementId: "G-FCGWYJFR58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 인증 서비스 초기화
export const auth = getAuth(app);

// Firebase Firestore 데이터베이스 서비스 초기화
export const firestore = getFirestore(app);