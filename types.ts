
export enum QuizState {
  DASHBOARD = 'DASHBOARD',
  INTRO = 'INTRO',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  PHASE1 = 'PHASE1',
  PHASE2 = 'PHASE2',
  PHASE3 = 'PHASE3',
  PHASE4 = 'PHASE4',
  PHASE5 = 'PHASE5',
  PHASE6 = 'PHASE6',
  PHASE7 = 'PHASE7',
  PHASE_DASHBOARD = 'PHASE_DASHBOARD',
  NAVGURUKUL = 'NAVGURUKUL'
}

export interface Question {
  id: number | string;
  question: string;
  type: 'text' | 'number' | 'mcq';
  placeholder?: string;
  hint?: string;
  category?: string;
  moduleId?: string;
  answer?: string;
  options?: string[];
}

export interface QuizResult {
  score: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  timeTaken: string;
  details: {
    questionId: number | string;
    userAnswer: string;
    isCorrect: boolean;
    correctAnswer: string;
  }[];
}

export interface UserResponse {
  questionId: number | string;
  answer: string;
}
