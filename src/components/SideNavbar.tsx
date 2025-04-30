'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import {
  FiHome,
  FiBarChart,
  FiPieChart,
  FiBell,
  FiFileText,
  FiSettings,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import { RiWallet3Fill } from "react-icons/ri";

export const SideNavbar = () => {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  const navLinks = [
    { icon: FiHome, name: 'Home', path: '/' },
    { icon: FiBarChart, name: 'Analytics', path: '/analytics' },
    { icon: FiPieChart, name: 'Statistics', path: '/statistics' },
    { icon: FiBell, name: 'Notifications', path: '/notifications' },
    { icon: RiWallet3Fill, name: 'Wallet', path: '/wallet' },
    { icon: FiFileText, name: 'Documents', path: '/documents' },
  ];

  return (
    <nav className={`w-40 lg:w-40 p-4 border-r flex flex-col gap-6 fixed h-full transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-dark-base/95 border-cream/10'
        : 'bg-light-base/95 border-dark-base/10'
    }`}>
    
      {/* Logo Section */}
      <div className="mb-8 flex justify-center">
        <Link href="/" className={`font-bold text-xl hover:opacity-80 transition-opacity ${
          isDarkMode ? 'text-primary-2' : 'text-dark-base'
        }`}>
          <img src="./logo23.png" alt="Site logo" className="w-10 h-10" /> {/* Reduced from w-8 h-8 */}
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-4 flex-1"> {/* Reduced gap from gap-4 */}
        {navLinks.map(({ icon: Icon, name, path }) => (
          <Link
            href={path}
            key={name}
            className={`flex ml-5 w-20 justify-center py-2 px-0 rounded-lg transition-colors ${
              pathname === path 
                ? 'bg-primary-2 text-dark-base' 
                : 'text-black dark:text-dark-base hover:bg-primary-2 bg-sub-1 border-w- dark:bg-light-sub-1'
            }`}
            aria-label={`Navigate to ${name}`}
          >
            <Icon className="w-5 h-5" /> {/* Reduced from w-6 h-6 */}
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-cream/10 dark:border-sub-2/30 pt-4 space-y-3"> {/* Reduced spacing */}
        <Link
          href="/settings"
          className={`flex  justify-center  p-2 rounded-lg transition-colors w-20 ${
            pathname === '/settings'
              ? 'bg-primary-2 text-dark-base'
              : 'text-cream dark:text-dark-base hover:bg-primary-2 bg-sub-1 dark:bg-light-sub-1'
          }`}
          aria-label="Settings page"
        >
          <FiSettings className="w-5 h-5" /> {/* Reduced from w-6 h-6 */}
        </Link>

        <button
          onClick={toggleTheme}
          className="flex justify-center w-20 p-2 rounded-lg transition-colors text-cream dark:text-dark-base bg-sub-1 dark:bg-light-sub-1 hover:bg-primary-2 "
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />} {/* Reduced size */}
        </button>
      </div>
    </nav>
  );
};