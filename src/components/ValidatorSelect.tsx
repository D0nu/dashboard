'use client';

import { mockData } from '../constants/mockData';

const ValidatorSelect = ({ value, onChange }: { 
  value: string;
  onChange: (value: string) => void;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-4 text-sub-2 border bg-sub-1 border-sub-2 rounded-lg  focus:outline-none text-sm"
  >
    {mockData.validators.map((v) => (
      <option key={v.name} value={v.name}>{v.name}</option>
    ))}
  </select>
);

export default ValidatorSelect;