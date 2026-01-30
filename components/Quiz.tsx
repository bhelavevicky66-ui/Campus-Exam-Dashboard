
import React, { useState, useEffect } from 'react';
import { MATH_QUESTIONS } from '../constants';
import { UserResponse } from '../types';
import { ChevronRight, Send, AlertCircle } from 'lucide-react';

interface QuizProps {
  userName: string;
  onComplete: (responses: UserResponse[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ userName, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [responses, setResponses] = useState<UserResponse[]>([]);
  
  const currentQuestion = MATH_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / MATH_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (!currentAnswer.trim()) return;

    const newResponse: UserResponse = {
      questionId: currentQuestion.id,
      answer: currentAnswer.trim()
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);

    if (currentIndex < MATH_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      onComplete(newResponses);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Question {currentIndex + 1} of {MATH_QUESTIONS.length}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            Student: {userName}
          </span>
        </div>

        <div className="min-h-[140px] flex items-center justify-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <input
              type={currentQuestion.type === 'number' ? 'text' : 'text'}
              autoFocus
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:outline-none transition-all text-xl text-center placeholder:text-slate-300 shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currentAnswer.trim()) handleNext();
              }}
            />
          </div>

          {currentQuestion.hint && (
            <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg text-sm italic">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>Hint: {currentQuestion.hint}</span>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className={`flex items-center gap-2 font-semibold py-4 px-10 rounded-xl shadow-lg transition-all transform active:scale-95 text-lg
                ${!currentAnswer.trim() 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:-translate-y-0.5'}`}
            >
              {currentIndex === MATH_QUESTIONS.length - 1 ? (
                <>Finish Quiz <Send size={20} /></>
              ) : (
                <>Next Question <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
