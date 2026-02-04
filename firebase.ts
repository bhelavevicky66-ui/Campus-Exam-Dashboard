import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDo2uZgNuGbNMLmAA0AL2cQfOpcVSMEzHw",
    authDomain: "navgurukul-test-dashboard.firebaseapp.com",
    databaseURL: "https://navgurukul-test-dashboard-default-rtdb.firebaseio.com",
    projectId: "navgurukul-test-dashboard",
    storageBucket: "navgurukul-test-dashboard.firebasestorage.app",
    messagingSenderId: "533182279212",
    appId: "1:533182279212:web:7ee32015b895ef8f9c2b89",
    measurementId: "G-XNEH6679VE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
