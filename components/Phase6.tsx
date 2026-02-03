import React from 'react';
import { ArrowLeft, Clock, Video, BookOpen, Lightbulb, ExternalLink, CheckCircle, Database, Server, Code, Zap, Lock, FileCode, HardDrive, Layers, Save, Search } from 'lucide-react';

interface Phase6Props {
    onBack: () => void;
}

export const Phase6: React.FC<Phase6Props> = ({ onBack }) => {
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-orange-50 p-6 md:p-10">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-orange-600 font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 6 - Your First Database with MongoDB & Mongoose! 💾</h1>
                    <p className="text-orange-100 text-lg">Store, retrieve, and manage your data professionally</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* 1. Project Introduction */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                            📌 Project Introduction
                        </h2>

                        <p className="text-slate-600 mb-4 leading-relaxed">
                            Welcome to Phase 6! You've come so far, building frontends and even your own backend servers with Node.js and Express. Now, it's time to tackle one of the most crucial parts of almost any web application: <strong>databases!</strong>
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <Database size={20} className="text-amber-600" />
                                What are Databases and Why Are They So Important?
                            </h3>
                            <p className="text-slate-600">
                                Imagine any useful app you use – a social media site, an online store, a to-do list. They all need to remember information, right? Your posts, the products, your tasks. This information is stored in a <strong>database</strong>. A database is an organized collection of data, making it easy to manage, access, and update. Without databases, the web as we know it wouldn't exist!
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <HardDrive size={18} className="text-orange-500" />
                                    MongoDB: A NoSQL Database
                                </h4>
                                <p className="text-slate-600 text-sm">
                                    <strong>NoSQL</strong> means it's not like traditional "tabular" databases (think spreadsheets). Instead, MongoDB stores data in flexible, <strong>JSON-like documents</strong>. If you remember JSON from working with APIs, you'll feel right at home! This makes it very intuitive for JavaScript developers.
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <Layers size={18} className="text-orange-500" />
                                    Mongoose: Your MongoDB Helper
                                </h4>
                                <p className="text-slate-600 text-sm">
                                    Mongoose provides a straightforward way to: <strong>define the structure</strong> of your data (called a "schema"), <strong>connect</strong> to your MongoDB database, and <strong>perform operations</strong> like saving, finding, updating, and deleting data. Think of Mongoose as a helpful translator between your JavaScript code and your MongoDB database.
                                </p>
                            </div>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <p className="text-slate-700">
                                <strong>🎯 Our Goal for Phase 6:</strong> You're going to build a <strong>"Student Feedback Manager"</strong> web application. This app will allow users to submit feedback (like their name, a rating, and comments). Your application will receive this feedback on your Express.js backend, store it permanently in a MongoDB database, and fetch all submitted feedback to display on a frontend page.
                            </p>
                        </div>
                    </section>

                    {/* 2. Project Overview */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</span>
                            🧱 Project Overview: "Student Feedback Manager"
                        </h2>

                        <p className="text-slate-600 mb-6">This project will be a full-stack application where you create a system for collecting and displaying student feedback.</p>

                        {/* Submitting Feedback Flow */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <Save size={20} className="text-green-500" />
                                Submitting Feedback Flow
                            </h3>
                            <div className="space-y-2">
                                {[
                                    "A user fills out a form on the frontend (enters name, selects rating, types comment).",
                                    "When they submit, the frontend sends this data to a POST route on your Express.js backend.",
                                    "Your backend route receives the data and uses Mongoose to save it into your MongoDB database."
                                ].map((step, index) => (
                                    <div key={index} className="flex items-start gap-3 p-2 bg-white/50 rounded-lg">
                                        <span className="bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{index + 1}</span>
                                        <span className="text-slate-600 text-sm">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Displaying Feedback Flow */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <Search size={20} className="text-blue-500" />
                                Displaying Feedback Flow
                            </h3>
                            <div className="space-y-2">
                                {[
                                    "A user visits a page designed to show all feedback.",
                                    "The frontend requests data from a GET route on your Express.js backend.",
                                    "Your backend route uses Mongoose to fetch all feedback entries from MongoDB.",
                                    "The backend sends this list back to the frontend.",
                                    "The frontend dynamically displays all the submitted feedback."
                                ].map((step, index) => (
                                    <div key={index} className="flex items-start gap-3 p-2 bg-white/50 rounded-lg">
                                        <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{index + 1}</span>
                                        <span className="text-slate-600 text-sm">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl">
                            <h3 className="font-bold text-slate-800 mb-2">📄 Pages in Your Application:</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                                    <span><strong>Feedback Form Page:</strong> An HTML page with a form (input fields for name, rating, comments, and a submit button).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                                    <span><strong>All Feedback Page:</strong> An HTML page that will display a list or table of all the feedback retrieved from the database.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Database Concepts to Learn */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</span>
                            🧪 Database Concepts to Learn & Use
                        </h2>

                        <p className="text-slate-600 mb-6">This project will introduce you to fundamental database operations with MongoDB and Mongoose:</p>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-orange-600 text-white">
                                        <th className="p-4 text-left font-bold rounded-tl-lg">Feature / Task</th>
                                        <th className="p-4 text-left font-bold">MongoDB/Mongoose Concept</th>
                                        <th className="p-4 text-left font-bold rounded-tr-lg">Why It's Important</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4 bg-slate-50">Connecting to MongoDB</td>
                                        <td className="p-4"><code className="bg-slate-100 px-2 py-1 rounded text-sm">mongoose.connect()</code></td>
                                        <td className="p-4">Establishes the link so your app can talk to the database.</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4 bg-slate-50">Defining data structure</td>
                                        <td className="p-4"><code className="bg-slate-100 px-2 py-1 rounded text-sm">mongoose.Schema() & model()</code></td>
                                        <td className="p-4">Creates a blueprint (schema) for your data and a model to interact with it.</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4 bg-slate-50">Storing new feedback</td>
                                        <td className="p-4"><code className="bg-slate-100 px-2 py-1 rounded text-sm">new Model() + .save()</code></td>
                                        <td className="p-4">Creates a new document and saves it to the database.</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4 bg-slate-50">Retrieving all feedback</td>
                                        <td className="p-4"><code className="bg-slate-100 px-2 py-1 rounded text-sm">Model.find()</code></td>
                                        <td className="p-4">Fetches documents from the database that match your criteria.</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4 bg-slate-50">Keeping connection string secure</td>
                                        <td className="p-4"><code className="bg-slate-100 px-2 py-1 rounded text-sm">.env file</code></td>
                                        <td className="p-4">Protects sensitive database credentials from being exposed.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 bg-slate-50 rounded-bl-lg">Reading data from frontend</td>
                                        <td className="p-4"><code className="bg-slate-100 px-2 py-1 rounded text-sm">express.json()</code></td>
                                        <td className="p-4 rounded-br-lg">Parses incoming JSON data from the frontend.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 4. Video Submission Requirement */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</span>
                            🎥 Video Submission Requirement
                        </h2>

                        <p className="text-slate-600 mb-6">To demonstrate your new database skills, you'll create <strong>two short videos (3-5 minutes each)</strong>:</p>

                        <div className="space-y-4">
                            {/* Video 1 */}
                            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Video size={20} className="text-purple-500" />
                                    Video 1: MongoDB Setup, Schema, and Saving Data
                                </h3>
                                <ul className="space-y-2 text-slate-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Show how you connected your Node.js application to MongoDB (mentioning connection string from .env file).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Explain your Mongoose schema and model for the feedback data.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Demonstrate submitting data through your frontend form.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Show the backend code that handles saving this data to MongoDB.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Briefly show the data appearing in your MongoDB database (using MongoDB Compass or mongo shell).</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Video 2 */}
                            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Video size={20} className="text-emerald-500" />
                                    Video 2: Retrieving and Displaying Data - Full Flow
                                </h3>
                                <ul className="space-y-2 text-slate-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Explain the backend route that fetches all feedback from MongoDB.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Show the frontend code that requests and displays this data.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Demonstrate the "All Feedback" page loading and showing multiple entries from the database.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                                        <span>Briefly explain the entire data flow: from database to backend to frontend.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
                            <p className="text-slate-700">
                                <strong>📝 Important:</strong> Clearly show your code and explain what different parts do in simple terms. Use your browser and, if possible, your terminal or MongoDB GUI to show the data moving and being stored/retrieved in real-time. Complete the demo confidently without reading from a script.
                            </p>
                        </div>
                    </section>

                    {/* 5. Learning Outcomes */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</span>
                            🎯 Learning Outcomes
                        </h2>

                        <p className="text-slate-600 mb-4">By successfully completing this project, you will be able to:</p>

                        <ul className="space-y-3">
                            {[
                                "Understand the role of databases in web applications.",
                                "Connect a Node.js/Express.js application to a MongoDB database using Mongoose.",
                                "Define data structures (schemas) and create models for your database collections.",
                                "Perform fundamental CRUD (Create, Read, Update, Delete) operations – with a focus on Create and Read.",
                                "Build data-driven applications where content is stored and retrieved from a database.",
                                "Securely manage database connection strings.",
                                "Gain confidence in handling user-generated data and making it persistent."
                            ].map((outcome, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-slate-600">{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 6. Resources */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">6</span>
                            📚 Resources
                        </h2>

                        <p className="text-slate-600 mb-6">Here are some beginner-friendly resources to guide you:</p>

                        <div className="space-y-4">
                            {/* MongoDB Basics */}
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Database size={18} className="text-green-500" />
                                    MongoDB Basics
                                </h3>
                                <div className="space-y-2">
                                    <a href="https://university.mongodb.com/courses/M001/about" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        MongoDB University: M001 MongoDB Basics (Official free course - highly recommended)
                                    </a>
                                    <a href="https://www.mongodb.com/what-is-mongodb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        What is MongoDB? (Official overview)
                                    </a>
                                </div>
                            </div>

                            {/* Mongoose */}
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Layers size={18} className="text-blue-500" />
                                    Mongoose (for Node.js & MongoDB)
                                </h3>
                                <div className="space-y-2">
                                    <a href="https://mongoosejs.com/docs/quickstart.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        Mongoose ODM - Quick Start Guide (Official Docs)
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=DZBGEVgL2eE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        Mongoose Crash Course by Traversy Media
                                    </a>
                                </div>
                            </div>

                            {/* Understanding NoSQL */}
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <HardDrive size={18} className="text-purple-500" />
                                    Understanding NoSQL
                                </h3>
                                <div className="space-y-2">
                                    <a href="https://aws.amazon.com/nosql/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        What is NoSQL? by AWS
                                    </a>
                                    <a href="https://www.mongodb.com/nosql-explained" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        NoSQL Databases Explained by MongoDB
                                    </a>
                                </div>
                            </div>

                            {/* MongoDB Crash Courses */}
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Video size={18} className="text-red-500" />
                                    MongoDB Full Crash Courses (YouTube)
                                </h3>
                                <div className="space-y-2">
                                    <a href="https://www.youtube.com/watch?v=-56x56UppqQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        MongoDB Crash Course by Traversy Media
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=ofme2o29ngU" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
                                        <ExternalLink size={14} />
                                        Learn MongoDB in 1 Hour by Programming with Mosh
                                    </a>
                                </div>
                            </div>

                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                                <p className="text-slate-700 text-sm">
                                    <strong>💡 Tip:</strong> Make sure you have MongoDB installed on your system or use a cloud service like <strong>MongoDB Atlas</strong> (their free tier is great for learning).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 7. Mini Projects */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">7</span>
                            🧪 Mini Projects for Practice
                        </h2>

                        <p className="text-slate-600 mb-6">To solidify your understanding, try these smaller exercises. Each must use MongoDB to store and retrieve data, with proper Mongoose models and Express routes.</p>

                        {/* Mini Project 1 */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <FileCode size={20} className="text-green-500" />
                                Mini Project 1: Simple Contact Form Collector
                            </h3>
                            <p className="text-slate-600 mb-3"><strong>Goal:</strong> Build a backend that can receive and store contact form submissions.</p>
                            <ul className="space-y-2 text-slate-600 text-sm">
                                <li><strong>Frontend:</strong> A simple HTML form with fields for Name, Email, and Message.</li>
                                <li><strong>Backend:</strong>
                                    <ul className="ml-4 mt-1 space-y-1">
                                        <li>• An Express POST route (<code className="bg-slate-100 px-1 rounded">/submit-contact</code>) to receive data.</li>
                                        <li>• A Mongoose schema for Contact (name, email, message, submissionDate).</li>
                                        <li>• Save submitted data to MongoDB.</li>
                                    </ul>
                                </li>
                                <li><strong>Bonus:</strong> Create a GET route (<code className="bg-slate-100 px-1 rounded">/contacts</code>) to retrieve all submissions.</li>
                            </ul>
                        </div>

                        {/* Mini Project 2 */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <FileCode size={20} className="text-blue-500" />
                                Mini Project 2: Basic Student Progress Tracker
                            </h3>
                            <p className="text-slate-600 mb-3"><strong>Goal:</strong> Store and display simple student progress.</p>
                            <ul className="space-y-2 text-slate-600 text-sm">
                                <li><strong>Frontend:</strong> A form to add student name, course name, and completion percentage (0-100).</li>
                                <li><strong>Backend:</strong>
                                    <ul className="ml-4 mt-1 space-y-1">
                                        <li>• Schema for Progress (studentName, courseName, completionPercentage, lastUpdated).</li>
                                        <li>• POST route to add new progress entries.</li>
                                        <li>• GET route to retrieve all progress entries.</li>
                                    </ul>
                                </li>
                                <li><strong>Display Idea:</strong> Show each entry as a "progress card" on the frontend.</li>
                            </ul>
                        </div>

                        {/* Mini Project 3 */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <FileCode size={20} className="text-purple-500" />
                                Mini Project 3: Quick Notes Saver App
                            </h3>
                            <p className="text-slate-600 mb-3"><strong>Goal:</strong> A simple app to save and display short text notes.</p>
                            <ul className="space-y-2 text-slate-600 text-sm">
                                <li><strong>Frontend:</strong> An input for a note title and a textarea for the note content.</li>
                                <li><strong>Backend:</strong>
                                    <ul className="ml-4 mt-1 space-y-1">
                                        <li>• Schema for Note (title, content, createdAt).</li>
                                        <li>• POST route to save a new note.</li>
                                        <li>• GET route to retrieve all notes.</li>
                                    </ul>
                                </li>
                                <li><strong>Display Idea:</strong> Show all notes in a styled list on a frontend page.</li>
                            </ul>
                        </div>

                        {/* Tips for all mini-projects */}
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                            <h4 className="font-bold text-slate-800 mb-2">✅ For all mini-projects:</h4>
                            <ul className="space-y-1 text-slate-600 text-sm">
                                <li>• Use a clear folder structure.</li>
                                <li>• Define Mongoose models in separate files if your project grows.</li>
                                <li>• Handle API routes in a dedicated routes file.</li>
                                <li>• Always use a <code className="bg-slate-100 px-1 rounded">.env</code> file for your MongoDB connection URI.</li>
                                <li>• Add comments to your code to explain what it does.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-slate-700">This phase is a huge step towards becoming a full-stack developer! ✨</p>
                        <p className="text-slate-500 mt-2">Learning to work with databases will unlock the ability to build much more complex and useful applications. Take your time, be patient with yourself, and enjoy the process of making your data come alive! Good luck!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
