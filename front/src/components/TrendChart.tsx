import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Topic } from '../App';

interface TrendChartProps {
  topics: Topic[];
}

export function TrendChart({ topics }: TrendChartProps) {
  // Generate mock trend data for the last 30 days
  const generateTrendData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const entry: any = {
        date: `${date.getMonth() + 1}/${date.getDate()}`,
      };
      
      topics.forEach((topic) => {
        // Generate random trend data
        entry[topic.id] = Math.floor(Math.random() * 50) + 10;
      });
      
      data.push(entry);
    }
    return data;
  };

  const trendData = generateTrendData();
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: '문서 수', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              const topic = topics.find(t => t.id === value);
              return topic ? topic.label : value;
            }}
          />
          {topics.map((topic, idx) => (
            <Line
              key={topic.id}
              type="monotone"
              dataKey={topic.id}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
