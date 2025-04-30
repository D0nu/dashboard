// components/shared/DataCard.tsx
'use client';

export const DataCard = ({
  title,
  value,
  description,
  trend,
}: {
  title: string;
  value: string;
  description?: string;
  trend?: 'positive' | 'negative' | 'neutral';
}) => {
  const trendColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-sub-2',
  };

  const trendIcons = {
    positive: '▲',
    negative: '▼',
    neutral: '●',
  };

  return (
    <div className="bg-sub-1 p-6 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sub-2 text-sm mb-1">{title}</h3>
          <p className="text-2xl font-semibold text-primary-2">{value}</p>
          {description && (
            <p className="text-sub-2 text-xs mt-2">{description}</p>
          )}
        </div>
        {trend && (
          <span className={`text-sm ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
    </div>
  );
};