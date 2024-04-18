import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';  // 필요한 import 추가

const firebaseConfig = {
  apiKey: "AIzaSyCKgoL1HLE3n3ipjT0YkqrkqPrY1-lz4mw",
  authDomain: "minsimcatch.firebaseapp.com",
  projectId: "minsimcatch",
  storageBucket: "minsimcatch.appspot.com",
  messagingSenderId: "1091165635053",
  appId: "1:1091165635053:web:8e8d268bdab50b47e5e7e4",
  measurementId: "G-FCGWYJFR58",
  databaseURL: "https://minsimcatch-default-rtdb.asia-southeast1.firebasedatabase.app/"  // 데이터베이스 URL 추가
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 인증 서비스 초기화
export const auth = getAuth(app);

// Firebase Realtime Database 서비스 초기화
export const database = getDatabase(app);  // 데이터베이스 인스턴스 추가
