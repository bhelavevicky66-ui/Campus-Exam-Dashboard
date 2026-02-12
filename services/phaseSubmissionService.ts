// Phase Submission Service
// Stores and retrieves phase coding submissions in Firestore for admin review

import { db } from '../firebase';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    orderBy,
    where,
    onSnapshot,
    Unsubscribe,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

export interface PhaseSubmission {
    id?: string;
    phaseId: string;          // e.g., 'module-5' for Phase 1
    phaseName: string;        // e.g., 'Phase 1 - HTML Table'
    userEmail: string;
    userName: string;
    userPhoto?: string;
    code: string;             // The HTML code submitted
    question: string;         // The question that was asked
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;      // Admin email who reviewed
    reviewedAt?: number;      // Timestamp of review
    submittedAt: number;      // Timestamp of submission
    feedback?: string;        // Optional admin feedback
}

const SUBMISSIONS_COLLECTION = 'phase_submissions';

// Submit code for review
export const submitPhaseCode = async (submission: Omit<PhaseSubmission, 'id' | 'status' | 'submittedAt'>): Promise<string> => {
    try {
        const docId = `${submission.phaseId}_${submission.userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const docRef = doc(db, SUBMISSIONS_COLLECTION, docId);

        await setDoc(docRef, {
            ...submission,
            status: 'pending',
            submittedAt: Date.now(),
        });

        return docId;
    } catch (error) {
        console.error('Error submitting phase code:', error);
        throw error;
    }
};

// Get submission for a specific user and phase
export const getUserPhaseSubmission = async (phaseId: string, userEmail: string): Promise<PhaseSubmission | null> => {
    try {
        const docId = `${phaseId}_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const docRef = doc(db, SUBMISSIONS_COLLECTION, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as PhaseSubmission;
        }
        return null;
    } catch (error) {
        console.error('Error getting submission:', error);
        return null;
    }
};

// Get all submissions (for admin panel)
export const getAllSubmissions = async (): Promise<PhaseSubmission[]> => {
    try {
        const q = query(
            collection(db, SUBMISSIONS_COLLECTION),
            orderBy('submittedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PhaseSubmission));
    } catch (error) {
        console.error('Error getting all submissions:', error);
        return [];
    }
};

// Listen to all submissions in real-time (for admin)
export const listenToSubmissions = (callback: (submissions: PhaseSubmission[]) => void): Unsubscribe => {
    const q = query(
        collection(db, SUBMISSIONS_COLLECTION),
        orderBy('submittedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PhaseSubmission));
        callback(submissions);
    }, (error) => {
        console.error('Error listening to submissions:', error);
    });
};

// Admin: Approve submission
export const approveSubmission = async (submissionId: string, adminEmail: string, feedback?: string): Promise<void> => {
    try {
        const docRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
        await updateDoc(docRef, {
            status: 'approved',
            reviewedBy: adminEmail,
            reviewedAt: Date.now(),
            ...(feedback ? { feedback } : {})
        });
    } catch (error) {
        console.error('Error approving submission:', error);
        throw error;
    }
};

// Admin: Reject submission
export const rejectSubmission = async (submissionId: string, adminEmail: string, feedback?: string): Promise<void> => {
    try {
        const docRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
        await updateDoc(docRef, {
            status: 'rejected',
            reviewedBy: adminEmail,
            reviewedAt: Date.now(),
            ...(feedback ? { feedback } : {})
        });
    } catch (error) {
        console.error('Error rejecting submission:', error);
        throw error;
    }
};

// Check if user's submission is approved (used for unlocking next phase)
export const isPhaseApproved = async (phaseId: string, userEmail: string): Promise<boolean> => {
    const submission = await getUserPhaseSubmission(phaseId, userEmail);
    return submission?.status === 'approved';
};
