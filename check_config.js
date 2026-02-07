import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDo2uZgNuGbNMLmAA0AL2cQfOpcVSMEzHw",
    authDomain: "navgurukul-test-dashboard.firebaseapp.com",
    projectId: "navgurukul-test-dashboard",
    storageBucket: "navgurukul-test-dashboard.firebasestorage.app",
    messagingSenderId: "533182279212",
    appId: "1:533182279212:web:7ee32015b895ef8f9c2b89"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkConfig() {
    try {
        const docRef = doc(db, 'config', 'emailjs');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("EmailJS Config Found:", JSON.stringify(docSnap.data(), null, 2));
        } else {
            console.log("EmailJS Config NOT found in config/emailjs");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

checkConfig();
