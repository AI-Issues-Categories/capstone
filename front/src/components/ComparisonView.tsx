import { useState, useEffect } from 'react';
import { GitCompare, Star, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { mockTopics, mockDocuments } from './mockData';
import { useLanguage } from './LanguageContext';

export function ComparisonView() {
  const { t } = useLanguage();
  const [selectedTopicA, setSelectedTopicA] = useState<string>('');
  const [selectedTopicB, setSelectedTopicB] = useState<string>('');
  const [favoriteTopicIds, setFavoriteTopicIds] = useState<string[]>([]);

  useEffect(() => {
    // Load favorite topics from localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteTopics') || '[]');
    setFavoriteTopicIds(favorites);

    // Listen for changes to favorites
    const handleStorageChange = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteTopics') || '[]');
      setFavoriteTopicIds(favorites);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoriteTopicsChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoriteTopicsChanged', handleStorageChange);
    };
  }, []);

  // 찜한 이슈만 필터링
  const favoriteTopics = mockTopics.filter(topic => favoriteTopicIds.includes(topic.id));
  
  // 빈 상태 체크
  if (mockTopics.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-gray-900">{t.compareTopics}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.compareTopicsDesc}
          </p>
        </div>
        
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <GitCompare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">{t.noTopicsYet}</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                {t.noTopicsToCompare}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const topicA = favoriteTopics.find(t => t.id === selectedTopicA);
  const topicB = favoriteTopics.find(t => t.id === selectedTopicB);

  const docsA = mockDocuments.filter(d => d.topicId === selectedTopicA);
  const docsB = mockDocuments.filter(d => d.topicId === selectedTopicB);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
          <GitCompare className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-700">{t.compareTopicsDesc}</span>
        </div>
        <h2 className="text-gray-900">{t.compareTopics}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.selectTwoTopicsDesc}
        </p>
      </div>

      {/* 찜한 이슈 목록 */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-purple-600 fill-purple-600" />
            <h3 className="text-gray-900">{t.myFavorites} ({favoriteTopics.length}{t.items})</h3>
          </div>
          
          {favoriteTopics.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-700 mb-2">{t.noFavorites}</p>
                <p className="text-sm text-gray-500">
                  {t.noFavoritesDesc}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {favoriteTopics.map(topic => (
                <div 
                  key={topic.id} 
                  className="p-4 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-colors"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Star className="w-4 h-4 text-purple-600 fill-purple-600 mt-1 flex-shrink-0" />
                    <h4 className="text-gray-900">{topic.label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {topic.keywords.slice(0, 3).map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selection */}
      {favoriteTopics.length >= 2 && (
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-3">
                <label className="text-sm text-gray-700">{t.topic1}</label>
                <Select value={selectedTopicA} onValueChange={setSelectedTopicA}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t.selectTopic} />
                  </SelectTrigger>
                  <SelectContent>
                    {favoriteTopics.map(topic => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">VS</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-gray-700">{t.topic2}</label>
                <Select value={selectedTopicB} onValueChange={setSelectedTopicB}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t.selectTopic} />
                  </SelectTrigger>
                  <SelectContent>
                    {favoriteTopics.map(topic => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {!selectedTopicA || !selectedTopicB ? (
              <div className="mt-8 text-center text-gray-500 py-8 bg-gray-50 rounded-xl">
                {t.selectTwoTopics}
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {favoriteTopics.length > 0 && favoriteTopics.length < 2 && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                <GitCompare className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-900 mb-2">비교하려면 이슈가 더 필요해요</p>
                <p className="text-sm text-gray-600">
                  최소 2개 이상의 이슈를 찜해야 비교할 수 있습니다
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Results */}
      {topicA && topicB && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic A */}
          <Card className="border-2 border-blue-300 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-3">
                  <span className="text-sm text-blue-700">이슈 A</span>
                </div>
                <h3 className="text-gray-900 mb-2">{topicA.label}</h3>
                <p className="text-sm text-gray-600">
                  총 {topicA.documentCount}개의 글
                </p>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-3">🏷️ 주요 키워드</h4>
                <div className="flex flex-wrap gap-2">
                  {topicA.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-3">💬 의견 분포</h4>
                <div className="space-y-2">
                  {['support', 'oppose', 'alternative'].map(stance => {
                    const count = docsA.filter(d => d.stance === stance).length;
                    const percentage = docsA.length > 0 ? (count / docsA.length) * 100 : 0;
                    if (count === 0) return null;
                    
                    return (
                      <div key={stance}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>
                            {stance === 'support' ? '👍 찬성' : stance === 'oppose' ? '👎 반대' : '💡 대안'}
                          </span>
                          <span className="text-gray-600">{count}개 ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor:
                                stance === 'support' ? '#3b82f6' : stance === 'oppose' ? '#ef4444' : '#10b981',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-3">📝 대표 의견</h4>
                <div className="space-y-3">
                  {topicA.clusters.slice(0, 2).map((cluster, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200">
                      <Badge className="mb-2" variant={cluster.stance === 'support' ? 'default' : 'destructive'}>
                        {cluster.stance === 'support' ? '찬성' : cluster.stance === 'oppose' ? '반대' : '대안'}
                      </Badge>
                      <p className="text-sm text-gray-700">
                        {cluster.representativeSentences[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topic B */}
          <Card className="border-2 border-red-300 shadow-lg bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full mb-3">
                  <span className="text-sm text-red-700">이슈 B</span>
                </div>
                <h3 className="text-gray-900 mb-2">{topicB.label}</h3>
                <p className="text-sm text-gray-600">
                  총 {topicB.documentCount}개의 글
                </p>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-3">🏷️ 주요 키워드</h4>
                <div className="flex flex-wrap gap-2">
                  {topicB.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-3">💬 의견 분포</h4>
                <div className="space-y-2">
                  {['support', 'oppose', 'alternative'].map(stance => {
                    const count = docsB.filter(d => d.stance === stance).length;
                    const percentage = docsB.length > 0 ? (count / docsB.length) * 100 : 0;
                    if (count === 0) return null;
                    
                    return (
                      <div key={stance}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>
                            {stance === 'support' ? '👍 찬성' : stance === 'oppose' ? '👎 반대' : '💡 대안'}
                          </span>
                          <span className="text-gray-600">{count}개 ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor:
                                stance === 'support' ? '#3b82f6' : stance === 'oppose' ? '#ef4444' : '#10b981',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-3">📝 대표 의견</h4>
                <div className="space-y-3">
                  {topicB.clusters.slice(0, 2).map((cluster, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200">
                      <Badge className="mb-2" variant={cluster.stance === 'support' ? 'default' : 'destructive'}>
                        {cluster.stance === 'support' ? '찬성' : cluster.stance === 'oppose' ? '반대' : '대안'}
                      </Badge>
                      <p className="text-sm text-gray-700">
                        {cluster.representativeSentences[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
