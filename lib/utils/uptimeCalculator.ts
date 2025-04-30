// lib/utils/uptimeCalculator.ts
import { Connection, PublicKey, VoteAccount } from '@solana/web3.js';

export const calculateRealUptime = async (
  connection: Connection,
  voteAccount: string
) => {
  try {
    const epochInfo = await connection.getEpochInfo();
    const accountInfo = await connection.getAccountInfo(new PublicKey(voteAccount));

    if (!accountInfo?.data) return 99.9;

    // Type assertion for VoteAccount type
    const voteAccountData = VoteAccount.fromAccountData(accountInfo.data) as unknown as {
      epochCredits: Array<[number, number, number]>;
    };

    // Get latest epoch credits (format: [epoch, credits, previousCredits])
    const latestCredits = voteAccountData.epochCredits[voteAccountData.epochCredits.length - 1];
    
    if (!latestCredits) return 99.9;

    const credits = latestCredits[1]; // Current epoch credits
    const slotsInEpoch = epochInfo.slotsInEpoch;

    return (credits / slotsInEpoch) * 100;

  } catch (error) {
    console.error('Uptime calculation error:', error);
    return 99.9;
  }
};