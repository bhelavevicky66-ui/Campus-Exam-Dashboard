
import { Question } from './types';

export const MATH_QUESTIONS: Question[] = [
  // BODMAS (10 Questions) - 1 mark each
  { id: 1, question: "6 + 4 × 2", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 2, question: "18 ÷ 3 + 5", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 3, question: "10 − 2 × 3", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 4, question: "(8 + 4) × 3 ÷ 6", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 5, question: "20 − (6 + 4) ÷ 2", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 6, question: "30 ÷ 5 + 4 × 2", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 7, question: "36 ÷ (6 + 3) × 4", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 8, question: "50 − [8 + 2 × (9 − 5)]", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 9, question: "(24 ÷ 4) × (3 + 2) − 5", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 10, question: "60 − 12 ÷ (3 × 2) + 4", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },

  // Number Types (5 Questions) - 2 marks each
  { id: 11, question: "Is 14 even or odd?", type: 'text', category: 'Number Types', placeholder: 'Answer', marks: 2 },
  { id: 12, question: "Is 11 a prime number?", type: 'text', category: 'Number Types', placeholder: 'Yes or No', marks: 2 },
  { id: 13, question: "Write all prime numbers between 10 and 25", type: 'text', category: 'Number Types', placeholder: 'e.g. 11, 13, ...', marks: 2 },
  { id: 14, question: "Is 1 a prime, composite, or natural number?", type: 'text', category: 'Number Types', placeholder: 'Answer', marks: 2 },
  { id: 15, question: "Find the smallest composite natural number", type: 'number', category: 'Number Types', placeholder: 'Result', marks: 2 },

  // Long Division (5 Questions) - 2 marks each
  { id: 16, question: "48 ÷ 6", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 17, question: "3.6 ÷ 6", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 18, question: "7.2 ÷ 0.6", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 19, question: "0.84 ÷ 7", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 20, question: "5 ÷ 20", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },

  // HCF and LCM (5 Questions) - 2 marks each
  { id: 21, question: "Find HCF of 8 and 12", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 22, question: "Find LCM of 4 and 5", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 23, question: "Find HCF of 24 and 36", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 24, question: "Find LCM of 6, 12, and 18", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 25, question: "Find HCF of 45 and 75", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },

  // Basic Algebra (5 Questions) - 2 marks each
  { id: 26, question: "Solve for x: x + 5 = 12", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 },
  { id: 27, question: "Solve for x: 2x = 10", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 },
  { id: 28, question: "Solve for x: 3x + 7 = 25", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 },
  { id: 29, question: "Solve for x: 5x − 10 = 15", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 },
  { id: 30, question: "If x = 4, find: 2x² − 3x", type: 'number', category: 'Basic Algebra', placeholder: 'Result', marks: 2 }
];

// ============= MODULE 1 NEW QUESTIONS =============
export const MODULE_1_NEW_QUESTIONS: Question[] = [
  // 🟦 BODMAS – 10 Questions - 1 mark each
  { id: 101, question: "18 + 6 × 4 − 8", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 102, question: "(20 − 5) × 3 ÷ 5", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 103, question: "36 ÷ 6 + 7 × 2", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 104, question: "50 − 30 ÷ 5 + 4", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 105, question: "(12 + 8) ÷ 4 × 3", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 106, question: "60 ÷ (5 + 5) × (8 − 2)", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 107, question: "(45 − 15) ÷ 3 + 6 × 4", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 108, question: "100 − (20 ÷ 5) × (6 + 4)", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 109, question: "(72 ÷ 6 + 4) × 5 − 10", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },
  { id: 110, question: "120 ÷ {3 × (4 + 6)}", type: 'number', category: 'BODMAS', placeholder: 'Result', marks: 1 },

  // 🟦 Number Types – 5 Questions - 2 marks each
  { id: 111, question: "Check whether 51 is prime or composite", type: 'text', category: 'Number Types', placeholder: 'Prime or Composite', marks: 2 },
  { id: 112, question: "Write three odd numbers between 20 and 30", type: 'text', category: 'Number Types', placeholder: 'e.g. 21, 23, 25', marks: 2 },
  { id: 113, question: "Is 0 a natural number?", type: 'text', category: 'Number Types', placeholder: 'Yes or No', marks: 2 },
  { id: 114, question: "Find how many prime numbers are there between 1 and 50", type: 'number', category: 'Number Types', placeholder: 'Count', marks: 2 },
  { id: 130, question: "What is the smallest even prime number?", type: 'number', category: 'Number Types', placeholder: 'Result', marks: 2 },

  // 🟦 Long Division – 5 Questions - 2 marks each
  { id: 115, question: "864 ÷ 12", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 116, question: "4.8 ÷ 6", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 117, question: "625 ÷ 25", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 118, question: "7.5 ÷ 0.25", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },
  { id: 119, question: "18 ÷ 0.6", type: 'number', category: 'Long Division', placeholder: 'Result', marks: 2 },

  // 🟦 HCF & LCM – 5 Questions - 2 marks each
  { id: 120, question: "Find HCF of 18 and 24", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 121, question: "Find LCM of 6 and 14", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 122, question: "Find HCF of 20 and 30", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },
  { id: 123, question: "Find HCF and LCM of 24, 36, and 60 (Write as HCF, LCM)", type: 'text', category: 'HCF and LCM', placeholder: 'e.g. 12, 360', marks: 2 },
  { id: 124, question: "Two numbers have HCF = 12 and LCM = 180. If one number is 36, find the other number", type: 'number', category: 'HCF and LCM', placeholder: 'Result', marks: 2 },

  // 🟦 Basic Algebra – 5 Questions - 2 marks each
  { id: 125, question: "Find x: 3x + 5 = 20", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 },
  { id: 126, question: "Find y: y − 7 = 2y − 20", type: 'number', category: 'Basic Algebra', placeholder: 'y = ?', marks: 2 },
  { id: 127, question: "Simplify: 4a + 3a − 2a", type: 'text', category: 'Basic Algebra', placeholder: 'Result (e.g. 5a)', marks: 2 },
  { id: 128, question: "Find x: 2(x − 3) + 4 = 3x − 2", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 },
  { id: 129, question: "If 5x − 2 = 3x + 6, find the value of x", type: 'number', category: 'Basic Algebra', placeholder: 'x = ?', marks: 2 }
];

