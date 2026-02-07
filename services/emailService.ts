import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const EMAIL_LOGS_COLLECTION = 'email_logs';

export interface EmailLog {
    to: string;
    subject: string;
    body: string;
    sentAt: number;
    otp: string;
}

/**
 * Simulate sending email with OTP
 * In production, this would integrate with SendGrid, Mailgun, etc.
 * For now, it logs to console and stores in Firestore for testing
 * 
 * @param to - Recipient email address
 * @param otp - OTP code to send
 * @param userName - Name of the user requesting the test
 */
export const sendOTPEmail = async (
    to: string,
    otp: string,
    userName: string = 'User'
): Promise<boolean> => {
    const subject = `Test Access OTP - Campus Exam Dashboard`;
    const body = `
Hello Admin,

${userName} is requesting to start a test on the Campus Exam Dashboard.

Your OTP code is: ${otp}

This code will expire in 5 minutes.

Please share this code with the user to allow them to proceed with the test.

Best regards,
Campus Exam Dashboard
  `.trim();

    try {
        // Log to console for development/testing
        console.log('='.repeat(60));
        console.log('📧 EMAIL SIMULATION - OTP SENT');
        console.log('='.repeat(60));
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`\n${body}`);
        console.log('='.repeat(60));
        console.log(`🔑 OTP CODE: ${otp}`);
        console.log('='.repeat(60));

        // Store email log in Firestore for admin to view
        const emailLog: EmailLog = {
            to,
            subject,
            body,
            sentAt: Date.now(),
            otp,
        };

        const logId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const logRef = doc(db, EMAIL_LOGS_COLLECTION, logId);
        await setDoc(logRef, emailLog);

        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

/**
 * Get admin email from environment or default
 * In production, this could fetch from Firestore config
 */
export const getAdminEmail = (): string => {
    // Default admin email - you can change this
    return 'admin@navgurukul.org';
};
