import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Code, Gamepad2, Smartphone, Palette, RefreshCw, Globe, Play, ChevronDown, ChevronUp } from 'lucide-react';

interface NavGurukulProps {
    onBack: () => void;
}

export const NavGurukul: React.FC<NavGurukulProps> = ({ onBack }) => {
    const [showHinglish, setShowHinglish] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-auto">
            {/* Header with Back Button */}
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

                {/* Welcome Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-3 rounded-full border border-purple-500/30 mb-8">
                        <Sparkles className="text-yellow-400" size={20} />
                        <span className="text-lg font-medium">Welcome to the Course!</span>
                        <span className="text-2xl">👋</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                        Become a Rockstar Programmer! 🎸✨
                    </h1>

                    <p className="text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed">
                        By now, you've probably realized how important <strong className="text-white">learning by doing</strong> and <strong className="text-white">teamwork</strong> are for becoming a successful programmer. Today, we're kicking off your journey!
                    </p>
                </div>

                {/* What is Computer Programming Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 mb-12 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                            <Code size={32} />
                        </div>
                        <h2 className="text-3xl font-bold">💻 What is Computer Programming?</h2>
                    </div>

                    <div className="space-y-6 text-lg text-purple-100/90 leading-relaxed">
                        <p>
                            Throughout history, some inventions have completely changed the way we live—like the <strong className="text-white">wheel</strong>. 🛞 Before the wheel, moving heavy loads over long distances was a real struggle. But when the wheel was invented, it revolutionized transportation, making it easier to travel and move goods, effectively shrinking the world.
                        </p>

                        <p>
                            Similarly, another invention that has dramatically transformed our lives is the <strong className="text-white">computer</strong>. Just as the wheel broke down physical barriers, computers have expanded our mental capabilities 🧠.
                        </p>

                        <p>
                            The human brain is incredibly powerful, capable of solving complex problems. However, if we continually push our brains to solve these problems, we risk mental fatigue, mistakes, and burnout. 😓 But computers can handle complex tasks continuously, without getting tired or making errors, thanks to the instructions we provide them.
                        </p>

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/20 my-8">
                            <p className="text-xl font-semibold text-white mb-2">
                                📖 Key Definition:
                            </p>
                            <p>
                                A set of instructions given to a computer is called a <strong className="text-yellow-400">program</strong>. The process of creating these instructions is known as <strong className="text-yellow-400">programming</strong>.
                            </p>
                        </div>

                        <p className="text-xl">
                            Pretty amazing, right? 🌟 You write a program, and the computer follows it to solve complex problems—without ever getting tired. It's like having a digital assistant that never sleeps! 💤
                        </p>
                    </div>
                </div>

                {/* Why Learn Programming Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 mb-12 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                            <Sparkles size={32} />
                        </div>
                        <h2 className="text-3xl font-bold">🚀 Why Learn Programming?</h2>
                    </div>

                    <p className="text-lg text-purple-100/90 leading-relaxed mb-8">
                        Learning software programming is like gaining superpowers in the digital world. 🦸‍♂️🦸‍♀️ With these skills, you can:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <Gamepad2 className="text-purple-400" size={24} />
                            <span>Create your own games 🎮</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <Smartphone className="text-blue-400" size={24} />
                            <span>Design useful apps 📱</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <Palette className="text-pink-400" size={24} />
                            <span>Produce art & animations 🎨</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <RefreshCw className="text-green-400" size={24} />
                            <span>Automate tedious tasks 🔄</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <Globe className="text-teal-400" size={24} />
                            <span>Solve real-world problems 🌍</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <Globe className="text-orange-400" size={24} />
                            <span>Connect with people 🌐</span>
                        </div>
                    </div>

                    <p className="text-lg text-purple-100/90 leading-relaxed mt-8">
                        It's like having a magic wand that turns your ideas into reality, shaping the future with your coding abilities! ✨
                    </p>
                </div>

                {/* How Programming is Changing the World */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 mb-12 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
                            <Globe size={32} />
                        </div>
                        <h2 className="text-3xl font-bold">🌍 How is Programming Changing the World?</h2>
                    </div>

                    <p className="text-lg text-purple-100/90 leading-relaxed mb-8">
                        Let's see how Programming is changing the world.
                    </p>

                    <p className="text-lg text-purple-100/90 leading-relaxed mb-6">
                        You might be wondering, <strong className="text-white">"Can I learn programming?"</strong>
                    </p>

                    {/* Video Note Box */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 mb-8">
                        <p className="font-semibold text-white mb-4">📝 Note: To watch the video in Hindi on YouTube, follow these steps:</p>
                        <ol className="list-decimal list-inside space-y-2 text-purple-100/90">
                            <li><strong>Open the Video:</strong> Click on the link or open the YouTube app and start the video.</li>
                            <li><strong>Enable Subtitles:</strong> Click on the CC (Closed Captions) button at the bottom of the video to turn on subtitles.</li>
                            <li><strong>Auto-Translate to Hindi:</strong>
                                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                    <li>After enabling subtitles, click on the Settings (gear icon) next to the CC button.</li>
                                    <li>Go to Subtitles/CC and select Auto-translate.</li>
                                    <li>From the list of languages, scroll down and select Hindi.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/20">
                        <p className="text-xl text-center">
                            Let's see! Absolutely! With determination and practice, you can achieve anything. 💪
                            <br />
                            <strong className="text-2xl text-white">Welcome to the exciting world of programming! 🎉</strong>
                        </p>
                    </div>
                </div>

                {/* What's in Store Video Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 mb-12 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl">
                            <Play size={32} />
                        </div>
                        <h2 className="text-2xl font-bold">🎥 Curious about what's in store for you in this course?</h2>
                    </div>

                    <p className="text-lg text-purple-100/90 leading-relaxed">
                        Watch this video to find out! 👇
                    </p>

                    {/* Placeholder for video embed */}
                    <div className="mt-6 bg-slate-900/50 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
                        <div className="text-center">
                            <Play size={64} className="mx-auto text-purple-400 mb-4" />
                            <p className="text-purple-300">Video Content Coming Soon</p>
                        </div>
                    </div>
                </div>

                {/* Hinglish Toggle Section */}
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-3xl p-8 border border-orange-500/20 shadow-2xl">
                    <button
                        onClick={() => setShowHinglish(!showHinglish)}
                        className="w-full flex items-center justify-between text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl">
                                <span className="text-2xl">🇮🇳</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Hinglish Version</h2>
                                <p className="text-purple-200/70">Click to read in Hinglish</p>
                            </div>
                        </div>
                        {showHinglish ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </button>

                    {showHinglish && (
                        <div className="mt-8 space-y-6 text-lg text-purple-100/90 leading-relaxed animate-fadeIn">
                            <div className="border-t border-orange-500/20 pt-8">
                                <p className="text-xl mb-6">
                                    👋 <strong className="text-white">Welcome to the course!</strong> Ab tak aapko samajh aa gaya hoga ki successful programmer banne ke liye learning by doing aur teamwork kitna important hai. Aaj hum shuru kar rahe hain aapke journey to becoming a rockstar programmer! 🎸✨
                                </p>

                                <h3 className="text-2xl font-bold mb-4">💻 Computer Programming kya hai?</h3>
                                <p className="mb-4">
                                    History mein kuch inventions ne hamari zindagi ko completely badal diya—jaise ki wheel. 🛞 Wheel ke pehle, heavy loads ko long distances tak move karna ek real struggle tha. Lekin jab wheel invent hua, toh usne transportation ko revolutionize kar diya, traveling aur samaan ko move karna easy bana diya, aur duniya ko effectively chhota kar diya.
                                </p>
                                <p className="mb-4">
                                    Isi tarah, ek aur invention jo hamari zindagi ko dramatically transform kar chuka hai, wo hai computer. Jis tarah wheel ne physical barriers ko break kiya, computers ne hamari mental capabilities ko badha diya hai 🧠.
                                </p>
                                <p className="mb-4">
                                    Human brain bohot powerful hoti hai, aur yeh complex problems solve kar sakti hai. Lekin agar hum apne brains ko continuously push karte rahe yeh problems solve karne ke liye, toh hum mental fatigue, mistakes, aur burnout ka risk lete hain. 😓 Lekin computers complex tasks ko continuously handle kar sakte hain, bina thake aur bina errors ke, bas un instructions ke wajah se jo hum unhe dete hain.
                                </p>

                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/20 my-8">
                                    <p>
                                        Ek set of instructions jo computer ko diya jata hai, usse <strong className="text-yellow-400">program</strong> kehte hain. Aur yeh instructions create karne ka process <strong className="text-yellow-400">programming</strong> kehlata hai.
                                    </p>
                                </div>

                                <p className="mb-6">
                                    Kaafi amazing hai, right? 🌟 Aap ek program likhte ho, aur computer usse follow karta hai complex problems solve karne ke liye—bina kabhi thake. Yeh ek digital assistant jaisa hai jo kabhi nahi sota! 💤
                                </p>

                                <h3 className="text-2xl font-bold mb-4">🚀 Programming kyun seekhe?</h3>
                                <p className="mb-4">
                                    Software programming seekhna digital world mein superpowers gain karne jaisa hai. 🦸‍♂️🦸‍♀️ In skills ke saath, aap apne khud ke games create kar sakte ho 🎮, useful apps design kar sakte ho 📱, art aur animations produce kar sakte ho 🎨, tedious tasks automate kar sakte ho 🔄, real-world problems solve kar sakte ho 🌍, aur duniya bhar ke logon se connect kar sakte ho 🌐. Yeh ek magic wand jaisa hai jo aapke ideas ko reality mein badal deta hai, aur aapke coding abilities se future shape karta hai! ✨
                                </p>

                                <h3 className="text-2xl font-bold mb-4">🌍 Programming duniya ko kaise badal rahi hai?</h3>
                                <p className="mb-4">
                                    Ab dekhe kaise Programming duniya ko badal rahi hai. Aap soch rahe honge, "Kya main programming seekh sakta hoon?"
                                </p>

                                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 mb-6">
                                    <p className="font-semibold text-white mb-4">📝 Note: YouTube par video ko Hindi mein dekhne ke liye, yeh steps follow karein:</p>
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li><strong>Video Open karein:</strong> Link par click karein ya YouTube app open karein aur video play karein.</li>
                                        <li><strong>Subtitles Enable karein:</strong> CC (Closed Captions) button par click karein video ke niche subtitles on karne ke liye.</li>
                                        <li><strong>Auto-Translate to Hindi:</strong>
                                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                                <li>Subtitles on karne ke baad, Settings (gear icon) par click karein jo CC button ke paas hai.</li>
                                                <li>Subtitles/CC ko select karein aur Auto-translate choose karein.</li>
                                                <li>Languages ki list mein se, scroll karke Hindi select karein.</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>

                                <p className="text-xl text-center">
                                    Chalo Dekhte hai! Bilkul! Determination aur practice ke saath, aap kuch bhi achieve kar sakte ho. 💪
                                    <br />
                                    <strong className="text-2xl text-white">Welcome to the exciting world of programming! 🎉</strong>
                                </p>

                                <p className="text-center mt-6">
                                    Iss course mein aapke liye kya hai? Yeh jaanne ke liye yeh video dekhein! 🎥👇
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
