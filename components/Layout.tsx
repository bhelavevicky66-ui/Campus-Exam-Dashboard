
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0F172A] relative flex items-center justify-center p-4 md:p-6 lg:p-10 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/15 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/15 blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Container - Compact and Centered */}
      <div className="w-full max-w-6xl h-[85vh] max-h-[800px] bg-white rounded-[2.5rem] shadow-[0_25px_100px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-500 flex flex-col border border-white/10">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative flex-1 flex flex-col min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};
