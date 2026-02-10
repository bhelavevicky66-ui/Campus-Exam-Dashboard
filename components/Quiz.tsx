import React, { useState, useEffect, useMemo } from 'react';
import { UserResponse, Question } from '../types';
import { ChevronRight, ChevronLeft, Send, AlertCircle, Clock, CheckCircle, Menu, X } from 'lucide-react';

interface QuizProps {
  userName: string;
  timeLeft: number;
  questions: Question[]; // Added questions prop
  onComplete: (responses: UserResponse[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ userName, timeLeft, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<string, string>>({});
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentQuestion = questions[currentIndex];
  // Filter out empty answers
  const answeredCount = Object.values(allAnswers).filter((ans: string) => ans.trim() !== '').length;
  const progress = (answeredCount / questions.length) * 100;

  const categories = useMemo(() => {
    const groups: Record<string, Question[]> = {};
    questions.forEach((q) => {
      if (!groups[q.category]) groups[q.category] = [];
      groups[q.category].push(q);
    });
    return groups;
  }, [questions]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNavigate = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    setSidebarOpen(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 200);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      handleNavigate(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleNavigate(currentIndex - 1);
    }
  };

  const onInputChange = (val: string) => {
    setAllAnswers(prev => ({
      ...prev,
      [String(currentQuestion.id)]: val
    }));
  };

  const handleSubmit = () => {
    const responses: UserResponse[] = questions.map(q => ({
      questionId: q.id,
      answer: allAnswers[String(q.id)] || ''
    }));
    onComplete(responses);
  };

  return (
    <div className="flex flex-1 h-full bg-white min-h-0 overflow-hidden">
      {/* Main Question Area */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Compact Progress Bar */}
        <div className="h-1.5 w-full bg-slate-50 overflow-hidden shrink-0 border-b border-slate-100">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Header - More Compact */}
        <header className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Candidate</span>
              <span className="text-sm font-bold text-slate-800">{userName}</span>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono text-base font-black border transition-all duration-300 shadow-sm
            ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-slate-50 text-indigo-700 border-slate-100'}`}>
            <Clock size={16} className={timeLeft < 300 ? 'animate-spin-slow' : ''} />
            {formatTime(timeLeft)}
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Questions</span>
            <span className="text-sm font-bold text-green-600">{answeredCount}/{questions.length} Done</span>
          </div>
        </header>

        {/* Content - Responsive Padding */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center custom-scrollbar">
          <div className={`w-full max-w-2xl transition-all duration-300 transform
            ${isAnimating
              ? (direction === 'next' ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8')
              : 'opacity-100 translate-x-0'}`}>

            {/* Category Name - Big Letters Above */}
            <div className="mb-6 flex justify-center">
              <span className="text-2xl md:text-3xl font-black text-indigo-600 uppercase tracking-wider">
                {currentQuestion.category}
              </span>
            </div>

            <div
              className="bg-slate-50/50 rounded-[2rem] p-6 md:p-10 border border-slate-100 flex items-center justify-center min-h-[160px] shadow-sm mb-8 relative group no-select"
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-indigo-500 rounded-r-full"></div>
              
              {/* Marks Badge - Top Right Corner */}
              <span className="absolute top-4 right-4 text-xs font-black text-green-600 uppercase tracking-wide bg-green-50 px-3 py-1.5 rounded-full border border-green-200 flex items-center gap-1 shadow-sm">
                <span className="text-green-500">★</span>
                {currentQuestion.marks || 1} {(currentQuestion.marks || 1) === 1 ? 'Mark' : 'Marks'}
              </span>
              
              <h2 className="text-2xl md:text-4xl font-black text-slate-800 text-center leading-tight font-montserrat tracking-tight group-hover:scale-[1.02] transition-transform no-select">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={allAnswers[String(currentQuestion.id)] || ''}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder || "Answer..."}
                  className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 focus:outline-none transition-all text-2xl text-center placeholder:text-slate-200 font-bold text-indigo-600 shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (allAnswers[String(currentQuestion.id)] || '').trim()) handleNext();
                  }}
                />
                {allAnswers[String(currentQuestion.id)] && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in">
                    <CheckCircle size={24} fill="currentColor" className="text-white bg-green-500 rounded-full" />
                  </div>
                )}
              </div>

              {currentQuestion.hint && (
                <div className="flex items-start gap-3 text-indigo-700 bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/20 text-xs font-semibold italic">
                  <AlertCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                  <span>Tip: {currentQuestion.hint}</span>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer - Compact Controls */}
        <footer className="p-4 md:px-6 bg-white border-t border-slate-50 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || isAnimating}
            className={`flex items-center gap-2 font-black py-2.5 px-4 rounded-xl transition-all active:scale-95 text-sm
              ${currentIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-100'}`}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex gap-3">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="flex items-center gap-2 font-black py-3 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:scale-95 text-base"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isAnimating}
                className="flex items-center gap-2 font-black py-3 px-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-100 transition-all transform hover:-translate-y-0.5 active:scale-95 text-base"
              >
                Submit <Send size={18} />
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* Navigation Sidebar - Integrated */}
      <aside className={`fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-0 lg:w-72 bg-white lg:border-l border-slate-100 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>

        <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-white shrink-0">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Navigator</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-50 rounded-lg text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-slate-50/20">
          <div className="space-y-6">
            {(Object.entries(categories) as [string, Question[]][]).map(([categoryName, categoryQuestions]) => (
              <div key={categoryName} className="space-y-2.5">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{categoryName}</h4>
                <div className="grid grid-cols-5 gap-1.5">
                  {categoryQuestions.map((q) => {
                    // Find the global index of this question in the main questions array
                    const globalIdx = questions.findIndex(item => item.id === q.id);
                    const isCurrent = globalIdx === currentIndex;
                    const isAnswered = allAnswers[String(q.id)] && allAnswers[String(q.id)].trim() !== '';
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleNavigate(globalIdx)}
                        className={`w-full aspect-square rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center justify-center border
                          ${isCurrent
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 z-10 scale-105'
                            : isAnswered
                              ? 'bg-green-50 border-green-200 text-green-600'
                              : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-300'}`}
                      >
                        {globalIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-white border-t border-slate-50 shrink-0">
          <div className="flex items-center justify-between px-2">
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-800 leading-none">{answeredCount}</span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Done</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-black text-slate-800 leading-none">{questions.length - answeredCount}</span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Left</span>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #F1F5F9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #E2E8F0;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Anti-copy protection */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
    </div>
  );
};
