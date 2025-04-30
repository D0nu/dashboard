// app/analytics/page.tsx
'use client';
import { StatCardsGrid } from '@/components/statCardsGrid';
import { StakingChart } from '@/components/StakingChart';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl text-white mb-4">Staking Analytics</h1>
      <StatCardsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-sub-1 rounded-3xl p-6">
          <h2 className="text-lg text-white mb-4">Staking Trends</h2>
          <StakingChart />
        </div>
        
        <div className="bg-sub-1 rounded-3xl p-6">
          <h2 className="text-lg text-white mb-4">Validator Performance</h2>
          <div className="h-64 bg-sub-2/10 rounded-lg flex items-center justify-center">
            <span className="text-sub-2">Performance Chart</span>
          </div>
        </div>
      </div>
    </div>
  );
}