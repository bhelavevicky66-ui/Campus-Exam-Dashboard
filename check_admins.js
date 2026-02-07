import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SUPER_ADMIN_EMAILS = [
    'vickybhelave25@navgurukul.org',
    'bhelavevicky66@gmail.com'
];

async function checkAdmins() {
    try {
        const docRef = doc(db, 'config/admins');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const emails = docSnap.data().emails || [];
            console.log("All Admins in DB:", emails);

            const standardAdmins = emails.filter(e => !SUPER_ADMIN_EMAILS.includes(e.toLowerCase()));
            console.log("Standard Admins (Targets for OTP):", standardAdmins);
        } else {
            console.log("No admins found in config/admins");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

checkAdmins();
