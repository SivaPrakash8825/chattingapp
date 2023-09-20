import { doc, setDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJMShZ_63JZq44S6NI5qSlITKCpc_1x08",
  authDomain: "chatting-f443f.firebaseapp.com",
  projectId: "chatting-f443f",
  storageBucket: "chatting-f443f.appspot.com",
  messagingSenderId: "169604633164",
  appId: "1:169604633164:web:8032f7df7a4e1caeae9ae9",
  measurementId: "G-JZ789R09Q1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const GetFirebase = getFirestore(app);
export const GetAuth = getAuth(app);
