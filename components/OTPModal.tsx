import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, RefreshCw, CheckCircle, XCircle, Lock, AlertCircle } from 'lucide-react';

interface OTPModalProps {
    isOpen: boolean;
    onVerify: (otp: string) => Promise<boolean>;
    onResend: () => Promise<void>;
    adminEmail: string;
    isRealEmail?: boolean;
}

export const OTPModal: React.FC<OTPModalProps> = ({
    isOpen,
    onVerify,
    onResend,
    adminEmail,
    isRealEmail = false,
}) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (isOpen && inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, [isOpen]);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Take only the last character
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'Enter' && otp.every(digit => digit !== '')) {
            handleVerify();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();

        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            const isValid = await onVerify(otpCode);

            if (isValid) {
                setSuccess(true);
                // Modal will close automatically via parent component
            } else {
                setError('Invalid or expired OTP. Please try again.');
                setOtp(Array(6).fill(''));
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setError('');
        setOtp(Array(6).fill(''));

        try {
            await onResend();
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Enter OTP Code</h2>
                    <p className="text-sm text-slate-500 mb-1">
                        An OTP has been sent to:
                    </p>
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <div className="flex items-center justify-center gap-2 text-xs text-indigo-600 bg-indigo-50 py-2 px-4 rounded-lg border border-indigo-100 font-bold">
                            <Mail size={14} />
                            <span>{adminEmail}</span>
                        </div>

                        {isRealEmail ? (
                            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                <CheckCircle size={10} />
                                Live Email Active
                            </span>
                        ) : (
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                                    <AlertCircle size={10} />
                                    Simulation Mode (Local Only)
                                </span>
                                <p className="text-[10px] text-slate-400 italic">
                                    Admin: Go to "Email Settings" in Admin Panel to activate Gmail.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* OTP Input */}
                <div className="mb-6">
                    <div className="flex gap-2 justify-center mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all
                  ${error
                                        ? 'border-red-300 bg-red-50 text-red-600'
                                        : success
                                            ? 'border-green-300 bg-green-50 text-green-600'
                                            : 'border-slate-200 bg-white text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                                    }
                  focus:outline-none`}
                                disabled={isVerifying || success}
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg animate-in slide-in-from-top-2">
                            <XCircle size={16} />
                            <span className="font-semibold">{error}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg animate-in slide-in-from-top-2">
                            <CheckCircle size={16} />
                            <span className="font-semibold">OTP verified successfully!</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={handleVerify}
                        disabled={otp.some(digit => !digit) || isVerifying || success}
                        className="w-full py-3 px-6 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100 hover:shadow-xl active:scale-95"
                    >
                        {isVerifying ? (
                            <span className="flex items-center justify-center gap-2">
                                <RefreshCw size={16} className="animate-spin" />
                                Verifying...
                            </span>
                        ) : (
                            'Verify OTP'
                        )}
                    </button>

                    <button
                        onClick={handleResend}
                        disabled={isResending || isVerifying || success}
                        className="w-full py-3 px-6 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        {isResending ? (
                            <span className="flex items-center justify-center gap-2">
                                <RefreshCw size={16} className="animate-spin" />
                                Resending...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <RefreshCw size={16} />
                                Resend OTP
                            </span>
                        )}
                    </button>
                </div>

                {/* Info */}
                <p className="text-xs text-slate-400 text-center mt-6">
                    OTP expires in 5 minutes. Check your console for the code.
                </p>
            </div>

            <style>{`
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slide-in-from-top-2 {
          from {
            transform: translateY(-0.5rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation-duration: 300ms;
          animation-fill-mode: both;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }
        .slide-in-from-top-2 {
          animation-name: slide-in-from-top-2;
        }
      `}</style>
        </div>
    );
};
