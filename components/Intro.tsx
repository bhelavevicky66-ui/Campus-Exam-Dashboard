
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
    <div className="p-8 md:p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-100 p-4 rounded-full">
          <Calculator className="w-12 h-12 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-montserrat">
        Elite Math Challenge
      </h1>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Test your skills with 10 high-level math problems. Enter your name to begin your journey to excellence.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What's your name?"
            required
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:outline-none transition-all text-lg text-center"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
        >
          Start Practice
        </button>
      </form>
      
      <div className="mt-12 flex justify-center gap-4 text-slate-400 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          10 Hard Questions
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          Instant Results
        </div>
      </div>
    </div>
  );
};
