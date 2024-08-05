// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-f44ba.firebaseapp.com",
  projectId: "mern-state-f44ba",
  storageBucket: "mern-state-f44ba.appspot.com",
  messagingSenderId: "591597024333",
  appId: "1:591597024333:web:9bd53b6118515cf00d1804",
  measurementId: "G-WKWYJVFKLN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
