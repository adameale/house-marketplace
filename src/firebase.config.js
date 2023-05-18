
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDYEWeAYyfMgJxflFiINw22RGQTKPT95jQ",
  authDomain: "house-market-places.firebaseapp.com",
  projectId: "house-market-places",
  storageBucket: "house-market-places.appspot.com",
  messagingSenderId: "422237494592",
  appId: "1:422237494592:web:42f4035a976eeb747f6ea5"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
export const db =getFirestore()