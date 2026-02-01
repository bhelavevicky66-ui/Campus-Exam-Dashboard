import React from 'react';
import { BookOpen, Clock, Award, Play } from 'lucide-react';

interface IntroProps {
  onStart: (name: string) => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-hidden items-center justify-center p-6 md:p-12 relative">

      {/* Background Decor (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-[60px] opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#6C5DD3] tracking-tight mb-3">
            To Campus Exam Dashboard
          </h1>
          <p className="text-lg text-slate-500 font-bold">
            Welcome back! Ready to challenge yourself today?
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">

          {/* Card 1: Total Questions */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-bold text-[#11142D] uppercase tracking-wide">Total Questions</span>
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-500">
                <BookOpen size={20} />
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#11142D] mb-1">30</div>
              <div className="text-sm font-bold text-slate-400">Across 3 categories</div>
            </div>
          </div>

          {/* Card 2: Time Limit */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-bold text-[#11142D] uppercase tracking-wide">Time Limit</span>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500">
                <Clock size={20} />
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#11142D] mb-1">60m</div>
              <div className="text-sm font-bold text-slate-400">To complete the exam</div>
            </div>
          </div>

          {/* Card 3: Passing Score */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-bold text-[#11142D] uppercase tracking-wide">Passing Score</span>
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-500">
                <Award size={20} />
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#11142D] mb-1">75%</div>
              <div className="text-sm font-bold text-slate-400">Required to pass</div>
            </div>
          </div>

        </div>

        {/* Bottom Banner (Purple) */}
        <div className="w-full bg-[#6C5DD3] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          {/* Banner Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity"></div>

          <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Ready to begin?</h2>
            <p className="text-indigo-100 text-sm md:text-base max-w-lg leading-relaxed font-medium">
              Test your knowledge in logic, mathematics, and critical thinking. <br className="hidden md:block" />
              Ensure you have a stable internet connection before starting.
            </p>
          </div>

          <button
            onClick={() => onStart("Vicky Bhelave")} // Assuming user is logged in
            className="relative z-10 bg-white text-[#6C5DD3] px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-slate-50 transition-all shadow-lg shadow-indigo-900/20 hover:shadow-xl active:scale-95 whitespace-nowrap"
          >
            Start New Exam
            <Play fill="currentColor" size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
