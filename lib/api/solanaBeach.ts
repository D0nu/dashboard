// lib/api/solanaBeach.ts
export const fetchValidatorUptime = async (pubkey: string) => {
  try {
    const response = await fetch(
      `https://api.solanabeach.io/v1/validator/${pubkey}/uptime`
    );
    
    if (!response.ok) throw new Error('Failed to fetch uptime');
    
    const data = await response.json();
    return data.last24h * 100; // Convert to percentage
  } catch (error) {
    console.error('Error fetching uptime:', error);
    return 99.9; // Fallback value
  }
};