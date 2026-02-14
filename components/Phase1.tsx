import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, Play, Eye, RotateCcw, Copy, Check, BookOpen, Clock, Lightbulb, ExternalLink, Code, X, ChevronRight, Send, Loader2, CheckCircle, XCircle, HourglassIcon, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { submitPhaseCode, getUserPhaseSubmission, PhaseSubmission } from '../services/phaseSubmissionService';
import { getDynamicQuestions } from '../services/questionService';
import { ChallengeList } from './ChallengeList';
import { ChallengeEditor } from './ChallengeEditor';
import { Question } from '../types';

interface Phase1Props {
    onBack: () => void;
    onComplete?: () => void;
}

const DEFAULT_PHASE1_QUESTION = 'HTML se ek Table banao (Make a Table using HTML)';
const PHASE1_ID = 'module-5';
const PHASE1_NAME = 'Phase 1 - HTML Table';

const STARTER_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Table</title>
</head>
<body>


</body>
</html>`;

// ─── Syntax Highlighting ────────────────────────────────────
// Uses placeholder tokens (\x00, \x01, \x02) so that regex steps
// don't accidentally match span tags inserted by earlier steps.
const highlightHTML = (code: string): string => {
    let h = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Placeholder helpers: \x00className\x01 = open, \x02 = close
    const O = (cls: string) => `\x00${cls}\x01`;
    const C = '\x02';

    // Comments
    h = h.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `${O('comment')}$1${C}`);
    // DOCTYPE
    h = h.replace(/(&lt;!DOCTYPE\s+\w+&gt;)/gi, `${O('tag')}$1${C}`);
    // Tag names
    h = h.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)/g, `$1${O('tag')}$2${C}`);
    // Attribute values (before attr names so quotes don't interfere)
    h = h.replace(/(="[^"]*")/g, `${O('string')}$1${C}`);
    // Attribute names (look ahead for the string placeholder token)
    h = h.replace(/\s([a-zA-Z-]+)(?=\x00string\x01)/g, ` ${O('attr')}$1${C}`);
    // Angle brackets
    h = h.replace(/(&lt;\/?|\/?\s*&gt;)/g, `${O('bracket')}$1${C}`);

    // Convert placeholders to real HTML span tags
    h = h.replace(/\x00(\w+)\x01/g, '<span class="hl-$1">');
    h = h.replace(/\x02/g, '</span>');
    return h;
};

// ─── HTML Autocomplete Data ─────────────────────────────────
const HTML_TAGS = [
    { label: 'table', detail: 'Table', snippet: '<table>\n    <tr>\n        <td>$0</td>\n    </tr>\n</table>' },
    { label: 'tr', detail: 'Table row', snippet: '<tr>\n    <td>$0</td>\n</tr>' },
    { label: 'td', detail: 'Table cell', snippet: '<td>$0</td>' },
    { label: 'th', detail: 'Table header cell', snippet: '<th>$0</th>' },
    { label: 'thead', detail: 'Table head', snippet: '<thead>\n    $0\n</thead>' },
    { label: 'tbody', detail: 'Table body', snippet: '<tbody>\n    $0\n</tbody>' },
    { label: 'tfoot', detail: 'Table footer', snippet: '<tfoot>\n    $0\n</tfoot>' },
    { label: 'caption', detail: 'Table caption', snippet: '<caption>$0</caption>' },
    { label: 'div', detail: 'Container element', snippet: '<div>\n    $0\n</div>' },
    { label: 'p', detail: 'Paragraph', snippet: '<p>$0</p>' },
    { label: 'h1', detail: 'Heading 1', snippet: '<h1>$0</h1>' },
    { label: 'h2', detail: 'Heading 2', snippet: '<h2>$0</h2>' },
    { label: 'h3', detail: 'Heading 3', snippet: '<h3>$0</h3>' },
    { label: 'span', detail: 'Inline container', snippet: '<span>$0</span>' },
    { label: 'a', detail: 'Hyperlink', snippet: '<a href="$0"></a>' },
    { label: 'img', detail: 'Image', snippet: '<img src="$0" alt="">' },
    { label: 'ul', detail: 'Unordered list', snippet: '<ul>\n    <li>$0</li>\n</ul>' },
    { label: 'ol', detail: 'Ordered list', snippet: '<ol>\n    <li>$0</li>\n</ol>' },
    { label: 'li', detail: 'List item', snippet: '<li>$0</li>' },
    { label: 'br', detail: 'Line break', snippet: '<br>' },
    { label: 'hr', detail: 'Horizontal rule', snippet: '<hr>' },
    { label: 'strong', detail: 'Bold text', snippet: '<strong>$0</strong>' },
    { label: 'em', detail: 'Italic text', snippet: '<em>$0</em>' },
    { label: 'header', detail: 'Header section', snippet: '<header>\n    $0\n</header>' },
    { label: 'footer', detail: 'Footer section', snippet: '<footer>\n    $0\n</footer>' },
    { label: 'style', detail: 'Internal CSS', snippet: '<style>\n    $0\n</style>' },
    { label: 'link', detail: 'External stylesheet', snippet: '<link rel="stylesheet" href="$0">' },
    { label: 'title', detail: 'Page title', snippet: '<title>$0</title>' },
    { label: 'meta', detail: 'Metadata', snippet: '<meta $0>' },
    { label: 'form', detail: 'Form', snippet: '<form>\n    $0\n</form>' },
    { label: 'input', detail: 'Input field', snippet: '<input type="$0">' },
    { label: 'button', detail: 'Button', snippet: '<button>$0</button>' },
    { label: 'label', detail: 'Label', snippet: '<label>$0</label>' },
    { label: 'select', detail: 'Dropdown', snippet: '<select>\n    <option>$0</option>\n</select>' },
    { label: 'textarea', detail: 'Text area', snippet: '<textarea>$0</textarea>' },
    { label: 'section', detail: 'Section', snippet: '<section>\n    $0\n</section>' },
    { label: 'nav', detail: 'Navigation', snippet: '<nav>\n    $0\n</nav>' },
    { label: 'main', detail: 'Main content', snippet: '<main>\n    $0\n</main>' },
];

const HTML_ATTRS: Record<string, { label: string; detail: string }[]> = {
    '*': [
        { label: 'class', detail: 'CSS class' },
        { label: 'id', detail: 'Unique ID' },
        { label: 'style', detail: 'Inline CSS' },
    ],
    'table': [{ label: 'border', detail: 'Table border' }, { label: 'cellpadding', detail: 'Cell padding' }, { label: 'cellspacing', detail: 'Cell spacing' }],
    'td': [{ label: 'colspan', detail: 'Column span' }, { label: 'rowspan', detail: 'Row span' }],
    'th': [{ label: 'colspan', detail: 'Column span' }, { label: 'rowspan', detail: 'Row span' }, { label: 'scope', detail: 'Scope' }],
    'a': [{ label: 'href', detail: 'URL' }, { label: 'target', detail: 'Link target' }],
    'img': [{ label: 'src', detail: 'Image URL' }, { label: 'alt', detail: 'Alt text' }, { label: 'width', detail: 'Width' }],
};

// ─── Component ──────────────────────────────────────────────
export const Phase1: React.FC<Phase1Props> = ({ onBack, onComplete }) => {
    const { user } = useAuth();
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [activeChallenge, setActiveChallenge] = useState<Question | null>(null);
    const [showChallengeList, setShowChallengeList] = useState(true);
    const [loadingAllQuestions, setLoadingAllQuestions] = useState(true);
    const [code, setCode] = useState(STARTER_CODE);
    const [showPreview, setShowPreview] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [existingSubmission, setExistingSubmission] = useState<PhaseSubmission | null>(null);
    const [loadingSubmission, setLoadingSubmission] = useState(true);
    const prevStatusRef = useRef<string | null>(null);
    const congratsShownRef = useRef(false);

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
    const [triggerWord, setTriggerWord] = useState('');
    const [dynamicQuestion, setDynamicQuestion] = useState<string>('');
    const [dynamicImage, setDynamicImage] = useState<string>('');
    const [showImageModal, setShowImageModal] = useState(false);

    const lineCount = code.split('\n').length;
    const PHASE1_QUESTION = dynamicQuestion || DEFAULT_PHASE1_QUESTION;

    // Fetch ALL dynamic questions from Firestore
    useEffect(() => {
        const fetchAllQuestions = async () => {
            try {
                const questions = await getDynamicQuestions('phase-1');
                setAllQuestions(questions);
                if (questions.length > 0) {
                    setDynamicQuestion(questions[0].question);
                    if (questions[0].image) setDynamicImage(questions[0].image);
                }
            } catch (e) {
                console.error('Failed to fetch phase-1 questions:', e);
            } finally {
                setLoadingAllQuestions(false);
            }
        };
        fetchAllQuestions();
    }, []);

    // Check for existing submission on load
    useEffect(() => {
        const checkExisting = async () => {
            if (user?.email) {
                const submission = await getUserPhaseSubmission(PHASE1_ID, user.email);
                if (submission) {
                    setExistingSubmission(submission);
                    setCode(submission.code);
                    if (submission.status === 'pending' || submission.status === 'approved') {
                        setSubmitted(true);
                    }
                    // Trigger celebration when first approved
                    if (submission.status === 'approved' && !congratsShownRef.current) {
                        congratsShownRef.current = true;
                        onComplete?.();
                    }
                    prevStatusRef.current = submission.status;
                }
            }
            setLoadingSubmission(false);
        };
        checkExisting();
    }, [user?.email]);

    // Auto-run preview whenever code changes
    useEffect(() => {
        if (showPreview && iframeRef.current) {
            const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
            if (doc) { doc.open(); doc.write(code); doc.close(); }
        }
    }, [code, showPreview]);

    const updateCode = (value: string) => {
        setCode(value);
    };

    const runCode = () => {
        setShowPreview(true);
        setTimeout(() => {
            if (iframeRef.current) {
                const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
                if (doc) { doc.open(); doc.write(code); doc.close(); }
            }
        }, 50);
    };

    const resetCode = () => {
        setCode(STARTER_CODE);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async () => {
        if (!user?.email || !user?.displayName) return;

        setIsSubmitting(true);
        try {
            await submitPhaseCode({
                phaseId: PHASE1_ID,
                phaseName: PHASE1_NAME,
                userEmail: user.email,
                userName: user.displayName,
                userPhoto: user.photoURL || undefined,
                code: code,
                question: PHASE1_QUESTION,
            });
            setSubmitted(true);
            setExistingSubmission({
                phaseId: PHASE1_ID,
                phaseName: PHASE1_NAME,
                userEmail: user.email,
                userName: user.displayName,
                code: code,
                question: PHASE1_QUESTION,
                status: 'pending',
                submittedAt: Date.now(),
            });
        } catch (error) {
            console.error('Submit failed:', error);
            alert('Submit failed! Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResubmit = () => {
        setSubmitted(false);
        setExistingSubmission(null);
    };

    // ─── Autocomplete Logic ─────────────────────────────────
    const getContext = (text: string, pos: number) => {
        let i = pos - 1;
        let word = '';
        while (i >= 0 && /[a-zA-Z0-9-]/.test(text[i])) { word = text[i] + word; i--; }
        const start = i + 1;
        const charBefore = i >= 0 ? text[i] : '';
        const hasAngleBracket = charBefore === '<' || (charBefore === '/' && i > 0 && text[i - 1] === '<');

        let isAttr = false;
        let tagName = '';
        if (!hasAngleBracket) {
            let j = i;
            while (j >= 0 && text[j] !== '<' && text[j] !== '>') j--;
            if (j >= 0 && text[j] === '<') {
                let k = j + 1;
                let tn = '';
                while (k < text.length && /[a-zA-Z]/.test(text[k])) { tn += text[k]; k++; }
                if (tn && k < start) {
                    isAttr = true;
                    tagName = tn.toLowerCase();
                }
            }
        }
        return { word: word.toLowerCase(), start, hasAngleBracket, isAttr, tagName };
    };

    const computeSuggestions = (codeStr: string, pos: number) => {
        const { word, hasAngleBracket, isAttr, tagName } = getContext(codeStr, pos);
        if (word.length === 0) { setShowSuggestions(false); return; }
        setTriggerWord(word);

        if (isAttr) {
            const globalAttrs = HTML_ATTRS['*'] || [];
            const tagAttrs = HTML_ATTRS[tagName] || [];
            const all = [...tagAttrs, ...globalAttrs];
            const matches = all.filter(a => a.label.startsWith(word) && a.label !== word)
                .map(a => ({ ...a, kind: 'attr' as const }));
            if (matches.length > 0) {
                setSuggestions(matches.slice(0, 10));
                setSelectedSuggestion(0);
                setShowSuggestions(true);
                updateSuggestionPos(pos);
                return;
            }
        }

        const matches = HTML_TAGS
            .filter(t => t.label.startsWith(word))
            .map(t => ({ ...t, kind: 'tag' as const }));
        if (matches.length > 0) {
            setSuggestions(matches.slice(0, 10));
            setSelectedSuggestion(0);
            setShowSuggestions(true);
            updateSuggestionPos(pos);
            return;
        }
        setShowSuggestions(false);
    };

    const updateSuggestionPos = (pos: number) => {
        if (!textareaRef.current) return;
        const ta = textareaRef.current;
        const textBefore = code.substring(0, pos);
        const lines = textBefore.split('\n');
        const lineIdx = lines.length - 1;
        const colIdx = lines[lineIdx].length;
        const top = (lineIdx + 1) * 20 + 8 - ta.scrollTop;
        const left = colIdx * 7.8 + 12 - ta.scrollLeft;
        setSuggestionPos({ top: Math.max(0, top), left: Math.max(0, Math.min(left, 400)) });
    };

    const applySuggestion = (sug: {label:string;detail:string;snippet?:string;kind?:string}) => {
        if (!textareaRef.current) return;
        const ta = textareaRef.current;
        const pos = ta.selectionStart;
        const { word, start, hasAngleBracket, isAttr } = getContext(code, pos);

        if (isAttr) {
            const before = code.substring(0, start);
            const after = code.substring(pos);
            const attrInsert = sug.label + '=""';
            const newCode = before + attrInsert + after;
            updateCode(newCode);
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = before.length + attrInsert.length - 1; ta.focus(); }, 0);
        } else if (sug.snippet) {
            const insert = sug.snippet.replace('$0', '');
            const removeFrom = hasAngleBracket ? start - 1 : start;
            const before = code.substring(0, removeFrom);
            const after = code.substring(pos);
            const newCode = before + insert + after;
            updateCode(newCode);
            const innerPos = insert.indexOf('><');
            const cursorPos = innerPos >= 0 ? before.length + innerPos + 1 : before.length + insert.length;
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = cursorPos; ta.focus(); }, 0);
        }
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showSuggestions && suggestions.length > 0) {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedSuggestion(prev => Math.min(prev + 1, suggestions.length - 1)); return; }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedSuggestion(prev => Math.max(prev - 1, 0)); return; }
            if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); applySuggestion(suggestions[selectedSuggestion]); return; }
            if (e.key === 'Escape') { e.preventDefault(); setShowSuggestions(false); return; }
        }
        if (e.key === 'Tab' && !showSuggestions) {
            e.preventDefault();
            const t = e.target as HTMLTextAreaElement;
            const s = t.selectionStart, en = t.selectionEnd;
            updateCode(code.substring(0, s) + '    ' + code.substring(en));
            setTimeout(() => { t.selectionStart = t.selectionEnd = s + 4; }, 0);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        updateCode(newVal);
        const pos = e.target.selectionStart;
        setTimeout(() => computeSuggestions(newVal, pos), 0);
    };

    const syncScroll = useCallback(() => {
        if (textareaRef.current) {
            const st = textareaRef.current.scrollTop;
            const sl = textareaRef.current.scrollLeft;
            if (highlightRef.current) { highlightRef.current.scrollTop = st; highlightRef.current.scrollLeft = sl; }
            if (lineNumRef.current) { lineNumRef.current.scrollTop = st; }
        }
    }, []);

    // ─── Challenge List View ────────────────────────────────
    if (activeChallenge) {
        return (
            <ChallengeEditor
                question={activeChallenge}
                phaseId={PHASE1_ID}
                phaseName={PHASE1_NAME}
                onBack={() => setActiveChallenge(null)}
                onSubmitSuccess={() => setActiveChallenge(null)}
            />
        );
    }

    // Always show challenge list as primary view
    if (showChallengeList && !loadingAllQuestions) {
        return (
            <ChallengeList
                phaseModuleId="phase-1"
                phaseId={PHASE1_ID}
                phaseName={PHASE1_NAME}
                phaseTitle="Phase 1 - HTML Table"
                onSolveChallenge={(q) => setActiveChallenge(q)}
                onBack={onBack}
                onSubmitTest={onComplete}
            />
        );
    }

    // Loading state
    if (loadingSubmission) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#1e1e1e]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#007acc] animate-spin mx-auto mb-4" />
                    <p className="text-[#ccc] text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    // ─── SUBMITTED STATE — Waiting for admin review ─────────
    if (submitted) {
        const status = existingSubmission?.status || 'pending';
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center p-6">
                <div className="max-w-lg w-full">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 border border-white/10 shadow-2xl text-center">
                        {status === 'pending' && (
                            <>
                                <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <HourglassIcon size={48} className="text-yellow-400 animate-pulse" />
                                </div>
                                <h1 className="text-3xl font-bold mb-3">Test Submitted! ✅</h1>
                                <p className="text-purple-200/70 text-lg mb-2">Aapka code admin ko bhej diya gaya hai.</p>
                                <p className="text-purple-200/50 text-sm mb-8">Admin review karne ke baad aapko result milega. Agar <strong className="text-green-400">Right ✅</strong> milta hai toh Phase 2 unlock ho jayega.</p>
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                                    <p className="text-yellow-300 text-sm font-medium">⏳ Status: Pending Review</p>
                                </div>
                            </>
                        )}
                        {status === 'approved' && (
                            <>
                                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={48} className="text-green-400" />
                                </div>
                                <h1 className="text-3xl font-bold mb-3 text-green-400">Approved! 🎉</h1>
                                <p className="text-purple-200/70 text-lg mb-2">Admin ne aapka code approve kar diya!</p>
                                <p className="text-purple-200/50 text-sm mb-8">Phase 2 ab unlock ho gaya hai. Dashboard pe jaake Phase 2 start karo!</p>
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                                    <p className="text-green-300 text-sm font-medium">✅ Status: Approved</p>
                                    {existingSubmission?.feedback && <p className="text-green-200/70 text-xs mt-1">Feedback: {existingSubmission.feedback}</p>}
                                </div>
                            </>
                        )}
                        {status === 'rejected' && (
                            <>
                                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <XCircle size={48} className="text-red-400" />
                                </div>
                                <h1 className="text-3xl font-bold mb-3 text-red-400">Wrong ❌</h1>
                                <p className="text-purple-200/70 text-lg mb-2">Admin ne aapka code reject kar diya.</p>
                                <p className="text-purple-200/50 text-sm mb-8">Dobara try karo! Code edit karke phir se submit karo.</p>
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                                    <p className="text-red-300 text-sm font-medium">❌ Status: Rejected</p>
                                    {existingSubmission?.feedback && <p className="text-red-200/70 text-xs mt-1">Feedback: {existingSubmission.feedback}</p>}
                                </div>
                                <button
                                    onClick={handleResubmit}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98] mb-3"
                                >
                                    ✏️ Edit & Resubmit
                                </button>
                            </>
                        )}
                        <button
                            onClick={onBack}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                        >
                            🏠 Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── VS CODE EDITOR VIEW ────────────────────────────────
    return (
        <div className="flex flex-col h-screen bg-[#1e1e1e] text-white overflow-hidden">
            {/* Syntax highlight styles */}
            <style>{`
                .hl-tag { color: #569CD6; }
                .hl-attr { color: #9CDCFE; }
                .hl-string { color: #CE9178; }
                .hl-comment { color: #6A9955; font-style: italic; }
                .hl-bracket { color: #808080; }
            `}</style>

            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between bg-[#181818] px-3 py-1.5 border-b border-[#333] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[#858585] hover:text-white transition-all text-xs">
                        <ArrowLeft size={14} /> Back
                    </button>
                    <div className="w-px h-4 bg-[#333]" />
                    <span className="text-[#cccccc] font-medium text-xs">Phase 1 — HTML Table</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <button onClick={copyCode} className="flex items-center gap-1 px-2.5 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] rounded text-[11px] text-[#ccc] transition-colors">
                        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] rounded text-[11px] text-[#ccc] transition-colors">
                        <Settings size={12} />
                    </button>
                    <button onClick={resetCode} className="flex items-center gap-1 px-2.5 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] rounded text-[11px] text-[#ccc] transition-colors">
                        <RotateCcw size={12} /> Reset
                    </button>
                    <button onClick={runCode} className="flex items-center gap-1 px-3 py-1 bg-[#388a34] hover:bg-[#45a340] rounded text-[11px] text-white font-bold transition-colors">
                        <Play size={12} fill="white" /> Run Code
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-1 px-4 py-1 bg-[#007acc] hover:bg-[#0098ff] rounded text-[11px] text-white font-bold transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>

            {/* ── Question Bar ── */}
            <div className="bg-gradient-to-r from-[#1a3a5c] to-[#1a2a4c] px-4 py-3 border-b border-[#333] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#007acc]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-[#007acc]" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[13px] text-white font-bold">📝 Question: {PHASE1_QUESTION}</p>
                    </div>
                    {dynamicImage && (
                        <button
                            onClick={() => setShowImageModal(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#007acc]/30 hover:bg-[#007acc]/50 border border-[#007acc]/40 rounded-lg text-[11px] text-[#4fc3f7] font-medium transition-all flex-shrink-0 hover:scale-105 active:scale-95"
                        >
                            🖼️ Show Image
                        </button>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {showImageModal && dynamicImage && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
                    <div className="relative max-w-4xl max-h-[85vh] bg-[#252526] rounded-2xl border border-[#555] shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e1e1e] border-b border-[#333]">
                            <span className="text-[12px] text-[#ccc] font-medium">🖼️ Reference Image — Aise banana hai</span>
                            <button onClick={() => setShowImageModal(false)} className="text-[#858585] hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 flex items-center justify-center overflow-auto bg-[#1e1e1e]">
                            <img src={dynamicImage} alt="Reference" className="max-w-full max-h-[70vh] rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            )}

            {/* ── File Tab ── */}
            <div className="flex items-center bg-[#252526] border-b border-[#1e1e1e] flex-shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e1e] border-r border-[#333] border-t-2 border-t-[#007acc]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#e44d26"/><path d="M2 17l10 5 10-5" stroke="#e44d26" strokeWidth="2"/><path d="M2 12l10 5 10-5" stroke="#e44d26" strokeWidth="2"/></svg>
                    <span className="text-[12px] text-white font-normal">index.html</span>
                    <X size={14} className="text-[#858585] hover:text-white ml-1 cursor-pointer" />
                </div>
            </div>

            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-1 px-4 py-1 bg-[#1e1e1e] border-b border-[#333] text-[11px] text-[#858585] flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#e44d26"/></svg>
                <span>index.html</span>
                <ChevronRight size={10} />
                <span className="text-[#cccccc]">html</span>
                <ChevronRight size={10} />
                <span className="text-[#cccccc]">body</span>
            </div>

            {/* ── Editor + Preview ── */}
            <div className="flex-1 flex overflow-hidden">
                {/* Code Editor */}
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
                            <pre
                                ref={highlightRef}
                                className="absolute inset-0 m-0 pt-2 pl-3 pr-3 overflow-auto pointer-events-none whitespace-pre-wrap break-words"
                                style={{ fontFamily: "'Consolas','Courier New',monospace", fontSize: '13px', lineHeight: '20px', color: '#d4d4d4', background: 'transparent' }}
                                aria-hidden="true"
                                dangerouslySetInnerHTML={{ __html: highlightHTML(code) + '\n' }}
                            />
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                onScroll={syncScroll}
                                className="w-full h-full bg-[#1e1e1e] pt-2 pl-3 pr-3 resize-none outline-none overflow-auto"
                                spellCheck={false}
                                style={{
                                    fontFamily: "'Consolas','Courier New',monospace",
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    color: 'transparent',
                                    caretColor: '#aeafad',
                                    WebkitTextFillColor: 'transparent',
                                    tabSize: 4,
                                }}
                            />
                            {/* Autocomplete Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div
                                    ref={autocompleteRef}
                                    className="absolute z-50 bg-[#252526] border border-[#454545] rounded-md shadow-2xl overflow-hidden"
                                    style={{ top: suggestionPos.top, left: suggestionPos.left, minWidth: '280px', maxWidth: '420px' }}
                                >
                                    <div className="max-h-[240px] overflow-y-auto">
                                        {suggestions.map((s: any, i: number) => (
                                            <div
                                                key={s.label + i}
                                                onClick={() => applySuggestion(s)}
                                                className={`flex items-center gap-2 px-2.5 py-[5px] cursor-pointer text-[12px] border-l-2 ${
                                                    i === selectedSuggestion
                                                        ? 'bg-[#04395e] text-white border-l-[#007acc]'
                                                        : 'text-[#ccc] hover:bg-[#2a2d2e] border-l-transparent'
                                                }`}
                                            >
                                                <span className={`w-[18px] h-[18px] flex items-center justify-center rounded-sm text-[9px] font-bold flex-shrink-0 ${
                                                    s.kind === 'attr' ? 'bg-[#b180d7] text-white' : 'bg-[#e44d26] text-white'
                                                }`}>
                                                    {s.kind === 'attr' ? 'A' : '</>'}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold text-[#569CD6]">{s.label}</span>
                                                        <span className="text-[#858585] text-[10px] truncate">{s.detail}</span>
                                                    </div>
                                                    {s.snippet && (
                                                        <div className="text-[10px] text-[#6A9955] font-mono truncate mt-[-1px]">
                                                            {s.snippet.replace('$0', '|').replace(/\n/g, ' ')}
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

                {/* Live Preview */}
                {showPreview && (
                    <div className="w-1/2 flex flex-col">
                        <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] border-b border-[#333]">
                            <Eye size={13} className="text-green-400" />
                            <span className="text-[11px] font-medium text-[#ccc]">Live Output</span>
                        </div>
                        <div className="flex-1 bg-white">
                            <iframe ref={iframeRef} title="preview" className="w-full h-full border-0" sandbox="allow-same-origin allow-scripts" />
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
                    <span>HTML</span>
                </div>
            </div>
        </div>
    );
};
