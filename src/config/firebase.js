// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvc4R8PoI20i-uEGa2F_JxxE5gi4YF4wU",
  authDomain: "fir-crash-course-bb581.firebaseapp.com",
  projectId: "fir-crash-course-bb581",
  storageBucket: "fir-crash-course-bb581.firebasestorage.app",
  messagingSenderId: "103892291951",
  appId: "1:103892291951:web:52b64f663e2ca2f6e8189a",
  measurementId: "G-S7LF8TT2P4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
