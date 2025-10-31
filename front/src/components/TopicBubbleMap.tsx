import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Topic } from '../App';

interface TopicBubbleMapProps {
  topics: Topic[];
  onTopicClick: (topic: Topic) => void;
}

export function TopicBubbleMap({ topics, onTopicClick }: TopicBubbleMapProps) {
  const getColor = (stance: string) => {
    switch (stance) {
      case 'support':
        return '#3b82f6'; // blue
      case 'oppose':
        return '#ef4444'; // red
      case 'alternative':
        return '#10b981'; // green
      default:
        return '#9ca3af'; // gray
    }
  };

  const bubbleData = topics.map((topic, idx) => ({
    x: Math.cos((idx / topics.length) * 2 * Math.PI) * (50 + Math.random() * 30),
    y: Math.sin((idx / topics.length) * 2 * Math.PI) * (50 + Math.random() * 30),
    z: topic.documentCount,
    name: topic.label,
    stance: topic.stance,
    topic: topic,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const stanceLabel =
        data.stance === 'support'
          ? '찬성 많음'
          : data.stance === 'oppose'
          ? '반대 많음'
          : data.stance === 'alternative'
          ? '대안 제시'
          : '다양한 의견';

      return (
        <div className="bg-white p-4 border-2 border-gray-200 rounded-xl shadow-xl max-w-xs">
          <p className="text-gray-900 mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">📄 {data.z}개의 글</p>
            <p className="text-gray-600">💬 {stanceLabel}</p>
          </div>
          <p className="text-xs text-blue-600 mt-2">클릭해서 자세히 보기</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-[400px] md:h-[500px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis type="number" dataKey="x" hide />
            <YAxis type="number" dataKey="y" hide />
            <ZAxis type="number" dataKey="z" range={[500, 4000]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={bubbleData} onClick={data => onTopicClick(data.topic)} cursor="pointer">
              {bubbleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.stance)}
                  opacity={0.8}
                  className="hover:opacity-100 transition-opacity"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-700">찬성 많음</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-700">반대 많음</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-700">대안 제시</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-700">다양한 의견</span>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        💡 원을 클릭하면 상세한 내용을 볼 수 있어요
      </div>
    </div>
  );
}
