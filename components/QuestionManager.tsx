
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Save, FileQuestion, Upload, Lock } from 'lucide-react';
import { addQuestion, deleteQuestion, getDynamicQuestions, getAllDynamicQuestions } from '../services/questionService';
import { Question } from '../types';
import { MODULES, CORRECT_ANSWERS } from '../constants';
import { disableStaticQuestion, getDisabledStaticQuestions } from '../services/disabledQuestionService';

export const QuestionManager: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBulk, setIsBulk] = useState(false);
    const [bulkText, setBulkText] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [selectedModule, setSelectedModule] = useState<string | 'all'>('all');

    // Form State
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswer] = useState('');
    const [type, setType] = useState<'text' | 'number' | 'mcq'>('text');
    const [moduleId, setModuleId] = useState('screen-test');
    const [category, setCategory] = useState('');
    const [hint, setHint] = useState('');
    const [marks, setMarks] = useState<number | 'custom'>(1);
    const [customMarks, setCustomMarks] = useState<number>(0);
    const [timeLimit, setTimeLimit] = useState<number | 'custom'>(30);
    const [customTime, setCustomTime] = useState<number>(0);
    // MCQ Options
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            // 1. Fetch Dynamic Questions
            const dynamicQs = await getAllDynamicQuestions();

            // 2. Fetch Disabled Static Question IDs
            const disabledIds = await getDisabledStaticQuestions();

            // 3. Get All Static Questions from Constants
            let allStaticQs: Question[] = [];
            Object.values(MODULES).forEach(module => {
                if (module.questions) {
                    allStaticQs = [...allStaticQs, ...module.questions];
                }
            });

            // 4. Filter out disabled static questions
            const enabledStaticQs = allStaticQs.filter(q => !disabledIds.includes(q.id as number));

            // 5. Combine (Dynamic first, then Static)
            // Deduplicate static questions just in case they appear in multiple modules (though they shouldn't share IDs)
            const uniqueStaticQs = Array.from(new Map(enabledStaticQs.map(q => [q.id, q])).values());

            setQuestions([...dynamicQs, ...uniqueStaticQs]);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    const parseBulkQuestions = (text: string): Omit<Question, 'id'>[] => {
        const lines = text.split('\n');
        const parsed: Omit<Question, 'id'>[] = [];
        let currentQ: Partial<Omit<Question, 'id'>> | null = null;

        const qRegex = /^(?:Q|Question|q)(?:[:.\-\)])\s*(.+)/;
        const aRegex = /^(?:A|Ans|Answer|a)(?:[:.\-\)])\s*(.+)/;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const qMatch = line.match(qRegex);
            const aMatch = line.match(aRegex);

            if (qMatch) {
                if (currentQ && currentQ.question && currentQ.answer) {
                    parsed.push(currentQ as Omit<Question, 'id'>);
                }
                currentQ = {
                    question: qMatch[1],
                    moduleId: '', // Will be set in handleBulkSubmit
                    type: 'text',
                };
            } else if (aMatch) {
                if (currentQ) {
                    currentQ.answer = aMatch[1];
                }
            } else {
                // Potential continuation of previous line or garbage
                // For simplicity, ignore or append if it makes sense.
                // If it's just a number followed by dot, maybe it's a question?
                const numMatch = line.match(/^\d+[.)]\s*(.+)/);
                if (numMatch) {
                    if (currentQ && currentQ.question && currentQ.answer) {
                        parsed.push(currentQ as Omit<Question, 'id'>);
                    }
                    currentQ = {
                        question: numMatch[1],
                        moduleId: '', // Will be set in handleBulkSubmit
                        type: 'text',
                    };
                }
            }
        }

        if (currentQ && currentQ.question && currentQ.answer) {
            parsed.push(currentQ as Omit<Question, 'id'>);
        }

        return parsed;
    };


    const handleBulkSubmit = async () => {
        const parsed = parseBulkQuestions(bulkText);
        if (parsed.length === 0) {
            alert("No questions found! Please check the format.");
            return;
        }

        const targetModule = selectedModule === 'all' ? 'screen-test' : selectedModule;
        if (!confirm(`Found ${parsed.length} questions. Add them to ${targetModule === 'screen-test' ? 'Screening Test' : targetModule === 'module-0' ? 'Module 0' : 'Module 1'}?`)) return;

        setIsAdding(true);
        let count = 0;
        for (const q of parsed) {
            q.moduleId = targetModule; // Override with selected module
            const successId = await addQuestion(q);
            if (successId) count++;
        }

        setIsAdding(false);
        setBulkText('');
        alert(`Successfully imported ${count} questions!`);
        fetchQuestions();
    };

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        const targetModule = selectedModule === 'all' ? 'screen-test' : selectedModule;
        if (!questionText || !answer || !targetModule) return;

        setIsAdding(true);
        // Build options array for MCQ
        const mcqOptions = type === 'mcq' ? [option1, option2, option3, option4].filter(opt => opt.trim() !== '') : undefined;
        
        // Calculate actual marks and time values
        const actualMarks = marks === 'custom' ? customMarks : marks;
        const actualTime = timeLimit === 'custom' ? customTime : timeLimit;

        const newQuestion: Omit<Question, 'id'> = {
            question: questionText,
            type: type === 'mcq' ? 'text' : type, // Store as text type but with options
            moduleId: targetModule,
            answer,
            placeholder: 'Your Answer',
            marks: actualMarks,
            timeLimit: actualTime,
            ...(category && { category }),
            ...(hint && { hint }),
            ...(mcqOptions && mcqOptions.length > 0 && { options: mcqOptions }),
        };

        const id = await addQuestion(newQuestion);
        if (id) {
            setQuestions([{ id, ...newQuestion } as Question, ...questions]);
            // Reset form
            setQuestionText('');
            setAnswer('');
            setHint('');
            setCategory('');
            setMarks(1);
            setCustomMarks(0);
            setTimeLimit(30);
            setCustomTime(0);
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setType('text');
            alert('Question added successfully!');
        } else {
            alert('Failed to add question');
        }
        setIsAdding(false);
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm('Are you sure you want to delete this question?')) return;

        // Dynamic Question (String ID)
        if (typeof id === 'string') {
            const success = await deleteQuestion(id);
            if (success) {
                setQuestions(questions.filter(q => q.id !== id));
            } else {
                alert('Failed to delete question');
            }
        }
        // Static Question (Number ID)
        else if (typeof id === 'number') {
            const success = await disableStaticQuestion(id);
            if (success) {
                setQuestions(questions.filter(q => q.id !== id));
                alert("Static question disabled.");
            } else {
                alert("Failed to disable static question.");
            }
        }
    };

    // Filter questions by selected module
    const filteredQuestions = selectedModule === 'all'
        ? questions
        : questions.filter(q => {
            // Handle both dynamic questions (with moduleId) and static questions (check against MODULES)
            if (typeof q.id === 'string') {
                return q.moduleId === selectedModule;
            } else {
                // For static questions, check which module contains this question
                const moduleEntry = Object.entries(MODULES).find(([key, module]) =>
                    module.questions?.some(mq => mq.id === q.id)
                );
                return moduleEntry?.[0] === selectedModule;
            }
        });

    const moduleStats = {
        'screen-test': questions.filter(q => {
            if (typeof q.id === 'string') return q.moduleId === 'screen-test';
            const moduleEntry = Object.entries(MODULES).find(([key, module]) =>
                module.questions?.some(mq => mq.id === q.id)
            );
            return moduleEntry?.[0] === 'screen-test';
        }).length,
        'module-0': questions.filter(q => {
            if (typeof q.id === 'string') return q.moduleId === 'module-0';
            const moduleEntry = Object.entries(MODULES).find(([key, module]) =>
                module.questions?.some(mq => mq.id === q.id)
            );
            return moduleEntry?.[0] === 'module-0';
        }).length,
        'module-1': questions.filter(q => {
            if (typeof q.id === 'string') return q.moduleId === 'module-1';
            const moduleEntry = Object.entries(MODULES).find(([key, module]) =>
                module.questions?.some(mq => mq.id === q.id)
            );
            return moduleEntry?.[0] === 'module-1';
        }).length,
    };

    return (
        <div className="space-y-8">
            {/* All 12 Boxes - 3 Rows x 4 Columns */}
            <div>
                <h4 className="text-sm font-bold text-purple-300/60 uppercase tracking-wider mb-3">📚 Tests, Modules & Phases</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Row 1: Screening Test, Module 0, Module 1, Number System */}
                    <button
                        onClick={() => setSelectedModule('screen-test')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'screen-test'
                            ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/30'
                            : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">📝</span>
                            <h3 className="text-sm font-bold text-blue-300">Screening Test</h3>
                            <p className="text-xl font-black text-blue-400">{moduleStats['screen-test']}</p>
                            <p className="text-[10px] text-purple-300/50">Questions</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('module-0')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'module-0'
                            ? 'bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/30'
                            : 'bg-white/5 border-white/10 hover:border-orange-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">📦</span>
                            <h3 className="text-sm font-bold text-orange-300">Module 0</h3>
                            <p className="text-xl font-black text-orange-400">{moduleStats['module-0']}</p>
                            <p className="text-[10px] text-purple-300/50">Questions</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('module-1')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'module-1'
                            ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/30'
                            : 'bg-white/5 border-white/10 hover:border-emerald-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">📗</span>
                            <h3 className="text-sm font-bold text-emerald-300">Module 1</h3>
                            <p className="text-xl font-black text-emerald-400">{moduleStats['module-1']}</p>
                            <p className="text-[10px] text-purple-300/50">Questions</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('number-system')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'number-system'
                            ? 'bg-lime-500/20 border-lime-500 shadow-lg shadow-lime-500/30'
                            : 'bg-white/5 border-white/10 hover:border-lime-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">🔢</span>
                            <h3 className="text-sm font-bold text-lime-300">Number System</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">Binary/Decimal</p>
                        </div>
                    </button>

                    {/* Row 2: Flowchart, Phase 1, Phase 2, Phase 3 */}
                    <button
                        onClick={() => setSelectedModule('flowchart')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'flowchart'
                            ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/30'
                            : 'bg-white/5 border-white/10 hover:border-cyan-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">📊</span>
                            <h3 className="text-sm font-bold text-cyan-300">Flowchart</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">Logic Design</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('phase-1')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-1'
                            ? 'bg-violet-500/20 border-violet-500 shadow-lg shadow-violet-500/30'
                            : 'bg-white/5 border-white/10 hover:border-violet-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">1️⃣</span>
                            <h3 className="text-sm font-bold text-violet-300">Phase 1</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">HTML Basics</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('phase-2')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-2'
                            ? 'bg-pink-500/20 border-pink-500 shadow-lg shadow-pink-500/30'
                            : 'bg-white/5 border-white/10 hover:border-pink-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">2️⃣</span>
                            <h3 className="text-sm font-bold text-pink-300">Phase 2</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">CSS Styling</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('phase-3')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-3'
                            ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/30'
                            : 'bg-white/5 border-white/10 hover:border-amber-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">3️⃣</span>
                            <h3 className="text-sm font-bold text-amber-300">Phase 3</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">JavaScript</p>
                        </div>
                    </button>

                    {/* Row 3: Phase 4, Phase 5, Phase 6, Phase 7 */}
                    <button
                        onClick={() => setSelectedModule('phase-4')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-4'
                            ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-500/30'
                            : 'bg-white/5 border-white/10 hover:border-rose-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">4️⃣</span>
                            <h3 className="text-sm font-bold text-rose-300">Phase 4</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">React.js</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('phase-5')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-5'
                            ? 'bg-teal-500/20 border-teal-500 shadow-lg shadow-teal-500/30'
                            : 'bg-white/5 border-white/10 hover:border-teal-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">5️⃣</span>
                            <h3 className="text-sm font-bold text-teal-300">Phase 5</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">Node.js</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('phase-6')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-6'
                            ? 'bg-indigo-500/20 border-indigo-500 shadow-lg shadow-indigo-500/30'
                            : 'bg-white/5 border-white/10 hover:border-indigo-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">6️⃣</span>
                            <h3 className="text-sm font-bold text-indigo-300">Phase 6</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">MongoDB</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedModule('phase-7')}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedModule === 'phase-7'
                            ? 'bg-yellow-500/20 border-yellow-500 shadow-lg shadow-yellow-500/30'
                            : 'bg-white/5 border-white/10 hover:border-yellow-500/50'
                            }`}
                    >
                        <div className="text-center">
                            <span className="text-2xl mb-1 block">7️⃣</span>
                            <h3 className="text-sm font-bold text-yellow-300">Phase 7</h3>
                            <p className="text-[10px] text-purple-300/50 mt-1">Full Stack + AI</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Show All Button */}
            {selectedModule !== 'all' && (
                <button
                    onClick={() => setSelectedModule('all')}
                    className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl font-semibold text-purple-300 transition-colors"
                >
                    Show All Questions ({questions.length})
                </button>
            )}
            {/* Add Question Form */}
            <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 ${selectedModule === 'all' ? 'opacity-50 pointer-events-none' : ''}`}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <Plus size={22} className="text-green-400" />
                    Add New Question
                    {selectedModule === 'all' && (
                        <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-lg">🔒 पहले ऊपर से Module select करें</span>
                    )}
                </h3>

                {selectedModule === 'all' ? (
                    <div className="text-center py-8 border-2 border-dashed border-purple-500/30 rounded-xl">
                        <span className="text-4xl mb-3 block">👆</span>
                        <p className="text-purple-300 font-semibold">पहले ऊपर से कोई Module/Phase select करें</p>
                        <p className="text-purple-300/60 text-sm mt-1">कोई भी box click करें question add करने के लिए</p>
                    </div>
                ) : (
                <form onSubmit={handleAddQuestion} className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-200 text-sm mb-4">
                            <p className="font-bold">✅ Target: <span className="text-white">
                                {selectedModule === 'screen-test' ? 'Screening Test' :
                                selectedModule === 'module-0' ? 'Module 0' :
                                selectedModule === 'module-1' ? 'Module 1' :
                                selectedModule === 'number-system' ? 'Number System' :
                                selectedModule === 'flowchart' ? 'Flowchart' :
                                selectedModule === 'phase-1' ? 'Phase 1 (HTML)' :
                                selectedModule === 'phase-2' ? 'Phase 2 (CSS)' :
                                selectedModule === 'phase-3' ? 'Phase 3 (JavaScript)' :
                                selectedModule === 'phase-4' ? 'Phase 4 (React.js)' :
                                selectedModule === 'phase-5' ? 'Phase 5 (Node.js)' :
                                selectedModule === 'phase-6' ? 'Phase 6 (MongoDB)' :
                                selectedModule === 'phase-7' ? 'Phase 7 (Full Stack)' : selectedModule}
                            </span></p>
                            <p className="text-xs mt-1 opacity-70">Question इस module/phase में add होगा</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-1">Question Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as 'text' | 'number' | 'mcq')}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="text" className="text-black">Text</option>
                                    <option value="number" className="text-black">Number</option>
                                    <option value="mcq" className="text-black">MCQ (Multiple Choice)</option>
                                </select>
                            </div>
                        </div>


                        {/* MCQ Options - Show only when MCQ is selected */}
                        {type === 'mcq' && (
                            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-4 rounded-xl">
                                <label className="block text-sm font-medium text-cyan-300 mb-3">📋 MCQ Options (Enter 4 options)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-bold">A</span>
                                        <input
                                            type="text"
                                            value={option1}
                                            onChange={(e) => setOption1(e.target.value)}
                                            placeholder="Option A"
                                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-xs font-bold">B</span>
                                        <input
                                            type="text"
                                            value={option2}
                                            onChange={(e) => setOption2(e.target.value)}
                                            placeholder="Option B"
                                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-lg text-xs font-bold">C</span>
                                        <input
                                            type="text"
                                            value={option3}
                                            onChange={(e) => setOption3(e.target.value)}
                                            placeholder="Option C"
                                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded-lg text-xs font-bold">D</span>
                                        <input
                                            type="text"
                                            value={option4}
                                            onChange={(e) => setOption4(e.target.value)}
                                            placeholder="Option D"
                                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-cyan-500 text-sm"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-cyan-300/60 mt-2">💡 Correct Answer में वही option लिखें जो सही है (e.g., Option A का text)</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-purple-200 mb-1">Question Text</label>
                            <input
                                type="text"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                placeholder="e.g., What is 2 + 2?"
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-1">Correct Answer</label>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="e.g., 4"
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-1">Marks ★</label>
                                <select
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value={1} className="text-black">1 Mark</option>
                                    <option value={2} className="text-black">2 Marks</option>
                                    <option value={3} className="text-black">3 Marks</option>
                                    <option value={4} className="text-black">4 Marks</option>
                                    <option value={5} className="text-black">5 Marks</option>
                                    <option value={10} className="text-black">10 Marks</option>
                                    <option value="custom" className="text-black">✏️ Custom - अपने Marks डालें</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Custom Marks Input */}
                        {marks === 'custom' && (
                            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 p-4 rounded-xl">
                                <p className="text-xs text-yellow-300 mb-2">🎯 अपना मनचाहा Marks enter करें:</p>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        min="1"
                                        value={customMarks || ''}
                                        onChange={(e) => setCustomMarks(Number(e.target.value))}
                                        placeholder="e.g., 15"
                                        className="w-24 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 placeholder-yellow-300/50 focus:outline-none focus:border-yellow-500 text-center text-lg font-bold"
                                    />
                                    <span className="text-yellow-300 font-medium">Marks</span>
                                    {customMarks > 0 && (
                                        <span className="text-xs text-green-400 bg-green-500/20 px-3 py-1 rounded-full">
                                            ✓ {customMarks} marks set
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Time Duration */}
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 p-4 rounded-xl">
                            <label className="block text-sm font-medium text-orange-300 mb-2">⏱️ Test Time Duration</label>
                            <div className="flex flex-wrap gap-2 items-center">
                                <select
                                    value={timeLimit}
                                    onChange={(e) => setTimeLimit(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
                                    className="flex-1 min-w-[150px] px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value={15} className="text-black">15 Minutes</option>
                                    <option value={30} className="text-black">30 Minutes</option>
                                    <option value={45} className="text-black">45 Minutes</option>
                                    <option value={60} className="text-black">1 Hour</option>
                                    <option value={90} className="text-black">1.5 Hours</option>
                                    <option value={120} className="text-black">2 Hours</option>
                                    <option value={180} className="text-black">3 Hours</option>
                                    <option value="custom" className="text-black">✏️ Custom - अपना Time डालें</option>
                                </select>
                            </div>
                            {timeLimit === 'custom' && (
                                <div className="mt-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <p className="text-xs text-orange-300 mb-2">🎯 अपना मनचाहा time enter करें:</p>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="24"
                                                value={Math.floor(customTime / 60) || ''}
                                                onChange={(e) => {
                                                    const hours = Number(e.target.value) || 0;
                                                    const currentMins = customTime % 60;
                                                    setCustomTime(hours * 60 + currentMins);
                                                }}
                                                placeholder="0"
                                                className="w-16 px-3 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-300 placeholder-orange-300/50 focus:outline-none focus:border-orange-500 text-center"
                                            />
                                            <span className="text-orange-300 text-sm font-medium">घंटे</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={customTime % 60 || ''}
                                                onChange={(e) => {
                                                    const mins = Number(e.target.value) || 0;
                                                    const currentHours = Math.floor(customTime / 60);
                                                    setCustomTime(currentHours * 60 + mins);
                                                }}
                                                placeholder="0"
                                                className="w-16 px-3 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-300 placeholder-orange-300/50 focus:outline-none focus:border-orange-500 text-center"
                                            />
                                            <span className="text-orange-300 text-sm font-medium">मिनट</span>
                                        </div>
                                        {customTime > 0 && (
                                            <span className="text-xs text-green-400 bg-green-500/20 px-3 py-1 rounded-full">
                                                = {customTime} minutes total
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            <p className="text-xs text-orange-300/60 mt-2">💡 पूरे test का time set करें - Custom में घंटे और मिनट अलग से डालें</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isAdding}
                            className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-2"
                        >
                            {isAdding ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            Save Question
                        </button>
                    </form>
                )}
            </div>

            {/* Questions List */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <FileQuestion size={22} className="text-blue-400" />
                    {selectedModule === 'all' ? 'All Questions' :
                        selectedModule === 'screen-test' ? 'Screening Test Questions' :
                            selectedModule === 'module-0' ? 'Module 0 Questions' :
                                'Module 1 Questions'
                    } ({filteredQuestions.length})
                </h3>

                {loading ? (
                    <div className="text-center py-8 text-white">
                        <Loader2 size={32} className="animate-spin mx-auto mb-2" />
                        <p>Loading questions...</p>
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="text-center py-8 text-purple-300/50">
                        <FileQuestion size={48} className="mx-auto mb-3 opacity-50" />
                        <p>{selectedModule === 'all' ? 'No questions added yet.' : 'No questions in this module.'}</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                        {filteredQuestions.map((q) => (
                            <div key={q.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border 
                                                ${typeof q.id === 'string'
                                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                                    : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                                                }`}>
                                                {typeof q.id === 'string' ? q.moduleId : 'Static'}
                                            </span>
                                            {q.category && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                    {q.category}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-semibold text-white mb-1">{q.question}</h4>
                                        <p className="text-sm text-green-400 font-mono">
                                            Answer: {q.answer || (typeof q.id === 'number' ? CORRECT_ANSWERS[q.id] : 'N/A')}
                                        </p>
                                        {q.marks && (
                                            <span className="inline-block mt-1 text-xs font-bold text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded border border-yellow-500/30">
                                                ★ {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(q.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        title={typeof q.id === 'string' ? "Delete Question" : "Disable Question"}
                                    >
                                        {typeof q.id === 'string' ? <Trash2 size={18} /> : <Lock size={18} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
