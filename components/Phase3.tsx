import React from 'react';
import { ArrowLeft, Zap, CheckCircle, ExternalLink, Lightbulb, Code, Target, Play, BookOpen, Cpu } from 'lucide-react';

interface Phase3Props {
    onBack: () => void;
}

export const Phase3: React.FC<Phase3Props> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-yellow-300 hover:text-white transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Title Section */}
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl p-8 text-white mb-8 shadow-xl border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 3 - Bringing Your Websites to Life with JavaScript!</h1>
                    <p className="text-yellow-100 text-lg">Learn JavaScript Fundamentals by Building an Interactive Quiz</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Introduction */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center border border-yellow-500/30">
                                <Zap size={20} />
                            </span>
                            Welcome to Phase 3!
                        </h2>
                        <p className="text-purple-100/90 mb-6 leading-relaxed">
                            Hey there, future web wizard! You've successfully built the structure (HTML) and style (CSS) of websites. Now, get ready for the exciting part: <strong>making them interactive and smart!</strong> This phase is all about learning JavaScript fundamentals by building a cool project.
                        </p>
                        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-lg">
                            <p className="text-purple-100/80">
                                <strong>💡 Don't Worry:</strong> If these concepts are new, that's perfect! This project is how you'll learn them. You'll learn by doing!
                            </p>
                        </div>
                    </section>

                    {/* Project Introduction */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">1</span>
                            Project Introduction: Your JavaScript Learning Adventure
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <Target size={20} className="text-yellow-400" />
                                    The Goal of This Phase
                                </h3>
                                <p className="text-purple-100/70">
                                    Our main mission is to help you learn and understand fundamental JavaScript concepts. You'll do this by adding interactive features to a website project. Think of this project as your <strong>playground for learning!</strong>
                                </p>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
                                <h3 className="text-lg font-bold text-yellow-200 mb-2 flex items-center gap-2">
                                    <Cpu size={20} className="text-yellow-400" />
                                    What is JavaScript and Why is it a Game-Changer?
                                </h3>
                                <p className="text-purple-100/80 mb-3">
                                    JavaScript (JS) is the programming language that makes websites <strong>dynamic</strong>.
                                </p>
                                <ul className="list-disc list-inside text-purple-100/70 space-y-1 ml-2">
                                    <li>While HTML builds the skeleton and CSS adds the clothes, JS provides the <strong>brains</strong> and the ability to <strong>react</strong>.</li>
                                    <li>Want a button that does something cool when clicked? That's JavaScript!</li>
                                    <li>Want to show new information without reloading the page? That's JavaScript!</li>
                                    <li>It's essential for creating modern, engaging web experiences.</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-3">How This Project Will Help You Learn</h3>
                                <p className="text-purple-100/70 mb-4">This isn't just about building; it's about learning as you build.</p>
                                <ol className="space-y-3 text-purple-100/80">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                                        <span>You'll encounter a JavaScript concept needed for a feature.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                                        <span>You'll use the provided resources (and your own research skills!) to understand that concept.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                                        <span>You'll then apply it directly to your project.</span>
                                    </li>
                                </ol>
                                <p className="text-purple-100/90 mt-4">
                                    This <strong>"learn-then-apply"</strong> cycle is incredibly effective for building real skills, logic, and problem-solving abilities.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Getting Started */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">2</span>
                            Getting Started: Your Learning Approach
                        </h2>
                        <p className="text-purple-100/90 mb-6">This project uses a <strong>"learning by doing"</strong> philosophy. Here's how to make the most of it:</p>

                        <div className="space-y-4">
                            <div className="p-5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <strong className="text-blue-300">✨ Embrace the Journey:</strong>
                                <p className="text-purple-100/70 text-sm mt-1">You're not expected to know everything upfront. Each feature is an opportunity to learn something new.</p>
                            </div>
                            <div className="p-5 bg-green-500/10 rounded-xl border border-green-500/20">
                                <strong className="text-green-300">📚 Use Your Resources:</strong>
                                <p className="text-purple-100/70 text-sm mt-1">We've listed fantastic free resources. When you encounter a new JS concept, pause and learn about it using these resources before trying to implement it.</p>
                            </div>
                            <div className="p-5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                <strong className="text-purple-300">🎯 One Step at a Time:</strong>
                                <p className="text-purple-100/70 text-sm mt-1">Don't try to build everything at once! Pick one small feature, identify the JS concepts needed, learn about them, then implement.</p>
                            </div>
                            <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <strong className="text-amber-300">🔍 Experiment & console.log():</strong>
                                <p className="text-purple-100/70 text-sm mt-1">JavaScript runs in your browser. Use the browser's developer console (F12) extensively! Use <code className="bg-black/30 px-2 py-1 rounded text-green-400">console.log()</code> to print out values and see what's happening.</p>
                            </div>
                            <div className="p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                                <strong className="text-red-300">🐛 Debugging is Normal:</strong>
                                <p className="text-purple-100/70 text-sm mt-1">Code rarely works perfectly on the first try. Running into errors is a key part of learning. Browser developer tools will help you find and fix these "bugs."</p>
                            </div>
                        </div>
                    </section>

                    {/* Project Overview */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">3</span>
                            Project Overview: Interactive Quiz Master 🧠
                        </h2>

                        <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20">
                            <h3 className="text-xl font-bold text-blue-200 mb-3">What You're Going to Build</h3>
                            <p className="text-purple-100/80 mb-4">
                                You'll enhance your existing multi-page HTML structure to create a fully interactive <strong>Quiz Application</strong>. Users will be able to start a quiz, answer questions, and see their scores – all powered by JavaScript you write!
                            </p>

                            <h4 className="font-bold text-white mb-3">Key Features:</h4>
                            <div className="space-y-3">
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">🏠 Start Page (index.html):</strong>
                                    <p className="text-purple-100/70 text-sm">A welcome screen with a "Start Quiz" button that uses JS to reveal the quiz section or navigate to quiz.html.</p>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">📝 Quiz Page (quiz.html):</strong>
                                    <ul className="text-purple-100/70 text-sm list-disc list-inside ml-2 mt-1">
                                        <li>JS will dynamically load and display questions one by one</li>
                                        <li>JS will present multiple-choice answers for each question</li>
                                        <li>JS will detect which answer the user clicks</li>
                                        <li>JS will navigate to the next question or conclude the quiz</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                    <strong className="text-white block mb-1">📊 Results Page (results.html):</strong>
                                    <ul className="text-purple-100/70 text-sm list-disc list-inside ml-2 mt-1">
                                        <li>JS will calculate and display the user's final score</li>
                                        <li>JS can power a "Restart Quiz" button</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Learning & Applying Concepts */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">4</span>
                            Learning and Applying JavaScript Concepts
                        </h2>
                        <p className="text-purple-100/90 mb-8">Here's a breakdown of the Quiz Master features and the JavaScript concepts you'll learn and use.</p>

                        <div className="space-y-6">
                            {/* Feature 1 */}
                            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border-l-4 border-blue-500">
                                <h3 className="text-lg font-bold text-blue-200 mb-2">1. Starting the Quiz</h3>
                                <p className="text-sm text-purple-100/70 mb-4"><strong>JS Concepts:</strong> Variables, Functions, DOM Manipulation, Events (click)</p>
                                <div className="bg-white/5 p-4 rounded-xl mb-3 border border-white/5">
                                    <p className="text-white font-medium mb-1">Learn This First:</p>
                                    <p className="text-purple-100/70 text-sm">What are Variables? How do Functions work? What is the DOM? How do you make JS react to a button click?</p>
                                </div>
                                <div className="bg-blue-500/20 text-blue-100 p-4 rounded-xl text-sm border border-blue-500/30">
                                    <strong>Apply It:</strong> Write a JS function that runs when "Start Quiz" is clicked. Hide the start screen and show the first question.
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border-l-4 border-green-500">
                                <h3 className="text-lg font-bold text-green-200 mb-2">2. Storing Quiz Questions & Answers</h3>
                                <p className="text-sm text-purple-100/70 mb-4"><strong>JS Concepts:</strong> Arrays, Objects</p>
                                <div className="bg-white/5 p-4 rounded-xl mb-3 border border-white/5">
                                    <p className="text-white font-medium mb-1">Learn This First:</p>
                                    <p className="text-purple-100/70 text-sm">How can Arrays hold a list of items? How can Objects group related data (question text, choices, correct answer)?</p>
                                </div>
                                <div className="bg-green-500/20 text-green-100 p-4 rounded-xl text-sm border border-green-500/30">
                                    <strong>Apply It:</strong> Create a JavaScript Array where each item is an Object representing one quiz question.
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border-l-4 border-purple-500">
                                <h3 className="text-lg font-bold text-purple-200 mb-2">3. Displaying Questions & Options</h3>
                                <p className="text-sm text-purple-100/70 mb-4"><strong>JS Concepts:</strong> Loops, Strings, Functions, DOM Manipulation</p>
                                <div className="bg-white/5 p-4 rounded-xl mb-3 border border-white/5">
                                    <p className="text-white font-medium mb-1">Learn This First:</p>
                                    <p className="text-purple-100/70 text-sm">How do Loops (for or forEach) let you go through your array? How can you use Strings to build HTML? How do you update webpage content?</p>
                                </div>
                                <div className="bg-purple-500/20 text-purple-100 p-4 rounded-xl text-sm border border-purple-500/30">
                                    <strong>Apply It:</strong> Write a function that takes a question object and displays its text and answer choices on the page.
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border-l-4 border-amber-500">
                                <h3 className="text-lg font-bold text-amber-200 mb-2">4. Handling User Answers & Navigation</h3>
                                <p className="text-sm text-purple-100/70 mb-4"><strong>JS Concepts:</strong> Variables, Operators, Conditional Statements (if/else), Functions, Events</p>
                                <div className="bg-white/5 p-4 rounded-xl mb-3 border border-white/5">
                                    <p className="text-white font-medium mb-1">Learn This First:</p>
                                    <p className="text-purple-100/70 text-sm">How do you know which answer was clicked? How do you compare their answer to the correct one? How do you keep track of the score?</p>
                                </div>
                                <div className="bg-amber-500/20 text-amber-100 p-4 rounded-xl text-sm border border-amber-500/30">
                                    <strong>Apply It:</strong> Add event listeners to answer choices. Check if correct, update score, then display next question or move to results.
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl border-l-4 border-indigo-500">
                                <h3 className="text-lg font-bold text-indigo-200 mb-2">5. Calculating & Displaying Results</h3>
                                <p className="text-sm text-purple-100/70 mb-4"><strong>JS Concepts:</strong> Variables, Strings, DOM Manipulation, Functions</p>
                                <div className="bg-white/5 p-4 rounded-xl mb-3 border border-white/5">
                                    <p className="text-white font-medium mb-1">Learn This First:</p>
                                    <p className="text-purple-100/70 text-sm">How can you get the final score to the results page? How do you display this score in a user-friendly way?</p>
                                </div>
                                <div className="bg-indigo-500/20 text-indigo-100 p-4 rounded-xl text-sm border border-indigo-500/30">
                                    <strong>Apply It:</strong> On results page, write JS to get the final score and display a message like "You scored X out of Y!"
                                </div>
                            </div>

                            {/* Feature 6 */}
                            <div className="p-6 bg-gradient-to-r from-rose-500/10 to-red-500/10 rounded-2xl border-l-4 border-rose-500">
                                <h3 className="text-lg font-bold text-rose-200 mb-2">6. Restarting the Quiz (Optional)</h3>
                                <p className="text-sm text-purple-100/70 mb-4"><strong>JS Concepts:</strong> Functions, Variables, DOM Manipulation, Events</p>
                                <div className="bg-white/5 p-4 rounded-xl mb-3 border border-white/5">
                                    <p className="text-white font-medium mb-1">Learn This First:</p>
                                    <p className="text-purple-100/70 text-sm">How can a function reset your quiz (score, current question count) back to the beginning?</p>
                                </div>
                                <div className="bg-rose-500/20 text-rose-100 p-4 rounded-xl text-sm border border-rose-500/30">
                                    <strong>Apply It:</strong> Add a "Restart Quiz" button that resets variables and navigates back to the start.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Concepts */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">5</span>
                            Core JavaScript Concepts You Will Master
                        </h2>
                        <p className="text-purple-100/90 mb-8">As you work through the features above, you will be learning and applying these fundamental JavaScript concepts:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "Variables", desc: "Containers for storing data", color: "blue" },
                                { title: "Data Types", desc: "Numbers, Strings, Booleans", color: "green" },
                                { title: "Operators", desc: "+, -, ===, etc.", color: "purple" },
                                { title: "Strings", desc: "Text data and manipulation", color: "amber" },
                                { title: "Loops", desc: "Repeating actions (for, forEach)", color: "indigo" },
                                { title: "Arrays", desc: "Ordered lists of values", color: "cyan" },
                                { title: "Objects", desc: "Key-value pairs of related data", color: "rose" },
                                { title: "Functions", desc: "Reusable blocks of code", color: "orange" },
                                { title: "DOM Manipulation", desc: "Changing HTML dynamically", color: "pink" },
                                { title: "Events", desc: "Responding to user actions", color: "teal" },
                                { title: "Conditional Statements", desc: "if/else decision making", color: "lime" },
                                { title: "BOM Manipulation", desc: "Browser Object Model interaction", color: "yellow" }
                            ].map((item, index) => (
                                <div key={index} className={`p-4 bg-${item.color}-500/10 rounded-xl border border-${item.color}-500/20`}>
                                    <strong className={`text-${item.color}-300`}>{item.title}:</strong>
                                    <p className="text-sm text-purple-100/70 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">6</span>
                            Mini Projects: Practice Your Skills 💡
                        </h2>
                        <p className="text-purple-100/90 mb-8">Want to practice a specific concept before tackling it in the main project? These smaller projects are perfect for that!</p>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                                <h3 className="text-xl font-bold text-blue-200 mb-2">1. Simple To-Do List</h3>
                                <p className="text-purple-100/80 mb-2"><strong>What to Build:</strong> A list where users can add tasks, mark them done, and remove them.</p>
                                <p className="text-white font-medium mb-1 text-sm">Why Build It:</p>
                                <p className="text-purple-100/70 text-sm">Excellent practice for Arrays, Objects, Functions, DOM Manipulation, and Events.</p>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                                <h3 className="text-xl font-bold text-green-200 mb-2">2. Basic Tip Calculator</h3>
                                <p className="text-purple-100/80 mb-2"><strong>What to Build:</strong> Input fields for bill amount, tip percentage, and number of people. Calculate and display results.</p>
                                <p className="text-white font-medium mb-1 text-sm">Why Build It:</p>
                                <p className="text-purple-100/70 text-sm">Great for understanding Variables, Data Types, Operators (math!), Functions, and DOM Manipulation.</p>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                                <h3 className="text-xl font-bold text-purple-200 mb-2">3. "Quote of the Day" Generator</h3>
                                <p className="text-purple-100/80 mb-2"><strong>What to Build:</strong> A button that displays a random quote when clicked.</p>
                                <p className="text-white font-medium mb-1 text-sm">Why Build It:</p>
                                <p className="text-purple-100/70 text-sm">Good for practicing Arrays, Functions, Math.random(), DOM Manipulation, and Strings.</p>
                            </div>
                        </div>
                    </section>

                    {/* Resources */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">7</span>
                            Essential Learning Resources 📚
                        </h2>
                        <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                            <p className="text-purple-100/80">
                                <strong>💡 Pro-Tip:</strong> Don't just read! Type out the examples, play with them, change them, and see what happens. That's how you truly learn.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { url: "https://www.w3schools.com/js/", title: "W3Schools JavaScript Tutorial", desc: "Beginner-friendly with lots of examples you can try. Start here!" },
                                { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", title: "MDN Web Docs - JavaScript Guide", desc: "Very thorough and the official documentation. For deeper understanding." },
                                { url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", title: "FreeCodeCamp - JavaScript", desc: "Interactive lessons that build up your knowledge step-by-step." },
                                { url: "https://javascript.info/", title: "JavaScript.info", desc: "Well-structured, detailed tutorials from basic to advanced topics." },
                                { url: "https://scrimba.com/learn/learnjavascript", title: "Scrimba - Learn JavaScript for Free", desc: "Interactive video tutorials where you can code along directly." }
                            ].map((resource, i) => (
                                <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                                    <ExternalLink className="text-yellow-400" size={20} />
                                    <div>
                                        <p className="font-semibold text-white group-hover:text-yellow-300 transition-colors">{resource.title}</p>
                                        <p className="text-sm text-purple-100/60">{resource.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">8</span>
                            Video Submission Requirement 🎬
                        </h2>
                        <p className="text-purple-100/90 mb-6">As you complete significant parts of your Quiz Master, you'll need to record short videos to reflect on your learning.</p>

                        <div className="space-y-4 mb-4">
                            {[
                                "Create one short video (1-3 minutes) per major feature/page",
                                "What you built: Briefly show the interactive part",
                                "Which JS concepts used: State the main JavaScript concepts applied",
                                "Why those techniques: Explain your thought process",
                                "Live Demonstration: Show the feature working live in your browser"
                            ].map((req, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-purple-100/80">{req}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-yellow-500/20 text-yellow-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-yellow-500/30">9</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-purple-100/90 mb-6">By the end of this phase, you will be able to:</p>
                        <ul className="space-y-4">
                            {[
                                "Confidently write basic JavaScript code with good structure",
                                "Understand and use fundamental JS concepts: variables, data types, operators, strings, loops, arrays, objects, and functions",
                                "Manipulate the DOM to make web pages interactive",
                                "Create functions to organize code and make it reusable",
                                "Handle user events like button clicks",
                                "Perform basic debugging to find and fix issues in your code",
                                "Feel the satisfaction of building a functional interactive web application!"
                            ].map((outcome, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-purple-100/80">{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-white">You're about to unlock a whole new level! ⚡</p>
                        <p className="text-purple-200/60 mt-2">It will be challenging at times, but also incredibly rewarding. Break it down, use your resources, and enjoy the process of learning and creating. Good luck, and have fun coding! 🎉</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
