import React from 'react';
import { ArrowLeft, Clock, Video, BookOpen, Lightbulb, ExternalLink, CheckCircle, Server, Code, Database, Zap, Lock, Terminal, Globe, Cpu, FileCode } from 'lucide-react';

interface Phase5Props {
    onBack: () => void;
    onComplete?: () => void;
}

export const Phase5: React.FC<Phase5Props> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-emerald-300 hover:text-white transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Title Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 5 - Your First Backend with Node.js, Express & Gemini AI! 🚀</h1>
                    <p className="text-emerald-100 text-lg">Build the "other side" of web development</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* 1. Project Introduction */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">
                                📌
                            </span>
                            Project Introduction
                        </h2>

                        <p className="text-purple-100/90 mb-6 leading-relaxed">
                            Welcome to Phase 5! You've done an amazing job mastering the frontend with HTML, CSS, and JavaScript. Now, get ready to explore the "other side" of web development: <strong>the backend!</strong>
                        </p>

                        <div className="bg-teal-500/10 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
                            <h3 className="text-lg font-semibold text-teal-300 mb-2 flex items-center gap-2">
                                <Server size={20} className="text-teal-400" />
                                What's "Backend" Anyway?
                            </h3>
                            <p className="text-purple-100/80">
                                Think of a website like a restaurant. The <strong>frontend</strong> is everything you, as a customer, see and interact with – the menu, the tables, the decor (this is your HTML, CSS, and frontend JavaScript). The <strong>backend</strong> is like the kitchen and the staff working behind the scenes. It's where food is prepared, orders are managed, and ingredients are stored. In web development, the backend is the server-side code that handles requests, manages data, interacts with databases, and performs logic that the user doesn't directly see.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Terminal size={18} className="text-emerald-400" />
                                    Node.js
                                </h4>
                                <p className="text-purple-100/70 text-sm">Imagine being able to use JavaScript, the language you already know from the frontend, to write backend code. That's Node.js! It's a runtime environment that lets you run JavaScript on the server.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Code size={18} className="text-emerald-400" />
                                    Express.js
                                </h4>
                                <p className="text-purple-100/70 text-sm">This is a popular framework (a set of tools and guidelines) that makes building web applications and APIs with Node.js much simpler and more organized. Think of it as a chef's toolkit for your backend.</p>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                            <h4 className="font-bold text-purple-200 mb-2 flex items-center gap-2">
                                <Zap size={18} className="text-purple-400" />
                                What about the Gemini API?
                            </h4>
                            <p className="text-purple-100/80 text-sm">You've used APIs on the frontend. The Gemini API by Google allows your applications to tap into powerful Artificial Intelligence models. This means you can build apps that can understand text, answer questions, generate creative content, and much more!</p>
                        </div>

                        <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-lg mt-6">
                            <p className="text-purple-100/80">
                                <strong>🎯 Our Goal for Phase 5:</strong> You're going to build a full-stack web application. This means you'll have a frontend (which you already know how to build) that talks to a backend server you create with Node.js and Express.js. Your backend server will then communicate with the Gemini API to fetch AI-generated content and send it back to your frontend.
                            </p>
                        </div>
                    </section>

                    {/* 2. Project Overview */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">2</span>
                            🧱 Project Overview: "Ask Gemini" Web App
                        </h2>

                        <p className="text-purple-100/90 mb-6">You'll create a simple but powerful web application called <strong>"Ask Gemini."</strong> Here's the flow:</p>

                        <div className="space-y-3 mb-8">
                            {[
                                "A user visits your web page (the frontend).",
                                "They type a question into an input field and click \"Submit.\"",
                                "The frontend sends this question to your backend server.",
                                "Your backend server (built with Node.js and Express.js) receives the question.",
                                "Your backend then sends a request to the Gemini API, asking it to answer the user's question.",
                                "The Gemini API processes the request and sends a response (the AI-generated answer) back to your backend.",
                                "Your backend sends this answer back to your frontend.",
                                "The frontend displays the answer nicely to the user."
                            ].map((step, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{index + 1}</span>
                                    <span className="text-purple-100/80">{step}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                            <h3 className="text-lg font-bold text-blue-200 mb-3">🌟 Core Features:</h3>
                            <ul className="space-y-2 text-purple-100/80">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={16} />
                                    <span>A simple HTML frontend with an input field for questions and a display area for answers.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={16} />
                                    <span>A backend server built with Node.js.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={16} />
                                    <span>API routes created using Express.js to handle requests from the frontend.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={16} />
                                    <span>Backend logic to securely call the Gemini API (your API key will be kept safe on the server!).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={16} />
                                    <span>The frontend dynamically updates to show the response from the backend.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                            <p className="text-purple-100/80">
                                <strong>⚠️ Key Requirement:</strong> All communication with the Gemini API must happen on the backend, not directly from the frontend.
                            </p>
                        </div>
                    </section>

                    {/* 3. Backend Concepts to Learn */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">3</span>
                            🧪 Backend Concepts to Learn & Use
                        </h2>

                        <p className="text-purple-100/90 mb-6">This project will introduce you to fundamental backend concepts:</p>

                        <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-emerald-900/50 text-white">
                                        <th className="p-4 text-left font-bold">Feature / Task</th>
                                        <th className="p-4 text-left font-bold">Backend Concept</th>
                                        <th className="p-4 text-left font-bold">Why It's Important</th>
                                    </tr>
                                </thead>
                                <tbody className="text-purple-100/80 divide-y divide-white/10">
                                    <tr className="hover:bg-white/5">
                                        <td className="p-4">Setting up your backend server</td>
                                        <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono text-sm">express()</code></td>
                                        <td className="p-4">This is the starting point for creating your web server application.</td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-4">Handling requests from the frontend</td>
                                        <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono text-sm">app.get(), app.post()</code></td>
                                        <td className="p-4">Defines how your server responds to different URLs and request types.</td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-4">Communicating with Gemini AI</td>
                                        <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono text-sm">fetch() or axios</code></td>
                                        <td className="p-4">To make HTTP requests from your server to external APIs like Gemini.</td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-4">Serving your HTML, CSS, JS files</td>
                                        <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono text-sm">express.static</code></td>
                                        <td className="p-4">Allows users' browsers to access and display your frontend.</td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-4">Keeping your API key secret</td>
                                        <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono text-sm">.env + dotenv</code></td>
                                        <td className="p-4">Prevents exposing sensitive information like API keys in your code.</td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-4">Reading data from frontend</td>
                                        <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono text-sm">express.json()</code></td>
                                        <td className="p-4">To parse incoming request bodies (e.g., JSON data from the frontend).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 4. Video Submission Requirement */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">4</span>
                            🎥 Video Submission Requirement
                        </h2>

                        <p className="text-purple-100/90 mb-6">To showcase your new backend skills, you'll create <strong>three short videos (2-5 minutes each)</strong>:</p>

                        <div className="space-y-6">
                            {/* Video 1 */}
                            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Video size={20} className="text-blue-400" />
                                    Video 1: Express App Setup & Structure
                                </h3>
                                <ul className="space-y-2 text-purple-100/80 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Show how you set up your Node.js project and installed Express.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Explain your project folder structure (where your server code, frontend files, etc., are).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Walk through the basic Express server setup code (<code className="bg-black/30 px-1 rounded text-green-400 font-mono">require('express')</code>, <code className="bg-black/30 px-1 rounded text-green-400 font-mono">app = express()</code>, <code className="bg-black/30 px-1 rounded text-green-400 font-mono">app.listen()</code>).</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Video 2 */}
                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Video size={20} className="text-purple-400" />
                                    Video 2: Gemini API Backend Integration
                                </h3>
                                <ul className="space-y-2 text-purple-100/80 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Explain how you created the backend route that handles the request for Gemini.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Show the code where your backend makes the <code className="bg-black/30 px-1 rounded text-green-400 font-mono">fetch()</code> (or axios) call to the Gemini API.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Explain how you handled the API key securely (using environment variables).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Show how you process the response from Gemini before sending it back to the frontend.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Video 3 */}
                            <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Video size={20} className="text-emerald-400" />
                                    Video 3: Full Frontend-Backend Interaction Demo
                                </h3>
                                <ul className="space-y-2 text-purple-100/80 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Demonstrate the entire application working.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Type a question on the frontend, show the request going to the backend (you can use browser developer tools' network tab or console logs on the server).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Show the AI-generated response appearing on the frontend.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={14} />
                                        <span>Briefly explain the data flow from frontend to backend and back.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                            <p className="text-purple-100/80">
                                <strong>📝 Important:</strong> For each video, clearly show your code and explain what different parts do. Run your application to demonstrate it working live. Please complete the explanation and demo without reading from a script or relying on external notes.
                            </p>
                        </div>
                    </section>

                    {/* 5. Learning Outcomes */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">5</span>
                            🎯 Learning Outcomes
                        </h2>

                        <p className="text-purple-100/90 mb-6">By the end of this phase, you'll have achieved some major milestones:</p>

                        <ul className="space-y-4">
                            {[
                                "You'll be able to build a basic web server using Node.js and Express.js.",
                                "You'll understand the fundamental client-server architecture – how frontend and backend communicate.",
                                "You'll know how to create API routes on your backend to send and receive data.",
                                "You'll be able to connect your backend to external APIs like Gemini using fetch or axios.",
                                "You'll understand the importance of handling asynchronous operations on the backend.",
                                "You'll grasp how to securely manage sensitive information like API keys.",
                                "You'll gain confidence in building small but complete full-stack applications!"
                            ].map((outcome, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-purple-100/80">{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 6. Resources */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">6</span>
                            📚 Resources
                        </h2>

                        <p className="text-purple-100/90 mb-6">Here are some beginner-friendly resources to help you on your backend journey:</p>

                        <div className="space-y-6">
                            {/* Node.js Basics */}
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Terminal size={18} className="text-emerald-400" />
                                    Node.js Basics
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "What is Node.js? Explained in 100 Seconds (Quick Intro)", url: "https://www.youtube.com/watch?v=ENrzD9HAZK4" },
                                        { title: "Node.js Crash Course by Traversy Media (More In-depth)", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Express.js Fundamentals */}
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Code size={18} className="text-blue-400" />
                                    Express.js Fundamentals
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Express.js Official \"Getting Started\" Guide", url: "https://expressjs.com/en/starter/installing.html" },
                                        { title: "Express JS Crash Course by Traversy Media", url: "https://www.youtube.com/watch?v=L72fhGm1tfE" },
                                        { title: "MDN Express.js Tutorial", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Gemini API Integration */}
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Zap size={18} className="text-purple-400" />
                                    Gemini API Integration
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Google AI for Developers - Gemini API Documentation", url: "https://ai.google.dev/docs" },
                                        { title: "Gemini API Quickstart for Node.js", url: "https://ai.google.dev/tutorials/node_quickstart" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Environment Variables */}
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Lock size={18} className="text-amber-400" />
                                    Environment Variables
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "How to use .env files in Node.js with dotenv", url: "https://www.npmjs.com/package/dotenv" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Making HTTP Requests */}
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Globe size={18} className="text-cyan-400" />
                                    Making HTTP Requests from Node.js
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Using fetch with Node.js (Node.js 18+ has built-in fetch)", url: "https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch" },
                                        { title: "Axios (Promise based HTTP client) - A popular alternative to fetch", url: "https://axios-http.com/docs/intro" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7. Mini Projects */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-emerald-500/20 text-emerald-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-emerald-500/30">7</span>
                            🧩 Mini Projects for Practice
                        </h2>

                        <p className="text-purple-100/90 mb-8">Before or alongside the main "Ask Gemini" project, try these smaller exercises to get comfortable with backend concepts and AI integration:</p>

                        <div className="space-y-6">
                            {/* Mini Project 1 */}
                            <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20">
                                <h3 className="text-xl font-bold text-amber-200 mb-2 flex items-center gap-2">
                                    <FileCode size={20} className="text-amber-400" />
                                    Mini Project 1: "AI Fun Facts API"
                                </h3>
                                <p className="text-purple-100/80 mb-3"><strong>Goal:</strong> Build an Express server with a single API endpoint.</p>
                                <ul className="space-y-2 text-purple-100/70 text-sm">
                                    <li><strong>Route:</strong> <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">/fun-fact</code> (GET request)</li>
                                    <li><strong>Logic:</strong> When this route is hit, your backend uses the Gemini API to generate a random, interesting fun fact.</li>
                                    <li><strong>Response:</strong> Return the fun fact as a JSON object (e.g., <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">&#123; "fact": "A group of flamingos is called a flamboyance." &#125;</code>).</li>
                                    <li><strong>Test:</strong> Use a browser or a tool like Postman/Insomnia to test your API endpoint.</li>
                                </ul>
                            </div>

                            {/* Mini Project 2 */}
                            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                                <h3 className="text-xl font-bold text-blue-200 mb-2 flex items-center gap-2">
                                    <FileCode size={20} className="text-blue-400" />
                                    Mini Project 2: "AI Daily Journal Prompter"
                                </h3>
                                <p className="text-purple-100/80 mb-3"><strong>Goal:</strong> Create a mood-based journal prompt generator.</p>
                                <ul className="space-y-2 text-purple-100/70 text-sm">
                                    <li><strong>Frontend:</strong> A simple HTML page with a dropdown or input for mood (e.g., "happy," "stressed," "curious").</li>
                                    <li><strong>Backend Route:</strong> <code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">/journal-prompt</code> (POST request, sending the mood)</li>
                                    <li><strong>Logic:</strong> Your backend takes the mood, sends it to Gemini with a prompt like: "Write a short, encouraging journal prompt for someone feeling [mood]."</li>
                                    <li><strong>Response:</strong> The backend sends the AI-generated journal prompt back to the frontend, which then displays it.</li>
                                </ul>
                            </div>

                            {/* Mini Project 3 */}
                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                                <h3 className="text-xl font-bold text-purple-200 mb-2 flex items-center gap-2">
                                    <FileCode size={20} className="text-purple-400" />
                                    Mini Project 3: "AI Helper Bot Backend"
                                </h3>
                                <p className="text-purple-100/80 mb-3"><strong>Goal:</strong> Create a backend with multiple API endpoints, each for a different type of AI help.</p>
                                <p className="text-white font-medium mb-2">Routes:</p>
                                <ul className="space-y-2 text-purple-100/70 text-sm mb-3">
                                    <li><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">/joke</code> (GET): Fetches a joke from Gemini.</li>
                                    <li><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">/motivation</code> (GET): Fetches a motivational quote from Gemini.</li>
                                    <li><code className="bg-black/30 px-2 py-1 rounded text-green-400 font-mono">/tip-of-the-day</code> (GET): Fetches a helpful tip from Gemini.</li>
                                </ul>
                                <p className="text-purple-100/70 text-sm"><strong>Bonus:</strong> Create a simple frontend to interact with one or more of these endpoints.</p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-white">This is a big step, but an incredibly rewarding one! 🎉</p>
                        <p className="text-purple-200/60 mt-2">Building your own backend opens up a whole new world of possibilities. Take it one step at a time, refer to the resources, and don't hesitate to experiment. You've got this! Good luck, and happy coding!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
