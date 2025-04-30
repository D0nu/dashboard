// components/ThemeContent.tsx
'use client';
import { useTheme } from '@/context/ThemeContext';
import { SideNavbar } from './SideNavbar';

export const ThemeContent = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex min-h-screen font-sans">
      <SideNavbar />
      <main className={`flex-1 p-6 ml-20 lg:ml-64 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-dark-base to-dark-base/95'
          : 'bg-gradient-to-b from-light-base to-light-base/95'
      }`}>
        {children}
      </main>
    </div>
  );
};