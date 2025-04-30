// components/charts/ValidatorPerformanceChart.tsx
'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the Validator interface to type the data properly
interface Validator {
  name: string;
  commission: number;  // Assuming `commission` is a field in your data
  uptime: number;      // Assuming `uptime` is a field in your data
}

interface ValidatorPerformanceChartProps {
  data: Validator[];
}

export const ValidatorPerformanceChart = ({ data }: ValidatorPerformanceChartProps) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#A0A0A0" // sub-2 color
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#A0A0A0"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2A2A2A', // dark-sub-1
              border: '1px solid #404040', // sub-2/20
              borderRadius: '8px',
            }}
          />
          <Bar
            dataKey="commission"
            fill="#E9EAB4" // primary-2
            radius={[4, 4, 0, 0]}
            name="Commission Rate"
          />
          <Bar
            dataKey="uptime"
            fill="#404040" // sub-2
            radius={[4, 4, 0, 0]}
            name="Uptime"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
