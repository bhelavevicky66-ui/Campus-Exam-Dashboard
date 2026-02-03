import React from 'react';
import { ArrowLeft, Zap, CheckCircle, ExternalLink, Lightbulb, Code, Target, Play, BookOpen, Cpu } from 'lucide-react';

interface Phase3Props {
    onBack: () => void;
}

export const Phase3: React.FC<Phase3Props> = ({ onBack }) => {
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-yellow-50 p-6 md:p-10">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-yellow-600 font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white mb-8 shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 3 - Bringing Your Websites to Life with JavaScript!</h1>
                    <p className="text-yellow-100 text-lg">Learn JavaScript Fundamentals by Building an Interactive Quiz</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Introduction */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center">
                                <Zap size={20} />
                            </span>
                            Welcome to Phase 3!
                        </h2>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                            Hey there, future web wizard! You've successfully built the structure (HTML) and style (CSS) of websites. Now, get ready for the exciting part: <strong>making them interactive and smart!</strong> This phase is all about learning JavaScript fundamentals by building a cool project.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <p className="text-slate-700">
                                <strong>💡 Don't Worry:</strong> If these concepts are new, that's perfect! This project is how you'll learn them. You'll learn by doing!
                            </p>
                        </div>
                    </section>

                    {/* Project Introduction */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                            Project Introduction: Your JavaScript Learning Adventure
                        </h2>

                        <div className="space-y-4">
                            <div className="p-5 bg-slate-50 rounded-xl">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Target size={20} className="text-yellow-500" />
                                    The Goal of This Phase
                                </h3>
                                <p className="text-slate-600">
                                    Our main mission is to help you learn and understand fundamental JavaScript concepts. You'll do this by adding interactive features to a website project. Think of this project as your <strong>playground for learning!</strong>
                                </p>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Cpu size={20} className="text-yellow-500" />
                                    What is JavaScript and Why is it a Game-Changer?
                                </h3>
                                <p className="text-slate-600 mb-3">
                                    JavaScript (JS) is the programming language that makes websites <strong>dynamic</strong>.
                                </p>
                                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                                    <li>While HTML builds the skeleton and CSS adds the clothes, JS provides the <strong>brains</strong> and the ability to <strong>react</strong>.</li>
                                    <li>Want a button that does something cool when clicked? That's JavaScript!</li>
                                    <li>Want to show new information without reloading the page? That's JavaScript!</li>
                                    <li>It's essential for creating modern, engaging web experiences.</li>
                                </ul>
                            </div>

                            <div className="p-5 bg-slate-50 rounded-xl">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">How This Project Will Help You Learn</h3>
                                <p className="text-slate-600 mb-3">This isn't just about building; it's about learning as you build.</p>
                                <ol className="space-y-2 text-slate-600">
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
                                <p className="text-slate-600 mt-3">
                                    This <strong>"learn-then-apply"</strong> cycle is incredibly effective for building real skills, logic, and problem-solving abilities.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Getting Started */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</span>
                            Getting Started: Your Learning Approach
                        </h2>
                        <p className="text-slate-600 mb-4">This project uses a <strong>"learning by doing"</strong> philosophy. Here's how to make the most of it:</p>

                        <div className="space-y-3">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <strong className="text-slate-800">✨ Embrace the Journey:</strong>
                                <p className="text-slate-600">You're not expected to know everything upfront. Each feature is an opportunity to learn something new.</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <strong className="text-slate-800">📚 Use Your Resources:</strong>
                                <p className="text-slate-600">We've listed fantastic free resources. When you encounter a new JS concept, pause and learn about it using these resources before trying to implement it.</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <strong className="text-slate-800">🎯 One Step at a Time:</strong>
                                <p className="text-slate-600">Don't try to build everything at once! Pick one small feature, identify the JS concepts needed, learn about them, then implement.</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-lg">
                                <strong className="text-slate-800">🔍 Experiment & console.log():</strong>
                                <p className="text-slate-600">JavaScript runs in your browser. Use the browser's developer console (F12) extensively! Use <code className="bg-slate-800 text-green-400 px-2 py-1 rounded">console.log()</code> to print out values and see what's happening.</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg">
                                <strong className="text-slate-800">🐛 Debugging is Normal:</strong>
                                <p className="text-slate-600">Code rarely works perfectly on the first try. Running into errors is a key part of learning. Browser developer tools will help you find and fix these "bugs."</p>
                            </div>
                        </div>
                    </section>

                    {/* Project Overview */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</span>
                            Project Overview: Interactive Quiz Master 🧠
                        </h2>

                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">What You're Going to Build</h3>
                            <p className="text-slate-600 mb-4">
                                You'll enhance your existing multi-page HTML structure to create a fully interactive <strong>Quiz Application</strong>. Users will be able to start a quiz, answer questions, and see their scores – all powered by JavaScript you write!
                            </p>

                            <h4 className="font-bold text-slate-800 mb-2">Key Features:</h4>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>🏠 Start Page (index.html):</strong>
                                    <p className="text-slate-600">A welcome screen with a "Start Quiz" button that uses JS to reveal the quiz section or navigate to quiz.html.</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>📝 Quiz Page (quiz.html):</strong>
                                    <ul className="text-slate-600 list-disc list-inside ml-2 mt-1">
                                        <li>JS will dynamically load and display questions one by one</li>
                                        <li>JS will present multiple-choice answers for each question</li>
                                        <li>JS will detect which answer the user clicks</li>
                                        <li>JS will navigate to the next question or conclude the quiz</li>
                                    </ul>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>📊 Results Page (results.html):</strong>
                                    <ul className="text-slate-600 list-disc list-inside ml-2 mt-1">
                                        <li>JS will calculate and display the user's final score</li>
                                        <li>JS can power a "Restart Quiz" button</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Learning & Applying Concepts */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</span>
                            Learning and Applying JavaScript Concepts
                        </h2>
                        <p className="text-slate-600 mb-6">Here's a breakdown of the Quiz Master features and the JavaScript concepts you'll learn and use.</p>

                        <div className="space-y-4">
                            {/* Feature 1 */}
                            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-500">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">1. Starting the Quiz</h3>
                                <p className="text-sm text-slate-600 mb-3"><strong>JS Concepts:</strong> Variables, Functions, DOM Manipulation, Events (click)</p>
                                <div className="bg-white p-3 rounded-lg mb-2">
                                    <p className="text-slate-700 font-medium mb-1">Learn This First:</p>
                                    <p className="text-slate-600 text-sm">What are Variables? How do Functions work? What is the DOM? How do you make JS react to a button click?</p>
                                </div>
                                <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm">
                                    <strong>Apply It:</strong> Write a JS function that runs when "Start Quiz" is clicked. Hide the start screen and show the first question.
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">2. Storing Quiz Questions & Answers</h3>
                                <p className="text-sm text-slate-600 mb-3"><strong>JS Concepts:</strong> Arrays, Objects</p>
                                <div className="bg-white p-3 rounded-lg mb-2">
                                    <p className="text-slate-700 font-medium mb-1">Learn This First:</p>
                                    <p className="text-slate-600 text-sm">How can Arrays hold a list of items? How can Objects group related data (question text, choices, correct answer)?</p>
                                </div>
                                <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm">
                                    <strong>Apply It:</strong> Create a JavaScript Array where each item is an Object representing one quiz question.
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">3. Displaying Questions & Options</h3>
                                <p className="text-sm text-slate-600 mb-3"><strong>JS Concepts:</strong> Loops, Strings, Functions, DOM Manipulation</p>
                                <div className="bg-white p-3 rounded-lg mb-2">
                                    <p className="text-slate-700 font-medium mb-1">Learn This First:</p>
                                    <p className="text-slate-600 text-sm">How do Loops (for or forEach) let you go through your array? How can you use Strings to build HTML? How do you update webpage content?</p>
                                </div>
                                <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm">
                                    <strong>Apply It:</strong> Write a function that takes a question object and displays its text and answer choices on the page.
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-amber-500">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">4. Handling User Answers & Navigation</h3>
                                <p className="text-sm text-slate-600 mb-3"><strong>JS Concepts:</strong> Variables, Operators, Conditional Statements (if/else), Functions, Events</p>
                                <div className="bg-white p-3 rounded-lg mb-2">
                                    <p className="text-slate-700 font-medium mb-1">Learn This First:</p>
                                    <p className="text-slate-600 text-sm">How do you know which answer was clicked? How do you compare their answer to the correct one? How do you keep track of the score?</p>
                                </div>
                                <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm">
                                    <strong>Apply It:</strong> Add event listeners to answer choices. Check if correct, update score, then display next question or move to results.
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-l-4 border-indigo-500">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">5. Calculating & Displaying Results</h3>
                                <p className="text-sm text-slate-600 mb-3"><strong>JS Concepts:</strong> Variables, Strings, DOM Manipulation, Functions</p>
                                <div className="bg-white p-3 rounded-lg mb-2">
                                    <p className="text-slate-700 font-medium mb-1">Learn This First:</p>
                                    <p className="text-slate-600 text-sm">How can you get the final score to the results page? How do you display this score in a user-friendly way?</p>
                                </div>
                                <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm">
                                    <strong>Apply It:</strong> On results page, write JS to get the final score and display a message like "You scored X out of Y!"
                                </div>
                            </div>

                            {/* Feature 6 */}
                            <div className="p-5 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border-l-4 border-rose-500">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">6. Restarting the Quiz (Optional)</h3>
                                <p className="text-sm text-slate-600 mb-3"><strong>JS Concepts:</strong> Functions, Variables, DOM Manipulation, Events</p>
                                <div className="bg-white p-3 rounded-lg mb-2">
                                    <p className="text-slate-700 font-medium mb-1">Learn This First:</p>
                                    <p className="text-slate-600 text-sm">How can a function reset your quiz (score, current question count) back to the beginning?</p>
                                </div>
                                <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm">
                                    <strong>Apply It:</strong> Add a "Restart Quiz" button that resets variables and navigates back to the start.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Concepts */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</span>
                            Core JavaScript Concepts You Will Master
                        </h2>
                        <p className="text-slate-600 mb-4">As you work through the features above, you will be learning and applying these fundamental JavaScript concepts:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <strong className="text-slate-800">Variables:</strong>
                                <p className="text-sm text-slate-600">Containers for storing data</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <strong className="text-slate-800">Data Types:</strong>
                                <p className="text-sm text-slate-600">Numbers, Strings, Booleans</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <strong className="text-slate-800">Operators:</strong>
                                <p className="text-sm text-slate-600">+, -, ===, etc.</p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-lg">
                                <strong className="text-slate-800">Strings:</strong>
                                <p className="text-sm text-slate-600">Text data and manipulation</p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <strong className="text-slate-800">Loops:</strong>
                                <p className="text-sm text-slate-600">Repeating actions (for, forEach)</p>
                            </div>
                            <div className="p-3 bg-cyan-50 rounded-lg">
                                <strong className="text-slate-800">Arrays:</strong>
                                <p className="text-sm text-slate-600">Ordered lists of values</p>
                            </div>
                            <div className="p-3 bg-rose-50 rounded-lg">
                                <strong className="text-slate-800">Objects:</strong>
                                <p className="text-sm text-slate-600">Key-value pairs of related data</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <strong className="text-slate-800">Functions:</strong>
                                <p className="text-sm text-slate-600">Reusable blocks of code</p>
                            </div>
                            <div className="p-3 bg-pink-50 rounded-lg">
                                <strong className="text-slate-800">DOM Manipulation:</strong>
                                <p className="text-sm text-slate-600">Changing HTML dynamically</p>
                            </div>
                            <div className="p-3 bg-teal-50 rounded-lg">
                                <strong className="text-slate-800">Events:</strong>
                                <p className="text-sm text-slate-600">Responding to user actions</p>
                            </div>
                            <div className="p-3 bg-lime-50 rounded-lg">
                                <strong className="text-slate-800">Conditional Statements:</strong>
                                <p className="text-sm text-slate-600">if/else decision making</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <strong className="text-slate-800">BOM Manipulation:</strong>
                                <p className="text-sm text-slate-600">Browser Object Model interaction</p>
                            </div>
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">6</span>
                            Mini Projects: Practice Your Skills 💡
                        </h2>
                        <p className="text-slate-600 mb-6">Want to practice a specific concept before tackling it in the main project? These smaller projects are perfect for that!</p>

                        <div className="space-y-4">
                            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">1. Simple To-Do List</h3>
                                <p className="text-slate-600 mb-2"><strong>What to Build:</strong> A list where users can add tasks, mark them done, and remove them.</p>
                                <p className="text-slate-700 font-medium mb-1">Why Build It:</p>
                                <p className="text-slate-600 text-sm">Excellent practice for Arrays, Objects, Functions, DOM Manipulation, and Events.</p>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">2. Basic Tip Calculator</h3>
                                <p className="text-slate-600 mb-2"><strong>What to Build:</strong> Input fields for bill amount, tip percentage, and number of people. Calculate and display results.</p>
                                <p className="text-slate-700 font-medium mb-1">Why Build It:</p>
                                <p className="text-slate-600 text-sm">Great for understanding Variables, Data Types, Operators (math!), Functions, and DOM Manipulation.</p>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">3. "Quote of the Day" Generator</h3>
                                <p className="text-slate-600 mb-2"><strong>What to Build:</strong> A button that displays a random quote when clicked.</p>
                                <p className="text-slate-700 font-medium mb-1">Why Build It:</p>
                                <p className="text-slate-600 text-sm">Good for practicing Arrays, Functions, Math.random(), DOM Manipulation, and Strings.</p>
                            </div>
                        </div>
                    </section>

                    {/* Resources */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">7</span>
                            Essential Learning Resources 📚
                        </h2>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
                            <p className="text-slate-700">
                                <strong>💡 Pro-Tip:</strong> Don't just read! Type out the examples, play with them, change them, and see what happens. That's how you truly learn.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a href="https://www.w3schools.com/js/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-yellow-50 transition-colors group">
                                <ExternalLink className="text-yellow-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-yellow-600">W3Schools JavaScript Tutorial</p>
                                    <p className="text-sm text-slate-500">Beginner-friendly with lots of examples you can try. Start here!</p>
                                </div>
                            </a>

                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-yellow-50 transition-colors group">
                                <ExternalLink className="text-yellow-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-yellow-600">MDN Web Docs - JavaScript Guide</p>
                                    <p className="text-sm text-slate-500">Very thorough and the official documentation. For deeper understanding.</p>
                                </div>
                            </a>

                            <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-yellow-50 transition-colors group">
                                <ExternalLink className="text-yellow-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-yellow-600">FreeCodeCamp - JavaScript</p>
                                    <p className="text-sm text-slate-500">Interactive lessons that build up your knowledge step-by-step.</p>
                                </div>
                            </a>

                            <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-yellow-50 transition-colors group">
                                <ExternalLink className="text-yellow-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-yellow-600">JavaScript.info</p>
                                    <p className="text-sm text-slate-500">Well-structured, detailed tutorials from basic to advanced topics.</p>
                                </div>
                            </a>

                            <a href="https://scrimba.com/learn/learnjavascript" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-yellow-50 transition-colors group">
                                <ExternalLink className="text-yellow-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-yellow-600">Scrimba - Learn JavaScript for Free</p>
                                    <p className="text-sm text-slate-500">Interactive video tutorials where you can code along directly.</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">8</span>
                            Video Submission Requirement 🎬
                        </h2>
                        <p className="text-slate-600 mb-4">As you complete significant parts of your Quiz Master, you'll need to record short videos to reflect on your learning.</p>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Create <strong>one short video (1-3 minutes)</strong> per major feature/page</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>What you built:</strong> Briefly show the interactive part</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Which JS concepts used:</strong> State the main JavaScript concepts applied</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Why those techniques:</strong> Explain your thought process</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Live Demonstration:</strong> Show the feature working live in your browser</span>
                            </div>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">9</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-slate-600 mb-4">By the end of this phase, you will be able to:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Confidently <strong>write basic JavaScript code</strong> with good structure</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Understand and use <strong>fundamental JS concepts</strong>: variables, data types, operators, strings, loops, arrays, objects, and functions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Manipulate the DOM</strong> to make web pages interactive</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Create <strong>functions</strong> to organize code and make it reusable</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Handle <strong>user events</strong> like button clicks</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Perform basic <strong>debugging</strong> to find and fix issues in your code</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Feel the <strong>satisfaction of building a functional interactive web application!</strong></span>
                            </li>
                        </ul>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-slate-700">You're about to unlock a whole new level! ⚡</p>
                        <p className="text-slate-500 mt-2">It will be challenging at times, but also incredibly rewarding. Break it down, use your resources, and enjoy the process of learning and creating. Good luck, and have fun coding! 🎉</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
