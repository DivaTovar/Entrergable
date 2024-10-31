import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFWjR_Bsng6qVP0DzejvlS7Rtim7KkW0k",
  authDomain: "naruto-app-782c2.firebaseapp.com",
  projectId: "naruto-app-782c2",
  storageBucket: "naruto-app-782c2.appspot.com",
  messagingSenderId: "380859310064",
  appId: "1:380859310064:web:1bb2df63bbc6c6f7098735",
  measurementId: "G-H80KFLWDPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);