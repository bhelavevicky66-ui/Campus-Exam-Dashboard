import { db, getAdminEmails } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { SUPER_ADMIN_EMAILS } from '../roles';

const EMAIL_LOGS_COLLECTION = 'email_logs';

const getEmailConfig = async () => {
    try {
        const docRef = doc(db, 'config', 'emailjs');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (error) {
        console.error("Error fetching email config:", error);
    }
    return null;
};

export interface EmailLog {
    to: string;
    subject: string;
    body: string;
    sentAt: number;
    otp: string;
    status?: 'simulated' | 'sent' | 'failed';
}

/**
 * Send OTP Email
 * This function now supports both simulation and real EmailJS integration
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
        let sentStatus: 'simulated' | 'sent' | 'failed' = 'simulated';

        // Fetch real config from Firestore
        const config = await getEmailConfig();

        // Attempt to send real email via EmailJS if keys are provided
        if (config && config.serviceId && config.templateId && config.publicKey) {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: config.serviceId,
                    template_id: config.templateId,
                    user_id: config.publicKey,
                    template_params: {
                        to_email: to,
                        to_name: 'Admin',
                        from_name: 'Campus Exam System',
                        message: body,
                        otp_code: otp,
                        student_name: userName
                    }
                })
            });

            if (response.ok) {
                sentStatus = 'sent';
                console.log('✅ Real OTP Email Sent successfully via EmailJS');
            } else {
                sentStatus = 'failed';
                const errorText = await response.text();
                console.error('❌ EmailJS failed:', errorText);
            }
        }

        // Always log to console for development/testing
        console.log('='.repeat(60));
        console.log(`📧 OTP EMAIL STATUS: ${sentStatus.toUpperCase()}`);
        console.log('='.repeat(60));
        console.log(`To: ${to}`);
        console.log(`OTP: ${otp}`);
        console.log('='.repeat(60));

        // Store email log in Firestore for admin to view
        const emailLog: EmailLog = {
            to,
            subject,
            body,
            sentAt: Date.now(),
            otp,
            status: sentStatus
        };

        const logId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const logRef = doc(db, EMAIL_LOGS_COLLECTION, logId);
        await setDoc(logRef, emailLog);

        return sentStatus !== 'failed';
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

/**
 * Get standard admin emails for OTP delivery (excluding super admins)
 */
export const getStandardAdminEmails = async (): Promise<string[]> => {
    try {
        const allAdmins = await getAdminEmails();
        // Filter out super admins
        const standardAdmins = allAdmins.filter(email =>
            !SUPER_ADMIN_EMAILS.includes(email.toLowerCase())
        );
        return standardAdmins;
    } catch (error) {
        console.error('Error getting standard admins:', error);
        return [];
    }
};

/**
 * Get the backup admin email
 */
export const getAdminEmail = (): string => {
    return 'vickybhelave25@navgurukul.org';
};
