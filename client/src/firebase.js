
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// dotenv.config();
const firebaseConfig = {
  apiKey: "AIzaSyANKJyT9kGXTYDpGYKvWIJCyaEfUjedTUU",
  authDomain: "ytclone-9dfc3.firebaseapp.com",
  projectId: "ytclone-9dfc3",
  storageBucket: "ytclone-9dfc3.appspot.com",
  messagingSenderId: "552970524920",
  appId: "1:552970524920:web:3cbb7fdd60a0492691430d",
  measurementId: "G-0GXRL389LH"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;