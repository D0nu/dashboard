// components/ui/tabs.tsx
'use client';

import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';

// Define the TabsProps interface to specify the types for defaultValue, className, and children
interface TabsProps {
  defaultValue?: string;
  className?: string;
  children: ReactNode;
}

export const Tabs = ({ defaultValue, className, children }: TabsProps) => (
  <Tab.Group defaultIndex={defaultValue ? 0 : undefined}>
    <div className={className}>
      {children}
    </div>
  </Tab.Group>
);

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList = ({ children, className }: TabsListProps) => (
  <Tab.List className={`flex space-x-2 rounded-xl bg-sub-1 p-2 ${className || ''}`}>
    {children}
  </Tab.List>
);

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => (
  <Tab
    value={value}
    className={({ selected }) =>
      `w-full rounded-lg py-2.5 text-sm font-medium transition-colors
      ${selected ? 'bg-primary-2 text-primary-1' : 'text-sub-2 hover:bg-sub-2/10'} ${className || ''}`
    }
  >
    {children}
  </Tab>
);

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent = ({ value, children, className }: TabsContentProps) => (
  <Tab.Panel className={`mt-4 ${className || ''}`}>
    {children}
  </Tab.Panel>
);
