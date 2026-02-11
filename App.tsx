
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
import { QuizState, UserResponse, QuizResult, Question } from './types';
import { submitQuiz } from './services/quizService';
import { saveTestResult, TestResultHistory } from './services/testHistoryService';
import { MODULES } from './constants';
import { db, getAdminEmails } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { getDynamicQuestions } from './services/questionService';
import { getDisabledStaticQuestions } from './services/disabledQuestionService';
import { OTPModal } from './components/OTPModal';
import { createOTP, verifyOTP } from './services/otpService';
import { sendOTPEmail, getStandardAdminEmails } from './services/emailService';

const TOTAL_TIME = 3600; // 1 hour in seconds

const AppContent: React.FC = () => {
  const { user, loading, role, logout } = useAuth();
  const [state, setState] = useState<QuizState>(QuizState.DASHBOARD);
  const [userName, setUserName] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreparingQuiz, setIsPreparingQuiz] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [showExitOTPModal, setShowExitOTPModal] = useState(false);
  const [exitSessionId, setExitSessionId] = useState('');
  const [isSendingExitOTP, setIsSendingExitOTP] = useState(false);
  const [exitRecipientEmails, setExitRecipientEmails] = useState<string[]>([]);
  const [isRealEmailActive, setIsRealEmailActive] = useState(false);

  // Anti-Cheat State
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [cheatingCount, setCheatingCount] = useState(0);

  const responsesRef = useRef<UserResponse[]>([]);
  const timerRef = useRef<number | null>(null);

  // Prevention of tab closing / navigation & Anti-Cheat
  useEffect(() => {
    const isSecuredState = state !== QuizState.DASHBOARD && state !== QuizState.PHASE_DASHBOARD && !showAdminPanel;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSecuredState) {
        e.preventDefault();
        e.returnValue = 'Test is in progress. Do you really want to exit?';
        return e.returnValue;
      }
    };

    const handleFullscreenChange = () => {
      if (isSecuredState && !document.fullscreenElement) {
        setShowFullscreenWarning(true);
        setCheatingCount(prev => prev + 1);
      } else {
        setShowFullscreenWarning(false);
      }
    };

    const handleVisibilityChange = () => {
      if (isSecuredState && document.visibilityState === 'hidden') {
        setCheatingCount(prev => prev + 1);
        console.warn("⚠️ Tab switching detected!");
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [state, showAdminPanel]);

  const reEnterFullscreen = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
        setShowFullscreenWarning(false);
      }
    } catch (error) {
      console.warn("Re-entering fullscreen failed:", error);
    }
  };

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
      const result = await submitQuiz(finalResponses, activeQuestions, timeTaken);
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
              question: activeQuestions.find(q => q.id === d.questionId)?.question || "Unknown Question",
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
  }, [timeLeft, user, selectedModuleId, activeQuestions]);

  const handleDashboardStart = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    if (moduleId === 'admin-panel') {
      setShowAdminPanel(true);
      return;
    }

    // UI/Info only modules
    if (moduleId === 'phase-dashboard') {
      setState(QuizState.PHASE_DASHBOARD);
      return;
    }

    // NavGurukul content page - skip intro, go directly
    if (moduleId === 'navgurukul-names') {
      setState(QuizState.NAVGURUKUL);
      return;
    }

    // All test/content modules MUST go through INTRO (OTP + Fullscreen)
    setState(QuizState.INTRO);
  };

  const handleStart = async (name: string) => {
    setUserName(name);

    if (!selectedModuleId) return;

    // Handle Content Modules (Phases) - No questions needed
    if (selectedModuleId === 'module-5') {
      setState(QuizState.PHASE1);
      return;
    }
    if (selectedModuleId === 'module-6') {
      setState(QuizState.PHASE2);
      return;
    }
    if (selectedModuleId === 'module-7') {
      setState(QuizState.PHASE3);
      return;
    }
    if (selectedModuleId === 'module-8') {
      setState(QuizState.PHASE4);
      return;
    }
    if (selectedModuleId === 'module-9') {
      setState(QuizState.PHASE5);
      return;
    }
    if (selectedModuleId === 'module-10') {
      setState(QuizState.PHASE6);
      return;
    }
    if (selectedModuleId === 'module-11') {
      setState(QuizState.PHASE7);
      return;
    }
    if (selectedModuleId === 'navgurukul-names') {
      setState(QuizState.NAVGURUKUL);
      return;
    }

    // Handle Quiz Modules
    setIsPreparingQuiz(true);
    try {
      // Fetch disabled static questions
      const disabledIds = await getDisabledStaticQuestions();

      // Static Questions (Filtered)
      const allStaticQs = MODULES[selectedModuleId as keyof typeof MODULES]?.questions || [];
      const staticQs = allStaticQs.filter(q => !disabledIds.includes(q.id as number));

      // Fetch dynamic questions
      const dynamicQs = await getDynamicQuestions(selectedModuleId);

      // Shuffle both lists independently
      const shuffledDynamic = [...dynamicQs].sort(() => 0.5 - Math.random());
      const shuffledStatic = [...staticQs].sort(() => 0.5 - Math.random());

      // Combine with dynamic questions PRIORITY
      const combined = [...shuffledDynamic, ...shuffledStatic];

      // Select top 30
      const selectedPool = combined.slice(0, 30);

      // Shuffle the final selection
      const finalSelectedQs = selectedPool.sort(() => 0.5 - Math.random());

      setActiveQuestions(finalSelectedQs);

      // Update Time Left based on config
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
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    } finally {
      setIsPreparingQuiz(false);
    }
  };

  const handleComplete = useCallback((responses: UserResponse[]) => {
    responsesRef.current = responses;
    finishQuiz(responses);
  }, [finishQuiz]);

  const handleRestart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizResult(null);
    setSelectedModuleId(null);
    setActiveQuestions([]);
    setShowAdminPanel(false);
    setState(QuizState.DASHBOARD);
  };

  const handleLogout = async () => {
    await logout();
    setState(QuizState.DASHBOARD);
  };

  const handleExitRequest = async () => {
    // If we're on a secured screen, demand OTP
    const isSecuredPage = state === QuizState.PHASE1 ||
      state === QuizState.PHASE2 ||
      state === QuizState.PHASE3 ||
      state === QuizState.PHASE4 ||
      state === QuizState.PHASE5 ||
      state === QuizState.PHASE6 ||
      state === QuizState.PHASE7;

    if (!isSecuredPage) {
      handleRestart();
      return;
    }

    // Generate Exit OTP
    const newSessionId = `exit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setExitSessionId(newSessionId);
    setIsSendingExitOTP(true);

    try {
      const configRef = doc(db, 'config', 'emailjs');
      const configSnap = await getDoc(configRef);
      setIsRealEmailActive(configSnap.exists());

      let recipients = await getStandardAdminEmails();
      if (recipients.length === 0) recipients = await getAdminEmails();
      setExitRecipientEmails(recipients);

      const primaryAdmin = recipients.length > 0 ? recipients[0] : 'admin-required';
      const otp = await createOTP(primaryAdmin, newSessionId);

      if (recipients.length > 0) {
        await Promise.all(recipients.map(email =>
          sendOTPEmail(email, otp, userName || 'User', 'exit')
        ));
      } else {
        await sendOTPEmail('simulated-admin@navgurukul.org', otp, userName || 'User', 'exit');
      }

      setShowExitOTPModal(true);
    } catch (error) {
      console.error("Exit OTP request failed:", error);
    } finally {
      setIsSendingExitOTP(false);
    }
  };

  const handleVerifyExitOTP = async (code: string): Promise<boolean> => {
    const isValid = await verifyOTP(exitSessionId, code);
    if (isValid) {
      // Exit Fullscreen
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (error) {
        console.warn("Fullscreen exit failed:", error);
      }

      setShowExitOTPModal(false);
      handleRestart();
    }
    return isValid;
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
      {isSubmitting || isPreparingQuiz ? (
        <div className="p-24 text-center flex flex-col items-center justify-center animate-pulse min-h-[60vh]">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-full animate-ping"></div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 font-montserrat">
            {isSubmitting ? 'Analyzing Results' : 'Preparing Your Quiz'}
          </h3>
          <p className="text-slate-500 font-medium mt-3">
            {isSubmitting ? 'Grading your performance...' : 'Selecting questions for you...'}
          </p>
        </div>
      ) : (
        <>
          {state === QuizState.DASHBOARD && <Dashboard onStart={handleDashboardStart} user={user} onLogout={handleLogout} role={role} />}
          {state === QuizState.INTRO && <Intro onStart={handleStart} onBack={handleRestart} moduleId={selectedModuleId || undefined} />}
          {state === QuizState.QUIZ && (
            <Quiz
              userName={userName}
              timeLeft={timeLeft}
              questions={activeQuestions}
              onComplete={handleComplete}
            />
          )}
          {state === QuizState.RESULT && quizResult && (
            <Result userName={userName} result={quizResult} onRestart={handleRestart} />
          )}
          {state === QuizState.PHASE1 && (
            <Phase1 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE2 && (
            <Phase2 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE3 && (
            <Phase3 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE4 && (
            <Phase4 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE5 && (
            <Phase5 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE6 && (
            <Phase6 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE7 && (
            <Phase7 onBack={handleExitRequest} />
          )}
          {state === QuizState.PHASE_DASHBOARD && (
            <PhaseDashboard onBack={handleRestart} onPhaseClick={handleDashboardStart} />
          )}
          {state === QuizState.NAVGURUKUL && (
            <NavGurukul onBack={handleRestart} />
          )}
        </>
      )}

      <OTPModal
        isOpen={showExitOTPModal}
        onVerify={handleVerifyExitOTP}
        onResend={handleExitRequest}
        adminEmail={exitRecipientEmails.join(', ')}
        isRealEmail={isRealEmailActive}
      />

      {/* Global Fullscreen Warning Modal */}
      {showFullscreenWarning && (
        <div className="fixed inset-0 z-[200] bg-[#0f0c29]/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl border-2 border-red-500/20 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4 font-montserrat uppercase tracking-tight">Security Warning!</h2>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">
              Exit detected! This test must be completed in **Full Screen Mode**.
              Please do not exit full screen or switch tabs.
            </p>
            <button
              onClick={reEnterFullscreen}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
            >
              <CheckCircle size={24} />
              Re-enter Full Screen
            </button>
            <button
              onClick={() => {
                setShowFullscreenWarning(false);
                setCheatingCount(0);
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch(() => {});
                }
                handleRestart();
              }}
              className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base"
            >
              🏠 Go to Homepage
            </button>
            <p className="text-xs text-red-500/60 mt-6 font-bold uppercase tracking-widest">
              Security Violation Detected ({cheatingCount})
            </p>
          </div>
        </div>
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
