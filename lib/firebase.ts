import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnrq953NLJcn-lobdkr3Or7dip9rychFU",
  authDomain: "next-firebase-ecd19.firebaseapp.com",
  databaseURL: "https://next-firebase-ecd19-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "next-firebase-ecd19",
  storageBucket: "next-firebase-ecd19.appspot.com",
  messagingSenderId: "24564814376",
  appId: "1:24564814376:web:48c323a4e2877bb4631b1d"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
