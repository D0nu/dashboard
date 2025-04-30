'use client';
import { Skeleton } from '@/components/ui/skeleton';

export const ValidatorRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4"><Skeleton className="h-4 w-full" /></td>
    <td className="p-4"><Skeleton className="h-4 w-3/4" /></td>
    <td className="p-4"><Skeleton className="h-4 w-1/2" /></td>
    <td className="p-4"><Skeleton className="h-4 w-1/3" /></td>
    <td className="p-4"><Skeleton className="h-4 w-2/3" /></td>
  </tr>
);