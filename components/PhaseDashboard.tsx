import React from 'react';
import { ArrowLeft, Clock, Layers, CheckCircle2, BookOpen, FileCheck, Video, Target, Zap, Code, Palette, Terminal, Database } from 'lucide-react';

interface PhaseDashboardProps {
    onBack: () => void;
    onPhaseClick: (moduleId: string) => void;
}

export const PhaseDashboard: React.FC<PhaseDashboardProps> = ({ onBack, onPhaseClick }) => {
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-purple-50 p-6 md:p-10">
            {/* Header */}
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#6C5DD3] font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-[#6C5DD3] to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">🎯 Phase Dashboard - Milestones</h1>
                    <p className="text-purple-100 text-lg">Complete learning path with timeline and assessment criteria</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Induction Timeline */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Clock size={24} className="text-[#6C5DD3]" />
                            Induction Timeline
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                <span className="bg-[#6C5DD3] text-white text-sm font-bold px-4 py-2 rounded-full">15 days</span>
                                <span className="text-slate-700 font-medium text-lg">Induction Period</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <span className="bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full">2 days</span>
                                <div>
                                    <span className="text-slate-700 font-medium">How does the computer work (binary number system etc)</span>
                                    <p className="text-slate-500 text-sm">1 facilitator led activity + bot - Shweta and Nigam</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <span className="bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full">ETA 30th</span>
                                <span className="text-slate-700 font-medium">Flowcharts + conversion of flowcharts to code + Phase 1 and Phase 2</span>
                            </div>
                        </div>
                    </section>

                    {/* Phase Timeline Table */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 overflow-x-auto">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Layers size={24} className="text-[#6C5DD3]" />
                            Phase Timeline
                        </h2>
                        <table className="w-full border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#6C5DD3] to-purple-500 text-white">
                                    <th className="p-4 text-left font-bold rounded-tl-xl">Phase</th>
                                    <th className="p-4 text-left font-bold">Project/Activity</th>
                                    <th className="p-4 text-left font-bold">Timeline</th>
                                    <th className="p-4 text-center font-bold rounded-tr-xl">Videos (2 min each)</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                <tr className="border-b border-slate-100 hover:bg-indigo-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-5')}>
                                    <td className="p-4 font-bold text-indigo-600 flex items-center gap-2">
                                        <Code size={18} />Phase 1
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">HTML Basic</div>
                                        <div className="text-sm text-slate-500">Student Profile & Course Portal (HTML Only)</div>
                                    </td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">3 - 5 days</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5-10 videos</span></td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-purple-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-6')}>
                                    <td className="p-4 font-bold text-purple-600 flex items-center gap-2">
                                        <Palette size={18} />Phase 2
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">HTML and CSS</div>
                                        <div className="text-sm text-slate-500">Apply CSS to Phase 1 project</div>
                                    </td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">5 – 6 days</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5-10 videos</span></td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-yellow-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-7')}>
                                    <td className="p-4 font-bold text-yellow-600 flex items-center gap-2">
                                        <Zap size={18} />Phase 3
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">JavaScript Basic && DOM</div>
                                        <div className="text-sm text-slate-500">Quiz APP</div>
                                    </td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">5 – 6 days</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5-10 videos</span></td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-8')}>
                                    <td className="p-4 font-bold text-blue-600 flex items-center gap-2">
                                        <Code size={18} />Phase 4
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">JavaScript ES6 & Gemini API Introduction</div>
                                        <div className="text-sm text-slate-500">AI-Powered Content Generator</div>
                                    </td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">5 – 7 days</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5-10 videos</span></td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-emerald-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-9')}>
                                    <td className="p-4 font-bold text-emerald-600 flex items-center gap-2">
                                        <Terminal size={18} />Phase 5
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">Node.js & Express.js with Gemini API</div>
                                        <div className="text-sm text-slate-500">"Ask Gemini" Web App</div>
                                    </td>
                                    <td className="p-4"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">7 – 9 days</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5-10 videos</span></td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-orange-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-10')}>
                                    <td className="p-4 font-bold text-orange-600 flex items-center gap-2">
                                        <Database size={18} />Phase 6
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">Database with MongoDB & Mongoose</div>
                                        <div className="text-sm text-slate-500">Student Feedback Manager</div>
                                    </td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">5 - 6 days</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5-10 videos</span></td>
                                </tr>
                                <tr className="hover:bg-violet-50 transition-colors cursor-pointer" onClick={() => onPhaseClick('module-11')}>
                                    <td className="p-4 font-bold text-violet-600 flex items-center gap-2">
                                        <Target size={18} />Phase 7
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">Final Full-Stack Project with AI Integration</div>
                                        <div className="text-sm text-slate-500">CollabSphere or other</div>
                                    </td>
                                    <td className="p-4"><span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Depends on project</span></td>
                                    <td className="p-4 text-center"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">7+ videos</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Future Goals */}
                    <section className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg text-white">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <Target size={24} />
                            Final Goals
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
                                <div className="font-bold mb-2">🤖 AI Progress Project</div>
                                <p className="text-emerald-50 text-sm">Based on what will be relevant then</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
                                <div className="font-bold mb-2">💼 2 Real-Life Projects</div>
                                <p className="text-emerald-50 text-sm">Paid projects or internships at a tech-focused org</p>
                            </div>
                        </div>
                    </section>

                    {/* Assessment Criteria */}
                    <section className="bg-gradient-to-r from-[#11142D] to-slate-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <FileCheck size={24} className="text-emerald-400" />
                            Assessment Criteria
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                                <div className="text-emerald-400 font-bold mb-2 text-lg">🧠 Problem Articulation</div>
                                <p className="text-slate-300 text-sm">Understanding the problem / prompt engineering</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                                <div className="text-blue-400 font-bold mb-2 text-lg">💪 Solution Robustness</div>
                                <p className="text-slate-300 text-sm">Conceptual clarity / robustness / visual appeal</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                                <div className="text-purple-400 font-bold mb-2 text-lg">🗣️ Communication</div>
                                <p className="text-slate-300 text-sm">Solution explanation & presentation skills</p>
                            </div>
                        </div>
                    </section>

                    {/* Key Notes */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <BookOpen size={24} className="text-[#6C5DD3]" />
                            Key Notes
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                                <CheckCircle2 className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-700">Initial phase will have more structured support with courses to go through</span>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                                <CheckCircle2 className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-700">Fun games like Flexbox Froggy will be added to build interest and visualize concepts</span>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
                                <CheckCircle2 className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-700">3 weekends: Concept check competition days | 1 weekend: AI new tools hackathon</span>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl">
                                <Video className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-700">5-10 conceptual videos (2 minutes each) per phase to upload on YouTube</span>
                            </div>
                        </div>
                    </section>

                    {/* To Do Section */}
                    <section className="bg-amber-50 rounded-2xl p-6 shadow-lg border border-amber-200">
                        <h2 className="text-xl font-bold text-amber-800 mb-4">📋 To Do: Prachi, Nigam, Tanuja, Shweta (25/07/2025)</h2>
                        <ul className="space-y-2 text-amber-700">
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>In initial phase - have more support with structured courses</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>Add ETA to milestones</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>Add fun games (Flexbox Froggy etc.) to the learning path</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>•</span>
                                <span>Build the bot for Phase 1</span>
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
};
