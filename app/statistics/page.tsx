'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FiActivity, FiServer, FiDollarSign, FiClock, FiBox, FiDatabase } from 'react-icons/fi';
import { fetchNetworkStats, fetchTVLHistory, fetchEpochInfo } from '@/services/networkStats';
import { useWallet } from '@solana/wallet-adapter-react';
import SkeletonLoader from '@/components/SkeletonLoader';

interface StatisticsPage{
  currentTvl: number;
  activeValidators: number;
  averageCommission: number;
  blockTime: number;
  epochProgress: number;
  transactionVolume: number;
}

interface EpochInfo {
  currentEpoch: number;
  progress: number;
  remainingTime: string;
}

const NetworkStatsPage = () => {
  const { isDarkMode } = useTheme();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
  const [tvlHistory, setTvlHistory] = useState([]);
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, tvl, epoch] = await Promise.all([
          fetchNetworkStats(),
          fetchTVLHistory('7d'),
          fetchEpochInfo()
        ]);
        
        setNetworkStats(stats);
        setTvlHistory(tvl);
        setEpochInfo(epoch);
      } catch (err) {
        setError('Failed to load network statistics');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className={`min-h-screen p-8 flex items-center justify-center ${isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (loading || !networkStats || !epochInfo) {
    return <SkeletonLoader />;
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-dark-base'}`}>
          Network Statistics {publicKey && `for ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`}
        </h1>
        
        <StatsGrid isDarkMode={isDarkMode} stats={networkStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TVLChart isDarkMode={isDarkMode} data={tvlHistory} />
          <EpochProgress isDarkMode={isDarkMode} epochInfo={epochInfo} />
        </div>

        <ValidatorPerformanceChart isDarkMode={isDarkMode} publicKey={publicKey} />
      </div>
    </div>
  );
};

// Updated StatsGrid with real data
const StatsGrid = ({ isDarkMode, stats }: { isDarkMode: boolean, stats: NetworkStats }) => {
  // ... (keep the same UI structure but use real stats data)
  const statsConfig = [
    {
      title: 'Total Value Locked',
      value: `$${(stats.currentTvl / 1e9).toFixed(2)}B`,
      icon: <FiDollarSign size={24} />,
      change: calculateTvlChange(tvlHistory) // Implement your change calculation
    },
    // ... other stats
  ];

  return (/*...*/);
};

// Updated EpochProgress with real data
const EpochProgress = ({ isDarkMode, epochInfo }: { isDarkMode: boolean, epochInfo: EpochInfo }) => {
  const [progress, setProgress] = useState(epochInfo.progress);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 0.1, 100));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (/*...*/);
};

// Separate validator performance component
const ValidatorPerformanceChart = ({ isDarkMode, publicKey }) => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const loadValidatorData = async () => {
      if (publicKey) {
        const response = await axios.get(`/api/validators/${publicKey}/performance`);
        setPerformanceData(response.data);
      }
    };
    loadValidatorData();
  }, [publicKey]);

  return (/*...*/);
};

export default StatisticsPage;