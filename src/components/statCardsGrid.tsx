'use client';
import { StatCard } from './StatCard';
import { useStakingData } from '../../lib/hooks/useStakingData';

export const StatCardsGrid = () => {
  const { data, loading, error } = useStakingData();

  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;
  if (loading) return <div className="text-cream p-4">Loading stats...</div>;
  if (!data) return <div className="text-cream p-4">No data available</div>;

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <StatCard 
        label="Total SOL Staked" 
        value={data.totalStaked?.toLocaleString() ?? '0'}
        description="SOL" 
      />
      <StatCard 
        label="Number of Validators" 
        value={data.validatorsCount?.toLocaleString() ?? '0'} 
        description="Independent Validators" 
      />
      <StatCard 
        label="Number of Delegators" 
        value={data.delegatorsCount?.toLocaleString() ?? '0'} 
        description="Active Delegators"
      />
      <StatCard 
        label="Average Staking APR" 
        value={data.averageAPR ? `${data.averageAPR}%` : '0%'} 
        description="on Solana"
      />
    </div>
  );
};