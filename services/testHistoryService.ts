// Test Result Storage Service
// Stores and retrieves test results from localStorage

export interface TestResultHistory {
    moduleId: string;
    moduleName: string;
    score: number;
    correctCount: number;
    wrongCount: number;
    totalQuestions: number;
    timeTaken: string;
    passed: boolean;
    date: string;
    timestamp: number;
    wrongAnswers?: {
        question: string;
        userAnswer: string;
        correctAnswer: string;
    }[];
}

export interface UserTestHistory {
    [moduleId: string]: TestResultHistory[];
}

const STORAGE_KEY = 'navgurukul_test_history';

// Get user email key for storage
const getUserKey = (userEmail: string): string => {
    return `${STORAGE_KEY}_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
};

// Save test result
export const saveTestResult = (userEmail: string, result: TestResultHistory): void => {
    const key = getUserKey(userEmail);
    const existingData = localStorage.getItem(key);
    let history: UserTestHistory = existingData ? JSON.parse(existingData) : {};

    if (!history[result.moduleId]) {
        history[result.moduleId] = [];
    }

    // Add new result at the beginning
    history[result.moduleId].unshift(result);

    // Keep only last 10 results per module
    if (history[result.moduleId].length > 10) {
        history[result.moduleId] = history[result.moduleId].slice(0, 10);
    }

    localStorage.setItem(key, JSON.stringify(history));
};

// Get all test history for a user
export const getTestHistory = (userEmail: string): UserTestHistory => {
    const key = getUserKey(userEmail);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
};

// Get latest result for a specific module
export const getLatestResult = (userEmail: string, moduleId: string): TestResultHistory | null => {
    const history = getTestHistory(userEmail);
    return history[moduleId]?.[0] || null;
};

// Get all results for a specific module
export const getModuleResults = (userEmail: string, moduleId: string): TestResultHistory[] => {
    const history = getTestHistory(userEmail);
    return history[moduleId] || [];
};

// Get pass count for a module
export const getPassCount = (userEmail: string, moduleId: string): number => {
    const results = getModuleResults(userEmail, moduleId);
    return results.filter(r => r.passed).length;
};

// Get fail count for a module
export const getFailCount = (userEmail: string, moduleId: string): number => {
    const results = getModuleResults(userEmail, moduleId);
    return results.filter(r => !r.passed).length;
};

// Calculate star rating (1-5) based on score
export const getStarRating = (score: number): number => {
    if (score >= 80) return 5;
    if (score >= 60) return 4;
    if (score >= 40) return 3;
    if (score >= 20) return 2;
    return 1;
};

// Clear all history for a user
export const clearTestHistory = (userEmail: string): void => {
    const key = getUserKey(userEmail);
    localStorage.removeItem(key);
};
