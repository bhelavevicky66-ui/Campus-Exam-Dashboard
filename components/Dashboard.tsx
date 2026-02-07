import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
    Home,
    Layers,
    Plus,
    Zap,
    MoreHorizontal,
    Star,
    Clock,
    CheckCircle2,
    ChevronDown,
    Monitor,
    BookOpen,
    Users,
    Code,
    Terminal,
    FileCheck,
    GitBranch,
    LayoutDashboard,
    Braces,
    Palette,
    LogOut,
    Crown,
    Shield,
    UserCircle,
    XCircle,
    Lock
} from 'lucide-react';
import { UserRole } from '../roles';
import { getLatestResult, getPassCount, getFailCount, getStarRating, TestResultHistory } from '../services/testHistoryService';

interface DashboardProps {
    onStart: (moduleId: string) => void;
    user?: User | null;
    onLogout?: () => void;
    role?: UserRole;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStart, user, onLogout, role = 'user' }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [testResults, setTestResults] = useState<Record<string, TestResultHistory | null>>({});
    const [showResultModal, setShowResultModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState<TestResultHistory | null>(null);

    // Module Sequence Definition
    const MODULE_CHAIN = [
        { id: 'screen-test', name: 'Screen Test', prevId: null },
        { id: 'module-0', name: 'Module 0 Test', prevId: 'screen-test' },
        { id: 'module-1', name: 'Module 1 Test', prevId: 'module-0' },
        { id: 'number-system', name: 'Number System', prevId: 'module-1' },
        { id: 'flowchart', name: 'Flowchart', prevId: 'number-system' },
        { id: 'module-5', name: 'Phase 1', prevId: 'flowchart' },
        { id: 'module-6', name: 'Phase 2', prevId: 'module-5' },
        { id: 'module-7', name: 'Phase 3', prevId: 'module-6' },
        { id: 'module-8', name: 'Phase 4', prevId: 'module-7' },
        { id: 'module-9', name: 'Phase 5', prevId: 'module-8' },
        { id: 'module-10', name: 'Phase 6', prevId: 'module-9' },
        { id: 'module-11', name: 'Phase 7', prevId: 'module-10' },
    ];

    // Check if a module is locked
    const isLocked = (moduleId: string): boolean => {
        const moduleConfig = MODULE_CHAIN.find(m => m.id === moduleId);
        if (!moduleConfig || !moduleConfig.prevId) return false;

        // Check if previous module is passed
        const prevResult = testResults[moduleConfig.prevId];
        return !prevResult?.passed;
    };

    // Load test results on mount
    useEffect(() => {
        if (user?.email) {
            const results: Record<string, TestResultHistory | null> = {};
            MODULE_CHAIN.forEach(module => {
                results[module.id] = getLatestResult(user.email!, module.id);
            });
            setTestResults(results);
        }
    }, [user?.email]);

    // Show result modal
    const handleShowResult = (result: TestResultHistory | null, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        if (result) {
            setSelectedResult(result);
            setShowResultModal(true);
        }
    };

    // Render star rating
    const renderStars = (score: number) => {
        const rating = getStarRating(score);
        return (
            <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={10} fill={i <= rating ? "currentColor" : "none"} className={i > rating ? "text-slate-600" : ""} />
                ))}
            </div>
        );
    };

    // Get greeting based on current time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return 'Good Morning! ☀️';
        } else if (hour >= 12 && hour < 17) {
            return 'Good Afternoon! 🌤️';
        } else if (hour >= 17 && hour < 21) {
            return 'Good Evening! 🌅';
        } else {
            return 'Good Night! 🌙';
        }
    };

    return (
        <div className="flex w-full h-full bg-[#FAFBFF] text-slate-800 font-sans overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-72 bg-white flex flex-col border-r border-slate-100 flex-shrink-0">
                {/* Logo */}
                <div className="p-8 flex items-center">
                    <img src="/navgurukul-logo.png" alt="NavGurukul" className="h-10 object-contain" />
                </div>



                <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Main Experience</div>

                    <a href="#" className="flex items-center gap-4 px-4 py-4 rounded-xl bg-[#F0EFFF] text-[#6C5DD3] font-bold">
                        <Home size={20} />
                        <span>Home Dashboard</span>
                    </a>

                    {/* Admin Panel - Only for Super Admin */}
                    {role === 'superadmin' && (
                        <button onClick={() => onStart('admin-panel')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-yellow-50 hover:text-yellow-600 font-bold transition-colors group text-left">
                            <div className="p-2 bg-yellow-50 text-yellow-500 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                <Crown size={18} />
                            </div>
                            <span>Admin Panel</span>
                        </button>
                    )}

                    <button onClick={() => onStart('navgurukul-names')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-teal-50 text-teal-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Users size={18} />
                        </div>
                        <span>NavGurukul</span>
                    </button>

                    <button onClick={() => onStart('screen-test')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Monitor size={18} />
                        </div>
                        <span>Screening Test</span>
                    </button>



                    <button onClick={() => !isLocked('module-0') && onStart('module-0')} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-colors group text-left ${isLocked('module-0') ? 'text-slate-300 pointer-events-none' : 'text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3]'}`}>
                        <div className={`p-2 rounded-lg transition-colors ${isLocked('module-0') ? 'bg-slate-100 text-slate-300' : 'bg-orange-50 text-orange-500 group-hover:bg-[#6C5DD3] group-hover:text-white'}`}>
                            {isLocked('module-0') ? <Lock size={18} /> : <Terminal size={18} />}
                        </div>
                        <span>Module 0 Test</span>
                    </button>

                    <button onClick={() => !isLocked('module-1') && onStart('module-1')} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-colors group text-left ${isLocked('module-1') ? 'text-slate-300 pointer-events-none' : 'text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3]'}`}>
                        <div className={`p-2 rounded-lg transition-colors ${isLocked('module-1') ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500 group-hover:bg-[#6C5DD3] group-hover:text-white'}`}>
                            {isLocked('module-1') ? <Lock size={18} /> : <Braces size={18} />}
                        </div>
                        <span>Module 1 Test</span>
                    </button>
                    <button onClick={() => !isLocked('number-system') && onStart('number-system')} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-colors group text-left ${isLocked('number-system') ? 'text-slate-300 pointer-events-none' : 'text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3]'}`}>
                        <div className={`p-2 rounded-lg transition-colors ${isLocked('number-system') ? 'bg-slate-100 text-slate-300' : 'bg-purple-50 text-purple-500 group-hover:bg-[#6C5DD3] group-hover:text-white'}`}>
                            {isLocked('number-system') ? <Lock size={18} /> : <LayoutDashboard size={18} />}
                        </div>
                        <span>Number System </span>
                    </button>

                    <button onClick={() => !isLocked('flowchart') && onStart('flowchart')} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-colors group text-left ${isLocked('flowchart') ? 'text-slate-300 pointer-events-none' : 'text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3]'}`}>
                        <div className={`p-2 rounded-lg transition-colors ${isLocked('flowchart') ? 'bg-slate-100 text-slate-300' : 'bg-cyan-50 text-cyan-500 group-hover:bg-[#6C5DD3] group-hover:text-white'}`}>
                            {isLocked('flowchart') ? <Lock size={18} /> : <GitBranch size={18} />}
                        </div>
                        <span>Flowchart</span>
                    </button>

                    <button onClick={() => onStart('phase-dashboard')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <LayoutDashboard size={18} />
                        </div>
                        <span>Phase Dashboard</span>
                    </button>

                    <button onClick={() => onStart('module-5')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Code size={18} />
                        </div>
                        <span>Phase 1</span>
                    </button>

                    <button onClick={() => onStart('module-6')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Palette size={18} />
                        </div>
                        <span>Phase 2</span>
                    </button>
                    <button onClick={() => onStart('module-7')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-yellow-50 text-yellow-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Zap size={18} />
                        </div>
                        <span>Phase 3</span>
                    </button>

                    <button onClick={() => onStart('module-8')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Code size={18} />
                        </div>
                        <span>Phase 4</span>
                    </button>
                    <button onClick={() => onStart('module-9')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Terminal size={18} />
                        </div>
                        <span>Phase 5</span>
                    </button>

                    <button onClick={() => onStart('module-10')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Layers size={18} />
                        </div>
                        <span>Phase 6</span>
                    </button>

                    <button onClick={() => onStart('module-11')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-violet-50 text-violet-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Zap size={18} />
                        </div>
                        <span>Phase 7</span>
                    </button>
                </nav>

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#FAFBFF]">

                {/* Header */}
                <header className="px-10 py-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#11142D]">Test Dashboard</h2>
                        <p className="text-slate-500 font-medium mt-1">Focus on what's important today</p>
                    </div>

                    <div className="flex items-center gap-6">


                        <div className="relative">
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                    <img
                                        src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'User'}`}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs font-bold text-[#11142D]">{user?.displayName || 'User'}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Premium Member</div>
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </div>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-xs text-slate-400">Signed in as</p>
                                        <p className="text-sm font-medium text-slate-700 truncate">{user?.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowDropdown(false);
                                            onLogout?.();
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">

                    {/* HERO BANNER */}
                    <div className="w-full bg-[#6C5DD3] rounded-[2.5rem] p-10 text-white relative overflow-hidden mb-10 shadow-2xl shadow-indigo-200">
                        {/* Background Decorations */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-purple-400 opacity-20 rounded-full blur-[60px]"></div>

                        <div className="relative z-10 flex items-center justify-between">
                            <div className="max-w-xl">
                                <p className="text-indigo-200 text-lg mb-1">Hello 👋</p>
                                <h2 className="text-4xl font-bold mb-2">{user?.displayName || 'User'}</h2>
                                <p className="text-2xl font-semibold text-indigo-100 mb-6">{getGreeting()}</p>
                                <p className="text-indigo-100 text-lg mb-8 leading-relaxed opacity-90">
                                    Your overall completion rate is <strong className="text-white underline decoration-wavy underline-offset-4 decoration-purple-300">72%</strong>.
                                    Keep up the momentum!
                                </p>
                                <button className="bg-white text-[#6C5DD3] px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20 active:scale-95">
                                    <Plus size={18} strokeWidth={3} />
                                    New Task
                                </button>
                            </div>


                        </div>
                    </div>



                    {/* MODULE CARDS with Dynamic Test Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Card 1: Screen Test */}
                        <div
                            onClick={() => !isLocked('screen-test') && onStart('screen-test')}
                            className={`bg-[#11142D] p-6 rounded-[2rem] shadow-xl transition-all cursor-pointer group relative overflow-hidden ${isLocked('screen-test') ? 'opacity-80' : 'hover:shadow-2xl'}`}
                        >
                            {isLocked('screen-test') && (
                                <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-slate-800 p-4 rounded-full mb-3 shadow-lg border border-slate-700">
                                        <Lock size={32} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-300 font-bold text-sm">Locked</p>
                                    <p className="text-slate-500 text-xs mt-1">Complete previous level</p>
                                </div>
                            )}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Screen Test</h4>
                                    </div>
                                    {testResults['screen-test'] ? (
                                        testResults['screen-test'].passed ? (
                                            <div
                                                onClick={(e) => handleShowResult(testResults['screen-test'], e)}
                                                className="bg-[#E2FBD7] text-[#34B53A] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <CheckCircle2 size={12} /> PASS
                                            </div>
                                        ) : (
                                            <div
                                                onClick={(e) => handleShowResult(testResults['screen-test'], e)}
                                                className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <XCircle size={12} /> FAIL
                                            </div>
                                        )
                                    ) : (
                                        <div className="bg-slate-700 text-slate-400 px-3 py-1 rounded-lg text-xs font-bold">Not Started</div>
                                    )}
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Score</div>
                                        <div className="text-3xl font-black text-white">
                                            {testResults['screen-test'] ? `${Math.round(testResults['screen-test'].score)}%` : '0%'}
                                        </div>
                                    </div>
                                    {testResults['screen-test'] && renderStars(testResults['screen-test'].score)}
                                </div>

                                <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${testResults['screen-test']?.passed ? 'bg-emerald-400' : 'bg-rose-400'}`}
                                        style={{ width: `${testResults['screen-test']?.score || 0}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-3 font-medium">
                                    {testResults['screen-test']
                                        ? `${testResults['screen-test'].correctCount}/${testResults['screen-test'].totalQuestions} correct • ${testResults['screen-test'].date}`
                                        : 'Click to start test'}
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Module 1 Test */}
                        <div
                            onClick={() => !isLocked('module-1') && onStart('module-1')}
                            className={`bg-[#11142D] p-6 rounded-[2rem] shadow-xl transition-all cursor-pointer group relative overflow-hidden ${isLocked('module-1') ? 'opacity-80' : 'hover:shadow-2xl'}`}
                        >
                            {isLocked('module-1') && (
                                <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-slate-800 p-4 rounded-full mb-3 shadow-lg border border-slate-700">
                                        <Lock size={32} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-300 font-bold text-sm">Locked</p>
                                    <p className="text-slate-500 text-xs mt-1">Complete Module 0 first</p>
                                </div>
                            )}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Module 1 Test</h4>
                                    </div>
                                    {testResults['module-1'] ? (
                                        testResults['module-1'].passed ? (
                                            <div
                                                onClick={(e) => handleShowResult(testResults['module-1'], e)}
                                                className="bg-[#E2FBD7] text-[#34B53A] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <CheckCircle2 size={12} /> PASS
                                            </div>
                                        ) : (
                                            <div
                                                onClick={(e) => handleShowResult(testResults['module-1'], e)}
                                                className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <XCircle size={12} /> FAIL ({user?.email ? getFailCount(user.email, 'module-1') : 0})
                                            </div>
                                        )
                                    ) : (
                                        renderStars(0)
                                    )}
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Score</div>
                                        <div className="text-3xl font-black text-white">
                                            {testResults['module-1'] ? `${Math.round(testResults['module-1'].score)}%` : '0%'}
                                        </div>
                                    </div>
                                    {testResults['module-1'] && renderStars(testResults['module-1'].score)}
                                </div>

                                <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden mb-3">
                                    <div
                                        className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${testResults['module-1']?.passed ? 'bg-emerald-400' : 'bg-[#6C5DD3]'}`}
                                        style={{ width: `${testResults['module-1']?.score || 0}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">
                                    {testResults['module-1']
                                        ? `${testResults['module-1'].correctCount}/${testResults['module-1'].totalQuestions} correct • ${testResults['module-1'].date}`
                                        : 'Click to start test'}
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Module 0 Test */}
                        <div
                            onClick={() => !isLocked('module-0') && onStart('module-0')}
                            className={`bg-[#11142D] p-6 rounded-[2rem] shadow-xl transition-all cursor-pointer group border border-slate-50/10 relative overflow-hidden ${isLocked('module-0') ? 'opacity-80' : 'hover:shadow-2xl'}`}
                        >
                            {isLocked('module-0') && (
                                <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-slate-800 p-4 rounded-full mb-3 shadow-lg border border-slate-700">
                                        <Lock size={32} className="text-slate-400" />
                                    </div>
                                    <p className="text-slate-300 font-bold text-sm">Locked</p>
                                    <p className="text-slate-500 text-xs mt-1">Complete Screen Test first</p>
                                </div>
                            )}
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6C5DD3] opacity-10 rounded-full"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Module 0 Test</h4>
                                    </div>
                                    {testResults['module-0'] ? (
                                        testResults['module-0'].passed ? (
                                            <div
                                                onClick={(e) => handleShowResult(testResults['module-0'], e)}
                                                className="bg-[#E2FBD7] text-[#34B53A] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <CheckCircle2 size={12} /> PASS
                                            </div>
                                        ) : (
                                            <div
                                                onClick={(e) => handleShowResult(testResults['module-0'], e)}
                                                className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <XCircle size={12} /> FAIL
                                            </div>
                                        )
                                    ) : (
                                        <MoreHorizontal className="text-slate-500" />
                                    )}
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Score</div>
                                        <div className="text-3xl font-black text-white">
                                            {testResults['module-0'] ? `${Math.round(testResults['module-0'].score)}%` : '0%'}
                                        </div>
                                    </div>
                                    {testResults['module-0'] && renderStars(testResults['module-0'].score)}
                                </div>

                                <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden mb-3">
                                    <div
                                        className={`h-full rounded-full shadow-[0_0_10px_#6C5DD3] ${testResults['module-0']?.passed ? 'bg-emerald-400' : 'bg-[#6C5DD3]'}`}
                                        style={{ width: `${testResults['module-0']?.score || 0}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">
                                    {testResults['module-0']
                                        ? `${testResults['module-0'].correctCount}/${testResults['module-0'].totalQuestions} correct • ${testResults['module-0'].date}`
                                        : 'Click to start test'}
                                </p>
                            </div>
                        </div>


                        {/* DYNAMIC LOCKABLE CARDS */}
                        {MODULE_CHAIN.slice(3).map((module, index) => {
                            const locked = isLocked(module.id);
                            return (
                                <div
                                    key={module.id}
                                    onClick={() => !locked && onStart(module.id)}
                                    className={`bg-[#11142D]/50 border-2 border-[#11142D]/30 p-6 rounded-[2rem] flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-[240px]
                                        ${locked
                                            ? 'opacity-70 border-dashed cursor-not-allowed'
                                            : 'hover:bg-[#11142D] hover:border-[#11142D] cursor-pointer group'
                                        }`}
                                >
                                    {locked && (
                                        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col items-center justify-center backdrop-blur-[1px]">
                                            <div className="bg-slate-800/80 p-3 rounded-full mb-2 shadow-lg border border-slate-700/50">
                                                <Lock size={24} className="text-slate-400" />
                                            </div>
                                            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Locked</p>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <h4 className={`text-xl font-bold transition-colors ${locked ? 'text-slate-500' : 'text-slate-400 group-hover:text-white'}`}>
                                                {module.name}
                                            </h4>
                                            {!locked && (
                                                <div className="bg-slate-200 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 group-hover:bg-slate-700 group-hover:text-slate-300">
                                                    Start
                                                </div>
                                            )}
                                        </div>
                                        {!locked && (
                                            <div className="flex text-slate-300 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} />)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Locked Content Visuals */}
                                    <div className={`absolute -bottom-6 -right-6 text-slate-200 transition-all duration-500 ${locked ? 'opacity-5' : 'opacity-20 group-hover:opacity-10 group-hover:scale-110'}`}>
                                        <Layers size={120} />
                                    </div>

                                    {!locked && (
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 relative z-10">
                                            <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden mb-3">
                                                <div className="h-full bg-slate-600 w-0 rounded-full group-hover:w-full transition-all duration-1000"></div>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium">Click to unlock knowledge</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </main>

            {/* Result Modal */}
            {showResultModal && selectedResult && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowResultModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${selectedResult.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                                {selectedResult.passed ? (
                                    <CheckCircle2 size={32} className="text-green-600" />
                                ) : (
                                    <XCircle size={32} className="text-red-600" />
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">{selectedResult.moduleName}</h3>
                            <p className="text-slate-500 mt-1">{selectedResult.date}</p>
                        </div>

                        {/* Result Badge */}
                        <div className={`text-center py-4 rounded-2xl mb-6 ${selectedResult.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                            <div className={`text-4xl font-black ${selectedResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                                {selectedResult.passed ? '✅ PASS' : '❌ FAIL'}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-50 rounded-2xl p-4 text-center">
                                <div className="text-3xl font-black text-slate-800">{Math.round(selectedResult.score)}%</div>
                                <div className="text-xs text-slate-500 font-medium">Score</div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 text-center">
                                <div className="text-3xl font-black text-green-600">{selectedResult.correctCount}</div>
                                <div className="text-xs text-slate-500 font-medium">Correct</div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 text-center">
                                <div className="text-3xl font-black text-red-600">{selectedResult.wrongCount}</div>
                                <div className="text-xs text-slate-500 font-medium">Wrong</div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 text-center">
                                <div className="text-3xl font-black text-slate-800">{selectedResult.timeTaken}</div>
                                <div className="text-xs text-slate-500 font-medium">Time Taken</div>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center mb-6">
                            {renderStars(selectedResult.score)}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setShowResultModal(false)}
                            className="w-full bg-[#6C5DD3] text-white py-3 rounded-xl font-bold hover:bg-[#5a4eb8] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
};
