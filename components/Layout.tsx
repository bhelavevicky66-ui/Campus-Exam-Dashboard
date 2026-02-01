
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-[#fcfdff] overflow-hidden relative">
      <div className="w-full h-full flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
};
