import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Trash2, Shield, ShieldCheck, Crown, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SUPER_ADMIN_EMAILS } from '../roles';

interface AdminPanelProps {
    onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
    const { adminEmails, addAdmin, removeAdmin, isSuperAdmin } = useAuth();
    const [newEmail, setNewEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [removingEmail, setRemovingEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!newEmail.trim()) {
            setError('Please enter an email address');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            setError('Please enter a valid email address');
            return;
        }

        // Check if already an admin or super admin
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

    if (!isSuperAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="text-center text-white">
                    <Shield size={64} className="mx-auto mb-4 text-red-400" />
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-purple-200/70">You don't have permission to access this page</p>
                    <button
                        onClick={onBack}
                        className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-purple-300 hover:text-white transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>

                    <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                        <Crown size={18} className="text-yellow-400" />
                        <span className="text-yellow-400 font-semibold text-sm">Super Admin</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-purple-500/20 px-6 py-3 rounded-full border border-purple-500/30 mb-6">
                        <ShieldCheck size={24} className="text-purple-400" />
                        <span className="text-lg font-medium">Admin Management</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Manage Administrators</h1>
                    <p className="text-purple-200/70">Add or remove admin access for users</p>
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

                {/* Add Admin Form */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
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
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl font-semibold flex items-center gap-2 transition-colors"
                        >
                            {isAdding ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <UserPlus size={20} />
                            )}
                            Add Admin
                        </button>
                    </form>
                </div>

                {/* Super Admins List */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Crown size={22} className="text-yellow-400" />
                        Super Admins (Cannot be removed)
                    </h3>
                    <div className="space-y-3">
                        {SUPER_ADMIN_EMAILS.map((email) => (
                            <div
                                key={email}
                                className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center">
                                        <Crown size={18} className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{email}</p>
                                        <p className="text-xs text-yellow-400/70">Super Admin</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-yellow-500/20 rounded-lg text-yellow-400 text-xs font-bold">
                                    PROTECTED
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admins List */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Shield size={22} className="text-blue-400" />
                        Admins ({adminEmails.length})
                    </h3>

                    {adminEmails.length === 0 ? (
                        <div className="text-center py-8 text-purple-300/50">
                            <Shield size={48} className="mx-auto mb-3 opacity-50" />
                            <p>No admins added yet</p>
                            <p className="text-sm">Add admin emails above to grant admin access</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {adminEmails.map((email) => (
                                <div
                                    key={email}
                                    className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center">
                                            <Shield size={18} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{email}</p>
                                            <p className="text-xs text-blue-400/70">Admin</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveAdmin(email)}
                                        disabled={removingEmail === email}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                                    >
                                        {removingEmail === email ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
