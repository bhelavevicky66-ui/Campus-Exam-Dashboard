import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, getAdminEmails, addAdminEmail, removeAdminEmail } from '../firebase';
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

    // Refresh admin list from Firestore
    const refreshAdmins = async () => {
        const emails = await getAdminEmails();
        setAdminEmails(emails);

        if (user?.email) {
            setRole(determineRole(user.email, emails));
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const emails = await getAdminEmails();
                setAdminEmails(emails);
                setRole(determineRole(currentUser.email, emails));

                // Record user login
                if (currentUser.email && currentUser.displayName) {
                    await recordUserLogin(
                        currentUser.email,
                        currentUser.displayName,
                        currentUser.photoURL || undefined
                    );
                }
            } else {
                setRole('user');
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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
