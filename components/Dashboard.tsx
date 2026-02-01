import React from 'react';
import { Play, TrendingUp, Clock, Award, BookOpen } from 'lucide-react';

interface DashboardProps {
    onStart: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8 text-center animate-fade-in-down">
                <h1 className="text-4xl font-extrabold text-slate-800 font-montserrat mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Campus Exam Dashboard
                </h1>
                <p className="text-lg text-slate-600 font-medium">
                    Welcome back! Ready to challenge yourself today?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700">Total Questions</h3>
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <BookOpen className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-800">30</p>
                    <p className="text-sm text-slate-500 mt-1">Across 3 categories</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700">Time Limit</h3>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-800">60m</p>
                    <p className="text-sm text-slate-500 mt-1">To complete the exam</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700">Passing Score</h3>
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Award className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-800">75%</p>
                    <p className="text-sm text-slate-500 mt-1">Required to pass</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400 opacity-10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3 transition-transform duration-700 group-hover:scale-110"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-6 text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-3">Ready to begin?</h2>
                        <p className="text-indigo-100 max-w-lg">
                            Test your knowledge in logic, mathematics, and critical thinking.
                            Ensure you have a stable internet connection before starting.
                        </p>
                    </div>

                    <button
                        onClick={onStart}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        <span>Start New Exam</span>
                        <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>Last updated: just now</span>
                </div>
            </div>
        </div>
    );
};
