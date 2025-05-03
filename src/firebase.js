// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChDcglgGui-7Ij6mGrm3blsP6UMbjDW0M",
  authDomain: "fixmyhoo.firebaseapp.com",
  projectId: "fixmyhoo",
  storageBucket: "fixmyhoo.firebasestorage.app",
  messagingSenderId: "404079571498",
  appId: "1:404079571498:web:75735a06b16c03f83a4953",
  measurementId: "G-F0MKY37SRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };