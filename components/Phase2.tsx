import React from 'react';
import { ArrowLeft, Clock, Palette, CheckCircle, ExternalLink, Lightbulb, Layout, Type, Box, Smartphone } from 'lucide-react';

interface Phase2Props {
    onBack: () => void;
}

export const Phase2: React.FC<Phase2Props> = ({ onBack }) => {
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-purple-50 p-6 md:p-10">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-purple-600 font-semibold mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Title Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 2 - Styling with CSS</h1>
                    <p className="text-purple-100 text-lg">Transform Your HTML with Beautiful Styles</p>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Core Principle */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                                <Lightbulb size={20} />
                            </span>
                            The Core Principle
                        </h2>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-slate-700">
                                <strong>🌟 Remember:</strong> Your HTML structure from Phase 1 must remain unchanged. This exercise is crucial for understanding the power of CSS in transforming appearance independently of content structure – a fundamental concept in web development.
                            </p>
                        </div>
                    </section>

                    {/* Part 1: Global Stylesheet */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                            Part 1: Laying the Foundation – Your Global Stylesheet
                        </h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Think of this as setting the overall design language for your entire website. Consistent global styles make your site look professional and save you a lot of repetitive work.
                        </p>

                        {/* Resetting and Base Styling */}
                        <div className="mb-6 p-5 bg-slate-50 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <Box size={20} className="text-purple-500" />
                                Resetting and Base Styling (&lt;body&gt;)
                            </h3>
                            <p className="text-slate-600 mb-3"><strong>Objective:</strong> Create a consistent baseline across different browsers and define default text characteristics.</p>
                            <p className="text-slate-700 font-medium mb-2">Key Properties:</p>
                            <div className="bg-slate-800 text-green-400 p-4 rounded-lg text-sm font-mono mb-3 overflow-x-auto space-y-1">
                                <div>margin: 0; padding: 0; <span className="text-slate-400">/* Reset browser defaults */</span></div>
                                <div>* &#123; box-sizing: border-box; &#125; <span className="text-slate-400">/* Crucial best practice! */</span></div>
                                <div>font-family: sans-serif, Arial;</div>
                                <div>font-size: 16px;</div>
                                <div>line-height: 1.6; <span className="text-slate-400">/* Essential for readability */</span></div>
                                <div>color: #333333;</div>
                                <div>background-color: #f4f4f4;</div>
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="mb-6 p-5 bg-slate-50 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <Type size={20} className="text-purple-500" />
                                Establishing Typographic Hierarchy
                            </h3>
                            <p className="text-slate-600 mb-3"><strong>Objective:</strong> Guide the user's eye and clearly differentiate levels of information.</p>
                            <p className="text-slate-700 font-medium mb-2">For Headings (&lt;h1&gt; to &lt;h6&gt;):</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                                font-family, font-weight: bold, color, margin-top, margin-bottom
                            </div>
                            <p className="text-slate-700 font-medium mb-2">For Paragraphs (&lt;p&gt;):</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                line-height, margin-bottom
                            </div>
                        </div>

                        {/* Structural Elements */}
                        <div className="mb-6 p-5 bg-slate-50 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <Layout size={20} className="text-purple-500" />
                                Styling Common Structural Elements
                            </h3>
                            <p className="text-slate-600 mb-3"><strong>Objective:</strong> Visually define the main sections of your pages.</p>

                            <div className="space-y-3 text-slate-600">
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>&lt;header&gt;:</strong> background-color, color, padding, border-bottom
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>&lt;nav&gt; ul:</strong> list-style-type: none, display: flex, justify-content
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>&lt;main&gt;:</strong> padding, max-width, margin: auto
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <strong>&lt;footer&gt;:</strong> background-color, color, text-align, padding
                                </div>
                            </div>
                        </div>

                        {/* Link Styling */}
                        <div className="p-5 bg-slate-50 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Default Link Styling (&lt;a&gt;)</h3>
                            <p className="text-slate-600 mb-3"><strong>Objective:</strong> Make links clear and provide visual feedback.</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                color, text-decoration<br />
                                a:hover &#123; color change, text-decoration &#125;<br />
                                a:visited &#123; color &#125;<br />
                                a:active &#123; feedback during click &#125;
                            </div>
                        </div>
                    </section>

                    {/* Part 2: Page by Page */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</span>
                            Part 2: Styling Page by Page
                        </h2>
                        <p className="text-slate-600 mb-6">
                            With your global styles set, let's tackle each page using the Box Model, Typography, Colors, and Flexbox.
                        </p>

                        {/* Home Page */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">🏠 Home Page</h3>
                            <p className="text-slate-600 mb-3"><strong>Key Elements:</strong> Main heading (&lt;h1&gt;), introductory paragraphs (&lt;p&gt;)</p>
                            <p className="text-slate-700 font-medium mb-2">Styling Focus:</p>
                            <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                                <li>&lt;h1&gt;: font-size, text-align: center, margin-bottom</li>
                                <li>&lt;p&gt;: font-size, text-align: center, max-width, margin: auto</li>
                            </ul>
                        </div>

                        {/* Profile Page */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">👤 Profile Page</h3>
                            <p className="text-slate-600 mb-3"><strong>Key Elements:</strong> &lt;img&gt;, section headings, lists</p>
                            <p className="text-slate-700 font-medium mb-2">Profile Image Styling:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                                display: block; margin: auto;<br />
                                width, height, border-radius: 50%;<br />
                                border, object-fit: cover;
                            </div>
                        </div>

                        {/* Courses Page */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">📚 Courses Page</h3>
                            <p className="text-slate-600 mb-3"><strong>Key Focus:</strong> This is where Flexbox shines!</p>
                            <p className="text-slate-700 font-medium mb-2">Course Cards Layout:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                                Container: display: flex; flex-wrap: wrap; gap: 20px;<br />
                                Cards: background-color, border, border-radius, padding, box-shadow;<br />
                                flex-basis: 300px; flex-direction: column;
                            </div>
                        </div>

                        {/* Feedback Page */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">📝 Feedback Page</h3>
                            <p className="text-slate-600 mb-3"><strong>Key Elements:</strong> &lt;form&gt;, &lt;label&gt;, &lt;input&gt;, &lt;textarea&gt;, &lt;button&gt;</p>
                            <p className="text-slate-700 font-medium mb-2">Form Styling:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                                form: max-width, margin: auto, padding, background-color, border-radius, box-shadow<br />
                                label: display: block, margin-bottom, font-weight: bold<br />
                                input/textarea: width: 100%, padding, border, border-radius<br />
                                button: background-color, color, padding, border: none, cursor: pointer<br />
                                input:focus, button:hover - visual feedback
                            </div>
                        </div>

                        {/* Grades Table Page */}
                        <div className="mb-6 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">📊 Grades Table Page</h3>
                            <p className="text-slate-600 mb-3"><strong>Key Elements:</strong> &lt;table&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;</p>
                            <p className="text-slate-700 font-medium mb-2">Table Styling:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                                table: width: 100%, border-collapse: collapse, box-shadow<br />
                                th: background-color, color, font-weight: bold, padding<br />
                                tr:nth-child(even): background-color <span className="text-slate-400">/* Zebra striping */</span><br />
                                tr:hover: background-color <span className="text-slate-400">/* Row highlight */</span>
                            </div>
                        </div>

                        {/* Contact Us Page */}
                        <div className="p-5 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border border-rose-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">📞 Contact Us Page</h3>
                            <p className="text-slate-600 mb-3"><strong>Key Focus:</strong> Rely on global styles, ensure mailto: links are interactive</p>
                            <p className="text-slate-700 font-medium mb-2">Focus on:</p>
                            <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                                <li>Typography and spacing from global styles</li>
                                <li>margin-bottom for visual separation</li>
                                <li>Clear interactive link styling</li>
                            </ul>
                        </div>
                    </section>

                    {/* Part 3: Responsive Design */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</span>
                            Part 3: Making It Responsive – Media Queries
                        </h2>
                        <p className="text-slate-600 mb-4">
                            Your website needs to look good and be usable on desktops, tablets, and mobile phones.
                        </p>

                        <div className="p-5 bg-slate-50 rounded-xl mb-4">
                            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <Smartphone size={20} className="text-purple-500" />
                                Key Breakpoints
                            </h3>
                            <div className="bg-slate-800 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                                @media (max-width: 768px) &#123; /* Tablets */ &#125;<br />
                                @media (max-width: 480px) &#123; /* Phones */ &#125;
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <strong>Navigation:</strong> Change flex-direction: column to stack links vertically
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <strong>Course Cards:</strong> Change flex-basis or width (100% on mobile, 50% on tablet)
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <strong>Font Sizes:</strong> Reduce font-size for headings and body text
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <strong>Tables:</strong> Make horizontally scrollable (display: block; overflow-x: auto)
                            </div>
                        </div>
                    </section>

                    {/* Video Submission */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</span>
                            Video Submission Requirements 📹
                        </h2>
                        <p className="text-slate-600 mb-4">Record <strong>one video for each styled page</strong> (6 videos total).</p>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Show & Tell:</strong> Show the "before" (HTML-only) and "after" (CSS-styled) version.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Explain Styles:</strong> Walk through your CSS file and point out key CSS rules.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Explain "Why":</strong> Describe why you made certain styling choices.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600"><strong>Demonstrate:</strong> Show how the CSS rules affect the page in the browser.</span>
                            </div>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</span>
                            Learning Outcomes 🌟
                        </h2>
                        <p className="text-slate-600 mb-4">After completing this phase, you will be able to:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Use a wide range of <strong>CSS selectors</strong> (IDs, classes, tags)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Master the <strong>CSS Box Model</strong> (margin, padding, border, width, height)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Apply CSS for <strong>typography</strong> and <strong>backgrounds</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Utilize <strong>Flexbox</strong> for flexible and responsive layouts</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Use <strong>pseudo-classes</strong> (:hover, :focus, :nth-child) for interactivity</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-slate-600">Write <strong>Media Queries</strong> for responsive design</span>
                            </li>
                        </ul>
                    </section>

                    {/* Resources */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">6</span>
                            Resources 📚
                        </h2>
                        <div className="space-y-4">
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors group">
                                <ExternalLink className="text-purple-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-purple-600">MDN Web Docs - CSS</p>
                                    <p className="text-sm text-slate-500">Comprehensive and highly accurate documentation.</p>
                                </div>
                            </a>
                            <a href="https://www.w3schools.com/css/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors group">
                                <ExternalLink className="text-purple-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-purple-600">W3Schools CSS Tutorial</p>
                                    <p className="text-sm text-slate-500">Great for interactive examples and quick learning.</p>
                                </div>
                            </a>
                            <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors group">
                                <ExternalLink className="text-purple-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-purple-600">CSS-Tricks - A Guide to Flexbox</p>
                                    <p className="text-sm text-slate-500">Excellent visual guide to understanding Flexbox.</p>
                                </div>
                            </a>
                            <a href="https://www.freecodecamp.org/learn/responsive-web-design/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors group">
                                <ExternalLink className="text-purple-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-purple-600">freeCodeCamp - Responsive Web Design</p>
                                    <p className="text-sm text-slate-500">Basic CSS and Applied Visual Design sections.</p>
                                </div>
                            </a>
                            <a href="https://www.youtube.com/user/KepowOb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-purple-50 transition-colors group">
                                <ExternalLink className="text-purple-500" size={20} />
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-purple-600">Kevin Powell (YouTube)</p>
                                    <p className="text-sm text-slate-500">Fantastic tutorials and tips specifically on CSS.</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Mini Projects */}
                    <section className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">7</span>
                            Mini Projects 💡
                        </h2>
                        <p className="text-slate-600 mb-6">Practice your CSS skills with these mini-projects:</p>

                        <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">1. Stylish Online Resume</h3>
                            <p className="text-slate-600 mb-3">Create a single HTML page resume and style it professionally with CSS.</p>
                            <p className="text-slate-700 font-medium mb-2">Concepts to Apply:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                Selectors (class, ID, tag), Box Model, Typography, Flexbox, Color schemes
                            </div>
                        </div>

                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">2. Responsive Product Card UI</h3>
                            <p className="text-slate-600 mb-3">Design a product card with image, name, description, price, and "Add to Cart" button.</p>
                            <p className="text-slate-700 font-medium mb-2">Concepts to Apply:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                Box Model, Flexbox, Typography, Backgrounds, Borders, :hover, Media Queries
                            </div>
                        </div>

                        <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">3. Feedback Form UI Makeover</h3>
                            <p className="text-slate-600 mb-3">Give a basic HTML form a complete visual makeover with CSS.</p>
                            <p className="text-slate-700 font-medium mb-2">Concepts to Apply:</p>
                            <div className="bg-slate-800 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                Form element styling, attribute selectors, Box Model, :focus, :hover
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center py-8">
                        <p className="text-2xl font-bold text-slate-700">Get ready to unleash your creativity! 🎨</p>
                        <p className="text-slate-500 mt-2">Transform your HTML structures into beautiful web pages. Good luck, and have fun styling!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
