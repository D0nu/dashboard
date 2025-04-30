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
    { 
      rank: 1, 
      name: 'Helius', 
      uptime: 99.9, 
      commission: 0, 
      stakes: 12800000,
      rate: 6.8,
      status: "active"
    },
    { 
      rank: 2, 
      name: 'Galaxy', 
      uptime: 99.8, 
      commission: 5, 
      stakes: 12700000,
      rate: 7.2,
      status: "active"
    },
    { 
      rank: 3, 
      name: 'Combase 02', 
      uptime: 99.7, 
      commission: 8, 
      stakes: 11900000,
      rate: 5.9,
      status: "withdrawable"
    },
    { 
      rank: 4, 
      name: 'Figment', 
      uptime: 99.9, 
      commission: 7, 
      stakes: 10700000,
      rate: 6.2,
      status: "active"
    },
    { 
      rank: 5, 
      name: 'Ledger by FL', 
      uptime: 99.8, 
      commission: 7, 
      stakes: 9700000,
      rate: 5.8,
      status: "active"
    },
    // New validators
    { 
      rank: 6,
      name: "Solana Foundation",
      uptime: 99.9,
      commission: 0,
      stakes: 15000000,
      rate: 6.8,
      status: "active"
    },
    { 
      rank: 7,
      name: "Everstake",
      uptime: 99.8,
      commission: 5,
      stakes: 14500000,
      rate: 7.2,
      status: "active"
    },
    { 
      rank: 8,
      name: "Legacy Validator",
      uptime: 98.5,
      commission: 10,
      stakes: 8500000,
      rate: 5.9,
      status: "withdrawable"
    }
  ],
  transactions: [
    { type: 'Stake', amount: 25, date: '2024-03-01' },
    { type: 'Reward', amount: 0.25, date: '2024-03-02' },
    { type: 'Unstake', amount: 10, date: '2024-03-03' },
  ],
};

export type Validator = typeof mockData.validators[0];