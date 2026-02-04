import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
    userName: string;
    onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName, onComplete }) => {
    useEffect(() => {
        // Auto-transition to dashboard after 3 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 overflow-hidden">
            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center animate-fadeInUp">
                {/* Logo */}
                <div className="mb-8 animate-scaleIn">
                    <img
                        src="/navgurukul-logo.png"
                        alt="NavGurukul"
                        className="h-24 mx-auto object-contain mb-4"
                    />
                </div>

                {/* Welcome Text */}
                <div className="space-y-4">
                    <p className="text-purple-300/80 text-xl animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                        Welcome to
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            NavGurukul
                        </span>
                    </h1>

                    <div className="flex items-center justify-center gap-2 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                        <Sparkles className="text-yellow-400" size={24} />
                        <p className="text-2xl md:text-3xl text-purple-200 font-medium">
                            Test Dashboard
                        </p>
                        <Sparkles className="text-yellow-400" size={24} />
                    </div>

                    {/* User Welcome */}
                    <div className="mt-8 animate-fadeIn" style={{ animationDelay: '1s' }}>
                        <p className="text-lg text-purple-300/70">
                            Hello, <span className="text-white font-semibold">{userName}</span>! 👋
                        </p>
                    </div>
                </div>

                {/* Loading Indicator */}
                <div className="mt-12 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <p className="text-purple-400/60 text-sm mt-4">Loading your dashboard...</p>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 1;
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .animate-fadeIn {
                    opacity: 0;
                    animation: fadeIn 0.6s ease-out forwards;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};