export const SCREEN_TEST_QUESTIONS: Question[] = MATH_QUESTIONS.slice(0, 10);
export const MODULE_0_QUESTIONS: Question[] = MATH_QUESTIONS.slice(10, 20);
export const MODULE_1_QUESTIONS: Question[] = MODULE_1_NEW_QUESTIONS; // New questions for Module 1

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
    time: 3600 // 1 hour for 30 questions
  }
};

export const ALL_QUESTIONS = MATH_QUESTIONS; // Keep for backward compatibility if needed

export const CORRECT_ANSWERS: Record<number, string> = {
  // Original Screen Test Answers
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

  // Original Module 0 Answers
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
  30: "20",

  // ============= MODULE 1 NEW ANSWERS =============
  // BODMAS Answers
  101: "34",    // 18 + 6 × 4 − 8 = 18 + 24 - 8 = 34
  102: "9",     // (20 − 5) × 3 ÷ 5 = 15 × 3 ÷ 5 = 45 ÷ 5 = 9
  103: "20",    // 36 ÷ 6 + 7 × 2 = 6 + 14 = 20
  104: "48",    // 50 − 30 ÷ 5 + 4 = 50 - 6 + 4 = 48
  105: "15",    // (12 + 8) ÷ 4 × 3 = 20 ÷ 4 × 3 = 5 × 3 = 15
  106: "36",    // 60 ÷ (5 + 5) × (8 − 2) = 60 ÷ 10 × 6 = 6 × 6 = 36
  107: "34",    // (45 − 15) ÷ 3 + 6 × 4 = 30 ÷ 3 + 24 = 10 + 24 = 34
  108: "60",    // 100 − (20 ÷ 5) × (6 + 4) = 100 - 4 × 10 = 100 - 40 = 60
  109: "70",    // (72 ÷ 6 + 4) × 5 − 10 = (12 + 4) × 5 - 10 = 16 × 5 - 10 = 80 - 10 = 70
  110: "4",     // 120 ÷ {3 × (4 + 6)} = 120 ÷ (3 × 10) = 120 ÷ 30 = 4

  // Number Types Answers
  111: "composite",
  112: "21, 23, 25",
  113: "no",
  114: "15",    // Primes between 1-50: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47 = 15

  // Long Division Answers
  115: "72",    // 864 ÷ 12 = 72
  116: "0.8",   // 4.8 ÷ 6 = 0.8
  117: "25",    // 625 ÷ 25 = 25
  118: "30",    // 7.5 ÷ 0.25 = 30
  119: "30",    // 18 ÷ 0.6 = 30

  // HCF & LCM Answers
  120: "6",     // HCF of 18 and 24 = 6
  121: "42",    // LCM of 6 and 14 = 42
  122: "10",    // HCF of 20 and 30 = 10
  123: "12, 360", // HCF = 12, LCM = 360 for 24, 36, 60
  124: "60",    // HCF × LCM = Product → 12 × 180 = 36 × x → x = 2160/36 = 60

  // Basic Algebra Answers
  125: "5",     // 3x + 5 = 20 → 3x = 15 → x = 5
  126: "13",    // y − 7 = 2y − 20 → -y = -13 → y = 13
  127: "5a",    // 4a + 3a − 2a = 5a
  128: "0",     // 2(x − 3) + 4 = 3x − 2 → 2x - 6 + 4 = 3x - 2 → 2x - 2 = 3x - 2 → x = 0
  129: "4",     // 5x − 2 = 3x + 6 → 2x = 8 → x = 4

  // Additional Number Types Answer
  130: "2"      // Smallest even prime number = 2
};
