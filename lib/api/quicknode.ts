// lib/api/quicknode.ts
export const fetchValidatorUptime = async (voteAccount: string) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getVoteAccounts",
          params: [{
            votePubkey: voteAccount,
            commitment: "confirmed"
          }]
        })
      });
  
      const data = await response.json();
      return data.result.current[0]?.commission || 0;
    } catch (error) {
      console.error('Error fetching validator data:', error);
      return 0;
    }
  };