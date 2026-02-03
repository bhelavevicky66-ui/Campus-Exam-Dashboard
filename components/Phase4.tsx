import React from 'react';
import { ArrowLeft, Cpu, CheckCircle, ExternalLink, Lightbulb, Code, Target, Play, BookOpen, Sparkles, Video, Database, Zap } from 'lucide-react';

interface Phase4Props {
    onBack: () => void;
}

export const Phase4: React.FC<Phase4Props> = ({ onBack }) => {
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50 p-6 md:p-10">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 4 Project: Building an AI-Powered Content Generator</h1>
                    <p className="text-indigo-100 text-lg">Modern JavaScript & Gemini API</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Introduction */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                                <Sparkles size={20} />
                            </span>
                            Welcome to Phase 4!
                        </h2>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                            You've built a solid foundation with HTML, CSS, and JavaScript. Now, it's time to <strong>supercharge your skills</strong> by exploring modern JavaScript (ES6+) and diving into the fascinating world of Artificial Intelligence by learning to interact with the Gemini API.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <p className="text-slate-700">
                                <strong>💡 Why ES6?</strong> Think of ES6 (and later versions) as the modern toolkit for JavaScript developers. It introduces features that make your code more powerful, easier to read, and more efficient to write. Mastering ES6 is essential for building professional, up-to-date web applications. It's like upgrading from a basic toolbox to a state-of-the-art workshop!
                            </p>
                        </div>
                    </section>

                    {/* APIs and Gemini */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                            Project Introduction
                        </h2>

                        <div className="space-y-4">
                            <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Cpu size={20} className="text-indigo-500" />
                                    What are APIs and how does Gemini fit in?
                                </h3>
                                <p className="text-slate-600 mb-3">
                                    APIs (Application Programming Interfaces) are like special messengers that allow different software applications to communicate and share information. Imagine ordering food through a delivery app – the app (one piece of software) uses an API to talk to the restaurant's system (another piece of software).
                                </p>
                                <p className="text-slate-600">
                                    The <strong>Gemini API</strong> is a powerful AI tool from Google. It allows your applications to tap into advanced AI models to perform tasks like answering questions, summarizing text, generating creative ideas, and much more.
                                </p>
                            </div>

                            <div className="p-5 bg-slate-50 rounded-xl">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Target size={20} className="text-indigo-500" />
                                    Our Goal
                                </h3>
                                <p className="text-slate-600">
                                    In this project, you'll combine your knowledge of <strong>modern JavaScript</strong> with the <strong>Gemini API</strong> to build an interactive web application that fetches and displays AI-generated content. Get ready to make your web pages smarter!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Project Overview */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</span>
                            Project Overview
                        </h2>

                        <p className="text-slate-600 mb-4">
                            You'll be creating an <strong>AI-Powered Content Generator</strong>. This will be a web page where users can interact with the Gemini AI to get various types of information or creative content.
                        </p>

                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Features to Build (Add at least 3 features):</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>🙋 Ask Me Anything:</strong>
                                    <p className="text-slate-600">Users can type a question, and your app will fetch and display an answer from Gemini.</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>📝 Quick Summarizer:</strong>
                                    <p className="text-slate-600">Users can paste a block of text, and your app will use Gemini to provide a concise summary.</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>💡 Idea Spark:</strong>
                                    <p className="text-slate-600">Users can ask for ideas (e.g., "blog post ideas about JavaScript," "creative story prompts"), and Gemini will generate suggestions.</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>📖 Definition Finder:</strong>
                                    <p className="text-slate-600">Users can type a term, and Gemini provides a definition or explanation.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-slate-700">
                                <strong>📌 Note:</strong> You'll build this project using <strong>Vanilla JavaScript</strong> (no frameworks like React or Angular), incorporating modern ES6+ features, and integrating the Gemini API to bring the AI magic.
                            </p>
                        </div>
                    </section>

                    {/* ES6 & API Concepts Table */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</span>
                            ES6 & API Concepts to Apply
                        </h2>
                        <p className="text-slate-600 mb-6">This project is designed to give you practical experience with key ES6 features and API communication.</p>

                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-500">
                                <h3 className="font-bold text-slate-800 mb-2">let, const</h3>
                                <p className="text-slate-600 text-sm">For safer, block-scoped variable declarations. <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">const</code> for values that won't change, <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">let</code> for those that might.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                                <h3 className="font-bold text-slate-800 mb-2">Arrow Functions</h3>
                                <p className="text-slate-600 text-sm">For shorter syntax for functions, and they behave predictably with <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">this</code>.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                                <h3 className="font-bold text-slate-800 mb-2">Template Literals</h3>
                                <p className="text-slate-600 text-sm">To easily embed variables and expressions into strings, making dynamic content creation clean and readable.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-amber-500">
                                <h3 className="font-bold text-slate-800 mb-2">Destructuring</h3>
                                <p className="text-slate-600 text-sm">To neatly pull out properties from objects or elements from arrays into their own variables.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-l-4 border-indigo-500">
                                <h3 className="font-bold text-slate-800 mb-2">Spread/Rest Operators</h3>
                                <p className="text-slate-600 text-sm">Spread: for easily expanding iterables. Rest: for collecting multiple function arguments into an array.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border-l-4 border-rose-500">
                                <h3 className="font-bold text-slate-800 mb-2">Array Methods (map, filter, reduce)</h3>
                                <p className="text-slate-600 text-sm">For powerful and concise data manipulation without traditional for loops.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border-l-4 border-cyan-500">
                                <h3 className="font-bold text-slate-800 mb-2">Promises & fetch()</h3>
                                <p className="text-slate-600 text-sm"><code className="bg-slate-800 text-green-400 px-2 py-1 rounded">fetch()</code> returns a Promise, representing the eventual completion of an asynchronous operation. This allows your app to stay responsive.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-l-4 border-violet-500">
                                <h3 className="font-bold text-slate-800 mb-2">fetch() with Gemini API</h3>
                                <p className="text-slate-600 text-sm">The standard modern way to make network requests in JavaScript to get data from servers (in this case, the Gemini AI server).</p>
                            </div>
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</span>
                            Video Submission Requirement 🎬
                        </h2>
                        <p className="text-slate-600 mb-4">To demonstrate your understanding and showcase your work, you'll need to create <strong>one video per major feature</strong> you implement (aim for 3-4 videos in total, each 2-4 minutes long).</p>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Explain What You Built:</strong> Clearly describe the feature you're demonstrating</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Identify ES6 Concepts Used:</strong> Point out the specific ES6 concepts you applied and explain why</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Detail the Gemini API Call:</strong> Walk through how you made the call using fetch()</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Live Demo:</strong> Show the feature working live in your browser</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>No Notes or External Help:</strong> Explain and demo without relying on notes or scripts</span>
                            </div>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-slate-600 mb-4">By successfully completing this project, you will be able to:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Confidently use <strong>modern ES6+ JavaScript syntax</strong> (like let/const, arrow functions, template literals, destructuring, spread/rest)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Effectively manipulate and transform data using <strong>ES6 array methods</strong> (map, filter, reduce)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Understand and implement <strong>asynchronous JavaScript</strong> using Promises and the fetch() API</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Successfully <strong>integrate a third-party API</strong> (Gemini AI) into a frontend application</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Grasp the <strong>fundamentals of client-server request/response cycle</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Build a <strong>functional, real-world application</strong> that leverages the power of AI</span>
                            </li>
                        </ul>
                    </section>

                    {/* Resources */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">6</span>
                            Essential Learning Resources 📚
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <h3 className="font-bold text-slate-800 mb-3">Gemini API Documentation:</h3>
                                <div className="space-y-2">
                                    <a href="https://ai.google.dev/gemini-api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors group">
                                        <ExternalLink className="text-indigo-500" size={18} />
                                        <span className="font-medium text-slate-800 group-hover:text-indigo-600">Google AI for Developers - Gemini API</span>
                                    </a>
                                    <a href="https://ai.google.dev/gemini-api/docs/quickstart" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors group">
                                        <ExternalLink className="text-indigo-500" size={18} />
                                        <span className="font-medium text-slate-800 group-hover:text-indigo-600">Gemini API Quickstart for Web</span>
                                    </a>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-bold text-slate-800 mb-3">MDN Web Docs (Your best friend for JavaScript!):</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">let and const</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Arrow Functions</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Template Literals</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Destructuring Assignment</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Spread Syntax & Rest Parameters</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Array Methods (map, filter, reduce)</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Using fetch()</span>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                                        <ExternalLink className="text-indigo-500" size={14} />
                                        <span className="text-slate-700">Promises</span>
                                    </a>
                                </div>
                            </div>

                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <h3 className="font-bold text-slate-800 mb-2">YouTube Tutorials (Search for these topics):</h3>
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    <li>"JavaScript ES6 Tutorial for Beginners"</li>
                                    <li>"JavaScript Fetch API and Promises Explained"</li>
                                    <li>"Integrate Google Gemini API with JavaScript"</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">7</span>
                            Mini Projects (Warm-up Exercises) 💡
                        </h2>
                        <p className="text-slate-600 mb-6">Before diving into the main project, try these smaller exercises to get comfortable with ES6 and the Gemini API. Each should involve API calls to Gemini and use at least 3 different ES6 features.</p>

                        <div className="space-y-4">
                            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">1. AI Joke Generator</h3>
                                <p className="text-slate-600 mb-2"><strong>Goal:</strong> Create a page with a button. When clicked, it fetches a joke (prompt Gemini like: "Tell me a short, clean joke") and displays it.</p>
                                <p className="text-slate-700 font-medium mb-1">ES6 Ideas:</p>
                                <p className="text-slate-600 text-sm"><code className="bg-slate-800 text-green-400 px-2 py-1 rounded">const</code> for API endpoint, arrow function for click handler, template literal for the prompt, <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">fetch()</code>.</p>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">2. Gemini-Powered Quiz Helper</h3>
                                <p className="text-slate-600 mb-2"><strong>Goal:</strong> An input field where a user types a topic (e.g., "Photosynthesis"). A button then fetches a simple question and its answer about that topic from Gemini.</p>
                                <p className="text-slate-700 font-medium mb-1">ES6 Ideas:</p>
                                <p className="text-slate-600 text-sm"><code className="bg-slate-800 text-green-400 px-2 py-1 rounded">let</code> for user input, template literal to build the prompt, <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">fetch()</code>, destructuring to get question/answer from response.</p>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">3. Daily Positive Affirmation Fetcher</h3>
                                <p className="text-slate-600 mb-2"><strong>Goal:</strong> When the page loads, automatically fetch a short, positive affirmation from Gemini (e.g., prompt: "Give me a one-sentence positive affirmation") and display it.</p>
                                <p className="text-slate-700 font-medium mb-1">ES6 Ideas:</p>
                                <p className="text-slate-600 text-sm">Arrow function for DOMContentLoaded event, <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">fetch()</code>, template literals, <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">const</code> for display element.</p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-slate-700">This phase is all about leveling up! 🚀</p>
                        <p className="text-slate-500 mt-2">Don't be afraid to experiment, consult the documentation, and most importantly, have fun with it! Good luck!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
