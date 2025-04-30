// app/api/staking-data/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/solana/connection';
import { calculateRealAPR } from '../../../lib/utils/aprCalculator';

export async function GET() {
  const connection = getConnection();
  
  try {
    const [supply, validators] = await Promise.all([
      connection.getSupply(),
      connection.getVoteAccounts()
    ]);

    const validatorsWithData = validators.current.map((v, idx) => ({
      rank: idx + 1,
      name: v.nodePubkey.slice(0, 8),
      uptime: 99.9 - (idx * 0.1), // Temporary mock until RPC setup
      commission: v.commission,
      stakes: v.activatedStake / 1e9
    }));

    return NextResponse.json({
      totalStaked: supply.value.total / 1e9,
      validatorsCount: validators.current.length,
      averageAPR: calculateRealAPR(
        supply.value.total / 1e9,
        validatorsWithData
      ),
      validators: validatorsWithData
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}