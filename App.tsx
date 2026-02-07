
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Intro } from './components/Intro';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { Phase1 } from './components/Phase1';
import { Phase2 } from './components/Phase2';
import { Phase3 } from './components/Phase3';
import { Phase4 } from './components/Phase4';
import { Phase5 } from './components/Phase5';
import { Phase6 } from './components/Phase6';
import { Phase7 } from './components/Phase7';
import { PhaseDashboard } from './components/PhaseDashboard';
import { NavGurukul } from './components/NavGurukul';
import { AdminPanel } from './components/AdminPanel';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizState, UserResponse, QuizResult } from './types';
import { submitQuiz } from './services/quizService';
import { saveTestResult, TestResultHistory } from './services/testHistoryService';
import { MODULES } from './constants';
import { Loader2 } from 'lucide-react';

const TOTAL_TIME = 3600; // 1 hour in seconds

const AppContent: React.FC = () => {
  const { user, loading, role, logout } = useAuth();
  const [state, setState] = useState<QuizState>(QuizState.DASHBOARD);
  const [userName, setUserName] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const responsesRef = useRef<UserResponse[]>([]);
  const timerRef = useRef<number | null>(null);

  // Set username from user when logged in
  useEffect(() => {
    if (user?.displayName) {
      setUserName(user.displayName);
    }
  }, [user]);

  const finishQuiz = useCallback(async (finalResponses: UserResponse[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitting(true);
    const timeTaken = TOTAL_TIME - timeLeft;

    try {
      const result = await submitQuiz(finalResponses, timeTaken);
      setQuizResult(result);

      // Save test result to history
      if (user?.email && selectedModuleId) {
        const moduleInfo = MODULES[selectedModuleId as keyof typeof MODULES];
        const historyResult: TestResultHistory = {
          moduleId: selectedModuleId,
          moduleName: moduleInfo?.title || selectedModuleId,
          score: result.score,
          correctCount: result.correctCount,
          wrongCount: result.wrongCount,
          totalQuestions: result.correctCount + result.wrongCount,
          timeTaken: result.timeTaken,
          passed: result.correctCount >= 18, // 60% passing criteria
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          timestamp: Date.now(),
          wrongAnswers: result.details
            .filter(d => !d.isCorrect)
            .map(d => ({
              question: moduleInfo?.questions.find(q => q.id === d.questionId)?.question || "Unknown Question",
              userAnswer: d.userAnswer,
              correctAnswer: d.correctAnswer
            }))
        };
        saveTestResult(user.email, historyResult);
      }

      setState(QuizState.RESULT);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [timeLeft, user, selectedModuleId]);

  const handleDashboardStart = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    if (moduleId === 'admin-panel') {
      setShowAdminPanel(true);
      return;
    }
    if (moduleId === 'module-5') {
      setState(QuizState.PHASE1);
    } else if (moduleId === 'module-6') {
      setState(QuizState.PHASE2);
    } else if (moduleId === 'module-7') {
      setState(QuizState.PHASE3);
    } else if (moduleId === 'module-8') {
      setState(QuizState.PHASE4);
    } else if (moduleId === 'module-9') {
      setState(QuizState.PHASE5);
    } else if (moduleId === 'module-10') {
      setState(QuizState.PHASE6);
    } else if (moduleId === 'module-11') {
      setState(QuizState.PHASE7);
    } else if (moduleId === 'phase-dashboard') {
      setState(QuizState.PHASE_DASHBOARD);
    } else if (moduleId === 'navgurukul-names') {
      setState(QuizState.NAVGURUKUL);
    } else {
      setState(QuizState.INTRO);
    }
  };

  const handleStart = (name: string) => {
    setUserName(name);
    setTimeLeft(MODULES[selectedModuleId as keyof typeof MODULES]?.time || TOTAL_TIME);
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
    setSelectedModuleId(null);
    setShowAdminPanel(false);
    setState(QuizState.DASHBOARD);
  };

  const handleLogout = async () => {
    await logout();
    setState(QuizState.DASHBOARD);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQuestions = selectedModuleId && MODULES[selectedModuleId as keyof typeof MODULES]
    ? MODULES[selectedModuleId as keyof typeof MODULES].questions
    : [];

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-purple-200">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <Login onLoginSuccess={() => { }} />;
  }

  // Show Welcome Screen after login
  if (showWelcome) {
    return (
      <WelcomeScreen
        userName={user?.displayName || 'User'}
        onComplete={() => setShowWelcome(false)}
      />
    );
  }

  // Show Admin Panel
  if (showAdminPanel) {
    return <AdminPanel onBack={handleRestart} />;
  }

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
          {state === QuizState.DASHBOARD && <Dashboard onStart={handleDashboardStart} user={user} onLogout={handleLogout} role={role} />}
          {state === QuizState.INTRO && <Intro onStart={handleStart} onBack={handleRestart} />}
          {state === QuizState.QUIZ && (
            <Quiz
              userName={userName}
              timeLeft={timeLeft}
              questions={currentQuestions}
              onComplete={handleComplete}
            />
          )}
          {state === QuizState.RESULT && quizResult && (
            <Result userName={userName} result={quizResult} onRestart={handleRestart} />
          )}
          {state === QuizState.PHASE1 && (
            <Phase1 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE2 && (
            <Phase2 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE3 && (
            <Phase3 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE4 && (
            <Phase4 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE5 && (
            <Phase5 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE6 && (
            <Phase6 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE7 && (
            <Phase7 onBack={handleRestart} />
          )}
          {state === QuizState.PHASE_DASHBOARD && (
            <PhaseDashboard onBack={handleRestart} onPhaseClick={handleDashboardStart} />
          )}
          {state === QuizState.NAVGURUKUL && (
            <NavGurukul onBack={handleRestart} />
          )}
        </>
      )}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
