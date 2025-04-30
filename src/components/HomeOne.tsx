'use client';
import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa6';
import { RiWallet3Fill } from 'react-icons/ri';
import { BiSearchAlt } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useWallet } from '@solana/wallet-adapter-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function HomeOne({ validators = [] }) {
  const { isDarkMode } = useTheme();
  const { publicKey, disconnect, connect, select, wallet } = useWallet();
  const [isListening, setIsListening] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showDisconnectDropdown, setShowDisconnectDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredValidators, setFilteredValidators] = useState(validators);
  const debounceTimeout = useRef(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleConnect = async (walletName) => {
    try {
      select(walletName);
      await connect();
      setShowWalletDropdown(false);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const getWalletIcon = () => <RiWallet3Fill size={18} />;

  const startVoiceSearch = () => {
    if (isListening || listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (!listening && transcript && transcript !== searchQuery) {
      setSearchQuery(transcript);
      setIsListening(false);
    }
  }, [listening, transcript, searchQuery]);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const filtered = validators.filter((v) =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.voteAccount.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredValidators(filtered);
    }, 300);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery, validators]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = validators.filter((v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.voteAccount.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredValidators(filtered);
  };

  return (
    <header className="flex justify-between items-center mb-8 gap-4">
      <div className={`text-sm ${isDarkMode ? 'text-primary-2' : 'text-dark-base'}`}>
        <Link
          href="/"
          className={`hover:text-primary-2 ${isDarkMode ? 'text-cream' : 'text-dark-base'}`}
        >
          Home
        </Link>
        &nbsp;&gt;&nbsp;Staking
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative">
        <input
          type="text"
          placeholder="Search validators or vote account..."
          className={`w-full px-4 py-2 pl-3 pr-24 border rounded-3xl text-sm focus:outline-none focus:ring-2 ${
            isDarkMode
              ? 'border-sub-1 focus:ring-sub-1 bg-dark-base text-cream'
              : 'border-sub-2 focus:ring-sub-2 bg-light-base text-dark-base'
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-2 inset-y-0 flex items-center gap-1 pr-2">
          <button type="submit">
            <BiSearchAlt className={isDarkMode ? 'text-cream' : 'text-dark-base'} size={18} />
          </button>
          <div className={`border-l h-4 ${isDarkMode ? 'border-cream' : 'border-dark-base'} mx-1`} />
          <button
            type="button"
            onClick={startVoiceSearch}
            className={`p-1 rounded-full hover:bg-primary-2 transition-colors ${
              isListening ? 'text-red-500' : isDarkMode ? 'text-light-base' : 'text-dark-base'
            }`}
          >
            {isListening ? <FaMicrophoneSlash size={18} /> : <FaMicrophone size={18} />}
          </button>
        </div>
      </form>

      {/* Wallet Button */}
      <div className="relative">
        <button
          onClick={() => {
            if (publicKey) {
              setShowDisconnectDropdown(!showDisconnectDropdown);
              setShowWalletDropdown(false);
            } else {
              setShowWalletDropdown(!showWalletDropdown);
              setShowDisconnectDropdown(false);
            }
          }}
          className={`flex items-center gap-2 px-4 py-4 rounded-3xl text-sm transition-colors ${
            publicKey
              ? isDarkMode
                ? 'bg-sub-1 text-primary-2'
                : 'bg-light-sub-1 text-dark-base'
              : isDarkMode
                ? 'bg-primary-2 text-dark-base hover:bg-primary-1 hover:text-primary-2'
                : 'bg-dark-base text-primary-2 hover:bg-sub-1 hover:text-primary-2'
          }`}
        >
          {wallet?.adapter?.icon && (
            <Image src={wallet.adapter.icon} alt="Wallet" width={20} height={20} />
          )}
          <RiWallet3Fill size={18} />
          {publicKey
            ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
            : 'Connect Wallet'}
        </button>

        {/* Wallet Dropdown */}
        {showWalletDropdown && (
          <div
            className={`absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-xl ${
              isDarkMode ? 'bg-dark-base border border-sub-1' : 'bg-light-base border border-sub-2'
            }`}
          >
            <button
              onClick={() => handleConnect('Phantom')}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-sub-1"
            >
              <Image src="/phantom-icon.png" alt="Phantom" width={24} height={24} />
              Phantom
            </button>
            <button
              onClick={() => handleConnect('Solflare')}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-sub-1"
            >
              <Image src="/solflare-icon.png" alt="Solflare" width={24} height={24} />
              Solflare
            </button>
          </div>
        )}

        {/* Disconnect Dropdown */}
        {showDisconnectDropdown && (
          <div
            className={`absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-xl ${
              isDarkMode ? 'bg-dark-base border border-sub-1' : 'bg-light-base border border-sub-2'
            }`}
          >
            <button
              onClick={() => {
                disconnect();
                setShowDisconnectDropdown(false);
              }}
              className="px-4 py-2 w-full hover:bg-sub-1 text-red-500"
            >
              Disconnect
            </button>
            <button
              onClick={() => {
                setShowDisconnectDropdown(false);
                setShowWalletDropdown(true);
              }}
              className="px-4 py-2 w-full hover:bg-sub-1"
            >
              Switch Wallet
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
