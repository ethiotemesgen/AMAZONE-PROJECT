// firebase.js (or firebaseConfig.js) - Updated to Firebase v9+ modular syntax

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBxRc6Ur9McihwsloamH0caKYN1Wm_gRhI",
  authDomain: "e-project-19e98.firebaseapp.com",
  projectId: "e-project-19e98",
  storageBucket: "e-project-19e98.appspot.com",
  messagingSenderId: "496296314896",
  appId: "1:496296314896:web:3c8b253db654fad5aae295",
  measurementId: "G-89T0H9Z09M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Analytics (only if you really use it)
// const analytics = getAnalytics(app);

export default app;
