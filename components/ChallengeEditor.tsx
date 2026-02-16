import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Eye, RotateCcw, Copy, Check, BookOpen, X, ChevronRight, Send, Loader2, CheckCircle, XCircle, HourglassIcon, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { submitPhaseCode, getUserPhaseSubmission, PhaseSubmission } from '../services/phaseSubmissionService';
import { Question } from '../types';

interface ChallengeEditorProps {
    question: Question;
    phaseId: string;      // e.g., 'module-5', 'module-6', etc.
    phaseName: string;    // e.g., 'Phase 1', 'Phase 3', etc.
    onBack: () => void;
    onSubmitSuccess?: () => void; // Called after successful submit to return to list
}

const STARTER_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solution</title>
    <style>
        /* Write your CSS here */
    </style>
</head>
<body>
    <!-- Write your HTML here -->

    <script>
        // Write your JavaScript here
    </script>
</body>
</html>`;

// Syntax highlighting for HTML/CSS/JS combined
const highlightCode = (code: string): string => {
    let h = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const O = (cls: string) => `\x00${cls}\x01`;
    const C = '\x02';

    // Comments
    h = h.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `${O('comment')}$1${C}`);
    h = h.replace(/(\/\*[\s\S]*?\*\/)/g, `${O('comment')}$1${C}`);
    h = h.replace(/(\/\/[^\n]*)/g, `${O('comment')}$1${C}`);

    // CSS inside <style>...</style>
    h = h.replace(/(&lt;style(?:\s[^&]*?)?&gt;)([\s\S]*?)(&lt;\/style&gt;)/gi, (_match, openTag, cssContent, closeTag) => {
        let css = cssContent;
        // CSS selectors (before {)
        css = css.replace(/([.#]?[a-zA-Z_][\w-]*(?:\s*[,>+~]\s*[.#]?[a-zA-Z_][\w-]*)*(?:\s*[.#][\w-]+)*(?:\s*::?[\w-]+)*)(\s*\{)/g,
            `${O('csssel')}$1${C}$2`);
        // CSS property names (word-word: pattern)
        css = css.replace(/(\s+)([\w-]+)(\s*:)(?!=)/g, `$1${O('cssprop')}$2${C}$3`);
        // CSS values - colors with #
        css = css.replace(/(#[0-9a-fA-F]{3,8})\b/g, `${O('cssval')}$1${C}`);
        // CSS values - numbers with units
        css = css.replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|vh|vw|vmin|vmax|%|s|ms|deg|fr|ch|ex))\b/g, `${O('num')}$1${C}`);
        // CSS values - plain numbers
        css = css.replace(/(?<=:\s*[^;]*)\b(\d+(?:\.\d+)?)\b/g, `${O('num')}$1${C}`);
        // CSS important
        css = css.replace(/(!important)/g, `${O('keyword')}$1${C}`);
        // CSS strings
        css = css.replace(/("[^"]*")/g, `${O('string')}$1${C}`);
        css = css.replace(/('[^']*')/g, `${O('string')}$1${C}`);
        return openTag + css + closeTag;
    });

    // DOCTYPE
    h = h.replace(/(&lt;!DOCTYPE\s+\w+&gt;)/gi, `${O('tag')}$1${C}`);
    // Tag names
    h = h.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)/g, `$1${O('tag')}$2${C}`);
    // Strings (HTML attributes)
    h = h.replace(/(="[^"]*")/g, `${O('string')}$1${C}`);
    h = h.replace(/('[^']*')/g, `${O('string')}$1${C}`);
    // Attribute names
    h = h.replace(/\s([a-zA-Z-]+)(?=\x00string\x01)/g, ` ${O('attr')}$1${C}`);
    // Brackets
    h = h.replace(/(&lt;\/?|\/?\s*&gt;)/g, `${O('bracket')}$1${C}`);
    // JS keywords
    h = h.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|this|true|false|null|undefined|console|document|window)\b/g, `${O('keyword')}$1${C}`);

    h = h.replace(/\x00(\w+)\x01/g, '<span class="hl-$1">');
    h = h.replace(/\x02/g, '</span>');
    return h;
};

// ─── Emmet-like Tag Expansion ───────────────────────────────
const SELF_CLOSING_TAGS = new Set([
    'img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col',
    'embed', 'source', 'track', 'wbr'
]);

const KNOWN_TAGS = [
    // Basic Structure
    'html', 'head', 'title', 'meta', 'link', 'style', 'script', 'body',
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // Text Formatting
    'p', 'b', 'strong', 'i', 'em', 'u', 'mark', 'small', 'del', 'ins', 'sub', 'sup', 'br', 'hr',
    // Links & Media
    'a', 'img', 'audio', 'video', 'source', 'track', 'iframe',
    // Lists
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    // Tables
    'table', 'tr', 'th', 'td', 'thead', 'tbody', 'tfoot', 'caption',
    // Forms
    'form', 'input', 'textarea', 'select', 'option', 'button', 'label', 'fieldset', 'legend', 'datalist', 'output',
    // Semantic HTML5
    'header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'figure', 'figcaption', 'details', 'summary', 'time',
    // Layout / Container
    'div', 'span',
    // Other Useful
    'canvas', 'svg', 'progress', 'meter', 'map', 'area', 'embed', 'object', 'param', 'picture', 'noscript',
    // Deprecated/rare but sometimes useful
    'colgroup', 'col', 'base', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'dialog', 'kbd', 'main', 'output', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'template', 'var', 'wbr'
];

const KNOWN_TAGS_SET = new Set(KNOWN_TAGS);

const expandEmmetAbbr = (input: string): { expanded: string; cursorOffset: number } | null => {
    if (!input) return null;
    const parts = input.split(/([.#])/);
    let tag = '', classes: string[] = [], id = '', mode = 'tag';
    for (const part of parts) {
        if (part === '.') { mode = 'class'; continue; }
        if (part === '#') { mode = 'id'; continue; }
        if (!part) continue;
        if (mode === 'tag') tag = part;
        else if (mode === 'class') classes.push(part);
        else if (mode === 'id') id = part;
    }
    if (!tag && (classes.length > 0 || id)) tag = 'div';
    if (!tag) return null;
    tag = tag.toLowerCase();
    if (!KNOWN_TAGS_SET.has(tag)) return null;
    let attrs = '';
    if (id) attrs += ` id="${id}"`;
    if (classes.length > 0) attrs += ` class="${classes.join(' ')}"`;
    if (SELF_CLOSING_TAGS.has(tag)) {
        const expanded = `<${tag}${attrs} />`;
        return { expanded, cursorOffset: expanded.length };
    }
    const opening = `<${tag}${attrs}>`;
    const closing = `</${tag}>`;
    return { expanded: `${opening}${closing}`, cursorOffset: opening.length };
};

const isInsideScript = (text: string): boolean => {
    const lastScript = text.lastIndexOf('<script');
    const lastScriptClose = text.lastIndexOf('</script');
    return lastScript > lastScriptClose;
};

const isInsideStyle = (text: string): boolean => {
    const lastStyle = text.lastIndexOf('<style');
    const lastStyleClose = text.lastIndexOf('</style');
    return lastStyle > lastStyleClose;
};

// ─── HTML Attribute Autocomplete Data ───────────────────────
const HTML_ATTRS: Record<string, { label: string; detail: string }[]> = {
    '*': [
        { label: 'id', detail: 'Element ID' },
        { label: 'class', detail: 'CSS class' },
        { label: 'style', detail: 'Inline CSS' },
        { label: 'title', detail: 'Tooltip text' },
        { label: 'hidden', detail: 'Hide element' },
        { label: 'tabindex', detail: 'Tab order' },
        { label: 'contenteditable', detail: 'Editable content' },
        { label: 'draggable', detail: 'Draggable' },
        { label: 'spellcheck', detail: 'Spell check' },
        { label: 'data-*', detail: 'Custom data attribute' },
    ],
    'a': [
        { label: 'href', detail: 'Link URL' },
        { label: 'target', detail: 'Link target' },
        { label: 'rel', detail: 'Relationship' },
    ],
    'img': [
        { label: 'src', detail: 'Image source' },
        { label: 'alt', detail: 'Alt text' },
        { label: 'width', detail: 'Width' },
        { label: 'height', detail: 'Height' },
    ],
    'input': [
        { label: 'type', detail: 'Input type' },
        { label: 'name', detail: 'Name' },
        { label: 'value', detail: 'Value' },
        { label: 'placeholder', detail: 'Placeholder' },
        { label: 'checked', detail: 'Checked' },
        { label: 'disabled', detail: 'Disabled' },
        { label: 'readonly', detail: 'Read only' },
        { label: 'required', detail: 'Required' },
        { label: 'min', detail: 'Min value' },
        { label: 'max', detail: 'Max value' },
        { label: 'step', detail: 'Step value' },
        { label: 'pattern', detail: 'Pattern' },
        { label: 'autocomplete', detail: 'Autocomplete' },
    ],
    'button': [
        { label: 'type', detail: 'Button type' },
        { label: 'disabled', detail: 'Disabled' },
    ],
    'form': [
        { label: 'action', detail: 'Form action' },
        { label: 'method', detail: 'HTTP method' },
        { label: 'enctype', detail: 'Encoding type' },
        { label: 'autocomplete', detail: 'Autocomplete' },
    ],
    'label': [
        { label: 'for', detail: 'For input id' },
    ],
    'table': [
        { label: 'border', detail: 'Table border' },
        { label: 'cellpadding', detail: 'Cell padding' },
        { label: 'cellspacing', detail: 'Cell spacing' },
    ],
    'td': [
        { label: 'colspan', detail: 'Column span' },
        { label: 'rowspan', detail: 'Row span' },
    ],
    'th': [
        { label: 'colspan', detail: 'Column span' },
        { label: 'rowspan', detail: 'Row span' },
        { label: 'scope', detail: 'Scope' },
    ],
    'audio': [
        { label: 'src', detail: 'Audio source' },
        { label: 'controls', detail: 'Show controls' },
        { label: 'autoplay', detail: 'Autoplay' },
        { label: 'loop', detail: 'Loop' },
        { label: 'muted', detail: 'Muted' },
    ],
    'video': [
        { label: 'src', detail: 'Video source' },
        { label: 'controls', detail: 'Show controls' },
        { label: 'autoplay', detail: 'Autoplay' },
        { label: 'loop', detail: 'Loop' },
        { label: 'muted', detail: 'Muted' },
        { label: 'poster', detail: 'Poster image' },
        { label: 'width', detail: 'Width' },
        { label: 'height', detail: 'Height' },
    ],
    'source': [
        { label: 'src', detail: 'Source file' },
        { label: 'type', detail: 'MIME type' },
    ],
    'track': [
        { label: 'src', detail: 'Track file' },
        { label: 'kind', detail: 'Kind' },
        { label: 'srclang', detail: 'Language' },
        { label: 'label', detail: 'Label' },
        { label: 'default', detail: 'Default' },
    ],
    'iframe': [
        { label: 'src', detail: 'Source URL' },
        { label: 'width', detail: 'Width' },
        { label: 'height', detail: 'Height' },
        { label: 'frameborder', detail: 'Frame border' },
        { label: 'allow', detail: 'Allow features' },
        { label: 'allowfullscreen', detail: 'Allow fullscreen' },
    ],
    'link': [
        { label: 'rel', detail: 'Relationship' },
        { label: 'href', detail: 'URL' },
        { label: 'type', detail: 'MIME type' },
    ],
    'meta': [
        { label: 'name', detail: 'Meta name' },
        { label: 'content', detail: 'Meta content' },
        { label: 'charset', detail: 'Charset' },
        { label: 'http-equiv', detail: 'HTTP header' },
    ],
    'script': [
        { label: 'src', detail: 'Script source' },
        { label: 'type', detail: 'MIME type' },
        { label: 'async', detail: 'Async' },
        { label: 'defer', detail: 'Defer' },
    ],
};
const CSS_PROPERTIES = [
    'align-content', 'align-items', 'align-self', 'animation', 'animation-delay',
    'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-name',
    'animation-timing-function',
    'background', 'background-color', 'background-image', 'background-position',
    'background-repeat', 'background-size', 'border', 'border-bottom', 'border-color',
    'border-left', 'border-radius', 'border-right', 'border-style', 'border-top',
    'border-width', 'bottom', 'box-shadow', 'box-sizing',
    'clear', 'clip-path', 'color', 'column-count', 'column-gap', 'content', 'cursor',
    'display',
    'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-grow', 'flex-shrink',
    'flex-wrap', 'float', 'font', 'font-family', 'font-size', 'font-style',
    'font-weight',
    'gap', 'grid', 'grid-area', 'grid-column', 'grid-gap', 'grid-row',
    'grid-template-areas', 'grid-template-columns', 'grid-template-rows',
    'height',
    'justify-content', 'justify-items', 'justify-self',
    'left', 'letter-spacing', 'line-height', 'list-style', 'list-style-type',
    'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top',
    'max-height', 'max-width', 'min-height', 'min-width',
    'object-fit', 'opacity', 'order', 'outline', 'overflow', 'overflow-x', 'overflow-y',
    'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top',
    'place-content', 'place-items', 'place-self', 'pointer-events', 'position',
    'resize', 'right',
    'scroll-behavior',
    'text-align', 'text-decoration', 'text-indent', 'text-overflow', 'text-shadow',
    'text-transform', 'top', 'transform', 'transform-origin', 'transition',
    'transition-delay', 'transition-duration', 'transition-property',
    'transition-timing-function',
    'user-select',
    'vertical-align', 'visibility',
    'white-space', 'width', 'word-break', 'word-spacing', 'word-wrap',
    'z-index'
];

const CSS_VALUES: Record<string, string[]> = {
    'display': ['none', 'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'table', 'contents'],
    'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
    'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
    'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    'align-items': ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    'align-content': ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    'align-self': ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    'text-align': ['left', 'right', 'center', 'justify', 'start', 'end'],
    'text-decoration': ['none', 'underline', 'overline', 'line-through'],
    'text-transform': ['none', 'capitalize', 'uppercase', 'lowercase'],
    'font-style': ['normal', 'italic', 'oblique'],
    'font-weight': ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    'overflow': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
    'overflow-x': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
    'overflow-y': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
    'visibility': ['visible', 'hidden', 'collapse'],
    'cursor': ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'not-allowed', 'crosshair', 'grab', 'grabbing'],
    'float': ['none', 'left', 'right'],
    'clear': ['none', 'left', 'right', 'both'],
    'box-sizing': ['content-box', 'border-box'],
    'border-style': ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'],
    'list-style-type': ['none', 'disc', 'circle', 'square', 'decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'],
    'background-repeat': ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round'],
    'background-size': ['auto', 'cover', 'contain'],
    'background-position': ['top', 'bottom', 'left', 'right', 'center'],
    'object-fit': ['fill', 'contain', 'cover', 'none', 'scale-down'],
    'white-space': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'],
    'word-break': ['normal', 'break-all', 'keep-all', 'break-word'],
    'resize': ['none', 'both', 'horizontal', 'vertical'],
    'user-select': ['auto', 'none', 'text', 'all'],
    'pointer-events': ['auto', 'none'],
    'scroll-behavior': ['auto', 'smooth'],
    'animation-direction': ['normal', 'reverse', 'alternate', 'alternate-reverse'],
    'animation-fill-mode': ['none', 'forwards', 'backwards', 'both'],
    'animation-timing-function': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
    'transition-timing-function': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
};

const CSS_COMMON_VALUES = ['inherit', 'initial', 'unset', 'auto', 'none'];

const CSS_COLOR_NAMES = [
    'red', 'blue', 'green', 'black', 'white', 'gray', 'grey', 'yellow', 'orange',
    'purple', 'pink', 'brown', 'cyan', 'magenta', 'lime', 'navy', 'teal',
    'maroon', 'olive', 'aqua', 'silver', 'gold', 'coral', 'crimson',
    'darkblue', 'darkgreen', 'darkred', 'darkorange', 'lightblue', 'lightgreen',
    'lightgray', 'lightyellow', 'transparent'
];

type SuggestionType = 'html' | 'css-property' | 'css-value' | 'css-selector';

const getCssContext = (textBefore: string): { context: 'selector' | 'property' | 'value'; propertyName?: string; word: string } | null => {
    const styleStart = textBefore.lastIndexOf('<style');
    if (styleStart === -1) return null;
    const styleTagEnd = textBefore.indexOf('>', styleStart);
    if (styleTagEnd === -1) return null;
    const cssText = textBefore.substring(styleTagEnd + 1);
    const lastOpenBrace = cssText.lastIndexOf('{');
    const lastCloseBrace = cssText.lastIndexOf('}');
    if (lastOpenBrace <= lastCloseBrace) {
        const afterBrace = cssText.substring(lastCloseBrace + 1);
        const wordMatch = afterBrace.match(/([a-zA-Z0-9_.#*:>+~\[\]=" -]*)$/);
        return { context: 'selector', word: wordMatch?.[1]?.trim() || '' };
    }
    const insideBlock = cssText.substring(lastOpenBrace + 1);
    const lastColon = insideBlock.lastIndexOf(':');
    const lastSemicolon = insideBlock.lastIndexOf(';');
    if (lastColon > lastSemicolon) {
        const propLine = insideBlock.substring(lastSemicolon + 1, lastColon).trim();
        const valueText = insideBlock.substring(lastColon + 1);
        const wordMatch = valueText.match(/([a-zA-Z0-9#_-]*)$/);
        return { context: 'value', propertyName: propLine, word: wordMatch?.[1] || '' };
    }
    const afterSemiOrBrace = insideBlock.substring(Math.max(lastSemicolon, 0));
    const wordMatch = afterSemiOrBrace.match(/([a-zA-Z-]*)$/);
    return { context: 'property', word: wordMatch?.[1] || '' };
};

export const ChallengeEditor: React.FC<ChallengeEditorProps> = ({ question, phaseId, phaseName, onBack, onSubmitSuccess }) => {
    const { user } = useAuth();
    const [code, setCode] = useState(STARTER_CODE);
    const [showPreview, setShowPreview] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [existingSubmission, setExistingSubmission] = useState<PhaseSubmission | null>(null);
    const [loadingSubmission, setLoadingSubmission] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [currentAbbr, setCurrentAbbr] = useState('');
    const [suggestionType, setSuggestionType] = useState<SuggestionType>('html');

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLPreElement>(null);
    const lineNumRef = useRef<HTMLDivElement>(null);

    const lineCount = code.split('\n').length;

    // Unique submission ID per question
    const submissionPhaseId = `${phaseId}_q_${question.id}`;

    // Check for existing submission
    useEffect(() => {
        const checkExisting = async () => {
            if (user?.email) {
                const submission = await getUserPhaseSubmission(submissionPhaseId, user.email);
                if (submission) {
                    setExistingSubmission(submission);
                    setCode(submission.code);
                    if (submission.status === 'pending' || submission.status === 'approved') {
                        setSubmitted(true);
                    }
                }
            }
            setLoadingSubmission(false);
        };
        checkExisting();
    }, [user?.email, submissionPhaseId]);

    // Auto-run preview

    useEffect(() => {
        if (showPreview && iframeRef.current) {
            const iframe = iframeRef.current;
            const doc = iframe.contentDocument || iframe.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(code);
                doc.close();
                // JS fix: re-inject <script> blocks for live execution
                const scripts = Array.from(doc.querySelectorAll('script'));
                scripts.forEach((s) => {
                    const oldScript = s as HTMLScriptElement;
                    if (oldScript.type && oldScript.type !== 'text/javascript') return;
                    const newScript = doc.createElement('script');
                    if (oldScript.src) newScript.src = oldScript.src;
                    newScript.textContent = oldScript.textContent;
                    oldScript.parentNode?.replaceChild(newScript, oldScript);
                });
            }
        }
    }, [code, showPreview]);

    const runCode = () => {
        setShowPreview(true);
        setTimeout(() => {
            if (iframeRef.current) {
                const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
                if (doc) { doc.open(); doc.write(code); doc.close(); }
            }
        }, 50);
    };

    const resetCode = () => setCode(STARTER_CODE);

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
                phaseId: submissionPhaseId,
                phaseName: `${phaseName} - ${question.question}`,
                userEmail: user.email,
                userName: user.displayName,
                userPhoto: user.photoURL || undefined,
                code: code,
                question: question.question,
            });
            setSubmitted(true);
            setExistingSubmission({
                phaseId: submissionPhaseId,
                phaseName: `${phaseName} - ${question.question}`,
                userEmail: user.email,
                userName: user.displayName,
                code: code,
                question: question.question,
                status: 'pending',
                submittedAt: Date.now(),
            });
            // Auto-return to challenge list after successful submit
            if (onSubmitSuccess) {
                setTimeout(() => {
                    onSubmitSuccess();
                }, 1500);
            }
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

    const detectSuggestions = (text: string, pos: number) => {
        const textBefore = text.substring(0, pos);

        // Inside <style> → CSS suggestions
        if (isInsideStyle(textBefore)) {
            const cssCtx = getCssContext(textBefore);
            if (!cssCtx || cssCtx.word.length < 1) {
                setSuggestions([]); setCurrentAbbr(''); return;
            }
            if (cssCtx.context === 'property') {
                const matches = CSS_PROPERTIES.filter(p => p.startsWith(cssCtx.word.toLowerCase()));
                if (matches.length > 0) {
                    setSuggestions(matches.slice(0, 10));
                    setSuggestionIndex(0);
                    setCurrentAbbr(cssCtx.word);
                    setSuggestionType('css-property');
                    return;
                }
            } else if (cssCtx.context === 'value') {
                const prop = cssCtx.propertyName || '';
                let possibleValues = CSS_VALUES[prop] || [];
                if (prop.includes('color') || prop === 'background' || prop === 'border-color' || prop === 'outline') {
                    possibleValues = [...possibleValues, ...CSS_COLOR_NAMES];
                }
                possibleValues = [...possibleValues, ...CSS_COMMON_VALUES];
                const unique = [...new Set(possibleValues)];
                const matches = unique.filter(v => v.startsWith(cssCtx.word.toLowerCase()));
                if (matches.length > 0) {
                    setSuggestions(matches.slice(0, 10));
                    setSuggestionIndex(0);
                    setCurrentAbbr(cssCtx.word);
                    setSuggestionType('css-value');
                    return;
                }
            } else if (cssCtx.context === 'selector') {
                const w = cssCtx.word.toLowerCase();
                if (w.length >= 1) {
                    const tagMatches = KNOWN_TAGS.filter(t => t.startsWith(w));
                    if (tagMatches.length > 0) {
                        setSuggestions(tagMatches.slice(0, 8));
                        setSuggestionIndex(0);
                        setCurrentAbbr(cssCtx.word);
                        setSuggestionType('css-selector');
                        return;
                    }
                }
            }
            setSuggestions([]); setCurrentAbbr(''); return;
        }

        // Inside <script> → no suggestions
        if (isInsideScript(textBefore)) {
            setSuggestions([]); setCurrentAbbr(''); return;
        }

        // HTML attribute context
        // Find if inside a tag and after a space (for attribute)
        const tagOpen = textBefore.lastIndexOf('<');
        const tagClose = textBefore.lastIndexOf('>');
        if (tagOpen > tagClose) {
            // Inside a tag
            const tagMatch = textBefore.substring(tagOpen + 1).match(/^([a-zA-Z][a-zA-Z0-9-]*)/);
            if (tagMatch) {
                const tagName = tagMatch[1].toLowerCase();
                // Find the current word being typed
                const attrMatch = textBefore.substring(tagOpen + 1).match(/\s([a-zA-Z0-9-]*)$/);
                const word = attrMatch ? attrMatch[1] : '';
                if (word.length > 0) {
                    const globalAttrs = HTML_ATTRS['*'] || [];
                    const tagAttrs = HTML_ATTRS[tagName] || [];
                    const all = [...tagAttrs, ...globalAttrs];
                    const matches = all.filter(a => a.label.startsWith(word) && a.label !== word).map(a => a.label);
                    if (matches.length > 0) {
                        setSuggestions(matches.slice(0, 10));
                        setSuggestionIndex(0);
                        setCurrentAbbr(word);
                        setSuggestionType('html');
                        return;
                    }
                }
            }
        }

        // HTML tag context
        const wordMatch = textBefore.match(/(?:^|[\s\n>])([a-zA-Z][a-zA-Z0-9]*(?:[.#][a-zA-Z_-][\w-]*)*)$/);
        if (wordMatch) {
            const word = wordMatch[1];
            const charBefore = textBefore[textBefore.length - word.length - 1] || '';
            if (charBefore === '<' || charBefore === '/') {
                setSuggestions([]); setCurrentAbbr(''); return;
            }
            if (word.endsWith('.') || word.endsWith('#')) {
                setSuggestions([]); setCurrentAbbr(''); return;
            }
            const dotIdx = word.indexOf('.');
            const hashIdx = word.indexOf('#');
            let tagEnd = word.length;
            if (dotIdx !== -1) tagEnd = Math.min(tagEnd, dotIdx);
            if (hashIdx !== -1) tagEnd = Math.min(tagEnd, hashIdx);
            const tagPart = word.substring(0, tagEnd).toLowerCase();
            if (tagPart.length >= 1) {
                const matches = KNOWN_TAGS.filter(t => t.startsWith(tagPart));
                if (matches.length > 0) {
                    setSuggestions(matches.slice(0, 8));
                    setSuggestionIndex(0);
                    setCurrentAbbr(word);
                    setSuggestionType('html');
                    return;
                }
            }
        }
        setSuggestions([]); setCurrentAbbr('');
    };

    const acceptSuggestion = (item: string) => {
        const t = textareaRef.current;
        if (!t || !currentAbbr) return;
        const s = t.selectionStart;
        const wordStart = s - currentAbbr.length;

        if (suggestionType === 'css-property') {
            const insertion = `${item}: ;`;
            const newCode = code.substring(0, wordStart) + insertion + code.substring(s);
            setCode(newCode);
            setSuggestions([]); setCurrentAbbr('');
            const cursorPos = wordStart + item.length + 2; // after ": "
            setTimeout(() => { t.focus(); t.selectionStart = t.selectionEnd = cursorPos; }, 0);
        } else if (suggestionType === 'css-value') {
            const textAfter = code.substring(s);
            const hasSemicolon = /^\s*;/.test(textAfter);
            const insertion = hasSemicolon ? item : `${item};`;
            const newCode = code.substring(0, wordStart) + insertion + code.substring(s);
            setCode(newCode);
            setSuggestions([]); setCurrentAbbr('');
            const cursorPos = wordStart + insertion.length;
            setTimeout(() => { t.focus(); t.selectionStart = t.selectionEnd = cursorPos; }, 0);
        } else if (suggestionType === 'css-selector') {
            const newCode = code.substring(0, wordStart) + item + code.substring(s);
            setCode(newCode);
            setSuggestions([]); setCurrentAbbr('');
            const cursorPos = wordStart + item.length;
            setTimeout(() => { t.focus(); t.selectionStart = t.selectionEnd = cursorPos; }, 0);
        } else {
            // HTML Emmet
            const dotIdx = currentAbbr.indexOf('.');
            const hashIdx = currentAbbr.indexOf('#');
            let suffix = '';
            if (dotIdx !== -1) suffix = currentAbbr.substring(dotIdx);
            else if (hashIdx !== -1) suffix = currentAbbr.substring(hashIdx);
            const fullAbbr = item + suffix;
            const result = expandEmmetAbbr(fullAbbr);
            if (result) {
                const newCode = code.substring(0, wordStart) + result.expanded + code.substring(s);
                setCode(newCode);
                setSuggestions([]); setCurrentAbbr('');
                const cursorPos = wordStart + result.cursorOffset;
                setTimeout(() => { t.focus(); t.selectionStart = t.selectionEnd = cursorPos; }, 0);
            }
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setCode(newCode);
        const pos = e.target.selectionStart;
        detectSuggestions(newCode, pos);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const t = e.target as HTMLTextAreaElement;
        const s = t.selectionStart;
        const en = t.selectionEnd;

        // Arrow Up/Down: navigate suggestions
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && suggestions.length > 0) {
            e.preventDefault();
            setSuggestionIndex(prev =>
                e.key === 'ArrowDown'
                    ? Math.min(prev + 1, suggestions.length - 1)
                    : Math.max(prev - 1, 0)
            );
            return;
        }

        // Escape: dismiss suggestions
        if (e.key === 'Escape' && suggestions.length > 0) {
            e.preventDefault();
            setSuggestions([]); setCurrentAbbr('');
            return;
        }

        // Tab: Emmet expand or indent
        if (e.key === 'Tab' && !e.shiftKey && suggestions.length > 0 && currentAbbr) {
            e.preventDefault();
            acceptSuggestion(suggestions[suggestionIndex]);
            return;
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                const lineStart = code.lastIndexOf('\n', s - 1) + 1;
                if (code.substring(lineStart, lineStart + 4) === '    ') {
                    const newCode = code.substring(0, lineStart) + code.substring(lineStart + 4);
                    setCode(newCode);
                    setTimeout(() => { t.selectionStart = t.selectionEnd = Math.max(s - 4, lineStart); }, 0);
                }
            } else {
                setCode(code.substring(0, s) + '    ' + code.substring(en));
                setTimeout(() => { t.selectionStart = t.selectionEnd = s + 4; }, 0);
            }
            return;
        }

        // Enter: Emmet expand or smart indent
        if (e.key === 'Enter') {
            if (suggestions.length > 0 && currentAbbr) {
                e.preventDefault();
                acceptSuggestion(suggestions[suggestionIndex]);
                return;
            }
            e.preventDefault();
            const lines = code.substring(0, s).split('\n');
            const currentLine = lines[lines.length - 1];
            const indent = currentLine.match(/^(\s*)/)?.[1] || '';
            const beforeCursor = code.substring(0, s);
            const afterCursor = code.substring(s);

            // CSS: { | } smart indent
            const charBefore = s > 0 ? code[s - 1] : '';
            const charAfter = code[s] || '';
            if (charBefore === '{' && charAfter === '}') {
                const newCode = code.substring(0, s) + '\n' + indent + '    \n' + indent + code.substring(s);
                setCode(newCode);
                setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1 + indent.length + 4; }, 0);
                setSuggestions([]); setCurrentAbbr('');
                return;
            }

            // HTML: open/close tag smart indent
            const openMatch = beforeCursor.match(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>\s*$/);
            const closeMatch = afterCursor.match(/^\s*<\/([a-zA-Z][a-zA-Z0-9]*)>/);
            if (openMatch && closeMatch && openMatch[1] === closeMatch[1]) {
                const newCode = code.substring(0, s) + '\n' + indent + '    \n' + indent + code.substring(s).trimStart();
                setCode(newCode);
                setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1 + indent.length + 4; }, 0);
            } else {
                const trimmed = currentLine.trimEnd();
                let addIndent = '';
                if (trimmed.endsWith('{')) addIndent = '    ';
                else if (trimmed.endsWith('>') && !trimmed.endsWith('/>') && !trimmed.match(/<\//)) addIndent = '    ';
                const newCode = code.substring(0, s) + '\n' + indent + addIndent + code.substring(en);
                setCode(newCode);
                setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1 + indent.length + addIndent.length; }, 0);
            }
            setSuggestions([]); setCurrentAbbr('');
            return;
        }

        // Auto-close tag on > (not inside style/script)
        if (e.key === '>' && s === en) {
            const textBefore = code.substring(0, s);
            if (!isInsideStyle(textBefore) && !isInsideScript(textBefore)) {
                const textAfter = code.substring(s);
                const tagMatch = textBefore.match(/<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?\s*$/);
                if (tagMatch && !SELF_CLOSING_TAGS.has(tagMatch[1].toLowerCase())) {
                    if (!textBefore.match(/<\/[a-zA-Z][a-zA-Z0-9]*\s*$/)) {
                        if (!textAfter.match(/^\s*<\//) && textAfter.charAt(0) !== '>') {
                            e.preventDefault();
                            const tagName = tagMatch[1];
                            const newCode = code.substring(0, s) + `></${tagName}>` + code.substring(s);
                            setCode(newCode);
                            setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1; }, 0);
                            setSuggestions([]); setCurrentAbbr('');
                            return;
                        }
                    }
                }
            }
        }

        // Auto-close brackets and quotes
        const PAIRS: Record<string, string> = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
        if (PAIRS[e.key] && s === en) {
            const nextChar = code[s] || '';
            if ('"\'\'`'.includes(e.key)) {
                const prevChar = s > 0 ? code[s - 1] : '';
                if (/\w/.test(prevChar)) return;
                if (nextChar === e.key) {
                    e.preventDefault();
                    setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1; }, 0);
                    return;
                }
            }
            if (!/\w/.test(nextChar)) {
                e.preventDefault();
                const newCode = code.substring(0, s) + e.key + PAIRS[e.key] + code.substring(s);
                setCode(newCode);
                setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1; }, 0);
                return;
            }
        }

        // Skip over closing bracket/quote
        if (')]}"\'\'`'.includes(e.key) && code[s] === e.key && s === en) {
            e.preventDefault();
            setTimeout(() => { t.selectionStart = t.selectionEnd = s + 1; }, 0);
            return;
        }

        // Backspace: delete matching pair
        if (e.key === 'Backspace' && s === en && s > 0) {
            const prev = code[s - 1];
            const next = code[s];
            const pairMap: Record<string, string> = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
            if (pairMap[prev] === next) {
                e.preventDefault();
                const newCode = code.substring(0, s - 1) + code.substring(s + 1);
                setCode(newCode);
                setTimeout(() => { t.selectionStart = t.selectionEnd = s - 1; }, 0);
                return;
            }
        }
    };

    const syncScroll = useCallback(() => {
        if (textareaRef.current) {
            const st = textareaRef.current.scrollTop;
            const sl = textareaRef.current.scrollLeft;
            if (highlightRef.current) { highlightRef.current.scrollTop = st; highlightRef.current.scrollLeft = sl; }
            if (lineNumRef.current) { lineNumRef.current.scrollTop = st; }
        }
    }, []);

    // Loading state
    if (loadingSubmission) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#1e1e1e]">
                <Loader2 className="w-12 h-12 text-[#007acc] animate-spin mx-auto mb-4" />
                <p className="text-[#ccc] text-sm ml-3">Loading...</p>
            </div>
        );
    }

    // Submitted state
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
                                <h1 className="text-3xl font-bold mb-3">Challenge Submitted! ✅</h1>
                                <p className="text-purple-200/70 text-lg mb-2">Aapka code admin ko bhej diya gaya hai.</p>
                                <p className="text-purple-200/50 text-sm mb-4 font-medium">📝 {question.question}</p>
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
                                <p className="text-purple-200/70 text-lg mb-2">Admin ne aapka solution approve kar diya!</p>
                                <p className="text-purple-200/50 text-sm mb-4 font-medium">📝 {question.question}</p>
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
                                <p className="text-purple-200/70 text-lg mb-2">Admin ne aapka solution reject kar diya.</p>
                                <p className="text-purple-200/50 text-sm mb-4 font-medium">📝 {question.question}</p>
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
                            ← Back to Challenges
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Editor View
    return (
        <div className="flex flex-col h-screen bg-[#1e1e1e] text-white overflow-hidden">
            <style>{`
                .hl-tag { color: #569CD6; transition: color 0.2s; }
                .hl-attr { color: #9CDCFE; transition: color 0.2s; }
                .hl-string { color: #CE9178; transition: color 0.2s; }
                .hl-comment { color: #6A9955; font-style: italic; transition: color 0.2s; }
                .hl-bracket { color: #808080; transition: color 0.2s; }
                .hl-keyword { color: #C586C0; transition: color 0.2s; }
                .hl-csssel { color: #D7BA7D; transition: color 0.2s; }
                .hl-cssprop { color: #9CDCFE; transition: color 0.2s; }
                .hl-cssval { color: #CE9178; transition: color 0.2s; }
                .hl-num { color: #B5CEA8; transition: color 0.2s; }
                pre { background: transparent; }
            `}</style>

            {/* Top Bar */}
            <div className="flex items-center justify-between bg-[#181818] px-3 py-1.5 border-b border-[#333] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[#858585] hover:text-white transition-all text-xs">
                        <ArrowLeft size={14} /> Back to Challenges
                    </button>
                    <div className="w-px h-4 bg-[#333]" />
                    <span className="text-[#cccccc] font-medium text-xs">{phaseName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <button onClick={copyCode} className="flex items-center gap-1 px-2.5 py-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] rounded text-[11px] text-[#ccc] transition-colors">
                        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
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

            {/* Question Bar */}
            <div className="bg-gradient-to-r from-[#1a3a5c] to-[#1a2a4c] px-4 py-3 border-b border-[#333] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#007acc]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-[#007acc]" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[13px] text-white font-bold">📝 Challenge: {question.question}</p>
                        {question.marks && (
                            <p className="text-[11px] text-[#4fc3f7] mt-0.5">
                                {question.difficulty || 'Challenge'} • {question.marks} marks
                            </p>
                        )}
                    </div>
                    {question.image && (
                        <button
                            onClick={() => setShowImageModal(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#007acc]/30 hover:bg-[#007acc]/50 border border-[#007acc]/40 rounded-lg text-[11px] text-[#4fc3f7] font-medium transition-all flex-shrink-0"
                        >
                            🖼️ Show Image
                        </button>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {showImageModal && question.image && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
                    <div className="relative max-w-4xl max-h-[85vh] bg-[#252526] rounded-2xl border border-[#555] shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e1e1e] border-b border-[#333]">
                            <span className="text-[12px] text-[#ccc] font-medium">🖼️ Reference Image</span>
                            <button onClick={() => setShowImageModal(false)} className="text-[#858585] hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 flex items-center justify-center overflow-auto bg-[#1e1e1e]">
                            <img src={question.image} alt="Reference" className="max-w-full max-h-[70vh] rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            )}

            {/* File Tab */}
            <div className="flex items-center bg-[#252526] border-b border-[#1e1e1e] flex-shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e1e] border-r border-[#333] border-t-2 border-t-[#007acc]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#e44d26"/><path d="M2 17l10 5 10-5" stroke="#e44d26" strokeWidth="2"/><path d="M2 12l10 5 10-5" stroke="#e44d26" strokeWidth="2"/></svg>
                    <span className="text-[12px] text-white font-normal">solution.html</span>
                    <X size={14} className="text-[#858585] hover:text-white ml-1 cursor-pointer" />
                </div>
            </div>

            {/* Editor + Preview */}
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
                                dangerouslySetInnerHTML={{ __html: highlightCode(code) + '\n' }}
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
                            {/* Emmet Autocomplete Popup */}
                            {suggestions.length > 0 && (
                                <div className="absolute bottom-2 left-2 z-20 bg-[#252526] border border-[#454545] rounded-md shadow-2xl overflow-hidden" style={{ minWidth: '300px' }}>
                                    <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
                                        {suggestions.map((item, i) => {
                                            let icon = ''; let iconBg = '#b180d7'; let preview = '';
                                            if (suggestionType === 'css-property') {
                                                icon = 'P'; iconBg = '#4FC1FF';
                                                preview = `${item}: ;`;
                                            } else if (suggestionType === 'css-value') {
                                                icon = 'V'; iconBg = '#CE9178';
                                                preview = item;
                                            } else if (suggestionType === 'css-selector') {
                                                icon = 'S'; iconBg = '#DCDCAA';
                                                preview = `${item} { }`;
                                            } else {
                                                icon = '</>'; iconBg = '#b180d7';
                                                const result = expandEmmetAbbr(item);
                                                preview = result?.expanded || '';
                                            }
                                            return (
                                                <div
                                                    key={item}
                                                    onMouseDown={(ev) => { ev.preventDefault(); acceptSuggestion(item); }}
                                                    className={`flex items-center gap-2 px-2 py-[3px] cursor-pointer transition-colors ${
                                                        i === suggestionIndex ? 'bg-[#062f4a]' : 'hover:bg-[#2a2d2e]'
                                                    }`}
                                                >
                                                    <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: iconBg, fontSize: icon.length > 2 ? '6px' : '9px', color: '#1e1e1e', fontWeight: 'bold' }}>{icon}</span>
                                                    <span className={`font-mono text-[12px] font-bold ${
                                                        i === suggestionIndex ? 'text-[#4fc3f7]' : suggestionType === 'css-property' ? 'text-[#9CDCFE]' : suggestionType === 'css-value' ? 'text-[#CE9178]' : 'text-[#569CD6]'
                                                    }`}>{item}</span>
                                                    <span className="text-[#808080] font-mono text-[11px] truncate flex-1">{preview}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="px-2 py-1 bg-[#2d2d30] border-t border-[#454545] flex items-center gap-3 text-[10px] text-[#858585]">
                                        <span>↑↓ Navigate</span>
                                        <span>Tab/Enter Accept</span>
                                        <span>Esc Dismiss</span>
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

            {/* Status Bar */}
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
