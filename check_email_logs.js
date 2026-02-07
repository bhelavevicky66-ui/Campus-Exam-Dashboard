import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

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

async function checkLogs() {
    try {
        const q = query(collection(db, 'email_logs'), orderBy('sentAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        console.log("Recent Email Logs:");
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`- To: ${data.to}, Status: ${data.status}, Time: ${new Date(data.sentAt).toLocaleString()}`);
        });
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

checkLogs();
