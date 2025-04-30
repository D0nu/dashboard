// lib/solana/connection.ts
import { Connection, clusterApiUrl } from '@solana/web3.js';

export const getConnection = () => new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta'),
  {
    commitment: 'confirmed',
    httpHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.QUICKNODE_TOKEN}` // If using authenticated endpoint
    }
  }
);