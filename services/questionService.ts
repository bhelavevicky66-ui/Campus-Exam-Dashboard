
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Question } from '../types';

const QUESTIONS_COLLECTION = 'questions';

// Add a new question to Firestore
export const addQuestion = async (question: Omit<Question, 'id'>): Promise<string | null> => {
    try {
        const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), question);
        return docRef.id;
    } catch (error) {
        console.error("Error adding question: ", error);
        return null;
    }
};

// Get all dynamic questions for a specific module
export const getDynamicQuestions = async (moduleId: string): Promise<Question[]> => {
    try {
        const q = query(collection(db, QUESTIONS_COLLECTION), where("moduleId", "==", moduleId));
        const querySnapshot = await getDocs(q);
        const questions: Question[] = [];
        querySnapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() } as Question);
        });
        return questions;
    } catch (error) {
        console.error("Error fetching questions: ", error);
        return [];
    }
};

// Delete a question by ID
export const deleteQuestion = async (questionId: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, QUESTIONS_COLLECTION, questionId));
        return true;
    } catch (error) {
        console.error("Error deleting question: ", error);
        return false;
    }
};

// Get all questions (optional, for admin list)
export const getAllDynamicQuestions = async (): Promise<Question[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
        const questions: Question[] = [];
        querySnapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() } as Question);
        });
        return questions;
    } catch (error) {
        console.error("Error fetching all questions: ", error);
        return [];
    }
};
