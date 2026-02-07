import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, addAdminEmail, removeAdminEmail } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserRole, isSuperAdminEmail, ROLE_PERMISSIONS } from '../roles';
import { recordUserLogin } from '../services/loggedUsersService';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    role: UserRole;
    adminEmails: string[];
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isUser: boolean;
    canManageAdmins: boolean;
    canAccessAllFeatures: boolean;
    logout: () => Promise<void>;
    addAdmin: (email: string) => Promise<boolean>;
    removeAdmin: (email: string) => Promise<boolean>;
    refreshAdmins: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [adminEmails, setAdminEmails] = useState<string[]>([]);
    const [role, setRole] = useState<UserRole>('user');

    // Determine user role based on email
    const determineRole = (email: string | null, admins: string[]): UserRole => {
        if (!email) return 'user';

        const lowerEmail = email.toLowerCase();

        if (isSuperAdminEmail(lowerEmail)) {
            return 'superadmin';
        }

        if (admins.includes(lowerEmail)) {
            return 'admin';
        }

        return 'user';
    };

    // Record login when user authenticated
    useEffect(() => {
        if (user?.email && user?.displayName) {
            recordUserLogin(user.email, user.displayName, user.photoURL || undefined);
        }
    }, [user?.email]);

    // Refresh admin list from Firestore (manual trigger if needed)
    const refreshAdmins = async () => {
        // Handled by onSnapshot, but keeping for compatibility
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                setRole('user');
                setLoading(false);
            }
        });

        // Listen for admin list changes real-time
        const unsubscribeAdmins = onSnapshot(doc(db, 'config/admins'), (docSnap) => {
            const emails = docSnap.exists() ? docSnap.data().emails || [] : [];
            setAdminEmails(emails);

            if (user?.email) {
                setRole(determineRole(user.email, emails));
            } else if (auth.currentUser?.email) {
                // Handle case where user state hasn't updated yet but auth.currentUser is available
                setRole(determineRole(auth.currentUser.email, emails));
            }

            setLoading(false);
        }, (error) => {
            console.error("Error listening to admins:", error);
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeAdmins();
        };
    }, [user?.email]);

    const logout = async () => {
        await signOut(auth);
        setRole('user');
    };

    const addAdmin = async (email: string): Promise<boolean> => {
        const success = await addAdminEmail(email);
        if (success) {
            await refreshAdmins();
        }
        return success;
    };

    const removeAdmin = async (email: string): Promise<boolean> => {
        const success = await removeAdminEmail(email);
        if (success) {
            await refreshAdmins();
        }
        return success;
    };

    const isSuperAdmin = role === 'superadmin';
    const isAdmin = role === 'admin' || role === 'superadmin';
    const isUser = role === 'user';

    const permissions = ROLE_PERMISSIONS[role];

    const value: AuthContextType = {
        user,
        loading,
        role,
        adminEmails,
        isSuperAdmin,
        isAdmin,
        isUser,
        canManageAdmins: permissions.canManageAdmins,
        canAccessAllFeatures: permissions.canAccessAllFeatures,
        logout,
        addAdmin,
        removeAdmin,
        refreshAdmins
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
