import React from 'react';
import { ArrowLeft, Calendar, Clock, Binary, Cpu, BookOpen, Video, Link2, FlaskConical, CheckSquare, Lightbulb, ExternalLink } from 'lucide-react';

interface PhaseDashboardProps {
    onBack: () => void;
    onPhaseClick?: (moduleId: string) => void;
}

export const PhaseDashboard: React.FC<PhaseDashboardProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-purple-300 hover:text-white transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>
                    <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                        <Binary size={18} className="text-purple-400" />
                        <span className="text-purple-300 font-medium text-sm">Number System</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Hello Everyone! 👋
                    </h1>
                    <p className="text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed">
                        Let's start our journey in problem-solving from the very beginning! Our focus will be on strengthening and sharpening our problem-solving skills step by step.
                    </p>
                </div>

                {/* Plan Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Lightbulb className="text-yellow-400" size={28} />
                        Here's the plan to move forward:
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Clock className="text-blue-400 mt-1" size={22} />
                            <div>
                                <h3 className="font-bold text-blue-300">Daily Practice</h3>
                                <p className="text-blue-200/70">We will dedicate 2 hours every day to problem-solving.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                            <Calendar className="text-orange-400 mt-1" size={22} />
                            <div>
                                <h3 className="font-bold text-orange-300">Wednesday Special</h3>
                                <p className="text-orange-200/70">Since there's a CodeChef contest on Wednesday, our problem-solving session on that day will be focused on the contest only.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                            <CheckSquare className="text-green-400 mt-1" size={22} />
                            <div>
                                <h3 className="font-bold text-green-300">Post-Contest</h3>
                                <p className="text-green-200/70">Solving unsolved questions after every contest is mandatory.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Table */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
                    <h2 className="text-2xl font-bold mb-6">📅 Learning Timeline</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 text-purple-300 font-bold">Topic</th>
                                    <th className="text-left py-4 px-4 text-purple-300 font-bold">Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-4 font-medium">Number Systems</td>
                                    <td className="py-4 px-4 text-green-400 font-bold">2-3 Days</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-4 px-4 font-medium">Flowchart + FCC Path</td>
                                    <td className="py-4 px-4 text-yellow-400 font-bold">30-40 Days</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-4 font-medium">DSA</td>
                                    <td className="py-4 px-4 text-orange-400 font-bold">4 Months</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Purpose */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl p-8 border border-purple-500/30 mb-10">
                    <div className="flex items-start gap-4">
                        <Cpu className="text-purple-400 shrink-0 mt-1" size={32} />
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Purpose of this Phase</h2>
                            <p className="text-purple-200/80 text-lg leading-relaxed">
                                The purpose of this phase is to help you understand what happens when we ask a computer to add two numbers. By exploring this concept, you will develop a familiarity with the binary world! 😊
                            </p>
                        </div>
                    </div>
                </div>

                {/* Number System Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Binary className="text-cyan-400" size={32} />
                        Number System
                    </h2>

                    {/* Reference Material */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Reference Material
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group">
                                <Video className="text-cyan-400" size={20} />
                                <span>History of numbers (video)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group">
                                <Video className="text-cyan-400" size={20} />
                                <span>A brief history of numerical systems (video)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group">
                                <Link2 className="text-cyan-400" size={20} />
                                <span>Odometer simulator</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>

                    {/* Self-Learning Resources */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Self-Learning Resources
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group">
                                <BookOpen className="text-green-400" size={20} />
                                <span>(Read) Saral Number Systems</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group">
                                <Link2 className="text-green-400" size={20} />
                                <span>Number systems and bases explained</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Binary Numbers Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <span className="text-3xl">01</span>
                        Binary Numbers and Conversion
                    </h2>

                    {/* Activity */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                            <FlaskConical size={20} />
                            Activity
                        </h3>
                        <a href="#" className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors group">
                            <span>🖐️ Count on finger activity</span>
                            <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>

                    {/* Reference Material */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Reference Material
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group">
                                <Link2 className="text-cyan-400" size={20} />
                                <span>Sheet of the first few binary numbers</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group">
                                <Link2 className="text-cyan-400" size={20} />
                                <span>💡 Bulb simulator (for binary numbers)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>

                    {/* Self-Learning Resources */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Self-Learning Resources
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group">
                                <BookOpen className="text-green-400" size={20} />
                                <span>(Read) Saral Binary Numbers</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group">
                                <BookOpen className="text-green-400" size={20} />
                                <span>(Read) Saral Conversion of Binary Numbers</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group">
                                <BookOpen className="text-green-400" size={20} />
                                <span>(Read) About Binary</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Why do computers use binary</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Binary Addition</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Binary Conversion</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Conversion of decimal to binary</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) 1's complement and 2's complement</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Binary Subtraction</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Logic Gates Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Cpu className="text-orange-400" size={32} />
                        Logic Gates
                    </h2>

                    {/* Activity */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                            <FlaskConical size={20} />
                            Activity
                        </h3>
                        <a href="#" className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors group">
                            <Video className="text-yellow-400" size={20} />
                            <span>(Video) Can be done using X's and O's</span>
                            <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>

                    {/* Reference Material */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Reference Material
                        </h3>
                        <a href="#" className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group">
                            <Link2 className="text-cyan-400" size={20} />
                            <span>🎮 Logic Gates Simulator</span>
                            <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>

                    {/* Self-Learning Resources */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Self-Learning Resources
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Logic gates</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Implementing all gates using NOR and NAND</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Boolean Algebra Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-10">
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-3xl">🧮</span>
                        Boolean Algebra
                    </h2>
                    <p className="text-purple-300/70 mb-8 text-sm">(Optional, but recommended for people who want to improve in their logic)</p>

                    {/* Self-Learning Resources */}
                    <div>
                        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <BookOpen size={20} />
                            Self-Learning Resources
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Boolean Algebra (Part 1)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Boolean Algebra (Part 2)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Boolean Algebra Examples (Part 1)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
                                <Video className="text-purple-400" size={20} />
                                <span>(Video) Boolean Algebra Examples (Part 2)</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                            <a href="#" className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group">
                                <BookOpen className="text-green-400" size={20} />
                                <span>(Read) Boolean Algebra</span>
                                <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Practice Questions */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-500/30 mb-10">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <CheckSquare className="text-green-400" size={32} />
                        Practice Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                            <span className="text-2xl">✏️</span>
                            <span className="font-medium">Writing the binary counting from 1 to 200</span>
                        </div>
                        <a href="#" className="flex items-center gap-4 p-4 bg-green-500/20 rounded-xl border border-green-500/30 hover:bg-green-500/30 transition-colors group">
                            <span className="text-2xl">📝</span>
                            <span className="font-bold">Take the Quiz</span>
                            <ExternalLink size={16} className="ml-auto opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
