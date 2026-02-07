import React from 'react';
import { ArrowLeft, Clock, Video, BookOpen, Lightbulb, ExternalLink, CheckCircle } from 'lucide-react';

interface Phase1Props {
    onBack: () => void;
}

export const Phase1: React.FC<Phase1Props> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-purple-300 hover:text-white transition-all group"
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
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 1 - Student Profile & Course Portal</h1>
                    <p className="text-indigo-100 text-lg">(HTML Only)</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* 1. Introduction */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">1</span>
                            Introduction to the Project
                        </h2>
                        <p className="text-purple-100/90 mb-4 leading-relaxed">
                            Welcome to your first major HTML project! You'll be building a <strong>"Student Profile & Course Portal."</strong> This is a multi-page website designed to act as a personal hub for a student, showcasing their profile, courses, grades, and more.
                        </p>

                        <h3 className="text-lg font-semibold text-white mb-3">What will this site contain?</h3>
                        <p className="text-purple-100/90 mb-3">Your website will have the following pages:</p>
                        <ul className="list-disc list-inside text-purple-200/80 space-y-1 mb-4 ml-4">
                            <li><strong>Home:</strong> The main landing page.</li>
                            <li><strong>Profile:</strong> A page about the student.</li>
                            <li><strong>Courses:</strong> A list of courses the student is enrolled in.</li>
                            <li><strong>Feedback:</strong> A form for users to submit feedback.</li>
                            <li><strong>Grades Table:</strong> A page displaying student grades in a tabular format.</li>
                            <li><strong>Contact Us:</strong> A page with contact information.</li>
                        </ul>

                        <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-4">
                            <p className="text-indigo-200"><strong>Objective:</strong> The main goal of this project is to understand how websites are structured using only HTML. You'll learn to create different pages, link them together, and present various types of information using a wide range of HTML tags.</p>
                        </div>

                        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-amber-200"><strong>🌟 The Golden Rule:</strong> Remember, for this phase, you are ONLY allowed to use HTML. No CSS for styling (making things look pretty) and no JavaScript for interactivity (making things dynamic). We are focusing purely on the structure and content. This will help you build a strong foundation.</p>
                        </div>
                    </section>

                    {/* 2. Page-by-Page Breakdown */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">2</span>
                            Page-by-Page Breakdown
                        </h2>

                        {/* Home Page */}
                        <div className="mb-6 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-2">🏠 Home Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> This will be the welcome page for your portal. It should briefly introduce the website and provide navigation to other pages.</p>
                            <p className="text-purple-300 font-medium mb-2">HTML Tags to Use:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto border border-white/5">
                                &lt;html&gt;, &lt;head&gt;, &lt;title&gt;, &lt;body&gt;, &lt;header&gt;, &lt;h1&gt;, &lt;nav&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;, &lt;main&gt;, &lt;p&gt;, &lt;footer&gt;
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Clock size={16} />
                                <span className="font-semibold">Maximum Time Required: 90 minutes</span>
                            </div>
                        </div>

                        {/* Profile Page */}
                        <div className="mb-6 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-2">👤 Profile Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> This page will display information about a student. Think of it as a simple "About Me" page.</p>
                            <p className="text-purple-300 font-medium mb-2">HTML Tags to Use:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;img&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;nav&gt;, &lt;a&gt;
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Clock size={16} />
                                <span className="font-semibold">Maximum Time Required: 75 minutes</span>
                            </div>
                        </div>

                        {/* Courses Page */}
                        <div className="mb-6 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-2">📚 Courses Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> This page will list the courses the student is currently taking or has completed.</p>
                            <p className="text-purple-300 font-medium mb-2">HTML Tags to Use:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;a&gt;, &lt;nav&gt;
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Clock size={16} />
                                <span className="font-semibold">Maximum Time Required: 75 minutes</span>
                            </div>
                        </div>

                        {/* Feedback Page */}
                        <div className="mb-6 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-2">📝 Feedback Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> This page will contain a form allowing users to submit feedback.</p>
                            <p className="text-purple-300 font-medium mb-2">HTML Tags to Use:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;form&gt;, &lt;label&gt;, &lt;input&gt;, &lt;textarea&gt;, &lt;select&gt;, &lt;option&gt;, &lt;button&gt;, &lt;nav&gt;
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Clock size={16} />
                                <span className="font-semibold">Maximum Time Required: 90 minutes</span>
                            </div>
                        </div>

                        {/* Grades Table Page */}
                        <div className="mb-6 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-2">📊 Grades Table Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> This page will display student grades in a structured table.</p>
                            <p className="text-purple-300 font-medium mb-2">HTML Tags to Use:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;table&gt;, &lt;caption&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;, &lt;nav&gt;
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Clock size={16} />
                                <span className="font-semibold">Maximum Time Required: 60 minutes</span>
                            </div>
                        </div>

                        {/* Contact Us Page */}
                        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-2">📞 Contact Us Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> This page will provide contact information or a simple way to get in touch.</p>
                            <p className="text-purple-300 font-medium mb-2">HTML Tags to Use:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;p&gt;, &lt;a&gt; (mailto:), &lt;h2&gt;, &lt;h3&gt;, &lt;nav&gt;
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <Clock size={16} />
                                <span className="font-semibold">Maximum Time Required: 45 minutes</span>
                            </div>
                        </div>
                    </section>

                    {/* 3. Video Submission */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">3</span>
                            Video Submission Instructions 📹
                        </h2>
                        <p className="text-purple-100/90 mb-4">For this project, you need to record a <strong>separate video for each page</strong> you create (6 videos in total).</p>

                        <p className="text-purple-200 font-medium mb-3">In each video, you must:</p>
                        <ul className="space-y-3 mb-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Explain the Purpose:</strong> Clearly state the purpose of the specific page you are presenting.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>List Tags Used:</strong> Show your HTML code and list all the unique HTML tags you used on that page.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Describe Tag Usage:</strong> Explain how and why you used those specific tags to structure the content.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Show a Working Example:</strong> Open the HTML file in a web browser and show the rendered page.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Independent Work:</strong> You must do all of this independently, without any external help during the recording.</span>
                            </li>
                        </ul>

                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                            <p className="text-blue-300 font-medium mb-2">💡 Video Tips:</p>
                            <ul className="list-disc list-inside text-blue-200/80 space-y-1 ml-2">
                                <li>Keep each video concise and to the point.</li>
                                <li>Ensure your screen and voice are clear.</li>
                                <li>Practice what you're going to say before recording.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. Learning Outcomes */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">4</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-purple-100/90 mb-4">After successfully completing this project, you will:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Gain a solid understanding of basic HTML structure:</strong> You'll know how to create well-formed HTML documents.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Be proficient in using common HTML tags:</strong> You'll be comfortable using tags for text formatting, lists, links, images, tables, and forms.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Understand how to build a multi-page website:</strong> You'll learn how to link pages together to create a cohesive user experience.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Develop foundational knowledge of semantic HTML:</strong> You'll start to understand the importance of using HTML tags for their meaning.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Build confidence:</strong> Completing this project will boost your confidence in your ability to create web pages from scratch.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong>Appreciate the separation of concerns:</strong> By working only with HTML, you'll better understand its role as the backbone of a website.</span>
                            </li>
                        </ul>
                    </section>

                    {/* 5. Resources */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">5</span>
                            Resources Section 📚
                        </h2>
                        <p className="text-purple-100/90 mb-4">Here are some excellent, beginner-friendly resources to help you:</p>

                        <div className="space-y-4">
                            <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/10">
                                <ExternalLink className="text-indigo-400" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-indigo-300">W3Schools HTML Tutorial</p>
                                    <p className="text-sm text-slate-400">Great for quick references and trying out code directly in your browser.</p>
                                </div>
                            </a>

                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/10">
                                <ExternalLink className="text-indigo-400" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-indigo-300">MDN Web Docs - HTML</p>
                                    <p className="text-sm text-slate-400">Very detailed and accurate documentation. The gold standard.</p>
                                </div>
                            </a>

                            <a href="https://websitesetup.org/html5-cheat-sheet/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/10">
                                <ExternalLink className="text-indigo-400" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-indigo-300">HTML5 Cheat Sheet</p>
                                    <p className="text-sm text-slate-400">A good visual guide for HTML tags.</p>
                                </div>
                            </a>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="font-semibold text-white mb-2">🎥 YouTube Full Course Videos</p>
                                <p className="text-sm text-slate-400">Search for "HTML full course for beginners" on YouTube. Look for channels like freeCodeCamp.org, Traversy Media, or Programming with Mosh.</p>
                            </div>
                        </div>
                    </section>

                    {/* 6. Mini Projects */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500/20 text-indigo-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-indigo-500/30">6</span>
                            Mini Projects Section 💡
                        </h2>
                        <p className="text-purple-100/90 mb-6">Before or alongside the main project, try these mini-projects to get comfortable with common HTML tags.</p>

                        {/* Mini Project 1 */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20">
                            <h3 className="text-xl font-bold text-white mb-2">Mini Project 1: Simple Recipe Page</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> Create a single HTML page that displays a recipe for your favorite dish.</p>
                            <p className="text-amber-200 font-medium mb-2">Expected Tags:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;img&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;strong&gt;, &lt;em&gt;
                            </div>
                        </div>

                        {/* Mini Project 2 */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                            <h3 className="text-xl font-bold text-white mb-2">Mini Project 2: Basic Blog Post</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> Create a single HTML page that looks like a simple blog post.</p>
                            <p className="text-blue-200 font-medium mb-2">Expected Tags:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;p&gt;, &lt;article&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;img&gt;, &lt;a&gt;, &lt;blockquote&gt;, &lt;em&gt;
                            </div>
                        </div>

                        {/* Mini Project 3 */}
                        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                            <h3 className="text-xl font-bold text-white mb-2">Mini Project 3: Event Announcement</h3>
                            <p className="text-purple-200/80 mb-3"><strong>Description:</strong> Create a single HTML page announcing a fictional event (e.g., a club meeting, a small concert).</p>
                            <p className="text-purple-200 font-medium mb-2">Expected Tags:</p>
                            <div className="bg-black/30 text-emerald-400 p-3 rounded-lg text-sm font-mono overflow-x-auto border border-white/5">
                                &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;strong&gt;, &lt;a&gt;, &lt;hr&gt;
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-white">Good luck with your project! 🎉</p>
                        <p className="text-purple-200 mt-2">Remember to take it one page at a time and refer to the resources when you need them. Have fun building!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
