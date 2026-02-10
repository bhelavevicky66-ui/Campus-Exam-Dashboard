import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserPlus, Trash2, Shield, ShieldCheck, Crown, Loader2, AlertCircle, FileQuestion, Users, Search, Clock, Mail, Settings, Save, CheckCircle, Lock, Eye, EyeOff, RefreshCw, Copy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SUPER_ADMIN_EMAILS } from '../roles';
import { QuestionManager } from './QuestionManager';
import { getAllLoggedUsers, LoggedUser } from '../services/loggedUsersService';
import { collection, query, orderBy, limit, onSnapshot, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { EmailLog } from '../services/emailService';

interface AdminPanelProps {
    onBack: () => void;
}

const OTPLogViewer: React.FC = () => {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'email_logs'),
            orderBy('sentAt', 'desc'),
            limit(20)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newLogs = snapshot.docs.map(doc => doc.data() as EmailLog);
            setLogs(newLogs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching OTP logs:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const formatTime = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;

        if (diff < 60000) return 'Just now';

        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-orange-400 animate-spin mb-4" />
                <p className="text-purple-200/60">Loading OTP requests...</p>
            </div>
        );
    }

    if (logs.length === 0) {
        return (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/10">
                <Mail size={48} className="mx-auto mb-4 text-slate-500" />
                <h3 className="text-xl font-bold mb-2">No OTP Requests</h3>
                <p className="text-purple-200/60">Recent OTP requests will appear here in real-time</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {logs.map((log, index) => (
                <div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-all animate-in fade-in"
                >
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 flex-shrink-0">
                            <Shield size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-lg">{log.otp}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${log.status === 'sent' ? 'bg-green-500/20 text-green-300' :
                                    log.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                                        'bg-orange-500/20 text-orange-300'
                                    }`}>
                                    {log.status || 'Simulated'}
                                </span>
                            </div>
                            <p className="text-purple-200/70 text-sm">
                                Requested by <span className="text-white font-medium">{log.to}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-right w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                        <div className="flex-1 md:flex-none">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Requested At</div>
                            <div className="flex items-center gap-1.5 text-purple-200/80 font-medium justify-end md:justify-start">
                                <Clock size={14} />
                                {formatTime(log.sentAt)}
                            </div>
                        </div>
                        <div className="flex-1 md:flex-none">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</div>
                            <div className="text-green-400 text-sm font-bold">READY</div>
                        </div>
                    </div>
                </div>
            ))}

            <p className="text-center text-xs text-purple-200/40 mt-8">
                Showing last 20 OTP requests. Codes expire automatically after 5 minutes.
            </p>
        </div>
    );
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
    const { adminEmails, addAdmin, removeAdmin, isSuperAdmin, isAdmin, canManageAdmins } = useAuth();
    const [activeTab, setActiveTab] = useState<'questions' | 'admins' | 'students' | 'otps' | 'email-settings' | 'unlock-password'>('questions');

    // Admin Management State
    const [newEmail, setNewEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [removingEmail, setRemovingEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Logged Students State
    const [loggedStudents, setLoggedStudents] = useState<LoggedUser[]>([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Email Settings State
    const [emailServiceId, setEmailServiceId] = useState('');
    const [emailTemplateId, setEmailTemplateId] = useState('');
    const [emailPublicKey, setEmailPublicKey] = useState('');
    const [isSavingEmail, setIsSavingEmail] = useState(false);
    const [emailConfigLoaded, setEmailConfigLoaded] = useState(false);

    // Admin List Search State
    const [adminSearchQuery, setAdminSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Unlock Password State
    const [unlockPasswordInput, setUnlockPasswordInput] = useState('');
    const [unlockPasswordSaved, setUnlockPasswordSaved] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    // Generate random password
    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = 'NG';
        for (let i = 0; i < 6; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setUnlockPasswordInput(password);
        setUnlockPasswordSaved(false);
    };

    // Save unlock password
    const saveUnlockPassword = () => {
        if (unlockPasswordInput.trim().length >= 4) {
            localStorage.setItem('navgurukul_unlock_password', unlockPasswordInput.trim());
            setUnlockPasswordSaved(true);
            setSuccess('Unlock password saved successfully!');
            setTimeout(() => setSuccess(null), 3000);
        } else {
            setError('Password must be at least 4 characters');
            setTimeout(() => setError(null), 3000);
        }
    };

    // Load current unlock password on mount
    useEffect(() => {
        const savedPassword = localStorage.getItem('navgurukul_unlock_password');
        if (savedPassword) {
            setUnlockPasswordInput(savedPassword);
        }
    }, []);

    // Load logged students when tab is selected
    useEffect(() => {
        if (activeTab === 'students') {
            loadLoggedStudents();
        }
    }, [activeTab]);

    // Load email config when tab is selected
    useEffect(() => {
        if (activeTab === 'email-settings' && !emailConfigLoaded) {
            loadEmailConfig();
        }
    }, [activeTab, emailConfigLoaded]);

    const loadEmailConfig = async () => {
        try {
            const configRef = doc(db, 'config', 'emailjs');
            const configSnap = await getDoc(configRef);
            if (configSnap.exists()) {
                const data = configSnap.data();
                setEmailServiceId(data.serviceId || '');
                setEmailTemplateId(data.templateId || '');
                setEmailPublicKey(data.publicKey || '');
            }
            setEmailConfigLoaded(true);
        } catch (error) {
            console.error('Error loading email config:', error);
        }
    };

    const saveEmailConfig = async () => {
        setIsSavingEmail(true);
        setError(null);
        setSuccess(null);
        try {
            const configRef = doc(db, 'config', 'emailjs');
            await setDoc(configRef, {
                serviceId: emailServiceId.trim(),
                templateId: emailTemplateId.trim(),
                publicKey: emailPublicKey.trim()
            });
            setSuccess('Email settings saved successfully! OTPs will now be sent to admin emails.');
        } catch (error) {
            console.error('Error saving email config:', error);
            setError('Failed to save email settings. Please try again.');
        } finally {
            setIsSavingEmail(false);
        }
    };

    const loadLoggedStudents = async () => {
        setLoadingStudents(true);
        try {
            const students = await getAllLoggedUsers();
            setLoggedStudents(students);
        } catch (error) {
            console.error('Error loading students:', error);
        } finally {
            setLoadingStudents(false);
        }
    };

    // Filter students based on search query
    const filteredStudents = loggedStudents.filter(student => {
        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();
        return (
            student.displayName.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    });

    // Filter admins based on search query
    const filteredAdmins = adminEmails.filter(email =>
        email.toLowerCase().includes(adminSearchQuery.toLowerCase())
    );

    // Suggestions for adding new admin
    const adminSuggestions = loggedStudents.filter(student => {
        if (newEmail.length < 2) return false;
        const query = newEmail.toLowerCase();
        return (
            student.displayName.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        ) && !adminEmails.includes(student.email.toLowerCase())
            && !SUPER_ADMIN_EMAILS.includes(student.email.toLowerCase());
    }).slice(0, 5);

    // Format timestamp to readable date
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // If not admin at all, show access denied
    if (!isAdmin && !isSuperAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="text-center text-white">
                    <Shield size={64} className="mx-auto mb-4 text-red-400" />
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-purple-200/70">You don't have permission to access this page</p>
                    <button onClick={onBack} className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!newEmail.trim()) {
            setError('Please enter an email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            setError('Please enter a valid email address');
            return;
        }

        if (SUPER_ADMIN_EMAILS.includes(newEmail.toLowerCase())) {
            setError('This email is already a Super Admin');
            return;
        }

        if (adminEmails.includes(newEmail.toLowerCase())) {
            setError('This email is already an admin');
            return;
        }

        setIsAdding(true);
        const result = await addAdmin(newEmail);
        setIsAdding(false);

        if (result) {
            setSuccess(`${newEmail} has been added as admin`);
            setNewEmail('');
        } else {
            setError('Failed to add admin. Please try again.');
        }
    };

    const handleRemoveAdmin = async (email: string) => {
        setError(null);
        setSuccess(null);
        setRemovingEmail(email);

        const result = await removeAdmin(email);
        setRemovingEmail(null);

        if (result) {
            setSuccess(`${email} has been removed from admins`);
        } else {
            setError('Failed to remove admin. Please try again.');
        }
    };

    const handlePromoteToAdmin = async (email: string) => {
        setError(null);
        setSuccess(null);
        setIsAdding(true);

        const result = await addAdmin(email);
        setIsAdding(false);

        if (result) {
            setSuccess(`${email} has been promoted to admin`);
        } else {
            setError('Failed to promote student. Please try again.');
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/90 backdrop-blur-lg border-b border-white/10 shadow-xl">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-purple-300 hover:text-white transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>

                    <div className="flex items-center gap-3">
                        {(isSuperAdmin || isAdmin) && (
                            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/20">
                                <Crown size={16} className="text-yellow-400" />
                                <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider">
                                    {isSuperAdmin ? 'Super Admin' : 'Admin'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="max-w-6xl mx-auto px-6 flex gap-6 mt-2">
                    <button
                        onClick={() => setActiveTab('questions')}
                        className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'questions'
                            ? 'border-green-400 text-green-400'
                            : 'border-transparent text-slate-400 hover:text-white'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FileQuestion size={18} />
                            Manage Questions
                        </div>
                    </button>

                    {(canManageAdmins) && (
                        <button
                            onClick={() => setActiveTab('admins')}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'admins'
                                ? 'border-purple-400 text-purple-400'
                                : 'border-transparent text-slate-400 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} />
                                Manage Admins
                            </div>
                        </button>
                    )}

                    <button
                        onClick={() => setActiveTab('students')}
                        className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'students'
                            ? 'border-blue-400 text-blue-400'
                            : 'border-transparent text-slate-400 hover:text-white'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Users size={18} />
                            All Login Students
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveTab('otps')}
                        className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'otps'
                            ? 'border-orange-400 text-orange-400'
                            : 'border-transparent text-slate-400 hover:text-white'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Shield size={18} />
                            OTP Requests
                        </div>
                    </button>

                    {isSuperAdmin && (
                        <button
                            onClick={() => setActiveTab('email-settings')}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'email-settings'
                                ? 'border-cyan-400 text-cyan-400'
                                : 'border-transparent text-slate-400 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Settings size={18} />
                                Email Settings
                            </div>
                        </button>
                    )}

                    {(isSuperAdmin || isAdmin) && (
                        <button
                            onClick={() => setActiveTab('unlock-password')}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'unlock-password'
                                ? 'border-amber-400 text-amber-400'
                                : 'border-transparent text-slate-400 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Lock size={18} />
                                Unlock Password
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {activeTab === 'questions' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
                            <p className="text-purple-200/60">Add and manage questions for different modules</p>
                        </div>
                        <QuestionManager />
                    </div>
                ) : activeTab === 'students' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-2">All Logged In Students</h1>
                            <p className="text-purple-200/60">View all students who have logged into the system</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Users size={22} className="text-blue-400" />
                                    Students ({loggedStudents.length})
                                </h3>
                                <button
                                    onClick={loadLoggedStudents}
                                    disabled={loadingStudents}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl font-semibold flex items-center gap-2 transition-colors text-sm"
                                >
                                    {loadingStudents ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        'Refresh'
                                    )}
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/50" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name or email..."
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    {searchQuery && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-purple-300/70">
                                            {filteredStudents.length} result{filteredStudents.length !== 1 ? 's' : ''}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {loadingStudents && loggedStudents.length === 0 ? (
                                <div className="text-center py-8 text-purple-300/50">
                                    <Loader2 size={48} className="mx-auto mb-3 animate-spin" />
                                    <p>Loading students...</p>
                                </div>
                            ) : loggedStudents.length === 0 ? (
                                <div className="text-center py-8 text-purple-300/50">
                                    <Users size={48} className="mx-auto mb-3 opacity-50" />
                                    <p>No students have logged in yet</p>
                                </div>
                            ) : filteredStudents.length === 0 ? (
                                <div className="text-center py-8 text-purple-300/50">
                                    <Search size={48} className="mx-auto mb-3 opacity-50" />
                                    <p>No students found matching "{searchQuery}"</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">#</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Name</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Email</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Last Login</th>
                                                {canManageAdmins && (
                                                    <th className="text-right py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Actions</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.map((student, index) => (
                                                <tr key={student.email} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-4 px-4 text-purple-200/80">{index + 1}</td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            {student.photoURL ? (
                                                                <img
                                                                    src={student.photoURL}
                                                                    alt={student.displayName}
                                                                    className="w-8 h-8 rounded-full"
                                                                />
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                                                    <span className="text-blue-400 font-bold text-sm">
                                                                        {student.displayName.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <span className="font-medium">{student.displayName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-purple-200/80 text-sm">{student.email}</td>
                                                    <td className="py-4 px-4 text-purple-200/80 text-sm">{formatDate(student.lastLogin)}</td>
                                                    {canManageAdmins && (
                                                        <td className="py-4 px-4 text-right">
                                                            {adminEmails.includes(student.email.toLowerCase()) ||
                                                                SUPER_ADMIN_EMAILS.includes(student.email.toLowerCase()) ? (
                                                                <span className="text-xs font-bold text-green-400/50 bg-green-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                                                    Already Admin
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handlePromoteToAdmin(student.email)}
                                                                    disabled={isAdding}
                                                                    className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2 ml-auto"
                                                                >
                                                                    {isAdding ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                                                                    Make Admin
                                                                </button>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'otps' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-2 text-orange-400">OTP Request Logs</h1>
                            <p className="text-purple-200/60">Live OTP codes for students starting tests</p>
                        </div>
                        <OTPLogViewer />
                    </div>
                ) : activeTab === 'email-settings' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-2">Email Settings</h1>
                            <p className="text-purple-200/60">Configure EmailJS to send OTP codes to admin emails</p>
                        </div>

                        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-cyan-500/20 rounded-xl">
                                    <Mail size={24} className="text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">EmailJS Configuration</h3>
                                    <p className="text-purple-200/60 text-sm">Setup real email delivery for OTP codes</p>
                                </div>
                            </div>

                            {(error || success) && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${error ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'}`}>
                                    {error ? <AlertCircle className="text-red-400" size={20} /> : <CheckCircle className="text-green-400" size={20} />}
                                    <p className={error ? 'text-red-300' : 'text-green-300'}>{error || success}</p>
                                </div>
                            )}

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-purple-200/80 mb-2">Service ID</label>
                                    <input
                                        type="text"
                                        value={emailServiceId}
                                        onChange={(e) => setEmailServiceId(e.target.value)}
                                        placeholder="e.g., service_xxxxxx"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-purple-200/80 mb-2">Template ID</label>
                                    <input
                                        type="text"
                                        value={emailTemplateId}
                                        onChange={(e) => setEmailTemplateId(e.target.value)}
                                        placeholder="e.g., template_xxxxxx"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-purple-200/80 mb-2">Public Key</label>
                                    <input
                                        type="text"
                                        value={emailPublicKey}
                                        onChange={(e) => setEmailPublicKey(e.target.value)}
                                        placeholder="e.g., xxxxxxxxxxxxxx"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>

                                <button
                                    onClick={saveEmailConfig}
                                    disabled={isSavingEmail}
                                    className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                                >
                                    {isSavingEmail ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Save Email Settings
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    How to setup EmailJS
                                </h4>
                                <ol className="text-sm text-purple-200/70 space-y-2 list-decimal list-inside">
                                    <li>Go to <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">emailjs.com</a> and create free account</li>
                                    <li>Add an email service (Gmail recommended)</li>
                                    <li>Create an email template with variables: <code className="bg-white/10 px-1 rounded">to_email</code>, <code className="bg-white/10 px-1 rounded">otp_code</code>, <code className="bg-white/10 px-1 rounded">student_name</code></li>
                                    <li>Copy Service ID, Template ID and Public Key here</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'unlock-password' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-2 text-amber-400">Unlock Password Generator</h1>
                            <p className="text-purple-200/60">Generate and manage password to unlock locked modules</p>
                        </div>

                        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-amber-500/20 rounded-xl">
                                    <Lock size={24} className="text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Module Unlock Password</h3>
                                    <p className="text-purple-200/60 text-sm">Use this password to unlock locked modules on Dashboard</p>
                                </div>
                            </div>

                            {(error || success) && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${error ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'}`}>
                                    {error ? <AlertCircle className="text-red-400" size={20} /> : <CheckCircle className="text-green-400" size={20} />}
                                    <p className={error ? 'text-red-300' : 'text-green-300'}>{error || success}</p>
                                </div>
                            )}

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-purple-200/80 mb-2">Current Unlock Password</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={unlockPasswordInput}
                                            onChange={(e) => {
                                                setUnlockPasswordInput(e.target.value.toUpperCase());
                                                setUnlockPasswordSaved(false);
                                            }}
                                            placeholder="Enter or generate password..."
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-xl font-mono tracking-widest placeholder-purple-300/30 focus:outline-none focus:border-amber-500 transition-colors pr-24"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-purple-300/50 hover:text-white transition-colors"
                                        >
                                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigator.clipboard.writeText(unlockPasswordInput);
                                                setSuccess('Password copied to clipboard!');
                                                setTimeout(() => setSuccess(null), 2000);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-300/50 hover:text-white transition-colors"
                                        >
                                            <Copy size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={generateRandomPassword}
                                        className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                                    >
                                        <RefreshCw size={20} />
                                        Generate New
                                    </button>
                                    <button
                                        onClick={saveUnlockPassword}
                                        disabled={unlockPasswordSaved || !unlockPasswordInput.trim()}
                                        className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                                    >
                                        {unlockPasswordSaved ? (
                                            <>
                                                <CheckCircle size={20} />
                                                Saved!
                                            </>
                                        ) : (
                                            <>
                                                <Save size={20} />
                                                Save Password
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    How to use Unlock Password
                                </h4>
                                <ol className="text-sm text-purple-200/70 space-y-2 list-decimal list-inside">
                                    <li>Generate a new password or enter your own</li>
                                    <li>Click "Save Password" to save it</li>
                                    <li>Go to Dashboard and click on any locked module</li>
                                    <li>Enter this password to temporarily unlock the module</li>
                                    <li>Share this password with other admins if needed</li>
                                </ol>
                            </div>

                            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <p className="text-sm text-blue-300">
                                    <strong>Note:</strong> This password is stored locally in your browser. Each admin can set their own password.
                                    Default password is <code className="bg-white/10 px-2 py-0.5 rounded font-mono">NAVGURUKUL2024</code>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Admin Management Content */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
                            <p className="text-purple-200/60">Manage who has access to the admin panel</p>
                        </div>

                        {/* Alerts */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-300">
                                <ShieldCheck size={20} />
                                {success}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Col: Add & Super Admins */}
                            <div className="space-y-8">
                                {canManageAdmins && (
                                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <UserPlus size={22} className="text-green-400" />
                                            Add New Admin
                                        </h3>
                                        <form onSubmit={handleAddAdmin} className="relative">
                                            <div className="flex gap-3">
                                                <input
                                                    type="email"
                                                    value={newEmail}
                                                    onChange={(e) => {
                                                        setNewEmail(e.target.value);
                                                        setShowSuggestions(true);
                                                    }}
                                                    onFocus={() => setShowSuggestions(true)}
                                                    placeholder="Enter student email..."
                                                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isAdding}
                                                    className="px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                                                >
                                                    {isAdding ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />}
                                                    Add
                                                </button>
                                            </div>

                                            {/* Autocomplete Suggestions */}
                                            {showSuggestions && adminSuggestions.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1645] border border-white/10 rounded-xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2">
                                                    <div className="p-2 border-b border-white/5 text-[10px] uppercase tracking-wider text-purple-300/50 font-bold">
                                                        Suggested Students
                                                    </div>
                                                    {adminSuggestions.map(student => (
                                                        <button
                                                            key={student.email}
                                                            type="button"
                                                            onClick={() => {
                                                                setNewEmail(student.email);
                                                                setShowSuggestions(false);
                                                            }}
                                                            className="w-full flex items-center gap-3 p-3 hover:bg-white/5 text-left transition-colors"
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
                                                                {student.displayName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-bold text-sm truncate">{student.displayName}</div>
                                                                <div className="text-xs text-purple-300/50 truncate">{student.email}</div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                )}

                                {/* Super Admins List */}
                                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Crown size={22} className="text-yellow-400" />
                                        Super Admins
                                    </h3>
                                    <div className="space-y-3">
                                        {SUPER_ADMIN_EMAILS.map((email) => (
                                            <div key={email} className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center">
                                                        <Crown size={14} className="text-yellow-400" />
                                                    </div>
                                                    <span className="font-medium text-sm">{email}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Admin List */}
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 h-fit">
                                <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Shield size={22} className="text-blue-400" />
                                        Admins ({adminEmails.length})
                                    </div>
                                </h3>

                                {/* Admin Search Input */}
                                <div className="mb-4 relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/50" />
                                    <input
                                        type="text"
                                        value={adminSearchQuery}
                                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                                        placeholder="Search admins..."
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-purple-300/30 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                {adminEmails.length === 0 ? (
                                    <div className="text-center py-8 text-purple-300/50">
                                        <Shield size={48} className="mx-auto mb-3 opacity-50" />
                                        <p>No admins added yet</p>
                                    </div>
                                ) : filteredAdmins.length === 0 ? (
                                    <div className="text-center py-8 text-purple-300/50">
                                        <Search size={32} className="mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No admins match "{adminSearchQuery}"</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                        {filteredAdmins.map((email) => (
                                            <div key={email} className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                                        <Shield size={14} className="text-blue-400" />
                                                    </div>
                                                    <span className="font-medium text-sm truncate max-w-[150px] sm:max-w-none">{email}</span>
                                                </div>
                                                {canManageAdmins && (
                                                    <button
                                                        onClick={() => handleRemoveAdmin(email)}
                                                        disabled={removingEmail === email}
                                                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        {removingEmail === email ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
