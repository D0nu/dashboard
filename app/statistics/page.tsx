// app/statistics/page.tsx
'use client';
import { mockData } from '@/constants/mockData';

export default function StatisticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl text-white mb-4">Network Statistics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-sub-1 rounded-3xl p-6">
          <h2 className="text-lg text-white mb-4">Epoch Overview</h2>
          <div className="space-y-4 text-sub-2">
            <p>Current Epoch: {mockData.currentEpoch}</p>
            <p>Progress: {mockData.epochProgress}%</p>
          </div>
        </div>
        
        <div className="bg-sub-1 rounded-3xl p-6">
          <h2 className="text-lg text-white mb-4">Reward Distribution</h2>
          <div className="h-48 bg-sub-2/10 rounded-lg flex items-center justify-center">
            <span className="text-sub-2">Distribution Chart</span>
          </div>
        </div>
      </div>
    </div>
  );
}