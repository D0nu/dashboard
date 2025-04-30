'use client';
import { mockData } from '../constants/mockData';

interface ValidatorSelectProps {
  value: string;
  onChange: (value: string) => void;
  isStaking?: boolean;
}

const ValidatorSelect = ({ value, onChange, isStaking }: ValidatorSelectProps) => {
  // Use existing properties from your mockData structure
  const validators = mockData.validators.filter(v => 
    isStaking ? v.status === 'active' : v.status === 'withdrawable'
  );
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 text-sub-2 border bg-sub-1 border-sub-2 rounded-lg focus:outline-none text-sm"
    >
      <option value="">Select Validator</option>
      {validators.map((v) => (
        <option key={v.name} value={v.name}>
          {v.name} {v.rate ? `(${v.rate}% APY)` : ''}
        </option>
      ))}
    </select>
  );
};

export default ValidatorSelect;