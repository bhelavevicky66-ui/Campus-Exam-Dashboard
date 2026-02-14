import React, { useState, useEffect } from 'react';
import { Loader2, Code, ArrowLeft, CheckCircle, Clock, XCircle, Send } from 'lucide-react';
import { getDynamicQuestions } from '../services/questionService';
import { getUserPhaseSubmission, PhaseSubmission } from '../services/phaseSubmissionService';
import { useAuth } from '../contexts/AuthContext';
import { Question } from '../types';

interface ChallengeListProps {
    phaseModuleId: string; // e.g., 'phase-1', 'phase-2', etc.
    phaseId: string;       // e.g., 'module-5', 'module-6', etc.
    phaseName: string;
    phaseTitle: string;
    onSolveChallenge: (question: Question) => void;
    onBack: () => void;
    onSubmitTest?: () => void;
}

const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-50 text-green-700 border border-green-200';
        case 'Medium':
            return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
        case 'Hard':
            return 'bg-red-50 text-red-700 border border-red-200';
        default:
            return 'bg-blue-50 text-blue-700 border border-blue-200';
    }
};

const getDefaultDifficulty = (marks?: number): 'Easy' | 'Medium' | 'Hard' => {
    if (!marks || marks <= 8) return 'Easy';
    if (marks <= 12) return 'Medium';
    return 'Hard';
};

const getStatusBadge = (status?: string) => {
    switch (status) {
        case 'pending':
            return (
                <span className="flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
                    <Clock size={12} /> Pending
                </span>
            );
        case 'approved':
            return (
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                    <CheckCircle size={12} /> Approved
                </span>
            );
        case 'rejected':
            return (
                <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                    <XCircle size={12} /> Rejected
                </span>
            );
        default:
            return null;
    }
};

export const ChallengeList: React.FC<ChallengeListProps> = ({ phaseModuleId, phaseId, phaseName, phaseTitle, onSolveChallenge, onBack, onSubmitTest }) => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState<Record<string, PhaseSubmission>>({});
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const qs = await getDynamicQuestions(phaseModuleId);
                setQuestions(qs);
            } catch (error) {
                console.error(`Failed to fetch questions for ${phaseModuleId}:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [phaseModuleId]);

    // Fetch submission status for each question
    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!user?.email || questions.length === 0) return;
            setLoadingSubmissions(true);
            try {
                const subs: Record<string, PhaseSubmission> = {};
                for (const q of questions) {
                    const submissionPhaseId = `${phaseId}_q_${q.id}`;
                    const sub = await getUserPhaseSubmission(submissionPhaseId, user.email);
                    if (sub) {
                        subs[q.id] = sub;
                    }
                }
                setSubmissions(subs);
            } catch (error) {
                console.error('Failed to fetch submissions:', error);
            } finally {
                setLoadingSubmissions(false);
            }
        };
        fetchSubmissions();
    }, [questions, user?.email, phaseId, refreshKey]);

    // Allow refresh when returning from editor
    const handleSolveChallenge = (q: Question) => {
        onSolveChallenge(q);
    };

    // Count submitted questions
    const submittedCount = Object.keys(submissions).length;
    const totalQuestions = questions.length;
    const allSubmitted = totalQuestions > 0 && submittedCount >= totalQuestions;

    // Trigger refresh when component re-mounts (e.g. coming back from editor)
    useEffect(() => {
        setRefreshKey(prev => prev + 1);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header Bar */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>
                    <div className="text-sm font-medium text-gray-400">{phaseName}</div>
                </div>
            </div>

            {/* Title Section */}
            <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{phaseTitle}</h1>
                <p className="text-gray-500">
                    {loading ? 'Loading...' : `${questions.length} challenge${questions.length !== 1 ? 's' : ''} available`}
                    {!loading && submittedCount > 0 && (
                        <span className="ml-2 text-green-600 font-medium">• {submittedCount}/{totalQuestions} submitted</span>
                    )}
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 pb-16">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                        <span className="ml-3 text-gray-500">Loading challenges...</span>
                    </div>
                ) : questions.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                        <Code size={48} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No challenges added yet</p>
                        <p className="text-gray-400 text-sm mt-1">Admin will add challenges soon!</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {questions.map((q) => {
                                const difficulty = q.difficulty || getDefaultDifficulty(q.marks);
                                const badgeClass = getDifficultyColor(difficulty);
                                const marks = q.marks || (difficulty === 'Easy' ? 8 : difficulty === 'Medium' ? 12 : 16);
                                const submission = submissions[q.id];
                                const status = submission?.status;

                                return (
                                    <div
                                        key={q.id}
                                        className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow px-8 py-6 ${
                                            status === 'approved' ? 'border-green-200 bg-green-50/30' :
                                            status === 'pending' ? 'border-yellow-200 bg-yellow-50/20' :
                                            status === 'rejected' ? 'border-red-200 bg-red-50/20' :
                                            'border-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            {/* Left: Question Title */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                                    {q.question}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {q.category && (
                                                        <span className="text-xs text-gray-400">{q.category}</span>
                                                    )}
                                                    {status && getStatusBadge(status)}
                                                </div>
                                            </div>

                                            {/* Right: Difficulty + Marks + Solve */}
                                            <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                                <div className="flex items-center gap-3">
                                                    {/* Difficulty Badge */}
                                                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
                                                        {difficulty}
                                                    </span>
                                                    {/* Marks */}
                                                    <span className="text-gray-800 font-bold text-sm whitespace-nowrap">
                                                        {marks} marks
                                                    </span>
                                                </div>

                                                {/* Solve Challenge Button */}
                                                <button
                                                    onClick={() => handleSolveChallenge(q)}
                                                    className={`font-semibold text-sm transition-colors ${
                                                        status === 'approved'
                                                            ? 'text-green-500 hover:text-green-600'
                                                            : status === 'rejected'
                                                            ? 'text-red-500 hover:text-red-600'
                                                            : status === 'pending'
                                                            ? 'text-yellow-600 hover:text-yellow-700'
                                                            : 'text-green-600 hover:text-green-700'
                                                    }`}
                                                >
                                                    {status === 'approved' ? '✅ View Solution' :
                                                     status === 'rejected' ? '❌ Resubmit' :
                                                     status === 'pending' ? '⏳ View Submission' :
                                                     'Solve Challenge'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Submit Test Button */}
                        {onSubmitTest && totalQuestions > 0 && (
                            <div className="mt-10 text-center">
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-500 font-medium">Progress</span>
                                            <span className="text-gray-700 font-bold">{submittedCount}/{totalQuestions} challenges submitted</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className={`h-2.5 rounded-full transition-all duration-500 ${allSubmitted ? 'bg-green-500' : 'bg-blue-500'}`}
                                                style={{ width: `${totalQuestions > 0 ? (submittedCount / totalQuestions) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    {!allSubmitted ? (
                                        <p className="text-gray-400 text-sm mb-4">
                                            Sabhi challenges solve karo, phir test submit karo
                                        </p>
                                    ) : (
                                        <p className="text-green-600 text-sm mb-4 font-medium">
                                            ✅ Sab challenges submit ho gaye! Ab test submit karo
                                        </p>
                                    )}

                                    <button
                                        onClick={onSubmitTest}
                                        disabled={!allSubmitted}
                                        className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white text-base transition-all ${
                                            allSubmitted
                                                ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 active:scale-[0.98]'
                                                : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                    >
                                        <Send size={18} />
                                        Submit Test
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
