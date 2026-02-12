import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Play, Eye, RotateCcw, Copy, Check, BookOpen, Clock, Lightbulb, ExternalLink, Code, X, ChevronRight, Palette } from 'lucide-react';

interface Phase2Props {
    onBack: () => void;
}

// ─── Syntax Highlighting ────────────────────────────────────
const highlightHTML = (code: string): string => {
    let h = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    h = h.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>');
    h = h.replace(/(&lt;!DOCTYPE\s+\w+&gt;)/gi, '<span class="hl-tag">$1</span>');
    h = h.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)/g, '$1<span class="hl-tag">$2</span>');
    h = h.replace(/(="[^"]*")/g, '<span class="hl-string">$1</span>');
    h = h.replace(/\s([a-zA-Z-]+)(?=<span class="hl-string">)/g, ' <span class="hl-attr">$1</span>');
    h = h.replace(/(&lt;\/?|\/?\s*&gt;)/g, '<span class="hl-bracket">$1</span>');
    return h;
};

const highlightCSS = (code: string): string => {
    let c = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    // Comments
    c = c.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');
    // Properties
    c = c.replace(/^(\s*)([a-zA-Z-]+)(\s*:)/gm, '$1<span class="hl-css-prop">$2</span><span class="hl-punc">$3</span>');
    // Numbers with units
    c = c.replace(/\b(\d+\.?\d*)(px|em|rem|%|vh|vw|s|ms|fr)\b/g, '<span class="hl-num">$1</span><span class="hl-string">$2</span>');
    // Plain numbers
    c = c.replace(/(:[\s]*)(\d+\.?\d*)/g, '$1<span class="hl-num">$2</span>');
    // Hex colors
    c = c.replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="hl-string">$1</span>');
    // Strings
    c = c.replace(/("[^"]*"|'[^']*')/g, '<span class="hl-string">$1</span>');
    // Selectors
    c = c.replace(/^([^{}\n/][^{}\n]*?)(\s*\{)/gm, '<span class="hl-css-sel">$1</span>$2');
    // Braces
    c = c.replace(/([{}])/g, '<span class="hl-punc">$1</span>');
    // Semicolons
    c = c.replace(/;/g, '<span class="hl-punc">;</span>');
    // @rules
    c = c.replace(/(@[a-zA-Z-]+)/g, '<span class="hl-at-rule">$1</span>');
    return c;
};

// ─── Tasks ──────────────────────────────────────────────────
const CSS_TASKS = [
    {
        id: 1,
        title: '🎨 Global Styles',
        description: 'Add global styles: font-family, background, margin/padding reset, and color theme.',
        hint: 'Use body, *, html selectors. Set font-family, margin, padding, background-color, color.',
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Student Portal - Home</title>
</head>
<body>
    <header>
        <h1>🎓 Student Portal</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">Profile</a>
            <a href="#">Courses</a>
            <a href="#">Grades</a>
            <a href="#">Feedback</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    <main>
        <h2>Welcome to Student Portal!</h2>
        <p>Yeh ek student portal hai jahan aap apni profile, courses, grades dekh sakte ho.</p>
    </main>
    <footer>
        <p>&copy; 2025 Student Portal. All rights reserved.</p>
    </footer>
</body>
</html>`,
        starterCSS: `/* ===== Global Styles ===== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: #007acc;
}

a:hover {
    color: #005a9e;
}
`,
        timeLimit: '45 min',
        tags: ['font-family', 'margin', 'padding', 'background-color', 'color', 'box-sizing']
    },
    {
        id: 2,
        title: '📌 Header & Nav',
        description: 'Style the header with dark background, padding, and horizontal nav links with hover effects.',
        hint: 'Use display:flex, gap, padding, background, hover pseudo-class for nav links.',
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Student Portal - Navigation</title>
</head>
<body>
    <header>
        <h1>🎓 Student Portal</h1>
        <nav>
            <a href="#" class="active">Home</a>
            <a href="#">Profile</a>
            <a href="#">Courses</a>
            <a href="#">Grades</a>
            <a href="#">Feedback</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    <main>
        <h2>Header & Navigation Styling</h2>
        <p>Header aur navigation ko professional banao!</p>
    </main>
</body>
</html>`,
        starterCSS: `/* ===== Header & Navigation ===== */

header {
    background-color: #1e1e2e;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1 {
    font-size: 1.4rem;
    font-weight: 600;
}

nav {
    display: flex;
    gap: 0.5rem;
}

nav a {
    color: #ccc;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: background 0.2s, color 0.2s;
}

nav a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
}

nav a.active {
    background-color: #007acc;
    color: white;
}
`,
        timeLimit: '60 min',
        tags: ['display', 'flex', 'gap', 'padding', 'background', ':hover', 'transition', 'border-radius']
    },
    {
        id: 3,
        title: '👤 Profile Card',
        description: 'Style the profile page with centered card, rounded image, and styled lists.',
        hint: 'Use max-width, margin:auto, border-radius, box-shadow, text-align for centering.',
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Student Portal - Profile</title>
</head>
<body>
    <div class="profile-card">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" alt="Student Photo" class="profile-img">
        <h1>Rahul Sharma</h1>
        <p class="bio">Full Stack Developer | NavGurukul Student</p>
        <div class="section">
            <h2>🎯 Hobbies</h2>
            <ul>
                <li>Coding</li>
                <li>Reading</li>
                <li>Gaming</li>
                <li>Music</li>
            </ul>
        </div>
        <div class="section">
            <h2>💪 Skills</h2>
            <div class="skills">
                <span class="skill-tag">HTML</span>
                <span class="skill-tag">CSS</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">React</span>
            </div>
        </div>
    </div>
</body>
</html>`,
        starterCSS: `/* ===== Profile Card ===== */

body {
    background: #f0f2f5;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    justify-content: center;
    padding: 2rem;
}

.profile-card {
    max-width: 420px;
    width: 100%;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #007acc;
    margin-bottom: 1rem;
}

.bio {
    color: #666;
    font-style: italic;
    margin-bottom: 1.5rem;
}

.section {
    text-align: left;
    margin-top: 1.5rem;
}

.section h2 {
    font-size: 1.1rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 0.8rem;
}

.section ul {
    list-style: none;
    padding: 0;
}

.section li {
    padding: 0.3rem 0;
    color: #555;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    background: #007acc;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}
`,
        timeLimit: '75 min',
        tags: ['max-width', 'margin:auto', 'border-radius', 'box-shadow', 'flex-wrap', 'text-align']
    },
    {
        id: 4,
        title: '📋 Courses Grid',
        description: 'Create a responsive grid layout for course cards with hover animations.',
        hint: 'Use CSS Grid, grid-template-columns, transform, transition for hover.',
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Student Portal - Courses</title>
</head>
<body>
    <h1 class="page-title">📚 My Courses</h1>
    <div class="courses-grid">
        <div class="course-card">
            <div class="course-icon">🌐</div>
            <h3>HTML Basics</h3>
            <p>Learn the structure of web pages.</p>
            <span class="duration">4 weeks</span>
        </div>
        <div class="course-card">
            <div class="course-icon">🎨</div>
            <h3>CSS Styling</h3>
            <p>Make websites beautiful with CSS.</p>
            <span class="duration">4 weeks</span>
        </div>
        <div class="course-card">
            <div class="course-icon">⚡</div>
            <h3>JavaScript</h3>
            <p>Add interactivity to your pages.</p>
            <span class="duration">6 weeks</span>
        </div>
        <div class="course-card">
            <div class="course-icon">⚛️</div>
            <h3>React.js</h3>
            <p>Build modern single-page apps.</p>
            <span class="duration">8 weeks</span>
        </div>
        <div class="course-card">
            <div class="course-icon">🗃️</div>
            <h3>Node.js</h3>
            <p>Server-side JavaScript.</p>
            <span class="duration">6 weeks</span>
        </div>
        <div class="course-card">
            <div class="course-icon">🛢️</div>
            <h3>Databases</h3>
            <p>SQL and NoSQL data management.</p>
            <span class="duration">4 weeks</span>
        </div>
    </div>
</body>
</html>`,
        starterCSS: `/* ===== Courses Grid ===== */

body {
    background: #f5f5f5;
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 2rem;
}

.page-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: #1e1e2e;
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}

.course-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.course-icon {
    font-size: 2.5rem;
    margin-bottom: 0.8rem;
}

.course-card h3 {
    color: #1e1e2e;
    margin: 0.5rem 0;
}

.course-card p {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.duration {
    background: #e8f4fd;
    color: #007acc;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}
`,
        timeLimit: '75 min',
        tags: ['grid', 'grid-template-columns', 'transform', 'transition', 'box-shadow', ':hover']
    },
    {
        id: 5,
        title: '📊 Grades Table',
        description: 'Style the grades table with alternating rows, borders, and header styling.',
        hint: 'Use border-collapse, nth-child, padding, text-align for table styling.',
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Student Portal - Grades</title>
</head>
<body>
    <div class="table-container">
        <h1>📊 My Grades</h1>
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>HTML</td><td>92</td><td>A+</td><td><span class="badge pass">Pass</span></td></tr>
                <tr><td>CSS</td><td>88</td><td>A</td><td><span class="badge pass">Pass</span></td></tr>
                <tr><td>JavaScript</td><td>75</td><td>B+</td><td><span class="badge pass">Pass</span></td></tr>
                <tr><td>React</td><td>45</td><td>D</td><td><span class="badge fail">Fail</span></td></tr>
                <tr><td>Node.js</td><td>82</td><td>A</td><td><span class="badge pass">Pass</span></td></tr>
            </tbody>
        </table>
    </div>
</body>
</html>`,
        starterCSS: `/* ===== Grades Table ===== */

body {
    background: #f5f5f5;
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 2rem;
}

.table-container {
    max-width: 700px;
    margin: 0 auto;
}

.table-container h1 {
    margin-bottom: 1.5rem;
    color: #1e1e2e;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

thead th {
    background: #1e1e2e;
    color: white;
    padding: 0.8rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
}

tbody td {
    padding: 0.7rem 1rem;
    border-bottom: 1px solid #eee;
    color: #444;
}

tbody tr:nth-child(even) {
    background: #f9fafb;
}

tbody tr:hover {
    background: #e8f4fd;
}

.badge {
    padding: 0.2rem 0.7rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
}

.badge.pass {
    background: #d4edda;
    color: #155724;
}

.badge.fail {
    background: #f8d7da;
    color: #721c24;
}
`,
        timeLimit: '60 min',
        tags: ['border-collapse', 'nth-child', 'padding', 'text-align', ':hover']
    },
    {
        id: 6,
        title: '📱 Responsive Design',
        description: 'Make your portal responsive with media queries for mobile, tablet, and desktop.',
        hint: 'Use @media queries, flex-direction, font-size adjustments for different screens.',
        htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Student Portal - Responsive</title>
</head>
<body>
    <header>
        <h1>🎓 Student Portal</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">Profile</a>
            <a href="#">Courses</a>
            <a href="#">Grades</a>
        </nav>
    </header>
    <main>
        <div class="hero">
            <h2>Welcome Back, Rahul!</h2>
            <p>Your learning dashboard is ready.</p>
        </div>
        <div class="stats">
            <div class="stat-card"><h3>12</h3><p>Courses</p></div>
            <div class="stat-card"><h3>85%</h3><p>Average</p></div>
            <div class="stat-card"><h3>24</h3><p>Badges</p></div>
            <div class="stat-card"><h3>156</h3><p>Hours</p></div>
        </div>
    </main>
    <footer><p>&copy; 2025 Student Portal</p></footer>
</body>
</html>`,
        starterCSS: `/* ===== Responsive Design ===== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', sans-serif;
}

header {
    background: #1e1e2e;
    color: white;
    padding: 1rem;
    text-align: center;
}

nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.8rem;
}

nav a {
    color: #ccc;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
}

nav a:hover {
    background: rgba(255,255,255,0.1);
    color: white;
}

.hero {
    text-align: center;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
}

.stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1.5rem;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.stat-card h3 {
    font-size: 1.8rem;
    color: #007acc;
}

.stat-card p {
    color: #888;
    font-size: 0.85rem;
}

footer {
    text-align: center;
    padding: 1rem;
    color: #888;
    font-size: 0.8rem;
}

/* Tablet */
@media (min-width: 768px) {
    .stats {
        grid-template-columns: repeat(4, 1fr);
    }
    nav {
        gap: 1rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        text-align: left;
    }
    nav { margin-top: 0; }
    main {
        max-width: 1100px;
        margin: 0 auto;
    }
}
`,
        timeLimit: '90 min',
        tags: ['@media', 'min-width', 'grid-template-columns', 'flex-wrap', 'viewport']
    }
];

// ─── CSS Autocomplete Data ──────────────────────────────────
const CSS_PROPERTIES = [
    { label: 'color', detail: 'Text color', values: ['red','blue','green','white','black','#333','inherit'] },
    { label: 'background-color', detail: 'Background color', values: ['#fff','#f0f0f0','transparent','inherit'] },
    { label: 'background', detail: 'Background shorthand', values: ['#fff','linear-gradient()','url()','none'] },
    { label: 'margin', detail: 'Outer spacing', values: ['0','8px','16px','auto','0 auto'] },
    { label: 'margin-top', detail: 'Top margin', values: ['0','8px','16px','auto'] },
    { label: 'margin-bottom', detail: 'Bottom margin', values: ['0','8px','16px','auto'] },
    { label: 'margin-left', detail: 'Left margin', values: ['0','8px','16px','auto'] },
    { label: 'margin-right', detail: 'Right margin', values: ['0','8px','16px','auto'] },
    { label: 'padding', detail: 'Inner spacing', values: ['0','8px','16px','24px'] },
    { label: 'padding-top', detail: 'Top padding', values: ['0','8px','16px'] },
    { label: 'padding-bottom', detail: 'Bottom padding', values: ['0','8px','16px'] },
    { label: 'padding-left', detail: 'Left padding', values: ['0','8px','16px'] },
    { label: 'padding-right', detail: 'Right padding', values: ['0','8px','16px'] },
    { label: 'display', detail: 'Display type', values: ['block','inline','flex','grid','none','inline-block'] },
    { label: 'flex-direction', detail: 'Flex direction', values: ['row','column','row-reverse','column-reverse'] },
    { label: 'justify-content', detail: 'Main axis align', values: ['center','flex-start','flex-end','space-between','space-around'] },
    { label: 'align-items', detail: 'Cross axis align', values: ['center','flex-start','flex-end','stretch','baseline'] },
    { label: 'flex-wrap', detail: 'Wrap flex items', values: ['wrap','nowrap','wrap-reverse'] },
    { label: 'gap', detail: 'Gap between items', values: ['4px','8px','16px','24px'] },
    { label: 'font-family', detail: 'Font face', values: ["'Arial'","'Helvetica'","'sans-serif'","'monospace'"] },
    { label: 'font-size', detail: 'Text size', values: ['12px','14px','16px','18px','24px','1rem','1.5rem'] },
    { label: 'font-weight', detail: 'Text weight', values: ['normal','bold','100','400','600','700','900'] },
    { label: 'text-align', detail: 'Text alignment', values: ['left','center','right','justify'] },
    { label: 'text-decoration', detail: 'Text decoration', values: ['none','underline','line-through','overline'] },
    { label: 'text-transform', detail: 'Text case', values: ['none','uppercase','lowercase','capitalize'] },
    { label: 'line-height', detail: 'Line spacing', values: ['1','1.4','1.6','2','normal'] },
    { label: 'letter-spacing', detail: 'Letter gap', values: ['0','0.5px','1px','2px','normal'] },
    { label: 'width', detail: 'Element width', values: ['100%','auto','300px','50%','fit-content'] },
    { label: 'height', detail: 'Element height', values: ['auto','100%','100vh','300px','fit-content'] },
    { label: 'max-width', detail: 'Maximum width', values: ['100%','1200px','768px','none'] },
    { label: 'min-height', detail: 'Minimum height', values: ['100vh','auto','300px'] },
    { label: 'border', detail: 'Border shorthand', values: ['1px solid #ccc','2px solid #333','none'] },
    { label: 'border-radius', detail: 'Corner rounding', values: ['4px','8px','12px','50%','0'] },
    { label: 'border-bottom', detail: 'Bottom border', values: ['1px solid #ccc','2px solid #333','none'] },
    { label: 'box-shadow', detail: 'Shadow', values: ['0 2px 8px rgba(0,0,0,0.1)','none'] },
    { label: 'overflow', detail: 'Overflow behavior', values: ['hidden','auto','scroll','visible'] },
    { label: 'position', detail: 'Positioning', values: ['relative','absolute','fixed','sticky','static'] },
    { label: 'top', detail: 'Top offset', values: ['0','50%','auto'] },
    { label: 'left', detail: 'Left offset', values: ['0','50%','auto'] },
    { label: 'right', detail: 'Right offset', values: ['0','auto'] },
    { label: 'bottom', detail: 'Bottom offset', values: ['0','auto'] },
    { label: 'z-index', detail: 'Stack order', values: ['1','10','100','999','-1'] },
    { label: 'opacity', detail: 'Transparency', values: ['1','0.8','0.5','0'] },
    { label: 'cursor', detail: 'Cursor style', values: ['pointer','default','not-allowed','grab','text'] },
    { label: 'transition', detail: 'Transition', values: ['all 0.3s ease','none','background 0.2s'] },
    { label: 'transform', detail: 'Transform', values: ['none','scale(1.05)','translateY(-2px)','rotate(45deg)'] },
    { label: 'list-style', detail: 'List marker', values: ['none','disc','decimal','square'] },
    { label: 'list-style-type', detail: 'Marker type', values: ['none','disc','circle','square','decimal'] },
    { label: 'grid-template-columns', detail: 'Grid columns', values: ['1fr 1fr','repeat(3, 1fr)','auto'] },
    { label: 'object-fit', detail: 'Image fit', values: ['cover','contain','fill','none'] },
];

const CSS_SELECTORS_LIST = [
    { label: 'body', detail: 'Body element' },
    { label: 'header', detail: 'Header element' },
    { label: 'footer', detail: 'Footer element' },
    { label: 'nav', detail: 'Navigation' },
    { label: 'main', detail: 'Main content' },
    { label: 'section', detail: 'Section element' },
    { label: 'h1', detail: 'Heading 1' },
    { label: 'h2', detail: 'Heading 2' },
    { label: 'h3', detail: 'Heading 3' },
    { label: 'p', detail: 'Paragraph' },
    { label: 'a', detail: 'Anchor' },
    { label: 'ul', detail: 'Unordered list' },
    { label: 'ol', detail: 'Ordered list' },
    { label: 'li', detail: 'List item' },
    { label: 'table', detail: 'Table' },
    { label: 'th', detail: 'Table header' },
    { label: 'td', detail: 'Table cell' },
    { label: 'tr', detail: 'Table row' },
    { label: 'form', detail: 'Form element' },
    { label: 'input', detail: 'Input field' },
    { label: 'button', detail: 'Button' },
    { label: 'label', detail: 'Label element' },
    { label: 'textarea', detail: 'Text area' },
    { label: 'select', detail: 'Select dropdown' },
    { label: 'img', detail: 'Image' },
    { label: '*', detail: 'Universal selector' },
    { label: ':hover', detail: 'Hover state' },
    { label: ':focus', detail: 'Focus state' },
    { label: '::before', detail: 'Before pseudo' },
    { label: '::after', detail: 'After pseudo' },
    { label: ':first-child', detail: 'First child' },
    { label: ':last-child', detail: 'Last child' },
    { label: ':nth-child()', detail: 'Nth child' },
    { label: '@media', detail: 'Media query' },
];

// ─── Component ──────────────────────────────────────────────
export const Phase2: React.FC<Phase2Props> = ({ onBack }) => {
    const [activeTask, setActiveTask] = useState(0);
    const [cssValues, setCssValues] = useState<string[]>(CSS_TASKS.map(t => t.starterCSS));
    const [showPreview, setShowPreview] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [activeTab, setActiveTab] = useState<'html' | 'css'>('css');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLPreElement>(null);
    const lineNumRef = useRef<HTMLDivElement>(null);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    // Autocomplete state
    const [suggestions, setSuggestions] = useState<{label:string;detail:string;snippet?:string}[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionPos, setSuggestionPos] = useState({ top: 0, left: 0 });

    const currentTask = CSS_TASKS[activeTask];
    const currentCSS = cssValues[activeTask];
    const displayCode = activeTab === 'html' ? currentTask.htmlCode : currentCSS;
    const lineCount = displayCode.split('\n').length;

    const updateCSS = (value: string) => {
        const c = [...cssValues];
        c[activeTask] = value;
        setCssValues(c);
    };

    const runCode = () => {
        setShowPreview(true);
        setTimeout(() => {
            if (iframeRef.current) {
                const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
                if (doc) {
                    const combined = currentTask.htmlCode.replace(
                        '<link rel="stylesheet" href="style.css">',
                        `<style>${currentCSS}</style>`
                    );
                    doc.open(); doc.write(combined); doc.close();
                }
            }
        }, 50);
    };

    const resetCSS = () => {
        const c = [...cssValues];
        c[activeTask] = CSS_TASKS[activeTask].starterCSS;
        setCssValues(c);
        setShowPreview(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(displayCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ─── CSS Autocomplete Logic (IntelliSense-style) ────
    const getCSSContext = (code: string, pos: number): { word: string; start: number; context: 'property' | 'value' | 'selector'; propName: string } => {
        let i = pos - 1;
        let word = '';
        while (i >= 0 && /[a-zA-Z0-9-@:*()#.%']/.test(code[i])) { word = code[i] + word; i--; }
        const start = i + 1;

        // Check if we're inside { }
        let depth = 0;
        for (let j = 0; j < pos; j++) {
            if (code[j] === '{') depth++;
            if (code[j] === '}') depth--;
        }
        const insideBlock = depth > 0;

        let propName = '';
        if (insideBlock) {
            let lineStart = code.lastIndexOf('\n', pos - 1) + 1;
            let lineText = code.substring(lineStart, pos);
            let colonIdx = lineText.indexOf(':');
            if (colonIdx >= 0) {
                propName = lineText.substring(0, colonIdx).trim();
                return { word: word.toLowerCase(), start, context: 'value', propName };
            }
            return { word: word.toLowerCase(), start, context: 'property', propName: '' };
        }
        return { word: word.toLowerCase(), start, context: 'selector', propName: '' };
    };

    const computeCSSSuggestions = (code: string, pos: number) => {
        if (activeTab !== 'css') { setShowSuggestions(false); return; }
        const { word, context, propName } = getCSSContext(code, pos);
        if (word.length === 0) { setShowSuggestions(false); return; }

        let matches: {label:string;detail:string;snippet?:string;kind?:string}[] = [];

        if (context === 'property') {
            matches = CSS_PROPERTIES
                .filter(p => p.label.startsWith(word))
                .map(p => ({ label: p.label, detail: p.detail, snippet: p.label + ': ;', kind: 'prop' }))
                .slice(0, 10);
        } else if (context === 'value') {
            const prop = CSS_PROPERTIES.find(p => p.label === propName.trim());
            if (prop) {
                matches = prop.values
                    .filter(v => v.toLowerCase().startsWith(word))
                    .map(v => ({ label: v, detail: propName + ' value', kind: 'value' }))
                    .slice(0, 10);
            }
            // Also search all values if no specific prop match
            if (matches.length === 0) {
                const allVals: {label:string;detail:string;kind:string}[] = [];
                CSS_PROPERTIES.forEach(p => {
                    p.values.filter(v => v.toLowerCase().startsWith(word)).forEach(v => {
                        if (!allVals.find(x => x.label === v)) allVals.push({ label: v, detail: p.label, kind: 'value' });
                    });
                });
                matches = allVals.slice(0, 10);
            }
        } else {
            matches = CSS_SELECTORS_LIST
                .filter(s => s.label.startsWith(word))
                .map(s => ({ label: s.label, detail: s.detail, snippet: s.label + ' {\n    \n}', kind: 'sel' }))
                .slice(0, 10);
        }

        if (matches.length > 0) {
            setSuggestions(matches);
            setSelectedSuggestion(0);
            setShowSuggestions(true);
            updateCSSSuggestionPos(pos);
        } else {
            setShowSuggestions(false);
        }
    };

    const updateCSSSuggestionPos = (pos: number) => {
        if (!textareaRef.current) return;
        const ta = textareaRef.current;
        const textBefore = currentCSS.substring(0, pos);
        const lines = textBefore.split('\n');
        const lineIdx = lines.length - 1;
        const colIdx = lines[lineIdx].length;
        const top = (lineIdx + 1) * 20 + 8 - ta.scrollTop;
        const left = colIdx * 7.8 + 12 - ta.scrollLeft;
        setSuggestionPos({ top: Math.max(0, top), left: Math.max(0, Math.min(left, 400)) });
    };

    const applyCSSSuggestion = (sug: {label:string;detail:string;snippet?:string}) => {
        if (!textareaRef.current) return;
        const ta = textareaRef.current;
        const pos = ta.selectionStart;
        const { word, start, context } = getCSSContext(currentCSS, pos);
        const before = currentCSS.substring(0, start);
        const after = currentCSS.substring(pos);

        if (context === 'property' && sug.snippet) {
            const newCode = before + sug.snippet + after;
            updateCSS(newCode);
            const cursorPos = before.length + sug.snippet.length - 1; // before ;
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = cursorPos; ta.focus(); }, 0);
        } else if (context === 'selector' && sug.snippet) {
            const newCode = before + sug.snippet + after;
            updateCSS(newCode);
            const cursorPos = before.length + sug.snippet.indexOf('\n') + 5;
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = cursorPos; ta.focus(); }, 0);
        } else {
            const insert = sug.label;
            const newCode = before + insert + after;
            updateCSS(newCode);
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = before.length + insert.length; ta.focus(); }, 0);
        }
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Autocomplete navigation
        if (showSuggestions) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedSuggestion(prev => Math.max(prev - 1, 0));
                return;
            }
            if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                applyCSSSuggestion(suggestions[selectedSuggestion]);
                return;
            }
            if (e.key === 'Escape') {
                setShowSuggestions(false);
                return;
            }
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            const t = e.target as HTMLTextAreaElement;
            const s = t.selectionStart, en = t.selectionEnd;
            updateCSS(currentCSS.substring(0, s) + '    ' + currentCSS.substring(en));
            setTimeout(() => { t.selectionStart = t.selectionEnd = s + 4; }, 0);
        }
    };

    const handleCSSInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        updateCSS(newVal);
        const pos = e.target.selectionStart;
        setTimeout(() => computeCSSSuggestions(newVal, pos), 0);
    };

    const syncScroll = useCallback(() => {
        if (textareaRef.current) {
            const st = textareaRef.current.scrollTop;
            const sl = textareaRef.current.scrollLeft;
            if (highlightRef.current) { highlightRef.current.scrollTop = st; highlightRef.current.scrollLeft = sl; }
            if (lineNumRef.current) { lineNumRef.current.scrollTop = st; }
        }
    }, []);

    // ─── INSTRUCTIONS VIEW ─────────────────────────────────
    if (showInstructions) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-y-auto">
                <style>{`
                    .hl-tag{color:#569CD6}.hl-attr{color:#9CDCFE}.hl-string{color:#CE9178}
                    .hl-comment{color:#6A9955;font-style:italic}.hl-bracket{color:#808080}
                    .hl-css-prop{color:#9CDCFE}.hl-css-sel{color:#D7BA7D}.hl-num{color:#B5CEA8}
                    .hl-punc{color:#D4D4D4}.hl-at-rule{color:#C586C0}
                `}</style>
                <div className="sticky top-0 z-50 bg-[#0f0c29]/80 backdrop-blur-lg border-b border-white/10">
                    <div className="max-w-5xl mx-auto px-6 py-4">
                        <button onClick={onBack} className="flex items-center gap-2 text-purple-300 hover:text-white transition-all group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Back to Dashboard</span>
                        </button>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="bg-gradient-to-r from-pink-600 to-orange-500 rounded-3xl p-8 text-white mb-8 shadow-xl border border-white/10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Phase 2 — CSS Styling Challenge</h1>
                        <p className="text-pink-100 text-lg">(HTML + CSS) — VS Code Style Editor with Live Preview</p>
                    </div>
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Lightbulb className="text-yellow-400" size={24} /> Kya Karna Hai?
                        </h2>
                        <p className="text-purple-100/90 leading-relaxed mb-4">
                            Phase 1 ke HTML pages ko ab <strong className="text-pink-400">CSS</strong> se style karna hai!
                            Dono files — <strong className="text-yellow-400">index.html</strong> aur <strong className="text-yellow-400">style.css</strong> — already boilerplate ke saath hain.
                            CSS edit karo aur <strong className="text-green-400">Run Code</strong> click karke live preview dekho!
                        </p>
                        <div className="bg-pink-500/10 border-l-4 border-pink-500 p-4 rounded-r-lg">
                            <p className="text-pink-200"><strong>🌟 Note:</strong> HTML (read-only) + CSS (editable) dono files hain. Boilerplate already likha hua hai!</p>
                        </div>
                    </section>
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6">📋 Tasks (6 Styling Challenges)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {CSS_TASKS.map((task) => (
                                <div key={task.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-white">{task.title}</h3>
                                        <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">{task.timeLimit}</span>
                                    </div>
                                    <p className="text-purple-200/70 text-sm">{task.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">📚 Resources</h2>
                        <div className="space-y-3">
                            <a href="https://www.w3schools.com/css/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                <ExternalLink className="text-pink-400" size={18} /><span className="text-white font-medium">W3Schools CSS Tutorial</span>
                            </a>
                            <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                <ExternalLink className="text-pink-400" size={18} /><span className="text-white font-medium">CSS-Tricks — Flexbox Guide</span>
                            </a>
                            <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                <ExternalLink className="text-pink-400" size={18} /><span className="text-white font-medium">CSS-Tricks — Grid Guide</span>
                            </a>
                        </div>
                    </section>
                    <div className="w-full bg-gradient-to-r from-pink-600 to-orange-500 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl">
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white mb-2">Ready to Style? 🎨</h2>
                            <p className="text-pink-100 text-sm">Dono files ready hain — CSS edit karo aur live preview dekho!</p>
                        </div>
                        <button onClick={() => setShowInstructions(false)} className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-slate-50 transition-all shadow-lg active:scale-95">
                            <Palette size={20} /> Open Code Editor
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── VS CODE EDITOR VIEW ────────────────────────────────
    return (
        <div className="flex flex-col h-screen bg-[#1e1e1e] text-white overflow-hidden">
            <style>{`
                .hl-tag{color:#569CD6}.hl-attr{color:#9CDCFE}.hl-string{color:#CE9178}
                .hl-comment{color:#6A9955;font-style:italic}.hl-bracket{color:#808080}
                .hl-css-prop{color:#9CDCFE}.hl-css-sel{color:#D7BA7D}.hl-num{color:#B5CEA8}
                .hl-punc{color:#D4D4D4}.hl-at-rule{color:#C586C0}
            `}</style>

            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between bg-[#181818] px-3 py-1.5 border-b border-[#333] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowInstructions(true)} className="flex items-center gap-1.5 text-[#858585] hover:text-white transition-all text-xs">
                        <ArrowLeft size={14} /> Instructions
                    </button>
                    <div className="w-px h-4 bg-[#333]" />
                    <span className="text-[#cccccc] font-medium text-xs">Phase 2 — HTML + CSS</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <button onClick={copyCode} className="flex items-center gap-1 px-2.5 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] rounded text-[11px] text-[#ccc] transition-colors">
                        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button onClick={resetCSS} className="flex items-center gap-1 px-2.5 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] rounded text-[11px] text-[#ccc] transition-colors">
                        <RotateCcw size={12} /> Reset CSS
                    </button>
                    <button onClick={runCode} className="flex items-center gap-1 px-3 py-1 bg-[#388a34] hover:bg-[#45a340] rounded text-[11px] text-white font-bold transition-colors">
                        <Play size={12} fill="white" /> Run Code
                    </button>
                </div>
            </div>

            {/* ── Task Tabs ── */}
            <div className="flex items-center bg-[#252526] border-b border-[#333] overflow-x-auto flex-shrink-0">
                {CSS_TASKS.map((task, i) => (
                    <button
                        key={task.id}
                        onClick={() => { setActiveTask(i); setShowPreview(false); setActiveTab('css'); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] whitespace-nowrap border-r border-[#333] transition-all ${
                            activeTask === i
                                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]'
                                : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2a2a]'
                        }`}
                        style={{ borderTopWidth: activeTask === i ? '2px' : '0' }}
                    >
                        <span className="text-[10px]">{task.title.split(' ')[0]}</span>
                        <span className="font-medium">{task.title.split(' ').slice(1).join(' ')}</span>
                    </button>
                ))}
            </div>

            {/* ── File Tabs (index.html + style.css) ── */}
            <div className="flex items-center bg-[#252526] border-b border-[#1e1e1e] flex-shrink-0">
                <button
                    onClick={() => setActiveTab('html')}
                    className={`flex items-center gap-1.5 px-3 py-1 border-r border-[#333] transition-colors ${
                        activeTab === 'html' ? 'bg-[#1e1e1e] border-t-2 border-t-[#007acc]' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2a2a]'
                    }`}
                    style={{ borderTopWidth: activeTab === 'html' ? '2px' : '0' }}
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#e44d26"/><path d="M2 17l10 5 10-5" stroke="#e44d26" strokeWidth="2"/><path d="M2 12l10 5 10-5" stroke="#e44d26" strokeWidth="2"/></svg>
                    <span className={`text-[12px] ${activeTab === 'html' ? 'text-white' : 'text-[#969696]'}`}>index.html</span>
                    {activeTab === 'html' && <span className="text-[8px] bg-[#4d4d4d] text-[#aaa] px-1 rounded ml-1">READ ONLY</span>}
                    <X size={13} className="text-[#858585] hover:text-white ml-0.5" />
                </button>
                <button
                    onClick={() => setActiveTab('css')}
                    className={`flex items-center gap-1.5 px-3 py-1 border-r border-[#333] transition-colors ${
                        activeTab === 'css' ? 'bg-[#1e1e1e] border-t-2 border-t-[#007acc]' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2a2a]'
                    }`}
                    style={{ borderTopWidth: activeTab === 'css' ? '2px' : '0' }}
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#1572b6"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CSS</text></svg>
                    <span className={`text-[12px] ${activeTab === 'css' ? 'text-white' : 'text-[#969696]'}`}>style.css</span>
                    <X size={13} className="text-[#858585] hover:text-white ml-0.5" />
                </button>
            </div>

            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-1 px-4 py-1 bg-[#1e1e1e] border-b border-[#333] text-[11px] text-[#858585] flex-shrink-0">
                {activeTab === 'html' ? (
                    <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#e44d26"/></svg>
                        <span>index.html</span><ChevronRight size={10} /><span className="text-[#ccc]">html</span><ChevronRight size={10} /><span className="text-[#ccc]">body</span>
                    </>
                ) : (
                    <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#1572b6"/></svg>
                        <span>style.css</span>
                    </>
                )}
            </div>

            {/* ── Task Info ── */}
            <div className="bg-[#252526] px-4 py-2 border-b border-[#333] flex-shrink-0">
                <div className="flex items-start gap-2">
                    <BookOpen size={14} className="text-[#007acc] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-[#ccc] font-medium">{currentTask.description}</p>
                        <p className="text-[11px] text-[#d7ba7d] mt-0.5">💡 {currentTask.hint}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {currentTask.tags.map(tag => (
                                <span key={tag} className="text-[9px] bg-[#3b2e58] text-[#c586c0] px-1.5 py-0.5 rounded font-mono">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#858585] flex-shrink-0">
                        <Clock size={11} /> {currentTask.timeLimit}
                    </div>
                </div>
            </div>

            {/* ── Editor + Preview ── */}
            <div className="flex-1 flex overflow-hidden">
                <div className={`flex flex-col ${showPreview ? 'w-1/2' : 'w-full'} border-r border-[#333]`}>
                    <div className="flex-1 flex overflow-hidden">
                        {/* Line Numbers */}
                        <div
                            ref={lineNumRef}
                            className="w-[50px] bg-[#1e1e1e] text-right pr-3 pt-2 select-none overflow-hidden flex-shrink-0 border-r border-[#333]"
                            style={{ fontFamily: "'Consolas','Courier New',monospace", fontSize: '13px', lineHeight: '20px' }}
                        >
                            {Array.from({ length: lineCount }, (_, i) => (
                                <div key={i} className="text-[#858585]" style={{ height: '20px' }}>{i + 1}</div>
                            ))}
                        </div>

                        {/* Code Area */}
                        <div className="flex-1 relative overflow-hidden">
                            {/* Syntax Highlighted Overlay */}
                            <pre
                                ref={highlightRef}
                                className="absolute inset-0 m-0 pt-2 pl-3 pr-3 overflow-auto pointer-events-none whitespace-pre-wrap break-words"
                                style={{ fontFamily: "'Consolas','Courier New',monospace", fontSize: '13px', lineHeight: '20px', color: '#d4d4d4', background: 'transparent' }}
                                aria-hidden="true"
                                dangerouslySetInnerHTML={{ __html: (activeTab === 'html' ? highlightHTML(currentTask.htmlCode) : highlightCSS(currentCSS)) + '\n' }}
                            />
                            {/* Textarea */}
                            <textarea
                                ref={activeTab === 'css' ? textareaRef : undefined}
                                value={displayCode}
                                onChange={activeTab === 'css' ? handleCSSInput : undefined}
                                onKeyDown={activeTab === 'css' ? handleKeyDown : undefined}
                                onScroll={syncScroll}
                                readOnly={activeTab === 'html'}
                                className={`w-full h-full bg-[#1e1e1e] pt-2 pl-3 pr-3 resize-none outline-none overflow-auto ${activeTab === 'html' ? 'cursor-default' : ''}`}
                                spellCheck={false}
                                style={{
                                    fontFamily: "'Consolas','Courier New',monospace",
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    color: 'transparent',
                                    caretColor: activeTab === 'css' ? '#aeafad' : 'transparent',
                                    WebkitTextFillColor: 'transparent',
                                    tabSize: 4,
                                }}
                            />
                            {/* ── Autocomplete Dropdown ── */}
                            {showSuggestions && suggestions.length > 0 && activeTab === 'css' && (
                                <div
                                    ref={autocompleteRef}
                                    className="absolute z-50 bg-[#252526] border border-[#454545] rounded-md shadow-2xl overflow-hidden"
                                    style={{ top: suggestionPos.top, left: suggestionPos.left, minWidth: '280px', maxWidth: '420px' }}
                                >
                                    <div className="max-h-[240px] overflow-y-auto">
                                        {suggestions.map((s: any, i: number) => (
                                            <div
                                                key={s.label + i}
                                                onClick={() => applyCSSSuggestion(s)}
                                                className={`flex items-center gap-2 px-2.5 py-[5px] cursor-pointer text-[12px] border-l-2 ${
                                                    i === selectedSuggestion
                                                        ? 'bg-[#04395e] text-white border-l-[#007acc]'
                                                        : 'text-[#ccc] hover:bg-[#2a2d2e] border-l-transparent'
                                                }`}
                                            >
                                                <span className={`w-[18px] h-[18px] flex items-center justify-center rounded-sm text-[9px] font-bold flex-shrink-0 ${
                                                    s.kind === 'prop' ? 'bg-[#1572b6] text-white'
                                                    : s.kind === 'value' ? 'bg-[#b5cea8] text-[#1e1e1e]'
                                                    : s.kind === 'sel' ? 'bg-[#d7ba7d] text-[#1e1e1e]'
                                                    : 'bg-[#007acc] text-white'
                                                }`}>
                                                    {s.kind === 'prop' ? 'P' : s.kind === 'value' ? 'V' : s.kind === 'sel' ? 'S' : '?'}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-mono font-bold ${
                                                            s.kind === 'prop' ? 'text-[#9CDCFE]'
                                                            : s.kind === 'value' ? 'text-[#CE9178]'
                                                            : 'text-[#D7BA7D]'
                                                        }`}>{s.label}</span>
                                                        <span className="text-[#858585] text-[10px] truncate">{s.detail}</span>
                                                    </div>
                                                    {s.snippet && (
                                                        <div className="text-[10px] text-[#6A9955] font-mono truncate mt-[-1px]">
                                                            {s.snippet.replace(/\n/g, ' ')}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1e1e1e] border-t border-[#454545] text-[9px] text-[#858585]">
                                        <span className="bg-[#333] px-1 py-0.5 rounded text-[8px]">↑↓</span>
                                        <span className="mr-1">navigate</span>
                                        <span className="bg-[#333] px-1 py-0.5 rounded text-[8px]">Enter</span>
                                        <span className="mr-1">accept</span>
                                        <span className="bg-[#333] px-1 py-0.5 rounded text-[8px]">Esc</span>
                                        <span>dismiss</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                {showPreview && (
                    <div className="w-1/2 flex flex-col">
                        <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] border-b border-[#333]">
                            <Eye size={13} className="text-green-400" />
                            <span className="text-[11px] font-medium text-[#ccc]">Live Preview</span>
                        </div>
                        <div className="flex-1 bg-white">
                            <iframe ref={iframeRef} title="preview" className="w-full h-full border-0" sandbox="allow-same-origin" />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Status Bar ── */}
            <div className="flex items-center justify-between bg-[#007acc] px-3 py-0.5 text-[11px] text-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span>Ln {lineCount}, Col 1</span>
                    <span>Spaces: 4</span>
                </div>
                <div className="flex items-center gap-3">
                    <span>UTF-8</span>
                    <span>{activeTab === 'html' ? 'HTML' : 'CSS'}</span>
                </div>
            </div>
        </div>
    );
};
