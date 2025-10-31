import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Document } from '../App';

interface SourceDistributionProps {
  documents: Document[];
}

export function SourceDistribution({ documents }: SourceDistributionProps) {
  const distributionData = [
    {
      name: '뉴스',
      value: documents.filter(d => d.sourceType === 'news').length,
      color: '#3b82f6'
    },
    {
      name: '유튜브',
      value: documents.filter(d => d.sourceType === 'youtube').length,
      color: '#ef4444'
    },
    {
      name: '블로그',
      value: documents.filter(d => d.sourceType === 'blog').length,
      color: '#10b981'
    },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value}건 ({((payload[0].value / documents.length) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
