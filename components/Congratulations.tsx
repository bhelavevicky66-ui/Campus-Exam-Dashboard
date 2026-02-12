import React, { useEffect, useState } from 'react';

interface CongratulationsProps {
    moduleName: string;
    onContinue: () => void;
}

// Confetti particle component
const Particle: React.FC<{ delay: number; x: number; color: string; shape: 'triangle' | 'circle' | 'square' }> = ({ delay, x, color, shape }) => {
    const size = shape === 'circle' ? Math.random() * 6 + 3 : Math.random() * 10 + 6;
    const duration = Math.random() * 2 + 2;
    const rotation = Math.random() * 360;
    const yStart = -20 + Math.random() * 40;

    return (
        <div
            className="absolute pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${35 + yStart}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                animation: `confettiFall ${duration}s ease-out ${delay}s both, confettiFade ${duration}s ease-out ${delay}s both`,
            }}
        >
            {shape === 'triangle' && (
                <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${size / 2}px solid transparent`,
                    borderRight: `${size / 2}px solid transparent`,
                    borderBottom: `${size}px solid ${color}`,
                    transform: `rotate(${rotation}deg)`,
                }} />
            )}
            {shape === 'circle' && (
                <div style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: color,
                }} />
            )}
            {shape === 'square' && (
                <div style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    transform: `rotate(${rotation}deg)`,
                }} />
            )}
        </div>
    );
};

export const Congratulations: React.FC<CongratulationsProps> = ({ moduleName, onContinue }) => {
    const [show, setShow] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
        setTimeout(() => setShowText(true), 800);
        setTimeout(() => setShowButton(true), 1500);
    }, []);

    // Generate confetti particles
    const particles = [];
    const colors = ['#4ECDC4', '#45B7D1', '#FED766', '#F8B739', '#ffffff', '#96CEB4', '#88D8B0', '#FF6B6B', '#C7CEEA', '#B5EAD7'];
    const shapes: ('triangle' | 'circle' | 'square')[] = ['triangle', 'circle', 'square', 'triangle', 'circle'];

    for (let i = 0; i < 60; i++) {
        particles.push(
            <Particle
                key={i}
                delay={Math.random() * 1.5}
                x={15 + Math.random() * 70}
                color={colors[Math.floor(Math.random() * colors.length)]}
                shape={shapes[Math.floor(Math.random() * shapes.length)]}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0a0e27 0%, #1a1f4e 30%, #2d3470 50%, #1a2355 70%, #0d1130 100%)' }}
        >
            {/* CSS Animations */}
            <style>{`
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(120px) rotate(360deg); }
                }
                @keyframes confettiFade {
                    0% { opacity: 1; }
                    70% { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes checkPop {
                    0% { transform: scale(0) rotate(-30deg); opacity: 0; }
                    50% { transform: scale(1.15) rotate(5deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes glowPulse {
                    0%, 100% { filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.5)) drop-shadow(0 0 60px rgba(78, 205, 196, 0.2)); }
                    50% { filter: drop-shadow(0 0 40px rgba(78, 205, 196, 0.8)) drop-shadow(0 0 80px rgba(78, 205, 196, 0.4)); }
                }
                @keyframes slideUp {
                    0% { transform: translateY(40px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes groundGlow {
                    0%, 100% { opacity: 0.3; transform: scaleX(1); }
                    50% { opacity: 0.6; transform: scaleX(1.1); }
                }
            `}</style>

            {/* Confetti Particles */}
            {show && particles}

            {/* Main Content */}
            <div className="relative text-center z-10 px-6 max-w-lg w-full">
                {/* Glowing Checkmark */}
                <div className="relative mx-auto mb-10" style={{ width: 160, height: 160 }}>
                    {/* Glow background */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, transparent 70%)',
                            transform: 'scale(2)',
                            animation: show ? 'glowPulse 2s ease-in-out infinite' : 'none',
                        }}
                    />
                    {/* Checkmark SVG */}
                    <svg
                        viewBox="0 0 120 120"
                        className="w-full h-full relative z-10"
                        style={{
                            animation: show ? 'checkPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
                            opacity: show ? 1 : 0,
                            filter: 'drop-shadow(0 0 30px rgba(78, 205, 196, 0.6))',
                        }}
                    >
                        <path
                            d="M25 62 L48 85 L95 35"
                            fill="none"
                            stroke="url(#checkGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4ECDC4" />
                                <stop offset="50%" stopColor="#7DFFC4" />
                                <stop offset="100%" stopColor="#4ECDC4" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Ground shadow / glow */}
                <div
                    className="mx-auto mb-8"
                    style={{
                        width: 200,
                        height: 8,
                        background: 'radial-gradient(ellipse, rgba(78, 205, 196, 0.4) 0%, transparent 70%)',
                        borderRadius: '50%',
                        animation: 'groundGlow 2s ease-in-out infinite',
                    }}
                />

                {/* Text */}
                <div style={{ animation: showText ? 'slideUp 0.6s ease-out forwards' : 'none', opacity: showText ? 1 : 0 }}>
                    <h1
                        className="text-4xl md:text-5xl font-extrabold tracking-wide mb-3"
                        style={{
                            background: 'linear-gradient(to right, #ffffff, #e0e0ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: 'none',
                        }}
                    >
                        CONGRATULATIONS!
                    </h1>
                    <p className="text-[#a0a8d0] text-lg md:text-xl font-medium">
                        You've successfully completed <span className="text-white font-bold">{moduleName}</span>
                    </p>
                </div>

                {/* Continue Button */}
                <div style={{ animation: showButton ? 'fadeIn 0.5s ease-out forwards' : 'none', opacity: showButton ? 1 : 0 }} className="mt-10">
                    <button
                        onClick={onContinue}
                        className="px-10 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#44B09E] text-[#0a0e27] font-bold text-lg rounded-2xl shadow-lg shadow-[#4ECDC4]/20 hover:shadow-[#4ECDC4]/40 transition-all active:scale-[0.97] hover:scale-[1.02]"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    );
};
