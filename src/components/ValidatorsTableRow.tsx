import { Validator } from '../constants/mockData';


type Props = {
    validator: Validator;
    totalStaked: number; // Add this prop
  };


export const ValidatorsTableRow = ({ validator, totalStaked }: Props) => (
  <tr className="text-sm text-white">
    <td className="p-4">{validator.rank}</td>
    <td className="p-4 font-medium">{validator.name}</td>
    <td className="p-4">{validator.uptime}%</td>
    <td className="p-4">{validator.commission}%</td>
    <td className="p-4">
      {(validator.stakes / 1000000).toFixed(1)}M SOL (
      {((validator.stakes / totalStaked) * 100).toFixed(2)}%)
    </td>
  </tr>
);