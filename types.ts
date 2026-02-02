
export enum QuizState {
  DASHBOARD = 'DASHBOARD',
  INTRO = 'INTRO',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  PHASE1 = 'PHASE1'
}

export interface Question {
  id: number;
  question: string;
  type: 'text' | 'number';
  placeholder?: string;
  hint?: string;
  category?: string;
}

export interface QuizResult {
  score: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  details: {
    questionId: number;
    userAnswer: string;
    isCorrect: boolean;
    correctAnswer: string;
  }[];
}

export interface UserResponse {
  questionId: number;
  answer: string;
}
