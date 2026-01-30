
import { UserResponse, QuizResult } from '../types';
import { MATH_QUESTIONS, CORRECT_ANSWERS } from '../constants';

export const submitQuiz = async (responses: UserResponse[], timeTakenSeconds: number): Promise<QuizResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let correctCount = 0;
  const details = MATH_QUESTIONS.map(q => {
    const resp = responses.find(r => r.questionId === q.id);
    const userAnswer = (resp ? resp.answer : "").toLowerCase().trim();
    const correctAnswer = CORRECT_ANSWERS[q.id].toLowerCase().trim();
    
    let isCorrect = false;

    if (q.id === 13) {
      // For the list of primes, we check if all required numbers are present
      const required = ["11", "13", "17", "19", "23"];
      isCorrect = required.every(num => userAnswer.includes(num));
    } else if (q.id === 12) {
      // Is 11 prime? Yes/Prime are both acceptable
      isCorrect = userAnswer === 'yes' || userAnswer === 'prime' || userAnswer === 'true';
    } else {
      isCorrect = userAnswer === correctAnswer;
    }

    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      userAnswer: resp ? resp.answer : "",
      isCorrect,
      correctAnswer: CORRECT_ANSWERS[q.id]
    };
  });

  const minutes = Math.floor(timeTakenSeconds / 60);
  const seconds = timeTakenSeconds % 60;
  const timeStr = `${minutes}m ${seconds}s`;

  return {
    score: (correctCount / MATH_QUESTIONS.length) * 100,
    total: MATH_QUESTIONS.length,
    correctCount,
    wrongCount: MATH_QUESTIONS.length - correctCount,
    timeTaken: timeStr,
    details
  };
};
