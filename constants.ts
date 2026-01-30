
import { Question } from './types';

export const MATH_QUESTIONS: Question[] = [
  { id: 1, question: "36 ÷ (6 + 3) × 4", type: 'number', placeholder: 'Enter result' },
  { id: 2, question: "50 − [8 + 2 × (9 − 5)]", type: 'number', placeholder: 'Enter result' },
  { id: 3, question: "Find HCF of 36 and 84", type: 'number', placeholder: 'Enter HCF' },
  { id: 4, question: "Find LCM of 12 and 15", type: 'number', placeholder: 'Enter LCM' },
  { id: 5, question: "Solve for x: 4x + 7 = 31", type: 'number', placeholder: 'x = ?' },
  { id: 6, question: "Solve for x: 3x − 5 = 16", type: 'number', placeholder: 'x = ?' },
  { id: 7, question: "Calculate: 2⁵ + 3³", type: 'number', placeholder: 'Enter result' },
  { id: 8, question: "Calculate: 5³ ÷ 5²", type: 'number', placeholder: 'Enter result' },
  { id: 9, question: "Calculate: 0.72 ÷ 0.6", type: 'number', placeholder: 'Enter decimal' },
  { id: 10, question: "Is 51 a prime or composite number? (with reason)", type: 'text', placeholder: 'Type your answer and reason', hint: 'Think about divisors of 51' }
];

export const CORRECT_ANSWERS: Record<number, string> = {
  1: "16",
  2: "34",
  3: "12",
  4: "60",
  5: "6",
  6: "7",
  7: "59",
  8: "5",
  9: "1.2",
  10: "composite" // For Q10 we check if "composite" is in the answer
};
