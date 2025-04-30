// components/ui/skeleton.tsx
'use client';

export const Skeleton = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`animate-pulse bg-sub-2/10 rounded-lg ${className}`}
    {...props}
  />
);

// components/ValidatorRowSkeleton.tsx
