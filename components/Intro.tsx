import React, { useState } from 'react';
import { BookOpen, Clock, Award, Play, ChevronLeft } from 'lucide-react';
import { OTPModal } from './OTPModal';
import { createOTP, verifyOTP } from '../services/otpService';
import { sendOTPEmail, getStandardAdminEmails } from '../services/emailService';
import { useAuth } from '../contexts/AuthContext';
import { db, getAdminEmails } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface IntroProps {
  onStart: (name: string) => void;
  onBack: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart, onBack }) => {
  const { user } = useAuth();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [isRealEmailActive, setIsRealEmailActive] = useState(false);

  const handleStartClick = async () => {
    // Generate unique session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);

    setIsSending(true);
    try {
      // Check if real email is configured
      const configRef = doc(db, 'config', 'emailjs');
      const configSnap = await getDoc(configRef);
      const isConfigured = configSnap.exists();
      setIsRealEmailActive(isConfigured);

      // Get all standard admins
      let recipients = await getStandardAdminEmails();

      // FALLBACK: If no standard admins, use all admins (including Super Admins)
      if (recipients.length === 0) {
        recipients = await getAdminEmails();
      }

      setRecipientEmails(recipients);

      // Use the first admin as the primary recipient for session tracking, 
      // or a placeholder if no admins exist yet
      const primaryAdmin = recipients.length > 0 ? recipients[0] : 'admin-required';

      // Generate OTP
      const otp = await createOTP(primaryAdmin, newSessionId);

      // Send OTP to ALL standard admins found
      if (recipients.length > 0) {
        await Promise.all(recipients.map(email =>
          sendOTPEmail(email, otp, user?.displayName || 'User')
        ));
      } else {
        // Log simulation if no real admins yet
        await sendOTPEmail('simulated-admin@navgurukul.org', otp, user?.displayName || 'User');
      }

      // Show OTP modal
      setShowOTPModal(true);
    } catch (error) {
      console.error('Error generating OTP:', error);
      alert('Failed to generate OTP. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOTP = async (code: string): Promise<boolean> => {
    try {
      const isValid = await verifyOTP(sessionId, code);

      if (isValid) {
        // Enter Fullscreen
        try {
          const element = document.documentElement;
          if (element.requestFullscreen) {
            await element.requestFullscreen();
          }
        } catch (error) {
          console.warn("Fullscreen request failed:", error);
        }

        setShowOTPModal(false);
        // Start the test
        onStart(user?.displayName || "User");
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const handleResendOTP = async (): Promise<void> => {
    try {
      // Check if real email is configured (re-check in case they fixed it)
      const configRef = doc(db, 'config', 'emailjs');
      const configSnap = await getDoc(configRef);
      setIsRealEmailActive(configSnap.exists());

      // Get recipients and resend
      let recipients = await getStandardAdminEmails();
      if (recipients.length === 0) {
        recipients = await getAdminEmails();
      }
      setRecipientEmails(recipients);

      const primaryAdmin = recipients.length > 0 ? recipients[0] : 'admin-required';

      // Generate new OTP with same session ID
      const otp = await createOTP(primaryAdmin, sessionId);

      // Send new OTP to all admins
      if (recipients.length > 0) {
        await Promise.all(recipients.map(email =>
          sendOTPEmail(email, otp, user?.displayName || 'User')
        ));
      } else {
        await sendOTPEmail('simulated-admin@navgurukul.org', otp, user?.displayName || 'User');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-hidden items-center justify-center p-6 md:p-12 relative">

      {/* Background Decor (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-[60px] opacity-40"></div>
      </div>

      {/* Back Button - Absolute Top Left */}
      <button
        onClick={onBack}
        className="absolute left-6 top-6 md:left-10 md:top-10 z-20 flex items-center gap-2 text-slate-500 hover:text-[#6C5DD3] font-bold transition-colors group"
      >
        <div className="p-2 bg-slate-50/80 backdrop-blur-sm rounded-lg group-hover:bg-[#6C5DD3]/10 transition-colors border border-slate-100/50">
          <ChevronLeft size={20} />
        </div>
        <span>Back to Dashboard</span>
      </button>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-12 mt-12 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-black text-[#6C5DD3] tracking-tight mb-3">
            To Campus Exam Dashboard
          </h1>
          <p className="text-lg text-slate-500 font-bold">
            Welcome back! Ready to challenge yourself today?
          </p>
        </div>

        {/* Info Cards Grid - DARK THEME APPLIED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">

          {/* Card 1: Total Questions */}
          <div className="bg-[#11142D] rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
            {/* Decor Gradient - Subtle internal glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Questions</span>
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                <BookOpen size={20} />
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-1 mb-1">
                <div className="text-4xl font-black text-white">30</div>
                <div className="text-xs font-bold text-slate-500">Qs</div>
              </div>
              <div className="text-sm font-bold text-slate-400 mb-6">Across 3 categories</div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Time Limit */}
          <div className="bg-[#11142D] rounded-3xl p-8 shadow-2xl shadow-purple-500/10 flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time Limit</span>
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                <Clock size={20} />
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-1 mb-1">
                <div className="text-4xl font-black text-white">60</div>
                <div className="text-xs font-bold text-slate-500">min</div>
              </div>
              <div className="text-sm font-bold text-slate-400 mb-6">To complete the exam</div>

              <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-full rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Card 3: Passing Score */}
          <div className="bg-[#11142D] rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passing Score</span>
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <Award size={20} />
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-1 mb-1">
                <div className="text-4xl font-black text-white">75</div>
                <div className="text-xs font-bold text-slate-500">%</div>
              </div>
              <div className="text-sm font-bold text-slate-400 mb-6">Required to pass</div>

              <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner (Purple) */}
        <div className="w-full bg-[#6C5DD3] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          {/* Banner Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity"></div>

          <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Ready to begin?</h2>
            <p className="text-indigo-100 text-sm md:text-base max-w-lg leading-relaxed font-medium">
              Test your knowledge in logic, mathematics, and critical thinking. <br className="hidden md:block" />
              Ensure you have a stable internet connection before starting.
            </p>
          </div>

          <button
            onClick={handleStartClick}
            disabled={isSending}
            className="relative z-10 bg-white text-[#6C5DD3] px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-slate-50 transition-all shadow-lg shadow-indigo-900/20 hover:shadow-xl active:scale-95 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                Sending OTP...
                <div className="w-4 h-4 border-2 border-[#6C5DD3]/30 border-t-[#6C5DD3] rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                Start Test
                <Play fill="currentColor" size={16} />
              </>
            )}
          </button>
        </div>

      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
        adminEmail={recipientEmails.join(', ')}
        isRealEmail={isRealEmailActive}
      />
    </div>
  );
};
