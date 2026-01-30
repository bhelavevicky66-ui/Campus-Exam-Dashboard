
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { Intro } from './components/Intro';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { QuizState, UserResponse, QuizResult } from './types';
import { submitQuiz } from './services/quizService';
import { Loader2 } from 'lucide-react';

const TOTAL_TIME = 3600; // 1 hour in seconds

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>(QuizState.INTRO);
  const [userName, setUserName] = useState('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const responsesRef = useRef<UserResponse[]>([]);
  const timerRef = useRef<number | null>(null);

  const finishQuiz = useCallback(async (finalResponses: UserResponse[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitting(true);
    const timeTaken = TOTAL_TIME - timeLeft;
    
    try {
      const result = await submitQuiz(finalResponses, timeTaken);
      setQuizResult(result);
      setState(QuizState.RESULT);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [timeLeft]);

  const handleStart = (name: string) => {
    setUserName(name);
    setTimeLeft(TOTAL_TIME);
    responsesRef.current = [];
    setState(QuizState.QUIZ);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          finishQuiz(responsesRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleComplete = useCallback((responses: UserResponse[]) => {
    responsesRef.current = responses;
    finishQuiz(responses);
  }, [finishQuiz]);

  const handleRestart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizResult(null);
    setState(QuizState.INTRO);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <Layout>
      {isSubmitting ? (
        <div className="p-24 text-center flex flex-col items-center justify-center animate-pulse">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-full animate-ping"></div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 font-montserrat">Analyzing Results</h3>
          <p className="text-slate-500 font-medium mt-3">Grading your performance...</p>
        </div>
      ) : (
        <>
          {state === QuizState.INTRO && <Intro onStart={handleStart} />}
          {state === QuizState.QUIZ && (
            <Quiz 
              userName={userName} 
              timeLeft={timeLeft}
              onComplete={handleComplete} 
            />
          )}
          {state === QuizState.RESULT && quizResult && (
            <Result userName={userName} result={quizResult} onRestart={handleRestart} />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
