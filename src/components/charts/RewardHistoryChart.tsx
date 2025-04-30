// components/charts/RewardHistoryChart.tsx
'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData } from '@/constants/mockData';

interface RewardHistoryChartProps {
  publicKey: string;  // Define the publicKey as a prop
}

// Generate reward data using mockData
const generateRewardData = () => {
  return mockData.transactions
    .filter(tx => tx.type === 'Reward')
    .map((tx, index) => ({
      date: tx.date,
      amount: tx.amount * (1 + index * 0.2), // Simulate growth
    }));
};

const RewardHistoryChart: React.FC<RewardHistoryChartProps> = ({ publicKey }) => {
  const data = generateRewardData();

  return (
    <div className="h-64">
      {/* Display publicKey for context */}
      <h3 className="text-white mb-4">Reward History for Public Key: {publicKey}</h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReward" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E9EAB4" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#E9EAB4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#A0A0A0"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#A0A0A0"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} SOL`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2A2A2A',
              border: '1px solid #404040',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#E9EAB4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorReward)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardHistoryChart;
