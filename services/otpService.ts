import { db } from '../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const OTP_COLLECTION = 'otps';
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export interface OTPData {
    code: string;
    email: string;
    createdAt: number;
    expiresAt: number;
}

/**
 * Generate a random 6-digit OTP
 */
export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store OTP in Firestore with expiry
 * @param email - The email address for which OTP is generated
 * @param sessionId - Unique session identifier
 * @returns The generated OTP code
 */
export const createOTP = async (email: string, sessionId: string): Promise<string> => {
    const code = generateOTP();
    const now = Date.now();

    const otpData: OTPData = {
        code,
        email,
        createdAt: now,
        expiresAt: now + OTP_EXPIRY_MS,
    };

    try {
        const otpRef = doc(db, OTP_COLLECTION, sessionId);
        await setDoc(otpRef, otpData);
        return code;
    } catch (error) {
        console.error('Error creating OTP:', error);
        throw new Error('Failed to create OTP');
    }
};

/**
 * Verify OTP against stored value
 * @param sessionId - Session identifier
 * @param code - OTP code to verify
 * @returns True if OTP is valid and not expired
 */
export const verifyOTP = async (sessionId: string, code: string): Promise<boolean> => {
    try {
        const otpRef = doc(db, OTP_COLLECTION, sessionId);
        const otpSnap = await getDoc(otpRef);

        if (!otpSnap.exists()) {
            return false;
        }

        const otpData = otpSnap.data() as OTPData;
        const now = Date.now();

        // Check if OTP is expired
        if (now > otpData.expiresAt) {
            // Delete expired OTP
            await deleteDoc(otpRef);
            return false;
        }

        // Check if code matches
        if (otpData.code !== code) {
            return false;
        }

        // OTP is valid, delete it (one-time use)
        await deleteDoc(otpRef);
        return true;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
};

/**
 * Delete OTP from Firestore
 * @param sessionId - Session identifier
 */
export const deleteOTP = async (sessionId: string): Promise<void> => {
    try {
        const otpRef = doc(db, OTP_COLLECTION, sessionId);
        await deleteDoc(otpRef);
    } catch (error) {
        console.error('Error deleting OTP:', error);
    }
};
