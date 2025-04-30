'use client';
import { ClientPage } from '@/components/ClientPage';
import { StatCardsGrid } from '@/components/statCardsGrid';
import { ValidatorsTable } from '@/components/ValidatorsTable';
import { StakingChart } from '@/components/StakingChart';
import { FooterLinksBox } from '@/components/FooterLinkBox';
import { ClientPage2 } from '@/components/ClientPage2';
import { useState } from 'react';

export default function Home() {
  const [chartKey, setChartKey] = useState(0);

  return (
    <div className="flex-1 p-6 ml-0 md:ml-4 lg:ml-6 xl:ml-8 2xl:ml-10">
      <div className="max-w-screen-2xl mx-auto">
        <ClientPage />
        
        <div className="px-4 md:px-6 lg:px-8">
          <StatCardsGrid />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
            <div className="min-h-[500px] md:min-h-[600px]">
              <ValidatorsTable />
            </div>
            <div className="h-[500px] md:h-[600px] lg:h-[700px]">
              <StakingChart showComparison={true} key={chartKey} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <div className="min-h-[400px] md:min-h-[500px]">
              <ClientPage2 refreshChart={() => setChartKey(prev => prev + 1)} />
            </div>
            <div className="h-[400px] md:h-[500px]">
              <FooterLinksBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}