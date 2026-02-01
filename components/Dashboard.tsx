import React from 'react';
import {
    Home,
    Layers,
    Calendar,
    Search,
    Plus,
    Zap,
    MoreHorizontal,
    Star,
    Clock,
    CheckCircle2,
    ChevronDown,
    Monitor
} from 'lucide-react';

interface DashboardProps {
    onStart: (moduleId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
    return (
        <div className="flex w-full h-full bg-[#FAFBFF] text-slate-800 font-sans overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-72 bg-white flex flex-col border-r border-slate-100 flex-shrink-0">
                {/* Logo */}
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#6C5DD3] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Zap className="text-white fill-current" size={20} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#11142D] tracking-tight">ZenPlan</h1>
                </div>

                {/* Main Navigation */}
                <div className="px-6 mb-8">
                    <button className="w-full py-4 bg-[#6C5DD3] hover:bg-[#5b4ec2] text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
                        <Plus size={20} />
                        Add New Task
                    </button>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Main Experience</div>

                    <a href="#" className="flex items-center gap-4 px-4 py-4 rounded-xl bg-[#F0EFFF] text-[#6C5DD3] font-bold">
                        <Home size={20} />
                        <span>Home Dashboard</span>
                    </a>

                    <button onClick={() => onStart('screen-test')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Monitor size={18} />
                        </div>
                        <span>Screen Test</span>
                    </button>

                    <button onClick={() => onStart('module-1')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Clock size={18} />
                        </div>
                        <span>Module 1 Test</span>
                    </button>

                    <button onClick={() => onStart('module-0')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#6C5DD3] font-bold transition-colors group text-left">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg group-hover:bg-[#6C5DD3] group-hover:text-white transition-colors">
                            <Layers size={18} />
                        </div>
                        <span>Module 0 Test</span>
                    </button>
                </nav>

                {/* Sidebar Stats */}
                <div className="p-6 mt-auto">
                    <div className="bg-slate-50 rounded-2xl p-5 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Daily Streak</span>
                            <Clock size={16} className="text-slate-400" />
                        </div>
                        <div className="text-2xl font-black text-slate-800">0</div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5">
                        <div className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-4">Board Performance</div>

                        <div className="mb-3">
                            <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-slate-600">Complete</span>
                                <span className="text-emerald-500">72%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[72%] rounded-full"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-slate-600">Incomplete</span>
                                <span className="text-red-400">28%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-red-400 w-[28%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#FAFBFF]">

                {/* Header */}
                <header className="px-10 py-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#11142D]">My Workspace</h2>
                        <p className="text-slate-500 font-medium mt-1">Focus on what's important today</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="pl-12 pr-4 py-3 bg-white rounded-full text-sm font-semibold text-slate-700 placeholder:text-slate-400 w-64 focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-bold text-[#11142D]">vicky bhelave</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Premium Member</div>
                            </div>
                            <ChevronDown size={14} className="text-slate-400" />
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
                                <h2 className="text-4xl font-bold mb-4">Good Evening, Achiever!</h2>
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

                    <div className="flex items-center gap-2 mb-6 text-[#11142D] font-bold text-lg">
                        <Calendar size={20} className="text-[#6C5DD3]" />
                        <h3>Daily Comparison</h3>
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
        </div>
    );
};
