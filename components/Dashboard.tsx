import React, { useState } from 'react';
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
    UserCircle
} from 'lucide-react';
import { UserRole } from '../roles';

interface DashboardProps {
    onStart: (moduleId: string) => void;
    user?: User | null;
    onLogout?: () => void;
    role?: UserRole;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStart, user, onLogout, role = 'user' }) => {
    const [showDropdown, setShowDropdown] = useState(false);

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



                    <button onClick={() => onStart('module-0')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Terminal size={18} />
                        </div>
                        <span>Module 0 Test</span>
                    </button>

                    <button onClick={() => onStart('module-1')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Braces size={18} />
                        </div>
                        <span>Module 1 Test</span>
                    </button>
                      <button onClick={() => onStart('phase-dashboard')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <LayoutDashboard size={18} />
                        </div>
                        <span>Number System </span>
                    </button>

                    <button onClick={() => onStart('screen-test')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-cyan-50 text-cyan-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <GitBranch size={18} />
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

                            {/* Stats Circle/Group */}
                            <div className="hidden lg:flex gap-4">
                                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 min-w-[140px]">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-2">Total Done</div>
                                    <div className="text-4xl font-bold mb-4">72%</div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 w-[72%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 min-w-[140px]">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-2">Total Incomplete</div>
                                    <div className="text-4xl font-bold mb-4">28%</div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-pink-400 w-[28%] rounded-full shadow-[0_0_10px_rgba(244,114,182,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* MODULE CARDS ( styled as "Comparison" cards ) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Card 1: Screen Test (Light Style) */}
                        <div
                            onClick={() => onStart('screen-test')}
                            className="bg-[#11142D] p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Screen Test</h4>
                                    </div>
                                    <div className="bg-[#E2FBD7] text-[#34B53A] px-3 py-1 rounded-lg text-xs font-bold">Jan 31, 2026</div>
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Done</div>
                                        <div className="text-3xl font-black text-white">0%</div>
                                    </div>
                                </div>

                                <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-400 w-0 rounded-full"></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-3 font-medium">0 tasks logged yesterday</p>
                            </div>
                        </div>

                        {/* Card 2: Module 1 (Dark Style) */}
                        <div
                            onClick={() => onStart('module-1')}
                            className="bg-[#11142D] p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Module 1 Test</h4>
                                    </div>
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4].map(i => <Star key={i} size={10} fill="currentColor" />)}
                                        <Star size={10} className="text-slate-600" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Done</div>
                                        <div className="text-3xl font-black text-white">0%</div>
                                    </div>
                                </div>

                                <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden mb-3">
                                    <div className="h-full bg-[#6C5DD3] w-0 rounded-full shadow-[0_0_10px_#6C5DD3]"></div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">0 active tasks today</p>
                            </div>
                        </div>

                        {/* Card 3: Module 0 (Light Style) */}
                        <div
                            onClick={() => onStart('module-0')}
                            className="bg-[#11142D] p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer group border border-slate-50/10 relative overflow-hidden"
                        >
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6C5DD3] opacity-10 rounded-full"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Module 0 Test</h4>
                                    </div>
                                    <MoreHorizontal className="text-slate-500" />
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Done</div>
                                        <div className="text-3xl font-black text-white">0%</div>
                                    </div>
                                </div>

                                <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden mb-3">
                                    <div className="h-full bg-[#6C5DD3] w-0 rounded-full shadow-[0_0_10px_#6C5DD3]"></div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">0 active tasks today</p>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div >
    );
};
