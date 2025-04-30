'use client';
import dynamic from 'next/dynamic';

const StakingForm = dynamic(
  () => import('@/components/StakingForm').then(mod => mod.StakingForm),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-sub-1 rounded-3xl animate-pulse" />
  }
);

export const ClientPage2 = ({ refreshChart }: { refreshChart: () => void }) => {
  return (
    <StakingForm onStakeSuccess={refreshChart} />
  );
};