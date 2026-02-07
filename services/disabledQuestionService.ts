
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const DISABLED_QUESTIONS_COLLECTION = 'disabled_questions';

// Disable a static question (add ID to Firestore)
export const disableStaticQuestion = async (questionId: number): Promise<boolean> => {
    try {
        // Check if already disabled to avoid duplicates
        const q = query(collection(db, DISABLED_QUESTIONS_COLLECTION), where("questionId", "==", questionId));
        const snapshots = await getDocs(q);
        if (!snapshots.empty) return true; // Already disabled

        await addDoc(collection(db, DISABLED_QUESTIONS_COLLECTION), { questionId });
        return true;
    } catch (error) {
        console.error("Error disabling question: ", error);
        return false;
    }
};

// Get all disabled static question IDs
export const getDisabledStaticQuestions = async (): Promise<number[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, DISABLED_QUESTIONS_COLLECTION));
        const disabledIds: number[] = [];
        querySnapshot.forEach((doc) => {
            disabledIds.push(doc.data().questionId);
        });
        return disabledIds;
    } catch (error) {
        console.error("Error fetching disabled questions: ", error);
        return [];
    }
};

// Enable a static question (remove ID from Firestore) - Optional utility
export const enableStaticQuestion = async (questionId: number): Promise<boolean> => {
    try {
        const q = query(collection(db, DISABLED_QUESTIONS_COLLECTION), where("questionId", "==", questionId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (d) => {
            await deleteDoc(doc(db, DISABLED_QUESTIONS_COLLECTION, d.id));
        });
        return true;
    } catch (error) {
        console.error("Error enabling question: ", error);
        return false;
    }
};
