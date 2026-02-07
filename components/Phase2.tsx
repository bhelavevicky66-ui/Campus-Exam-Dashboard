import React from 'react';
import { ArrowLeft, Clock, Palette, CheckCircle, ExternalLink, Lightbulb, Layout, Type, Box, Smartphone } from 'lucide-react';

interface Phase2Props {
    onBack: () => void;
}

export const Phase2: React.FC<Phase2Props> = ({ onBack }) => {
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
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8 shadow-xl border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 2 - Styling with CSS</h1>
                    <p className="text-purple-100 text-lg">Transform Your HTML with Beautiful Styles</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Core Principle */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center border border-purple-500/30">
                                <Lightbulb size={20} />
                            </span>
                            The Core Principle
                        </h2>
                        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-lg">
                            <p className="text-purple-100/90 leading-relaxed">
                                <strong className="text-amber-400">🌟 Remember:</strong> Your HTML structure from Phase 1 must remain unchanged. This exercise is crucial for understanding the power of CSS in transforming appearance independently of content structure – a fundamental concept in web development.
                            </p>
                        </div>
                    </section>

                    {/* Part 1: Global Stylesheet */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">1</span>
                            Part 1: Laying the Foundation – Your Global Stylesheet
                        </h2>
                        <p className="text-purple-100/90 mb-8 leading-relaxed">
                            Think of this as setting the overall design language for your entire website. Consistent global styles make your site look professional and save you a lot of repetitive work.
                        </p>

                        {/* Resetting and Base Styling */}
                        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Box size={20} className="text-purple-400" />
                                Resetting and Base Styling (&lt;body&gt;)
                            </h3>
                            <p className="text-purple-200/80 mb-4"><strong>Objective:</strong> Create a consistent baseline across different browsers and define default text characteristics.</p>
                            <p className="text-purple-100 font-medium mb-3">Key Properties:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-5 rounded-xl text-sm font-mono mb-3 overflow-x-auto space-y-2 border border-white/10">
                                <div>margin: 0; padding: 0; <span className="text-gray-500">/* Reset browser defaults */</span></div>
                                <div>* &#123; box-sizing: border-box; &#125; <span className="text-gray-500">/* Crucial best practice! */</span></div>
                                <div>font-family: sans-serif, Arial;</div>
                                <div>font-size: 16px;</div>
                                <div>line-height: 1.6; <span className="text-gray-500">/* Essential for readability */</span></div>
                                <div>color: #333333;</div>
                                <div>background-color: #f4f4f4;</div>
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Type size={20} className="text-purple-400" />
                                Establishing Typographic Hierarchy
                            </h3>
                            <p className="text-purple-200/80 mb-4"><strong>Objective:</strong> Guide the user's eye and clearly differentiate levels of information.</p>
                            <p className="text-purple-100 font-medium mb-3">For Headings (&lt;h1&gt; to &lt;h6&gt;):</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono mb-4 overflow-x-auto border border-white/10">
                                font-family, font-weight: bold, color, margin-top, margin-bottom
                            </div>
                            <p className="text-purple-100 font-medium mb-3">For Paragraphs (&lt;p&gt;):</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                line-height, margin-bottom
                            </div>
                        </div>

                        {/* Structural Elements */}
                        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Layout size={20} className="text-purple-400" />
                                Styling Common Structural Elements
                            </h3>
                            <p className="text-purple-200/80 mb-4"><strong>Objective:</strong> Visually define the main sections of your pages.</p>

                            <div className="space-y-3 text-purple-100/90">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <strong className="text-purple-300">&lt;header&gt;:</strong> background-color, color, padding, border-bottom
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <strong className="text-purple-300">&lt;nav&gt; ul:</strong> list-style-type: none, display: flex, justify-content
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <strong className="text-purple-300">&lt;main&gt;:</strong> padding, max-width, margin: auto
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <strong className="text-purple-300">&lt;footer&gt;:</strong> background-color, color, text-align, padding
                                </div>
                            </div>
                        </div>

                        {/* Link Styling */}
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4">Default Link Styling (&lt;a&gt;)</h3>
                            <p className="text-purple-200/80 mb-4"><strong>Objective:</strong> Make links clear and provide visual feedback.</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-5 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                color, text-decoration<br />
                                a:hover &#123; color change, text-decoration &#125;<br />
                                a:visited &#123; color &#125;<br />
                                a:active &#123; feedback during click &#125;
                            </div>
                        </div>
                    </section>

                    {/* Part 2: Page by Page */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">2</span>
                            Part 2: Styling Page by Page
                        </h2>
                        <p className="text-purple-100/90 mb-8">
                            With your global styles set, let's tackle each page using the Box Model, Typography, Colors, and Flexbox.
                        </p>

                        {/* Home Page */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20">
                            <h3 className="text-xl font-bold text-blue-200 mb-3">🏠 Home Page</h3>
                            <p className="text-purple-100/80 mb-4"><strong>Key Elements:</strong> Main heading (&lt;h1&gt;), introductory paragraphs (&lt;p&gt;)</p>
                            <p className="text-white font-medium mb-3">Styling Focus:</p>
                            <ul className="list-disc list-inside text-purple-100/80 space-y-2 ml-2">
                                <li>&lt;h1&gt;: font-size, text-align: center, margin-bottom</li>
                                <li>&lt;p&gt;: font-size, text-align: center, max-width, margin: auto</li>
                            </ul>
                        </div>

                        {/* Profile Page */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                            <h3 className="text-xl font-bold text-green-200 mb-3">👤 Profile Page</h3>
                            <p className="text-purple-100/80 mb-4"><strong>Key Elements:</strong> &lt;img&gt;, section headings, lists</p>
                            <p className="text-white font-medium mb-3">Profile Image Styling:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono mb-3 overflow-x-auto border border-white/10">
                                display: block; margin: auto;<br />
                                width, height, border-radius: 50%;<br />
                                border, object-fit: cover;
                            </div>
                        </div>

                        {/* Courses Page */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20">
                            <h3 className="text-xl font-bold text-amber-200 mb-3">📚 Courses Page</h3>
                            <p className="text-purple-100/80 mb-4"><strong>Key Focus:</strong> This is where Flexbox shines!</p>
                            <p className="text-white font-medium mb-3">Course Cards Layout:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono mb-3 overflow-x-auto border border-white/10">
                                Container: display: flex; flex-wrap: wrap; gap: 20px;<br />
                                Cards: background-color, border, border-radius, padding, box-shadow;<br />
                                flex-basis: 300px; flex-direction: column;
                            </div>
                        </div>

                        {/* Feedback Page */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                            <h3 className="text-xl font-bold text-purple-200 mb-3">📝 Feedback Page</h3>
                            <p className="text-purple-100/80 mb-4"><strong>Key Elements:</strong> &lt;form&gt;, &lt;label&gt;, &lt;input&gt;, &lt;textarea&gt;, &lt;button&gt;</p>
                            <p className="text-white font-medium mb-3">Form Styling:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono mb-3 overflow-x-auto border border-white/10">
                                form: max-width, margin: auto, padding, background-color, border-radius, box-shadow<br />
                                label: display: block, margin-bottom, font-weight: bold<br />
                                input/textarea: width: 100%, padding, border, border-radius<br />
                                button: background-color, color, padding, border: none, cursor: pointer<br />
                                input:focus, button:hover - visual feedback
                            </div>
                        </div>

                        {/* Grades Table Page */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
                            <h3 className="text-xl font-bold text-cyan-200 mb-3">📊 Grades Table Page</h3>
                            <p className="text-purple-100/80 mb-4"><strong>Key Elements:</strong> &lt;table&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;</p>
                            <p className="text-white font-medium mb-3">Table Styling:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono mb-3 overflow-x-auto border border-white/10">
                                table: width: 100%, border-collapse: collapse, box-shadow<br />
                                th: background-color, color, font-weight: bold, padding<br />
                                tr:nth-child(even): background-color <span className="text-gray-500">/* Zebra striping */</span><br />
                                tr:hover: background-color <span className="text-gray-500">/* Row highlight */</span>
                            </div>
                        </div>

                        {/* Contact Us Page */}
                        <div className="p-6 bg-gradient-to-r from-rose-500/10 to-red-500/10 rounded-2xl border border-rose-500/20">
                            <h3 className="text-xl font-bold text-rose-200 mb-3">📞 Contact Us Page</h3>
                            <p className="text-purple-100/80 mb-4"><strong>Key Focus:</strong> Rely on global styles, ensure mailto: links are interactive</p>
                            <p className="text-white font-medium mb-3">Focus on:</p>
                            <ul className="list-disc list-inside text-purple-100/80 space-y-2 ml-2">
                                <li>Typography and spacing from global styles</li>
                                <li>margin-bottom for visual separation</li>
                                <li>Clear interactive link styling</li>
                            </ul>
                        </div>
                    </section>

                    {/* Part 3: Responsive Design */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">3</span>
                            Part 3: Making It Responsive – Media Queries
                        </h2>
                        <p className="text-purple-100/90 mb-8">
                            Your website needs to look good and be usable on desktops, tablets, and mobile phones.
                        </p>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Smartphone size={20} className="text-purple-400" />
                                Key Breakpoints
                            </h3>
                            <div className="bg-[#1e1e1e] text-green-400 p-5 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                @media (max-width: 768px) &#123; /* Tablets */ &#125;<br />
                                @media (max-width: 480px) &#123; /* Phones */ &#125;
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-100/90">
                                <strong className="text-purple-300">Navigation:</strong> Change flex-direction: column to stack links vertically
                            </div>
                            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-100/90">
                                <strong className="text-purple-300">Course Cards:</strong> Change flex-basis or width (100% on mobile, 50% on tablet)
                            </div>
                            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-100/90">
                                <strong className="text-purple-300">Font Sizes:</strong> Reduce font-size for headings and body text
                            </div>
                            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-100/90">
                                <strong className="text-purple-300">Tables:</strong> Make horizontally scrollable (display: block; overflow-x: auto)
                            </div>
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">4</span>
                            Video Submission Requirements 📹
                        </h2>
                        <p className="text-purple-100/90 mb-6">Record <strong>one video for each styled page</strong> (6 videos total).</p>

                        <div className="space-y-4 mb-4">
                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong className="text-white">Show & Tell:</strong> Show the "before" (HTML-only) and "after" (CSS-styled) version.</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong className="text-white">Explain Styles:</strong> Walk through your CSS file and point out key CSS rules.</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong className="text-white">Explain "Why":</strong> Describe why you made certain styling choices.</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80"><strong className="text-white">Demonstrate:</strong> Show how the CSS rules affect the page in the browser.</span>
                            </div>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">5</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-purple-100/90 mb-6">After completing this phase, you will be able to:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80">Use a wide range of <strong className="text-white">CSS selectors</strong> (IDs, classes, tags)</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80">Master the <strong className="text-white">CSS Box Model</strong> (margin, padding, border, width, height)</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80">Apply CSS for <strong className="text-white">typography</strong> and <strong className="text-white">backgrounds</strong></span>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80">Utilize <strong className="text-white">Flexbox</strong> for flexible and responsive layouts</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80">Use <strong className="text-white">pseudo-classes</strong> (:hover, :focus, :nth-child) for interactivity</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                                <span className="text-purple-100/80">Write <strong className="text-white">Media Queries</strong> for responsive design</span>
                            </li>
                        </ul>
                    </section>

                    {/* Resources */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">6</span>
                            Resources 📚
                        </h2>
                        <div className="space-y-4">
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                <ExternalLink className="text-purple-400 group-hover:text-purple-300" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">MDN Web Docs - CSS</p>
                                    <p className="text-sm text-purple-200/60">Comprehensive and highly accurate documentation.</p>
                                </div>
                            </a>
                            <a href="https://www.w3schools.com/css/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                <ExternalLink className="text-purple-400 group-hover:text-purple-300" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">W3Schools CSS Tutorial</p>
                                    <p className="text-sm text-purple-200/60">Great for interactive examples and quick learning.</p>
                                </div>
                            </a>
                            <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                <ExternalLink className="text-purple-400 group-hover:text-purple-300" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">CSS-Tricks - A Guide to Flexbox</p>
                                    <p className="text-sm text-purple-200/60">Excellent visual guide to understanding Flexbox.</p>
                                </div>
                            </a>
                            <a href="https://www.freecodecamp.org/learn/responsive-web-design/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                <ExternalLink className="text-purple-400 group-hover:text-purple-300" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">freeCodeCamp - Responsive Web Design</p>
                                    <p className="text-sm text-purple-200/60">Basic CSS and Applied Visual Design sections.</p>
                                </div>
                            </a>
                            <a href="https://www.youtube.com/user/KepowOb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group border border-white/5">
                                <ExternalLink className="text-purple-400 group-hover:text-purple-300" size={20} />
                                <div>
                                    <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">Kevin Powell (YouTube)</p>
                                    <p className="text-sm text-purple-200/60">Fantastic tutorials and tips specifically on CSS.</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 w-10 h-10 rounded-full flex items-center justify-center font-bold border border-purple-500/30">7</span>
                            Mini Projects 💡
                        </h2>
                        <p className="text-purple-100/90 mb-8">Practice your CSS skills with these mini-projects:</p>

                        <div className="mb-6 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20">
                            <h3 className="text-xl font-bold text-amber-200 mb-3">1. Stylish Online Resume</h3>
                            <p className="text-purple-100/80 mb-4">Create a single HTML page resume and style it professionally with CSS.</p>
                            <p className="text-white font-medium mb-3">Concepts to Apply:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                Selectors (class, ID, tag), Box Model, Typography, Flexbox, Color schemes
                            </div>
                        </div>

                        <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                            <h3 className="text-xl font-bold text-blue-200 mb-3">2. Responsive Product Card UI</h3>
                            <p className="text-purple-100/80 mb-4">Design a product card with image, name, description, price, and "Add to Cart" button.</p>
                            <p className="text-white font-medium mb-3">Concepts to Apply:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                Box Model, Flexbox, Typography, Backgrounds, Borders, :hover, Media Queries
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                            <h3 className="text-xl font-bold text-purple-200 mb-3">3. Feedback Form UI Makeover</h3>
                            <p className="text-purple-100/80 mb-4">Give a basic HTML form a complete visual makeover with CSS.</p>
                            <p className="text-white font-medium mb-3">Concepts to Apply:</p>
                            <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                Form element styling, attribute selectors, Box Model, :focus, :hover
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-white">Get ready to unleash your creativity! 🎨</p>
                        <p className="text-purple-200/60 mt-2">Transform your HTML structures into beautiful web pages. Good luck, and have fun styling!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
