
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Intro } from './components/Intro';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { QuizState, UserResponse, QuizResult } from './types';
import { submitQuiz } from './services/quizService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>(QuizState.INTRO);
  const [userName, setUserName] = useState('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = (name: string) => {
    setUserName(name);
    setState(QuizState.QUIZ);
  };

  const handleComplete = useCallback(async (responses: UserResponse[]) => {
    setIsSubmitting(true);
    try {
      const result = await submitQuiz(responses);
      setQuizResult(result);
      setState(QuizState.RESULT);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong calculating your score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleRestart = () => {
    setQuizResult(null);
    setState(QuizState.INTRO);
  };

  return (
    <Layout>
      {isSubmitting ? (
        <div className="p-20 text-center flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">Calculating your score...</h3>
          <p className="text-slate-400 text-sm mt-2">Checking your answers against the system.</p>
        </div>
      ) : (
        <>
          {state === QuizState.INTRO && <Intro onStart={handleStart} />}
          {state === QuizState.QUIZ && <Quiz userName={userName} onComplete={handleComplete} />}
          {state === QuizState.RESULT && quizResult && (
            <Result userName={userName} result={quizResult} onRestart={handleRestart} />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
