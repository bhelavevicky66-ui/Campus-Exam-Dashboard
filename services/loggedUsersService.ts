import { db } from '../firebase';
import { doc, setDoc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const LOGGED_USERS_COLLECTION = 'logged_users';

export interface LoggedUser {
    email: string;
    displayName: string;
    photoURL?: string;
    lastLogin: number;
    totalLogins: number;
}

/**
 * Record a user login
 * @param email - User's email
 * @param displayName - User's display name
 * @param photoURL - Optional profile photo URL
 */
export const recordUserLogin = async (
    email: string,
    displayName: string,
    photoURL?: string
): Promise<void> => {
    try {
        const userRef = doc(db, LOGGED_USERS_COLLECTION, email.toLowerCase());
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // Update existing user
            const userData = userSnap.data() as LoggedUser;
            await setDoc(userRef, {
                ...userData,
                displayName, // Update name in case it changed
                photoURL: photoURL || userData.photoURL,
                lastLogin: Date.now(),
                totalLogins: (userData.totalLogins || 0) + 1,
            });
        } else {
            // New user
            await setDoc(userRef, {
                email: email.toLowerCase(),
                displayName,
                photoURL,
                lastLogin: Date.now(),
                totalLogins: 1,
            });
        }
    } catch (error) {
        console.error('Error recording user login:', error);
    }
};

/**
 * Get all logged-in users
 * @returns Array of logged users sorted by last login
 */
export const getAllLoggedUsers = async (): Promise<LoggedUser[]> => {
    try {
        const usersRef = collection(db, LOGGED_USERS_COLLECTION);
        const usersSnapshot = await getDocs(usersRef);

        const users: LoggedUser[] = [];
        usersSnapshot.forEach((doc) => {
            users.push(doc.data() as LoggedUser);
        });

        // Sort by last login (most recent first)
        return users.sort((a, b) => b.lastLogin - a.lastLogin);
    } catch (error) {
        console.error('Error getting logged users:', error);
        return [];
    }
};

/**
 * Get recently logged-in users (last N users)
 * @param limitCount - Number of users to return
 */
export const getRecentLoggedUsers = async (limitCount: number = 50): Promise<LoggedUser[]> => {
    try {
        const users = await getAllLoggedUsers();
        return users.slice(0, limitCount);
    } catch (error) {
        console.error('Error getting recent logged users:', error);
        return [];
    }
};
