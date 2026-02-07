
import React from 'react';
import { QuizResult } from '../types';
import { Trophy, RefreshCw, CheckCircle2, XCircle, ChevronDown, ChevronUp, Clock, Target } from 'lucide-react';

interface ResultProps {
  userName: string;
  result: QuizResult;
  onRestart: () => void;
}

export const Result: React.FC<ResultProps> = ({ userName, result, onRestart }) => {
  const getMotivationalMessage = (score: number) => {
    if (score === 100) return "Mastermind! Perfect score!";
    if (score >= 80) return "Excellent work! You're a math pro.";
    if (score >= 60) return "Good effort! Keep practicing to get even better.";
    if (score >= 40) return "Nice try! Don't give up on the challenge.";
    return "Time was tough, but don't worry! Keep learning.";
  };

  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar">
      <div className="p-8 md:p-12 text-center animate-in zoom-in duration-500 max-w-7xl mx-auto">
        <div className="flex justify-center mb-6 relative">
          <div className={`p-6 rounded-full ${result.score >= 60 ? 'bg-yellow-100 text-yellow-600' : 'bg-indigo-100 text-indigo-600'} animate-bounce duration-1000`}>
            <Trophy className="w-16 h-16" />
          </div>
          <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Final Result
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 font-montserrat">
          {result.correctCount >= 18 ? `Great Job, ${userName}! 🎉` : `Keep Trying, ${userName}! 💪`}
        </h2>
        <p className="text-slate-500 mb-8 text-lg font-medium">
          {result.correctCount >= 18
            ? getMotivationalMessage(result.score)
            : "Don't give up! Practice makes perfect."}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-black text-indigo-600">{Math.round(result.score)}%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Accuracy</div>
          </div>
          <div className="bg-green-50 p-5 rounded-3xl border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center gap-1">
              <Target size={18} className="text-green-500" />
              <div className="text-3xl font-black text-green-600">{result.correctCount}</div>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Correct</div>
          </div>
          <div className="bg-red-50 p-5 rounded-3xl border border-red-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-black text-red-600">{result.wrongCount}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Mistakes</div>
          </div>
          <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center gap-1">
              <Clock size={18} className="text-blue-500" />
              <div className="text-xl font-black text-blue-600">{result.timeTaken}</div>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Duration</div>
          </div>
        </div>

        {/* Pass/Fail Status */}
        <div className={`mb-8 p-6 rounded-3xl border-2 ${result.correctCount >= 18
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'}`}>
          <div className="flex items-center justify-center gap-4">
            {result.correctCount >= 18 ? (
              <>
                <div className="p-3 bg-green-500 rounded-full">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <div>
                  <div className="text-4xl font-black text-green-600">PASS ✅</div>
                  <div className="text-sm text-green-600/70 font-medium">Congratulations! You passed the test!</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-red-500 rounded-full">
                  <XCircle size={32} className="text-white" />
                </div>
                <div>
                  <div className="text-4xl font-black text-red-600">FAIL ❌</div>
                  <div className="text-sm text-red-600/70 font-medium">You need 18+ correct answers to pass. Keep practicing!</div>
                </div>
              </>
            )}
          </div>
          <div className="mt-4 text-center">
            <span className={`text-sm font-bold ${result.correctCount >= 18 ? 'text-green-600' : 'text-red-600'}`}>
              Passing criteria: 18/{result.correctCount + result.wrongCount} correct answers (60%)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 group text-xl"
          >
            <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-700" />
            Retake Challenge
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors py-3 text-sm font-bold uppercase tracking-widest"
          >
            {showDetails ? <><ChevronUp size={20} /> Hide Performance Review</> : <><ChevronDown size={20} /> View Performance Review</>}
          </button>

          {showDetails && (
            <div className="mt-6 text-left space-y-4">
              {result.details.map((detail, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border-2 flex items-start gap-4 transition-all hover:scale-[1.01] ${detail.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                  <div className={`shrink-0 p-2 rounded-xl ${detail.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {detail.isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Question {idx + 1}</div>
                    </div>
                    <div className="text-base font-semibold text-slate-800 mt-1">
                      Your Answer: <span className={detail.isCorrect ? 'text-green-700' : 'text-red-700'}>{detail.userAnswer || 'Skipped'}</span>
                    </div>
                    {!detail.isCorrect && (
                      <div className="text-sm font-bold text-indigo-600 mt-1 bg-white inline-block px-3 py-1 rounded-lg border border-indigo-50">
                        Correct: {detail.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
