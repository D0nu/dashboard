'use client';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type TimeRange = 'staked' | 'last-week' | 'two-weeks' | 'one-month';

const MOCK_DATA = {
  staked: {
    labels: ['Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30'],
    data: [25, 50, 100, 200, 38.97],
    totalStaked: 38.97 * 1e6,
    stakingRatio: '64.9%'
  },
  'last-week': {
    labels: ['Apr 23', 'Apr 24', 'Apr 25', 'Apr 26', 'Apr 27'],
    data: [100, 150, 300, 450, 500],
    totalStaked: 500 * 1e6,
    stakingRatio: '72.5%'
  },
  'two-weeks': {
    labels: ['Apr 16', 'Apr 18', 'Apr 20', 'Apr 22', 'Apr 24'],
    data: [200, 300, 400, 350, 420],
    totalStaked: 420 * 1e6,
    stakingRatio: '68.2%'
  },
  'one-month': {
    labels: ['Mar 30', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20'],
    data: [150, 250, 350, 450, 380],
    totalStaked: 380 * 1e6,
    stakingRatio: '65.7%'
  }
};

// Add the showComparison prop type
interface StakingChartProps {
  showComparison: boolean;
}

export const StakingChart = ({ showComparison }: StakingChartProps) => {
  const { isDarkMode } = useTheme();
  const { connection } = useConnection();
  const [timeRange, setTimeRange] = useState<TimeRange>('staked');
  const [isLoading, setIsLoading] = useState(false);
  const [hasRealData, setHasRealData] = useState(false);
  const [chartData, setChartData] = useState({
    totalStaked: MOCK_DATA.staked.totalStaked,
    stakingRatio: MOCK_DATA.staked.stakingRatio,
    data: MOCK_DATA.staked.data,
    labels: MOCK_DATA.staked.labels
  });

  const fetchRealStakingData = async () => {
    try {
      setIsLoading(true);
      const supply = await connection.getSupply();
      const totalSupply = supply.value.total / LAMPORTS_PER_SOL;
      
      const stakeAccounts = await connection.getParsedProgramAccounts(
        new PublicKey('Stake11111111111111111111111111111111111111')
      );

      const totalStaked = stakeAccounts.reduce((acc, account) => 
        acc + (account.account.lamports / LAMPORTS_PER_SOL), 0
      );

      if (totalStaked > 0) {
        setHasRealData(true);
        setChartData({
          totalStaked,
          stakingRatio: ((totalStaked / totalSupply) * 100).toFixed(1) + '%',
          data: [totalStaked / 1e6],
          labels: [new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })]
        });
      }
    } catch (error) {
      console.error('Error fetching staking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewStake = async () => {
    await fetchRealStakingData();
  };

  const currentData = hasRealData ? chartData : MOCK_DATA[timeRange];

  const chartConfig = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'SOL Staked',
        data: currentData.data,
        borderColor: '#E9EAB4',
        backgroundColor: '#E9EAB420',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
      },
      showComparison && {
        label: 'Comparison Data', // Example for comparison, add your logic
        data: [100, 150, 200, 250, 300], // Example comparison data
        borderColor: '#F39C12',
        backgroundColor: '#F39C1220',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
      }
    ].filter(Boolean) // Remove falsey values (like when comparison is disabled)
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: isDarkMode ? '#4A4A4A' : '#F3F4F6',
        titleColor: isDarkMode ? '#E9EAB4' : '#3A3A3A',
        bodyColor: isDarkMode ? '#A0A0A0' : '#6B7280',
        callbacks: {
          label: (context: any) => `$${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          color: isDarkMode ? '#A0A0A0' : '#6B7280',
          maxRotation: 0,
          autoSkip: true
        }
      },
      y: {
        beginAtZero: true,
        grid: { 
          color: isDarkMode ? '#4A4A4A' : '#F3F4F6',
          borderDash: [4]
        },
        ticks: { 
          color: isDarkMode ? '#A0A0A0' : '#6B7280',
          callback: (value: number) => `$${value}`,
          padding: 16
        }
      }
    }
  };

  return (
    <div className="dark:bg-dark-base rounded-xl border border-sub-1 dark:border-sub-1 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-primary-2">Stakings</h3>
        
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className={`px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-dark-base text-primary-2 border border-sub-1' : 'bg-light-base text-primary-1 border border-sub-2'}`}
          disabled={hasRealData}
        >
          <option value="staked">Staked ▼</option>
          <option value="last-week">Last week ▼</option>
          <option value="two-weeks">2 weeks ▼</option>
          <option value="one-month">1 month ▼</option>
        </select>
      </div>

      <div className="bg-sub-1 dark:bg-dark-sub-1 p-4 rounded-lg flex justify-between">
        <div>
          <span className="text-2xl font-bold dark:text-primary-2">
            {(hasRealData ? chartData.totalStaked : currentData.totalStaked) / 1e6}M
          </span>
          <span className="dark:text-sub-2 ml-2">/sol staked</span>
        </div>
        <div>
          <span className="dark:text-primary-2">
            {hasRealData ? chartData.stakingRatio : currentData.stakingRatio}
          </span>
          <span className="dark:text-sub-2 ml-2">/staking ratio</span>
        </div>
      </div>

      <div className="h-64 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-2 border-t-transparent"></div>
          </div>
        ) : (
          <Line data={chartConfig} options={chartOptions} key={hasRealData ? 'real-data' : 'mock-data'} />
        )}
      </div>

      <div className="flex justify-end items-center text-sub-2 dark:text-sub-2">
        <div className="text-right">
          <span className="text-sm dark:text-sub-2">
            {currentData.labels.slice(-1)[0]} • ${currentData.data.slice(-1)[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
