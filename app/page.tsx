// app/page.tsx
import { ClientPage } from '@/components/ClientPage';
import { StatCardsGrid } from '@/components/statCardsGrid';
import { ValidatorsTable } from '@/components/ValidatorsTable';
import { StakingChart } from '@/components/StakingChart';
import { FooterLinksBox } from '@/components/FooterLinkBox';
import { ClientPage2 } from '@/components/ClientPage2';

// Correct dynamic import

export default function Home() {
  return (
    <div className="flex-1 p-6 ml-2 lg:ml-23">
      <ClientPage />
      <StatCardsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ValidatorsTable />
        <StakingChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ClientPage2 />
        <FooterLinksBox />
      </div>
    </div>
  );
}