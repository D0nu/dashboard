// components/Header/Header.tsx
'use client';
import { useState } from 'react';
import { FaMicrophone } from "react-icons/fa6";
import { RiWallet3Fill } from "react-icons/ri"
import { BiSearchAlt } from "react-icons/bi";
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function HomeOne ()  {
  const { isDarkMode } = useTheme();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const connectWallet = () => {
    setWalletConnected(true);
    localStorage.setItem('walletAddress', 'Xcvag_iya75v');
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    // Add voice recognition logic here
  };

  return (
    <header className="flex justify-between items-center mb-8 gap-4">
      <div className={`text-sm ${isDarkMode ? 'text-primary-2' : 'text-dark-base'}`}>
        <Link 
          href="/" 
          className={`hover:text-primary-2 ${
            isDarkMode ? 'text-cream' : 'text-dark-base'
          }`}
        >
          Home
        </Link> 
        &nbsp;&gt;&nbsp;Staking
      </div>
      
      {/* Search Bar with Icons */}
      <div className="flex-1 max-w-xl relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`w-full px-4 py-2 pl-3 pr-24 border rounded-3xl text-sm focus:outline-none focus:ring-2 ${
              isDarkMode 
                ? 'border-sub-1 focus:ring-sub-1 bg-dark-base text-cream'
                : 'border-sub-2 focus:ring-sub-2 bg-light-base text-dark-base'
            }`}
          />
          <div className="absolute right-2 inset-y-0 flex items-center gap-1 pr-2">
            <BiSearchAlt className={isDarkMode ? 'text-cream' : 'text-dark-base'} size={18} />
            <div className={`border-l h-4 ${isDarkMode ? 'border-cream' : 'border-dark-base'} mx-1`} />
            <button
              onClick={startVoiceSearch}
              className={`p-1 rounded-full hover:bg-primary-2 transition-colors ${
                isListening 
                  ? 'text-red-500' 
                  : isDarkMode 
                    ? 'text-cream' 
                    : 'text-dark-base'
              }`}
            >
              <FaMicrophone size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Button with Icon */}
      <button
        onClick={connectWallet}
        className={`flex items-center gap-2 px-4 py-4 rounded-3xl text-sm transition-colors ${
          walletConnected 
            ? isDarkMode
              ? 'bg-sub-1 text-primary-2'
              : 'bg-light-sub-1 text-dark-base'
            : isDarkMode
              ? 'bg-primary-2 text-dark-base hover:bg-primary-1 hover:text-primary-2'
              : 'bg-dark-base text-primary-2 hover:bg-sub-1 hover:text-primary-2'
        }`}
      >
        <RiWallet3Fill size={18} className={
          walletConnected 
            ? (isDarkMode ? 'text-primary-2' : 'text-dark-base')
            : (isDarkMode ? 'text-dark-base' : 'text-cream')
        } />
        {walletConnected ? 'Xcvag_iya75v' : 'Connect Wallet'}
      </button>
    </header>
  );
};