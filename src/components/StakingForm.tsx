'use client';

import dynamic from 'next/dynamic';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { StakeProgram, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import { useState } from 'react';
 // Make sure this exists
import { useStakingData } from '../../lib/hooks/useStakingData'; // Add this hook

// StakingForm.tsx
const ValidatorSelect = dynamic(
  () => import('./ValidatorSelect').then(mod => mod.default), // ← Note .default
  { 
    ssr: false,
    loading: () => <div className="h-12 w-full bg-sub-1 rounded-lg" />
  }
);


export const StakingForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedValidator, setSelectedValidator] = useState('');
  const { data } = useStakingData(); // Get APR data
  
  const calculateReward = () => {
    if (!stakeAmount || !data) return 0;
    return (parseFloat(stakeAmount) * data.averageAPR) / 100;
  };

  const handleStake = async () => {
    if (!publicKey || !stakeAmount || !selectedValidator) return;

    try {
      const stakeAccount = Keypair.generate();
      const validatorVoteAccount = new PublicKey(selectedValidator);
      const lamports = parseFloat(stakeAmount) * 1e9;

      const recentBlockhash = await connection.getRecentBlockhash();
      
      const createTx = StakeProgram.createAccount({
        fromPubkey: publicKey,
        stakePubkey: stakeAccount.publicKey,
        authorized: {
          staker: publicKey,
          withdrawer: publicKey,
        },
        lamports,
      });

      const delegateTx = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: publicKey,
        votePubkey: validatorVoteAccount,
      });

      const transaction = new Transaction({
        recentBlockhash: recentBlockhash.blockhash,
        feePayer: publicKey,
      }).add(createTx, delegateTx);

      const signature = await sendTransaction(transaction, connection, {
        signers: [stakeAccount],
      });

      await connection.confirmTransaction(signature);
      // Handle success
    } catch (error) {
      console.error('Staking failed:', error);
      // Handle error
    }
  };

  return (
    <div className="bg-sub-1 rounded-3xl shadow-sm border border-sub-1 p-6">
      <h2 className="text-lg text-white font-semibold mb-6">Start Staking SOL</h2>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full p-3 text-sub-2 border bg-sub-1 border-sub-2 rounded-lg focus:outline-none"
              placeholder="0.25 SOL"
            />
          </div>
          <div className="flex-1">
            <ValidatorSelect 
              value={selectedValidator} 
              onChange={setSelectedValidator} 
            />
          </div>
        </div>

        <div className="p-4 rounded-lg flex">
          <p className="text-sub-2 text-sm mb-1 mr-2 font-bold">Estimated Annual Reward:</p>
          <p className="text-sm text-sub-2 font-bold">
            {data?.averageAPR}% = {calculateReward().toFixed(2)} SOL/year
          </p>
        </div>

        <button 
          onClick={handleStake}
          className="w-full bg-primary-2 text-primary-1 py-3 rounded-xl transition-colors hover:bg-primary-2/90"
        >
          Stake Now
        </button>
      </div>
    </div>
  );
};