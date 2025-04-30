// lib/utils/aprCalculator.ts
export const calculateRealAPR = (
  totalSupply: number,
  validators: Array<{ stakes: number }>
): number => {
  const totalStaked = validators.reduce((sum, v) => sum + v.stakes, 0);
  const annualInflation = 0.065; // 6.5%
  return (annualInflation * totalSupply) / totalStaked;
};