
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Save, FileQuestion } from 'lucide-react';
import { addQuestion, deleteQuestion, getDynamicQuestions, getAllDynamicQuestions } from '../services/questionService';
import { Question } from '../types';

export const QuestionManager: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswer] = useState('');
    const [type, setType] = useState<'text' | 'number'>('text');
    const [moduleId, setModuleId] = useState('screen-test');
    const [category, setCategory] = useState('');
    const [hint, setHint] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        // For admin purpose, maybe fetch all? Or filter by module. 
        // Let's fetch all for now or maybe just fetch when filter changes.
        // For simplicity, let's fetch all dynamic questions.
        const q = await getAllDynamicQuestions();
        setQuestions(q);
        setLoading(false);
    };

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!questionText || !answer || !moduleId) return;

        setIsAdding(true);
        const newQuestion: Omit<Question, 'id'> = {
            question: questionText,
            type,
            moduleId,
            answer,
            category: category || 'General',
            hint: hint || undefined,
            placeholder: 'Your Answer'
        };

        const id = await addQuestion(newQuestion);
        if (id) {
            setQuestions([...questions, { id, ...newQuestion }]);
            // Reset form
            setQuestionText('');
            setAnswer('');
            setHint('');
            setCategory('');
            alert('Question added successfully!');
        } else {
            alert('Failed to add question');
        }
        setIsAdding(false);
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm('Are you sure you want to delete this question?')) return;

        // Since we only delete dynamic questions which have string IDs
        if (typeof id === 'string') {
            const success = await deleteQuestion(id);
            if (success) {
                setQuestions(questions.filter(q => q.id !== id));
            } else {
                alert('Failed to delete question');
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Add Question Form */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <Plus size={22} className="text-green-400" />
                    Add New Question
                </h3>
                <form onSubmit={handleAddQuestion} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-purple-200 mb-1">Module</label>
                            <select
                                value={moduleId}
                                onChange={(e) => setModuleId(e.target.value)}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                            >
                                <option value="screen-test" className="text-black">Screening Test</option>
                                <option value="module-0" className="text-black">Module 0</option>
                                <option value="module-1" className="text-black">Module 1</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-200 mb-1">Question Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as 'text' | 'number')}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                            >
                                <option value="text" className="text-black">Text</option>
                                <option value="number" className="text-black">Number</option>
                            </select>
                        </div>
                    </div>

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
                            <label className="block text-sm font-medium text-purple-200 mb-1">Category (Optional)</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., Math, Logic"
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-purple-200 mb-1">Hint (Optional)</label>
                        <input
                            type="text"
                            value={hint}
                            onChange={(e) => setHint(e.target.value)}
                            placeholder="Optional hint for the student"
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                        />
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
            </div>

            {/* Questions List */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <FileQuestion size={22} className="text-blue-400" />
                    Existing Questions ({questions.length})
                </h3>

                {loading ? (
                    <div className="text-center py-8 text-white">
                        <Loader2 size={32} className="animate-spin mx-auto mb-2" />
                        <p>Loading questions...</p>
                    </div>
                ) : questions.length === 0 ? (
                    <div className="text-center py-8 text-purple-300/50">
                        <FileQuestion size={48} className="mx-auto mb-3 opacity-50" />
                        <p>No custom questions added yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                        {questions.map((q) => (
                            <div key={q.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                {q.moduleId}
                                            </span>
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                {q.category}
                                            </span>
                                        </div>
                                        <h4 className="font-semibold text-white mb-1">{q.question}</h4>
                                        <p className="text-sm text-green-400 font-mono">Answer: {q.answer}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(q.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                        title="Delete Question"
                                    >
                                        <Trash2 size={18} />
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
