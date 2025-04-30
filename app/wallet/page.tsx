// app/wallet/page.tsx
'use client';
import { mockData } from '@/constants/mockData';

export default function WalletPage() {
  return (
    <div className="bg-sub-1 rounded-3xl p-6">
      <h1 className="text-2xl text-white mb-6">Wallet Overview</h1>
      <div className="space-y-6">
        <div className="bg-dark-base p-4 rounded-lg">
          <p className="text-sub-2">Connected Wallet</p>
          <p className="text-white font-mono">{mockData.walletAddress}</p>
        </div>
        
        <div className="bg-dark-base p-4 rounded-lg">
          <h3 className="text-lg text-white mb-4">Recent Transactions</h3>
          {mockData.transactions.map((tx, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-sub-1">
              <span className="text-sub-2">{tx.type}</span>
              <span className="text-white">{tx.amount} SOL</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}