import React from 'react';
import { ArrowLeft, Cpu, CheckCircle, ExternalLink, Lightbulb, Code, Target, Play, BookOpen, Sparkles, Video, Database, Zap } from 'lucide-react';

interface Phase4Props {
    onBack: () => void;
}

export const Phase4: React.FC<Phase4Props> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-indigo-300 hover:text-white transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Title Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 4 Project: Building an AI-Powered Content Generator</h1>
                    <p className="text-indigo-100 text-lg">Modern JavaScript & Gemini API</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Introduction */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center border border-indigo-500/30">
                                <Sparkles size={20} />
                            </span>
                            Welcome to Phase 4!
                        </h2>
                        <p className="text-purple-100/90 mb-6 leading-relaxed">
                            You've built a solid foundation with HTML, CSS, and JavaScript. Now, it's time to <strong>supercharge your skills</strong> by exploring modern JavaScript (ES6+) and diving into the fascinating world of Artificial Intelligence by learning to interact with the Gemini API.
                        </p>
                        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-lg">
                            <p className="text-purple-100/80">
                                <strong>💡 Why ES6?</strong> Think of ES6 (and later versions) as the modern toolkit for JavaScript developers. It introduces features that make your code more powerful, easier to read, and more efficient to write. Mastering ES6 is essential for building professional, up-to-date web applications. It's like upgrading from a basic toolbox to a state-of-the-art workshop!
                            </p>
                        </div>
                    </section>

                    {/* APIs and Gemini */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">1</span>
                            Project Introduction
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl border border-purple-500/20">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <Cpu size={20} className="text-indigo-400" />
                                    What are APIs and how does Gemini fit in?
                                </h3>
                                <p className="text-purple-100/80 mb-3">
                                    APIs (Application Programming Interfaces) are like special messengers that allow different software applications to communicate and share information. Imagine ordering food through a delivery app – the app (one piece of software) uses an API to talk to the restaurant's system (another piece of software).
                                </p>
                                <p className="text-purple-100/80">
                                    The <strong>Gemini API</strong> is a powerful AI tool from Google. It allows your applications to tap into advanced AI models to perform tasks like answering questions, summarizing text, generating creative ideas, and much more.
                                </p>
                            </div>

                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <Target size={20} className="text-indigo-400" />
                                    Our Goal
                                </h3>
                                <p className="text-purple-100/80">
                                    In this project, you'll combine your knowledge of <strong>modern JavaScript</strong> with the <strong>Gemini API</strong> to build an interactive web application that fetches and displays AI-generated content. Get ready to make your web pages smarter!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Project Overview */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">2</span>
                            Project Overview
                        </h2>

                        <p className="text-purple-100/90 mb-6">
                            You'll be creating an <strong>AI-Powered Content Generator</strong>. This will be a web page where users can interact with the Gemini AI to get various types of information or creative content.
                        </p>

                        <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20">
                            <h3 className="text-xl font-bold text-blue-200 mb-3">Features to Build (Add at least 3 features):</h3>
                            <div className="space-y-3">
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">🙋 Ask Me Anything:</strong>
                                    <p className="text-purple-100/70 text-sm">Users can type a question, and your app will fetch and display an answer from Gemini.</p>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">📝 Quick Summarizer:</strong>
                                    <p className="text-purple-100/70 text-sm">Users can paste a block of text, and your app will use Gemini to provide a concise summary.</p>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">💡 Idea Spark:</strong>
                                    <p className="text-purple-100/70 text-sm">Users can ask for ideas (e.g., "blog post ideas about JavaScript," "creative story prompts"), and Gemini will generate suggestions.</p>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">📖 Definition Finder:</strong>
                                    <p className="text-purple-100/70 text-sm">Users can type a term, and Gemini provides a definition or explanation.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-lg">
                            <p className="text-purple-100/80">
                                <strong>📌 Note:</strong> You'll build this project using <strong>Vanilla JavaScript</strong> (no frameworks like React or Angular), incorporating modern ES6+ features, and integrating the Gemini API to bring the AI magic.
                            </p>
                        </div>
                    </section>

                    {/* ES6 & API Concepts Table */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">3</span>
                            ES6 & API Concepts to Apply
                        </h2>
                        <p className="text-purple-100/90 mb-8">This project is designed to give you practical experience with key ES6 features and API communication.</p>

                        <div className="space-y-4">
                            {[
                                { title: "let, const", desc: "For safer, block-scoped variable declarations. const for values that won't change, let for those that might.", color: "blue", code: "const" },
                                { title: "Arrow Functions", desc: "For shorter syntax for functions, and they behave predictably with this.", color: "green", code: "this" },
                                { title: "Template Literals", desc: "To easily embed variables and expressions into strings, making dynamic content creation clean and readable.", color: "purple" },
                                { title: "Destructuring", desc: "To neatly pull out properties from objects or elements from arrays into their own variables.", color: "amber" },
                                { title: "Spread/Rest Operators", desc: "Spread: for easily expanding iterables. Rest: for collecting multiple function arguments into an array.", color: "indigo" },
                                { title: "Array Methods (map, filter, reduce)", desc: "For powerful and concise data manipulation without traditional for loops.", color: "rose" },
                                { title: "Promises & fetch()", desc: "fetch() returns a Promise, representing the eventual completion of an asynchronous operation. This allows your app to stay responsive.", color: "cyan", code: "fetch()" },
                                { title: "fetch() with Gemini API", desc: "The standard modern way to make network requests in JavaScript to get data from servers (in this case, the Gemini AI server).", color: "violet" }
                            ].map((item, index) => (
                                <div key={index} className={`p-4 bg-gradient-to-r from-${item.color}-500/10 to-${item.color === 'blue' ? 'cyan' : item.color}-500/10 rounded-xl border-l-4 border-${item.color}-500`}>
                                    <h3 className={`font-bold text-${item.color}-200 mb-2`}>{item.title}</h3>
                                    <p className="text-purple-100/70 text-sm">
                                        {item.desc.split(item.code || "").map((part, i, arr) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < arr.length - 1 && <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">{item.code}</code>}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">4</span>
                            Video Submission Requirement 🎬
                        </h2>
                        <p className="text-purple-100/90 mb-6">To demonstrate your understanding and showcase your work, you'll need to create <strong>one video per major feature</strong> you implement (aim for 3-4 videos in total, each 2-4 minutes long).</p>

                        <div className="space-y-4 mb-4">
                            {[
                                "Explain What You Built: Clearly describe the feature you're demonstrating",
                                "Identify ES6 Concepts Used: Point out the specific ES6 concepts you applied and explain why",
                                "Detail the Gemini API Call: Walk through how you made the call using fetch()",
                                "Live Demo: Show the feature working live in your browser",
                                "No Notes or External Help: Explain and demo without relying on notes or scripts"
                            ].map((req, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-purple-100/80"><strong>{req.split(":")[0]}:</strong>{req.split(":")[1]}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">5</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-purple-100/90 mb-6">By successfully completing this project, you will be able to:</p>
                        <ul className="space-y-4">
                            {[
                                "Confidently use modern ES6+ JavaScript syntax (like let/const, arrow functions, template literals, destructuring, spread/rest)",
                                "Effectively manipulate and transform data using ES6 array methods (map, filter, reduce)",
                                "Understand and implement asynchronous JavaScript using Promises and the fetch() API",
                                "Successfully integrate a third-party API (Gemini AI) into a frontend application",
                                "Grasp the fundamentals of client-server request/response cycle",
                                "Build a functional, real-world application that leverages the power of AI"
                            ].map((outcome, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-purple-100/80">
                                        {outcome.includes("modern") ? (
                                            <>Confidently use <strong>modern ES6+ JavaScript syntax</strong> (like let/const, arrow functions, template literals, destructuring, spread/rest)</>
                                        ) : outcome.includes("ES6 array") ? (
                                            <>Effectively manipulate and transform data using <strong>ES6 array methods</strong> (map, filter, reduce)</>
                                        ) : outcome.includes("asynchronous") ? (
                                            <>Understand and implement <strong>asynchronous JavaScript</strong> using Promises and the fetch() API</>
                                        ) : outcome.includes("third-party") ? (
                                            <>Successfully <strong>integrate a third-party API</strong> (Gemini AI) into a frontend application</>
                                        ) : outcome.includes("client-server") ? (
                                            <>Grasp the <strong>fundamentals of client-server request/response cycle</strong></>
                                        ) : (
                                            <>Build a <strong>functional, real-world application</strong> that leverages the power of AI</>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Resources */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">6</span>
                            Essential Learning Resources 📚
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-purple-300 mb-4">Gemini API Documentation:</h3>
                                <div className="space-y-3">
                                    <a href="https://ai.google.dev/gemini-api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                        <ExternalLink className="text-indigo-400" size={18} />
                                        <span className="font-medium text-white group-hover:text-indigo-300">Google AI for Developers - Gemini API</span>
                                    </a>
                                    <a href="https://ai.google.dev/gemini-api/docs/quickstart" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                        <ExternalLink className="text-indigo-400" size={18} />
                                        <span className="font-medium text-white group-hover:text-indigo-300">Gemini API Quickstart for Web</span>
                                    </a>
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-blue-300 mb-4">MDN Web Docs (Your best friend for JavaScript!):</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        { title: "let and const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
                                        { title: "Arrow Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
                                        { title: "Template Literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" },
                                        { title: "Destructuring Assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" },
                                        { title: "Spread Syntax & Rest Parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
                                        { title: "Array Methods (map, filter, reduce)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
                                        { title: "Using fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
                                        { title: "Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-sm border border-white/5">
                                            <ExternalLink className="text-indigo-400" size={14} />
                                            <span className="text-purple-100/80 hover:text-white">{link.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                                <h3 className="font-bold text-yellow-300 mb-3">YouTube Tutorials (Search for these topics):</h3>
                                <ul className="list-disc list-inside text-purple-100/80 space-y-1">
                                    <li>"JavaScript ES6 Tutorial for Beginners"</li>
                                    <li>"JavaScript Fetch API and Promises Explained"</li>
                                    <li>"Integrate Google Gemini API with JavaScript"</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">7</span>
                            Mini Projects (Warm-up Exercises) 💡
                        </h2>
                        <p className="text-purple-100/90 mb-8">Before diving into the main project, try these smaller exercises to get comfortable with ES6 and the Gemini API. Each should involve API calls to Gemini and use at least 3 different ES6 features.</p>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                                <h3 className="text-xl font-bold text-blue-200 mb-2">1. AI Joke Generator</h3>
                                <p className="text-purple-100/80 mb-2"><strong>Goal:</strong> Create a page with a button. When clicked, it fetches a joke (prompt Gemini like: "Tell me a short, clean joke") and displays it.</p>
                                <p className="text-white font-medium mb-1 text-sm">ES6 Ideas:</p>
                                <p className="text-purple-100/70 text-sm"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">const</code> for API endpoint, arrow function for click handler, template literal for the prompt, <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">fetch()</code>.</p>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                                <h3 className="text-xl font-bold text-green-200 mb-2">2. Gemini-Powered Quiz Helper</h3>
                                <p className="text-purple-100/80 mb-2"><strong>Goal:</strong> An input field where a user types a topic (e.g., "Photosynthesis"). A button then fetches a simple question and its answer about that topic from Gemini.</p>
                                <p className="text-white font-medium mb-1 text-sm">ES6 Ideas:</p>
                                <p className="text-purple-100/70 text-sm"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">let</code> for user input, template literal to build the prompt, <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">fetch()</code>, destructuring to get question/answer from response.</p>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                                <h3 className="text-xl font-bold text-purple-200 mb-2">3. Daily Positive Affirmation Fetcher</h3>
                                <p className="text-purple-100/80 mb-2"><strong>Goal:</strong> When the page loads, automatically fetch a short, positive affirmation from Gemini (e.g., prompt: "Give me a one-sentence positive affirmation") and display it.</p>
                                <p className="text-white font-medium mb-1 text-sm">ES6 Ideas:</p>
                                <p className="text-purple-100/70 text-sm">Arrow function for DOMContentLoaded event, <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">fetch()</code>, template literals, <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">const</code> for display element.</p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-white">This phase is all about leveling up! 🚀</p>
                        <p className="text-purple-200/60 mt-2">Don't be afraid to experiment, consult the documentation, and most importantly, have fun with it! Good luck!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
