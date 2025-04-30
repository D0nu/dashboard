// components/ClientPage.tsx
'use client';
import dynamic from 'next/dynamic';


const HomeOne = dynamic(
  () => import('@/components/HomeOne'),
  { ssr: false }
);

export const ClientPage = () => {
  return (
    <>
      <HomeOne />
      
    </>
  );
};