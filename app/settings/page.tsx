// app/settings/page.tsx
'use client';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="bg-sub-1 rounded-3xl p-6">
      <h1 className="text-2xl text-white mb-8">Settings</h1>
      
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between p-4 bg-dark-base rounded-lg">
          <span className="text-white">Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-primary-2' : 'bg-sub-2'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="p-4 bg-dark-base rounded-lg">
          <h3 className="text-white mb-2">Network Configuration</h3>
          <p className="text-sub-2 text-sm">Mainnet Beta (api.mainnet-beta.solana.com)</p>
        </div>
      </div>
    </div>
  );
}