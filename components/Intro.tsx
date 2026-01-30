
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface IntroProps {
  onStart: (name: string) => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="bg-indigo-100 p-6 rounded-3xl shadow-xl shadow-indigo-100/50 animate-bounce duration-[2000ms]">
          <Calculator className="w-16 h-16 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-montserrat tracking-tight">
        Elite Math Challenge
      </h1>
      <p className="text-xl text-slate-500 mb-12 max-w-2xl font-medium leading-relaxed">
        Sharpen your intellect with 30 high-difficulty math problems across 5 diverse categories. Ready to prove your expertise?
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="relative group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Student Name"
            required
            autoFocus
            className="w-full px-8 py-6 rounded-3xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-[12px] focus:ring-indigo-50 focus:outline-none transition-all text-2xl text-center font-bold shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 rounded-3xl shadow-2xl shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 text-xl tracking-wide"
        >
          Begin Practice Session
        </button>
      </form>
      
      <div className="mt-20 flex flex-wrap justify-center gap-8 text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-200"></div>
          <span className="text-sm font-black uppercase tracking-widest">30 Questions</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-200"></div>
          <span className="text-sm font-black uppercase tracking-widest">Global Ranking</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-200"></div>
          <span className="text-sm font-black uppercase tracking-widest">BODMAS & Algebra</span>
        </div>
      </div>
    </div>
  );
};
