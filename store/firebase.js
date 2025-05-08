import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAB6ZuvfYlu2Go6Oa9DWG-d0xdIjMHXnIY",
  authDomain: "k-penchi.firebaseapp.com",
  projectId: "k-penchi",
  storageBucket: "k-penchi.firebasestorage.app",
  messagingSenderId: "369801811382",
  appId: "1:369801811382:web:bf0ba2195662cb4d689d17",
  measurementId: "G-70E3FNRZGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db };
