import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserPlus, Trash2, Shield, ShieldCheck, Crown, Loader2, AlertCircle, FileQuestion, Users, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SUPER_ADMIN_EMAILS } from '../roles';
import { QuestionManager } from './QuestionManager';
import { getAllLoggedUsers, LoggedUser } from '../services/loggedUsersService';

interface AdminPanelProps {
    onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
    const { adminEmails, addAdmin, removeAdmin, isSuperAdmin, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<'questions' | 'admins' | 'students'>('questions');

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

    // Load logged students when tab is selected
    useEffect(() => {
        if (activeTab === 'students') {
            loadLoggedStudents();
        }
    }, [activeTab]);

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
                        {isSuperAdmin && (
                            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/20">
                                <Crown size={16} className="text-yellow-400" />
                                <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Super Admin</span>
                            </div>
                        )}
                        {!isSuperAdmin && isAdmin && (
                            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/20">
                                <ShieldCheck size={16} className="text-blue-400" />
                                <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Admin</span>
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

                    {isSuperAdmin && (
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
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">#</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Name</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Email</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Last Login</th>
                                                <th className="text-left py-3 px-4 text-sm font-bold text-purple-300/70 uppercase tracking-widest">Total Logins</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loggedStudents.map((student, index) => (
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
                                                    <td className="py-4 px-4">
                                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                                                            {student.totalLogins}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
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
                                {/* Add Admin Form */}
                                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <UserPlus size={22} className="text-green-400" />
                                        Add New Admin
                                    </h3>
                                    <form onSubmit={handleAddAdmin} className="flex gap-3">
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            placeholder="Enter email address..."
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
                                    </form>
                                </div>

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
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Shield size={22} className="text-blue-400" />
                                    Admins ({adminEmails.length})
                                </h3>

                                {adminEmails.length === 0 ? (
                                    <div className="text-center py-8 text-purple-300/50">
                                        <Shield size={48} className="mx-auto mb-3 opacity-50" />
                                        <p>No admins added yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                        {adminEmails.map((email) => (
                                            <div key={email} className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                                        <Shield size={14} className="text-blue-400" />
                                                    </div>
                                                    <span className="font-medium text-sm truncate max-w-[150px] sm:max-w-none">{email}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveAdmin(email)}
                                                    disabled={removingEmail === email}
                                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    {removingEmail === email ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                </button>
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
