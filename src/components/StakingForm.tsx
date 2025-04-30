'use client';
import dynamic from 'next/dynamic';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  StakeProgram, 
  PublicKey, 
  Transaction, 
  Keypair, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
import { useState } from 'react';
import { useStakingData } from '../../lib/hooks/useStakingData';
import { toast } from 'react-toastify';

const ValidatorSelect = dynamic(
  () => import('./ValidatorSelect').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="h-12 w-full bg-sub-1 rounded-lg" />
  }
);

export const StakingForm = ({ onStakeSuccess }: { onStakeSuccess: () => void }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedValidator, setSelectedValidator] = useState('');
  const [isStaking, setIsStaking] = useState(true);
  const { data } = useStakingData();

  const handleTransaction = async () => {
    if (!publicKey || !stakeAmount || !selectedValidator) {
      toast.error('Please fill all fields and connect wallet');
      return;
    }

    try {
      const lamports = parseFloat(stakeAmount) * LAMPORTS_PER_SOL;
      const validatorVoteAccount = new PublicKey(selectedValidator);
      const transaction = new Transaction();
      let signers: Keypair[] = [];

      if (isStaking) {
        const stakeAccount = Keypair.generate();
        signers.push(stakeAccount);

        // Create stake account
        const createTx = StakeProgram.createAccount({
          fromPubkey: publicKey,
          stakePubkey: stakeAccount.publicKey,
          authorized: { 
            staker: publicKey, 
            withdrawer: publicKey 
          },
          lamports,
        });

        // Delegate to validator
        const delegateTx = StakeProgram.delegate({
          stakePubkey: stakeAccount.publicKey,
          authorizedPubkey: publicKey,
          votePubkey: validatorVoteAccount,
        });

        transaction.add(createTx, delegateTx);
      } else {
        // Unstaking logic
        const stakeAccount = Keypair.generate();
        signers.push(stakeAccount);

        // Deactivate stake
        const deactivateTx = StakeProgram.deactivate({
          stakePubkey: stakeAccount.publicKey,
          authorizedPubkey: publicKey,
        });

        // Withdraw funds
        const withdrawTx = StakeProgram.withdraw({
          stakePubkey: stakeAccount.publicKey,
          authorizedPubkey: publicKey,
          toPubkey: publicKey,
          lamports,
        });

        transaction.add(deactivateTx, withdrawTx);
      }

      // Get recent blockhash and set fee payer
      const recentBlockhash = await connection.getRecentBlockhash();
      transaction.recentBlockhash = recentBlockhash.blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection, { signers });
      await connection.confirmTransaction(signature);

      toast.success(`Transaction successful! Signature: ${signature}`);
      onStakeSuccess();
      setStakeAmount(''); // Reset form
    } catch (error: any) {
      toast.error(`Transaction failed: ${error?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-sub-1 rounded-3xl shadow-sm border border-sub-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-white font-semibold">
          {isStaking ? 'Stake' : 'Unstake'} SOL
        </h2>
        <button 
          onClick={() => setIsStaking(!isStaking)}
          className="text-primary-2 hover:text-primary-1 transition-colors"
        >
          Switch to {isStaking ? 'Unstake' : 'Stake'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full p-3 text-sub-2 border bg-sub-1 border-sub-2 rounded-lg focus:outline-none"
              placeholder={`${isStaking ? 'Stake' : 'Unstake'} amount in SOL`}
              min="0.000001"
              step="0.000001"
            />
          </div>
          <div className="flex-1">
            <ValidatorSelect 
              value={selectedValidator} 
              onChange={setSelectedValidator} 
              isStaking={isStaking}
            />
          </div>
        </div>

        {data && (
          <div className="p-4 rounded-lg flex items-center justify-between bg-dark-sub-1">
            <span className="text-sub-2">Estimated APR:</span>
            <span className="text-primary-2">{data.averageAPR}%</span>
          </div>
        )}

        <button 
          onClick={handleTransaction}
          className="w-full bg-primary-2 text-primary-1 py-3 rounded-xl hover:bg-primary-2/90 transition-colors disabled:opacity-50"
          disabled={!publicKey || !stakeAmount || !selectedValidator}
        >
          {isStaking ? 'Stake Now' : 'Unstake'}
        </button>

        {/* Wallet connection status message */}
        {!publicKey && (
          <div className="text-center pt-2">
            <p className="text-sub-2 text-sm">
              <span className="text-primary-2">⚠️</span> Please connect your wallet to stake SOL
            </p>
          </div>
        )}
      </div>
    </div>
  );
};