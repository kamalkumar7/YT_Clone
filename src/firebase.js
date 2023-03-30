// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANKJyT9kGXTYDpGYKvWIJCyaEfUjedTUU",
  authDomain: "ytclone-9dfc3.firebaseapp.com",
  projectId: "ytclone-9dfc3",
  storageBucket: "ytclone-9dfc3.appspot.com",
  messagingSenderId: "552970524920",
  appId: "1:552970524920:web:3cbb7fdd60a0492691430d",
  measurementId: "G-0GXRL389LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;