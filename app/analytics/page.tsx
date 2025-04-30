'use client';
import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { StatCardsGrid } from '@/components/statCardsGrid';
import { StakingChart } from '@/components/StakingChart';
import { ValidatorPerformanceChart } from '@/components/charts/ValidatorPerformance';
import RewardHistoryChart from '@/components/charts/RewardHistoryChart';  // Corrected import
import { DataCard } from '@/components/shared/DataCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockData } from '@/constants/mockData';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface NetworkStats {
  totalSupply: number;
  circulatingSupply: number;
  currentEpoch: number;
  epochProgress: number;
}

interface Validator {
  name: string;
  performance: number;
  commission: number;
  uptime: number;
}

export default function AnalyticsPage() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
  const [validatorData, setValidatorData] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connection || !publicKey) return;

    const fetchAnalyticsData = async () => {
      try {
        const supply = await connection.getSupply();
        const epochInfo = await connection.getEpochInfo();
        
        const validators = await Promise.all(
          mockData.validators.map(async (v) => ({
            ...v,
            performance: Math.random() * 100,
            commission: Math.random() * 10,
            uptime: Math.random() * 100,
          }))
        );

        setNetworkStats({
          totalSupply: supply.value.total / LAMPORTS_PER_SOL,
          circulatingSupply: supply.value.circulating / LAMPORTS_PER_SOL,
          currentEpoch: epochInfo.epoch,
          epochProgress: (epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100
        });

        setValidatorData(validators);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [connection, publicKey]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white font-semibold">Staking Analytics</h1>
        <Tabs defaultValue="network" className="w-[400px]">
          <TabsList className="bg-sub-1">
            <TabsTrigger value="network" className="data-[state=active]:bg-primary-2">
              Network
            </TabsTrigger>
            <TabsTrigger value="personal" className="data-[state=active]:bg-primary-2">
              Personal
            </TabsTrigger>
          </TabsList>
          <TabsContent value="network">
            <StatCardsGrid />
          </TabsContent>
          <TabsContent value="personal">
            <StatCardsGrid />
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-sub-1 rounded-3xl p-6">
          <h2 className="text-lg text-white mb-4">Network Staking Trends</h2>
          {loading ? (
            <Skeleton className="h-64 w-full bg-sub-2/10 rounded-lg" />
          ) : (
            <StakingChart showComparison={true} />
          )}
        </div>

        <div className="bg-sub-1 rounded-3xl p-6">
          <h2 className="text-lg text-white mb-4">Top Validators by Performance</h2>
          {loading ? (
            <Skeleton className="h-64 w-full bg-sub-2/10 rounded-lg" />
          ) : (
            <ValidatorPerformanceChart data={validatorData} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DataCard
          title="Network Health"
          value={networkStats?.epochProgress?.toFixed(1) + '%'}
          description={`Epoch ${networkStats?.currentEpoch} Progress`}
          trend="positive"
        />
        <DataCard
          title="Total Supply"
          value={(networkStats?.totalSupply / 1e6).toFixed(1) + 'M SOL'}
          description={`${(networkStats?.circulatingSupply / 1e6).toFixed(1)}M Circulating`}
        />
        <DataCard
          title="Avg Block Time"
          value="0.46s"
          description="Last 24 Hours"
          trend="neutral"
        />
      </div>

      <div className="bg-sub-1 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-white">Reward History</h2>
          <div className="flex gap-2 text-sm">
            <button className="text-primary-2 hover:text-primary-1">1W</button>
            <button className="text-sub-2 hover:text-primary-2">1M</button>
            <button className="text-sub-2 hover:text-primary-2">1Y</button>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-64 w-full bg-sub-2/10 rounded-lg" />
        ) : (
          // Pass publicKey to RewardHistoryChart component
          <RewardHistoryChart publicKey={publicKey?.toString() ?? ''} />
        )}
      </div>

      <div className="bg-sub-1 rounded-3xl p-6">
        <h2 className="text-lg text-white mb-4">Recent Network Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm text-sub-2">TxID</th>
                <th className="text-left text-sm text-sub-2">Amount</th>
                <th className="text-left text-sm text-sub-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Rows, replace with actual data */}
              <tr>
                <td className="text-sm">Tx1</td>
                <td className="text-sm">100 SOL</td>
                <td className="text-sm">April 26</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
