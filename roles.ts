// Role types and configuration

export type UserRole = 'superadmin' | 'admin' | 'user';

// Super Admin emails - these users have full control including admin management
export const SUPER_ADMIN_EMAILS: string[] = [
    'vickybhelave25@navgurukul.org',
    'bhelavevicky66@gmail.com'
];

// Check if an email is a super admin
export const isSuperAdminEmail = (email: string | null | undefined): boolean => {
    if (!email) return false;
    return SUPER_ADMIN_EMAILS.includes(email.toLowerCase());
};

// Role permissions
export const ROLE_PERMISSIONS = {
    superadmin: {
        canManageAdmins: true,
        canAccessAllFeatures: true,
        canTakeTests: true,
        canViewDashboard: true
    },
    admin: {
        canManageAdmins: false,
        canAccessAllFeatures: true,
        canTakeTests: true,
        canViewDashboard: true
    },
    user: {
        canManageAdmins: false,
        canAccessAllFeatures: false,
        canTakeTests: true,
        canViewDashboard: true
    }
};
