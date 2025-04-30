// constants/mockData.ts
export const mockData = {
    totalStaked: 336300000.54,
    validatorsCount: 1000,
    delegatorsCount: 502092,
    averageAPR: 5.83,
    currentEpoch: 123,
    epochProgress: 65.2,
    walletAddress: 'Xcvag_iya75v...',
    validators: [
      { rank: 1, name: 'Helius', uptime: 99.9, commission: 0, stakes: 12800000 },
      { rank: 2, name: 'Galaxy', uptime: 99.8, commission: 5, stakes: 12700000 },
      { rank: 3, name: 'Combase 02', uptime: 99.7, commission: 8, stakes: 11900000 },
      { rank: 4, name: 'Figment', uptime: 99.9, commission: 7, stakes: 10700000 },
      { rank: 5, name: 'Ledger by FL', uptime: 99.8, commission: 7, stakes: 9700000 },
    ],
    transactions: [
      { type: 'Stake', amount: 25, date: '2024-03-01' },
      { type: 'Reward', amount: 0.25, date: '2024-03-02' },
      { type: 'Unstake', amount: 10, date: '2024-03-03' },
    ],
  };
  
  export type Validator = typeof mockData.validators[0];