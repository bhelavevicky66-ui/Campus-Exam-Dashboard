
import { Question } from './types';

export const MATH_QUESTIONS: Question[] = [
  // BODMAS (10 Questions)
  { id: 1, question: "6 + 4 × 2", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 2, question: "18 ÷ 3 + 5", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 3, question: "10 − 2 × 3", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 4, question: "(8 + 4) × 3 ÷ 6", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 5, question: "20 − (6 + 4) ÷ 2", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 6, question: "30 ÷ 5 + 4 × 2", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 7, question: "36 ÷ (6 + 3) × 4", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 8, question: "50 − [8 + 2 × (9 − 5)]", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 9, question: "(24 ÷ 4) × (3 + 2) − 5", type: 'number', category: 'BODMAS', placeholder: 'Result' },
  { id: 10, question: "60 − 12 ÷ (3 × 2) + 4", type: 'number', category: 'BODMAS', placeholder: 'Result' },

  // Number Types (5 Questions)
  { id: 11, question: "Is 14 even or odd?", type: 'text', category: 'Number Types', placeholder: 'Answer' },
  { id: 12, question: "Is 11 a prime number?", type: 'text', category: 'Number Types', placeholder: 'Yes or No' },
  { id: 13, question: "Write all prime numbers between 10 and 25", type: 'text', category: 'Number Types', placeholder: 'e.g. 11, 13, ...' },
  { id: 14, question: "Is 1 a prime, composite, or natural number?", type: 'text', category: 'Number Types', placeholder: 'Answer' },
  { id: 15, question: "Find the smallest composite natural number", type: 'number', category: 'Number Types', placeholder: 'Result' },

  // Long Division (5 Questions)
  { id: 16, question: "48 ÷ 6", type: 'number', category: 'Long Division', placeholder: 'Result' },
  { id: 17, question: "3.6 ÷ 6", type: 'number', category: 'Long Division', placeholder: 'Result' },
  { id: 18, question: "7.2 ÷ 0.6", type: 'number', category: 'Long Division', placeholder: 'Result' },
  { id: 19, question: "0.84 ÷ 7", type: 'number', category: 'Long Division', placeholder: 'Result' },
  { id: 20, question: "5 ÷ 20", type: 'number', category: 'Long Division', placeholder: 'Result' },

  // HCF and LCM (5 Questions)
  { id: 21, question: "Find HCF of 8 and 12", type: 'number', category: 'HCF and LCM', placeholder: 'Result' },
  { id: 22, question: "Find LCM of 4 and 5", type: 'number', category: 'HCF and LCM', placeholder: 'Result' },
  { id: 23, question: "Find HCF of 24 and 36", type: 'number', category: 'HCF and LCM', placeholder: 'Result' },
  { id: 24, question: "Find LCM of 6, 12, and 18", type: 'number', category: 'HCF and LCM', placeholder: 'Result' },
  { id: 25, question: "Find HCF of 45 and 75", type: 'number', category: 'HCF and LCM', placeholder: 'Result' },

  // Basic Algebra (5 Questions)
  { id: 26, question: "Solve for x: x + 5 = 12", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?' },
  { id: 27, question: "Solve for x: 2x = 10", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?' },
  { id: 28, question: "Solve for x: 3x + 7 = 25", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?' },
  { id: 29, question: "Solve for x: 5x − 10 = 15", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?' },
  { id: 30, question: "If x = 4, find: 2x² − 3x", type: 'number', category: 'Basic Algebra', placeholder: 'Result' }
];

export const SCREEN_TEST_QUESTIONS: Question[] = MATH_QUESTIONS.slice(0, 10);
export const MODULE_0_QUESTIONS: Question[] = MATH_QUESTIONS.slice(10, 20);
export const MODULE_1_QUESTIONS: Question[] = MATH_QUESTIONS.slice(20, 30);

export const MODULES = {
  'screen-test': {
    title: 'First Screen Test',
    questions: SCREEN_TEST_QUESTIONS,
    time: 1200 // 20 mins
  },
  'module-0': {
    title: 'Module 0 Test',
    questions: MODULE_0_QUESTIONS,
    time: 1200
  },
  'module-1': {
    title: 'Module 1 Test',
    questions: MODULE_1_QUESTIONS,
    time: 1200
  }
};

export const ALL_QUESTIONS = MATH_QUESTIONS; // Keep for backward compatibility if needed

export const CORRECT_ANSWERS: Record<number, string> = {
  1: "14",
  2: "11",
  3: "4",
  4: "6",
  5: "15",
  6: "14",
  7: "16",
  8: "34",
  9: "25",
  10: "62",
  11: "even",
  12: "yes",
  13: "11, 13, 17, 19, 23",
  14: "natural",
  15: "4",
  16: "8",
  17: "0.6",
  18: "12",
  19: "0.12",
  20: "0.25",
  21: "4",
  22: "20",
  23: "12",
  24: "36",
  25: "15",
  26: "7",
  27: "5",
  28: "6",
  29: "5",
  30: "20"
};
