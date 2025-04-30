'use client';
import { useState } from 'react';
import { useStakingData } from '../../lib/hooks/useStakingData';
import { ValidatorsTableRow } from './ValidatorsTableRow';
import { ValidatorRowSkeleton } from './LoadingSkeleton';

// Pagination configuration
const INITIAL_DISPLAY = 10;
const ADDITIONAL_DISPLAY = 40;

export const ValidatorsTable = () => {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const { data, loading, error } = useStakingData();

  const handleViewMore = () => {
    setDisplayCount(prev => Math.min(prev + ADDITIONAL_DISPLAY, data.validators.length));
  };

  if (error) return <div className="text-red-500 p-4">Error loading validators</div>;

  const totalValidators = data?.validators?.length || 0;
  const visibleValidators = data?.validators?.slice(0, displayCount) || [];
  const hasMore = displayCount < totalValidators;

  return (
    <div className="bg-sub-1 rounded-3xl shadow-sm border border-sub-1 mb-8">
      <div className="p-4 border-b">
        <h2 className="text-lg text-white font-semibold">
          Top Performing Validators ({totalValidators.toLocaleString()} Total)
        </h2>
      </div>
      
      <table className="w-full">
        <thead className="text-left bg-sub-2/10 text-sm text-sub-2">
          <tr>
            <th className="p-4 font-medium">Rank</th>
            <th className="p-4 font-medium">Validator name</th>
            <th className="p-4 font-medium">Uptime</th>
            <th className="p-4 font-medium">Commission</th>
            <th className="p-4 font-medium">Stakes received</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sub-2/20">
          {loading ? (
            Array.from({ length: INITIAL_DISPLAY }).map((_, i) => (
              <ValidatorRowSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            visibleValidators.map((validator) => (
              <ValidatorsTableRow
                key={validator.rank}
                validator={validator}
                totalStaked={data.totalStaked}
              />
            ))
          )}
        </tbody>
      </table>

      {!loading && hasMore && (
        <div className="p-4 border-t border-sub-2/20">
          <button
            onClick={handleViewMore}
            className="w-full py-3 px-6 bg-primary-2/20 hover:bg-primary-2/40 text-primary-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>
              Show {Math.min(ADDITIONAL_DISPLAY, totalValidators - displayCount)} More
            </span>
            <span className="text-sm text-sub-2">
              (Viewing {visibleValidators.length.toLocaleString()} of {totalValidators.toLocaleString()})
            </span>
          </button>
        </div>
      )}
    </div>
  );
};