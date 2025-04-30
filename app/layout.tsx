// app/layout.tsx
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeContent } from '@/components/ThemeContent';
import './globals.css';
import { ReactNode } from 'react';
import { SolanaProviders } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <SolanaProviders>
        <ThemeProvider>
          <ThemeContent>
            {children}
          </ThemeContent>
        </ThemeProvider>
        </SolanaProviders>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
};