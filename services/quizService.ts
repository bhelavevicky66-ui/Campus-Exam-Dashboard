
import { UserResponse, QuizResult } from '../types';
import { MATH_QUESTIONS, CORRECT_ANSWERS } from '../constants';

export const getQuestions = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MATH_QUESTIONS;
};

export const submitQuiz = async (responses: UserResponse[]): Promise<QuizResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let correctCount = 0;
  const details = responses.map(resp => {
    const correctAnswer = CORRECT_ANSWERS[resp.questionId];
    let isCorrect = false;

    // Special handling for Question 10 (text-based)
    if (resp.questionId === 10) {
      isCorrect = resp.answer.toLowerCase().includes('composite');
    } else {
      // Numerical comparison (trimmed and normalized)
      isCorrect = resp.answer.trim() === correctAnswer;
    }

    if (isCorrect) correctCount++;

    return {
      questionId: resp.questionId,
      userAnswer: resp.answer,
      isCorrect,
      correctAnswer
    };
  });

  return {
    score: (correctCount / MATH_QUESTIONS.length) * 100,
    total: MATH_QUESTIONS.length,
    correctCount,
    wrongCount: MATH_QUESTIONS.length - correctCount,
    details
  };
};
