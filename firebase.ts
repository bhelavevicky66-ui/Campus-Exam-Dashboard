import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Admin management functions
const ADMINS_DOC = 'config/admins';

// Get list of admin emails from Firestore
export const getAdminEmails = async (): Promise<string[]> => {
    try {
        const docRef = doc(db, ADMINS_DOC);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().emails || [];
        }
        return [];
    } catch (error) {
        console.error('Error getting admin emails:', error);
        return [];
    }
};

// Add an admin email to Firestore
export const addAdminEmail = async (email: string): Promise<boolean> => {
    try {
        const docRef = doc(db, ADMINS_DOC);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                emails: arrayUnion(email.toLowerCase())
            });
        } else {
            await setDoc(docRef, {
                emails: [email.toLowerCase()]
            });
        }
        return true;
    } catch (error) {
        console.error('Error adding admin email:', error);
        return false;
    }
};

// Remove an admin email from Firestore
export const removeAdminEmail = async (email: string): Promise<boolean> => {
    try {
        const docRef = doc(db, ADMINS_DOC);
        await updateDoc(docRef, {
            emails: arrayRemove(email.toLowerCase())
        });
        return true;
    } catch (error) {
        console.error('Error removing admin email:', error);
        return false;
    }
};

export default app;
