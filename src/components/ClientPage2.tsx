// components/ClientPage.tsx
'use client';
import dynamic from 'next/dynamic';


const StakingForm = dynamic(
  () => import('@/components/StakingForm').then(mod => ({ 
    default: mod.StakingForm 
  })),
  { ssr: false }
);


export const ClientPage2 = () => {
  return (
    <>
      <StakingForm />
      
    </>
  );
};