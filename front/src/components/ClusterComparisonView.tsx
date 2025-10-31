import { ArrowLeftRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ClusterData } from '../App';

interface ClusterComparisonViewProps {
  cluster1: ClusterData;
  cluster2: ClusterData;
}

export function ClusterComparisonView({ cluster1, cluster2 }: ClusterComparisonViewProps) {
  const getStanceLabel = (stance: string) => {
    switch (stance) {
      case 'support': return '찬성';
      case 'oppose': return '반대';
      case 'alternative': return '대안';
      default: return '중립';
    }
  };

  const getStanceColor = (stance: string) => {
    switch (stance) {
      case 'support': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'oppose': return 'bg-red-50 border-red-200 text-red-900';
      case 'alternative': return 'bg-green-50 border-green-200 text-green-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <Card className="border-2 border-orange-300 shadow-xl">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeftRight className="w-6 h-6 text-orange-600" />
          <h3 className="text-gray-900">의견 직접 비교</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cluster 1 */}
          <div className={`p-5 rounded-xl border-2 ${getStanceColor(cluster1.stance)}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg mb-1">{getStanceLabel(cluster1.stance)} 의견 A</div>
                <div className="text-sm opacity-75">{cluster1.size}개의 글</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm mb-2 opacity-75">주요 주장:</div>
                {cluster1.representativeSentences.map((sentence, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <span className="opacity-50 flex-shrink-0">•</span>
                    <p className="text-sm">{sentence}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-current opacity-50">
                <div className="text-xs">
                  주요 출처: {cluster1.sources.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Cluster 2 */}
          <div className={`p-5 rounded-xl border-2 ${getStanceColor(cluster2.stance)}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg mb-1">{getStanceLabel(cluster2.stance)} 의견 B</div>
                <div className="text-sm opacity-75">{cluster2.size}개의 글</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm mb-2 opacity-75">주요 주장:</div>
                {cluster2.representativeSentences.map((sentence, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <span className="opacity-50 flex-shrink-0">•</span>
                    <p className="text-sm">{sentence}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-current opacity-50">
                <div className="text-xs">
                  주요 출처: {cluster2.sources.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-900">
            <strong>💡 분석 팁:</strong> 두 의견의 차이점과 공통점을 비교하며 읽어보세요. 
            각 의견이 강조하는 부분이 무엇인지 파악하는 것이 중요합니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
