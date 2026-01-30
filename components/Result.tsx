
import React from 'react';
import { QuizResult } from '../types';
import { Trophy, RefreshCw, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

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
    return "Hard luck, but don't worry! Every mistake is a learning step.";
  };

  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="p-8 md:p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className={`p-5 rounded-full ${result.score >= 60 ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
          <Trophy className="w-14 h-14" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mb-2 font-montserrat">
        Well Done, {userName}!
      </h2>
      <p className="text-slate-500 mb-8">{getMotivationalMessage(result.score)}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-2xl">
          <div className="text-2xl font-bold text-indigo-600">{Math.round(result.score)}%</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Score</div>
        </div>
        <div className="bg-green-50 p-4 rounded-2xl">
          <div className="text-2xl font-bold text-green-600">{result.correctCount}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Correct</div>
        </div>
        <div className="bg-red-50 p-4 rounded-2xl">
          <div className="text-2xl font-bold text-red-600">{result.wrongCount}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Incorrect</div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
        >
          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors py-2 text-sm font-medium"
        >
          {showDetails ? <><ChevronUp size={16} /> Hide Details</> : <><ChevronDown size={16} /> Show Review</>}
        </button>

        {showDetails && (
          <div className="mt-4 text-left max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {result.details.map((detail, idx) => (
              <div key={idx} className={`p-3 rounded-xl border flex items-start gap-3 ${detail.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                {detail.isCorrect ? <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" /> : <XCircle size={18} className="text-red-500 mt-1 shrink-0" />}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Q{idx + 1}</div>
                  <div className="text-sm font-medium text-slate-800">Your Answer: {detail.userAnswer || 'Empty'}</div>
                  {!detail.isCorrect && (
                    <div className="text-xs text-red-600 mt-1">Correct: <span className="font-bold">{detail.correctAnswer}</span></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
