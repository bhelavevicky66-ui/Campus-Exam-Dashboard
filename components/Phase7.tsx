import React from 'react';
import { ArrowLeft, Video, ExternalLink, CheckCircle, Database, Server, Code, Zap, Lock, FileCode, Layers, Users, FolderTree, Rocket, Shield, Globe, Upload, BarChart3, Share2, Bot, Briefcase, GitBranch } from 'lucide-react';

interface Phase7Props {
    onBack: () => void;
}

export const Phase7: React.FC<Phase7Props> = ({ onBack }) => {
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-900 to-indigo-900 p-6 md:p-10">
            {/* Header */}
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">CAPSTONE PROJECT</span>
                            <Rocket size={24} className="text-yellow-300" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 7: Final Full-Stack Project with AI Integration</h1>
                        <p className="text-purple-100 text-lg">CollabSphere – AI-Powered Developer Collaboration Platform</p>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Project Description */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-violet-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🚀</span>
                            Project Description
                        </h2>

                        <p className="text-slate-300 mb-6 leading-relaxed">
                            <strong className="text-white">CollabSphere</strong> is a dynamic and intelligent platform designed to streamline developer collaboration and project management. It's a mini-version of popular tools like <strong className="text-purple-300">GitHub</strong> (for project and code management) and <strong className="text-purple-300">Notion</strong> (for documentation and notes), supercharged with <strong className="text-yellow-300">Google's Gemini AI</strong>.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { icon: <FolderTree size={20} />, text: "Create projects and define their scope" },
                                { icon: <Users size={20} />, text: "Collaborate with team members by inviting them" },
                                { icon: <FileCode size={20} />, text: "Utilize markdown notes for documentation" },
                                { icon: <Upload size={20} />, text: "Upload code snippets or project files" },
                                { icon: <Bot size={20} />, text: "AI auto-generate documentation & explain code" },
                                { icon: <Share2 size={20} />, text: "Create public shareable project pages" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                    <span className="text-purple-400">{item.icon}</span>
                                    <span className="text-slate-300 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Why Placement Worthy */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🎯</span>
                            Why This Project Is Placement Worthy
                        </h2>

                        <div className="space-y-4">
                            {[
                                { title: "Full-Stack + AI Proficiency", desc: "Building frontend, backend, database, and AI integration - a highly sought-after skill set." },
                                { title: "Mimics Real-World SaaS Tools", desc: "Emulates GitHub, Notion, and Asana - showcases product development understanding." },
                                { title: "Practical Development Skills", desc: "Hands-on with version control, API design, authentication, file handling, and external APIs." },
                                { title: "Showcases Versatility", desc: "Connects various technologies into a cohesive and functional product." },
                                { title: "AI Integration is Key Differentiator", desc: "Positions you at the forefront of modern web development trends." }
                            ].map((item, index) => (
                                <div key={index} className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                                    <h3 className="font-bold text-yellow-300 mb-1">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Core Features */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🔧</span>
                            Core Features
                        </h2>

                        <div className="space-y-4">
                            {/* Auth */}
                            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                                <h3 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                                    <Shield size={18} />
                                    User Authentication (JWT, bcrypt)
                                </h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Secure user registration and login</li>
                                    <li>• Password hashing using bcrypt</li>
                                    <li>• JWT for managing sessions and protecting routes</li>
                                </ul>
                            </div>

                            {/* Project Collaboration */}
                            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                                <h3 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                                    <Users size={18} />
                                    Project Collaboration
                                </h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Create new projects (e.g., "MyWebApp", "DataAnalysisScript")</li>
                                    <li>• Add other users as members to projects</li>
                                    <li>• Dashboard to view all projects</li>
                                </ul>
                            </div>

                            {/* Markdown Notes */}
                            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                                <h3 className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                                    <FileCode size={18} />
                                    Markdown Notes with Gemini AI
                                </h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Rich text editor (SimpleMDE) for Markdown</li>
                                    <li>• Save and retrieve notes from database</li>
                                    <li>• <span className="text-yellow-300">Gemini:</span> "Explain this note" & "Suggest improvements"</li>
                                </ul>
                            </div>

                            {/* File Upload */}
                            <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                                <h3 className="font-bold text-orange-300 mb-2 flex items-center gap-2">
                                    <Upload size={18} />
                                    File Upload & Preview
                                </h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Upload files (code, design assets) to projects</li>
                                    <li>• Store via Cloudinary or server-side</li>
                                    <li>• <span className="text-yellow-300">Gemini:</span> "Explain this code" for .js, .py files</li>
                                </ul>
                            </div>

                            {/* Analytics & Sharing */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                                    <h3 className="font-bold text-cyan-300 mb-2 flex items-center gap-2">
                                        <BarChart3 size={18} />
                                        Contribution Analytics
                                    </h3>
                                    <p className="text-slate-400 text-sm">Track activity (notes, files) per member with simple summary dashboard.</p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl border border-pink-500/20">
                                    <h3 className="font-bold text-pink-300 mb-2 flex items-center gap-2">
                                        <Globe size={18} />
                                        Public Shareable Page
                                    </h3>
                                    <p className="text-slate-400 text-sm">Make projects publicly viewable via unique link (read-only).</p>
                                </div>
                            </div>

                            {/* Gemini API Endpoints */}
                            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/20">
                                <h3 className="font-bold text-yellow-300 mb-2 flex items-center gap-2">
                                    <Bot size={18} />
                                    Gemini API Endpoints
                                </h3>
                                <div className="bg-slate-800/50 p-3 rounded-lg font-mono text-sm text-slate-300 space-y-1">
                                    <div><span className="text-green-400">/api/gemini/explain</span> - Returns explanation for code/notes</div>
                                    <div><span className="text-green-400">/api/gemini/docs</span> - Auto-generates documentation</div>
                                    <div><span className="text-green-400">/api/gemini/readme</span> - Helps generate README files</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🛠</span>
                            Tech Stack
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <h3 className="font-bold text-blue-300 mb-2">Frontend</h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• HTML5, CSS3</li>
                                    <li>• JavaScript (ES6+)</li>
                                    <li>• React/Vue/Angular (recommended)</li>
                                    <li>• Tailwind CSS/Bootstrap</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                <h3 className="font-bold text-green-300 mb-2">Backend</h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Node.js, Express.js</li>
                                    <li>• MongoDB, Mongoose</li>
                                    <li>• bcrypt.js, JWT</li>
                                    <li>• Multer (file uploads)</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <h3 className="font-bold text-yellow-300 mb-2">AI</h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Google Gemini API</li>
                                    <li>• Documentation generation</li>
                                    <li>• Code explanation</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                <h3 className="font-bold text-purple-300 mb-2">Deployment</h3>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Vercel/Netlify (Frontend)</li>
                                    <li>• Heroku/AWS (Backend)</li>
                                    <li>• MongoDB Atlas (DB)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Folder Structure */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-pink-500 to-rose-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">📂</span>
                            Suggested Folder Structure
                        </h2>

                        <div className="bg-slate-800/50 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                            <pre className="text-slate-300">
                                {`collabsphere/
├── client/                    # Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/          # API call functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                    # Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── notesController.js
│   │   ├── fileController.js
│   │   └── geminiController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Note.js
│   │   └── File.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── notesRoutes.js
│   │   ├── fileRoutes.js
│   │   └── geminiRoutes.js
│   ├── server.js
│   └── package.json
├── uploads/
├── .env
├── .gitignore
└── README.md`}
                            </pre>
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🎥</span>
                            Video Submission Requirements
                        </h2>

                        <p className="text-slate-300 mb-6">Submit <strong className="text-white">minimum 7 videos</strong> demonstrating the functionality of CollabSphere:</p>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {[
                                { num: 1, title: "User Registration & Login (Auth)", color: "blue" },
                                { num: 2, title: "Project Creation & Member Addition", color: "purple" },
                                { num: 3, title: "Markdown Notes - CRUD operations", color: "green" },
                                { num: 4, title: "Gemini + Markdown Notes (explain, suggest)", color: "yellow" },
                                { num: 5, title: "File Upload & Preview + Gemini code explanation", color: "orange" },
                                { num: 6, title: "Contribution Analytics (basic demo)", color: "cyan" },
                                { num: 7, title: "Public Shareable Page & Gemini README", color: "pink" }
                            ].map((video) => (
                                <div key={video.num} className={`p-4 bg-${video.color}-500/10 rounded-xl border border-${video.color}-500/20 flex items-start gap-3`}>
                                    <span className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{video.num}</span>
                                    <span className="text-slate-300 text-sm">{video.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                            <h3 className="font-bold text-amber-300 mb-2">📝 Video Content Guidelines:</h3>
                            <ul className="text-slate-400 text-sm space-y-1">
                                <li>• <strong className="text-white">What was built:</strong> Briefly explain the feature(s)</li>
                                <li>• <strong className="text-white">How Gemini was used:</strong> Show API endpoints and interaction</li>
                                <li>• <strong className="text-white">Working Demo:</strong> Showcase feature in action</li>
                                <li>• <strong className="text-white">No Reading:</strong> Speak naturally and confidently</li>
                                <li>• <strong className="text-white">Duration:</strong> 2-5 minutes per video</li>
                            </ul>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-emerald-500 to-green-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🎓</span>
                            Learning Outcomes
                        </h2>

                        <div className="grid md:grid-cols-2 gap-3">
                            {[
                                "Design, develop, and deploy a full-stack web application",
                                "Implement secure authentication with JWT and bcrypt",
                                "Manage complex data relationships with MongoDB & Mongoose",
                                "Build robust RESTful APIs with Node.js and Express",
                                "Integrate third-party AI APIs (Google Gemini)",
                                "Handle file uploads and storage securely",
                                "Implement collaboration features",
                                "Create responsive and interactive UIs",
                                "Apply best practices for project structure",
                                "Troubleshoot and debug across the full stack",
                                "Articulate complex technical features clearly"
                            ].map((outcome, index) => (
                                <div key={index} className="flex items-start gap-3 p-2">
                                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-slate-300 text-sm">{outcome}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Resources */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">📚</span>
                            Resources
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h3 className="font-bold text-blue-300 mb-3">Core Technologies</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: "Node.js Docs", url: "https://nodejs.org/en/docs/" },
                                        { name: "Express.js Guide", url: "https://expressjs.com/en/starter/installing.html" },
                                        { name: "MongoDB Docs", url: "https://www.mongodb.com/docs/" },
                                        { name: "Mongoose Guide", url: "https://mongoosejs.com/docs/guide.html" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-blue-300 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h3 className="font-bold text-yellow-300 mb-3">AI Integration</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: "Google Gemini API Docs", url: "https://ai.google.dev/docs" },
                                        { name: "AI Studio (Test Prompts)", url: "https://aistudio.google.com/" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-yellow-300 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h3 className="font-bold text-green-300 mb-3">Auth & Security</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: "bcrypt.js Package", url: "https://www.npmjs.com/package/bcrypt" },
                                        { name: "jsonwebtoken Package", url: "https://www.npmjs.com/package/jsonwebtoken" },
                                        { name: "Multer (File Uploads)", url: "https://www.npmjs.com/package/multer" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-green-300 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <h3 className="font-bold text-purple-300 mb-3">Deployment</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: "MongoDB Atlas", url: "https://www.mongodb.com/cloud/atlas/register" },
                                        { name: "Vercel Docs", url: "https://vercel.com/docs" },
                                        { name: "Heroku Dev Center", url: "https://devcenter.heroku.com/start" }
                                    ].map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-purple-300 text-sm transition-colors">
                                            <ExternalLink size={14} />
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">🧪</span>
                            3 Mini Projects Before Final Build
                        </h2>

                        <p className="text-slate-300 mb-6">Practice key features in isolation before integrating them into CollabSphere:</p>

                        {/* Mini Project 1 */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                            <h3 className="text-xl font-bold text-blue-300 mb-2 flex items-center gap-2">
                                <Shield size={20} />
                                Mini Project 1: User Authentication System
                            </h3>
                            <p className="text-slate-400 mb-3"><strong className="text-white">Objective:</strong> Build a standalone Node.js/Express application with user registration and login.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-300 text-sm font-semibold mb-2">Features:</p>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li>• User registration form (email, password)</li>
                                        <li>• Password hashing using bcrypt</li>
                                        <li>• JWT generation upon login</li>
                                        <li>• Protected routes with JWT validation</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-slate-300 text-sm font-semibold mb-2">Tech Stack:</p>
                                    <p className="text-slate-400 text-sm">Node.js, Express, MongoDB, Mongoose, bcrypt, JWT</p>
                                </div>
                            </div>
                        </div>

                        {/* Mini Project 2 */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                            <h3 className="text-xl font-bold text-emerald-300 mb-2 flex items-center gap-2">
                                <FileCode size={20} />
                                Mini Project 2: Collaborative Markdown Note App
                            </h3>
                            <p className="text-slate-400 mb-3"><strong className="text-white">Objective:</strong> Create a web app for creating, editing, and saving Markdown notes.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-300 text-sm font-semibold mb-2">Features:</p>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li>• Integrate SimpleMDE Markdown editor</li>
                                        <li>• Save notes to MongoDB</li>
                                        <li>• View list of all notes</li>
                                        <li>• (Optional) Basic multi-user viewing</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-slate-300 text-sm font-semibold mb-2">Tech Stack:</p>
                                    <p className="text-slate-400 text-sm">HTML, CSS, JS, Node.js, Express, MongoDB, SimpleMDE</p>
                                </div>
                            </div>
                        </div>

                        {/* Mini Project 3 */}
                        <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                            <h3 className="text-xl font-bold text-yellow-300 mb-2 flex items-center gap-2">
                                <Bot size={20} />
                                Mini Project 3: Gemini-powered README Generator
                            </h3>
                            <p className="text-slate-400 mb-3"><strong className="text-white">Objective:</strong> Build an app that generates README.md using Gemini API.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-300 text-sm font-semibold mb-2">Features:</p>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li>• Form to collect project details</li>
                                        <li>• Backend endpoint for Gemini API</li>
                                        <li>• Generate README content</li>
                                        <li>• Display generated Markdown</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-slate-300 text-sm font-semibold mb-2">Tech Stack:</p>
                                    <p className="text-slate-400 text-sm">HTML, CSS, JS, Node.js, Express, Gemini API</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-white mb-2">Good luck, and enjoy building CollabSphere! ✨</p>
                        <p className="text-slate-400">This project is a fantastic opportunity to consolidate your learning and create a portfolio piece that truly shines.</p>
                        <div className="mt-6 flex justify-center gap-4">
                            <span className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white font-semibold text-sm">Full-Stack</span>
                            <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-semibold text-sm">AI-Powered</span>
                            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white font-semibold text-sm">Placement Ready</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
