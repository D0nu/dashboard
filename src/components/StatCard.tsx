export const StatCard = ({ 
    label, 
    value,
    description 
  }: { 
    label: string; 
    value: string;
    description?: string; 
  }) => (
    <div className="bg-sub-1 rounded-3xl shadow-2xl border border-sub-1 p-6">
      <h3 className="text-sm text-sub-2 mb-2">{label}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl text-white font-semibold">{value}</p>
        {description && (
          <p className="text-sm text-primary-2">{description}</p>
        )}
      </div>
    </div>
  );