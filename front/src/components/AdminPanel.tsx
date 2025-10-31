import { useState } from 'react';
import { Settings, Tags, GitMerge, Split, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockTopics } from './mockData';

export function AdminPanel() {
  const [minClusterSize, setMinClusterSize] = useState([15]);
  const [minSamples, setMinSamples] = useState([5]);
  const [similarityThreshold, setSimilarityThreshold] = useState([0.7]);

  const reviewQueue = [
    { id: '1', topic: '의대 증원 정책', confidence: 0.45, reason: '낮은 확신도' },
    { id: '2', topic: 'AI 규제 필요성', confidence: 0.52, reason: '애매한 클러스터 할당' },
    { id: '3', topic: '기후변화 대응', confidence: 0.48, reason: '복수 토픽 매칭' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>시스템 관리</CardTitle>
          <CardDescription>
            토픽 모델 파라미터 조정 및 라벨 관리
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="parameters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="parameters">파라미터 설정</TabsTrigger>
          <TabsTrigger value="labels">라벨 관리</TabsTrigger>
          <TabsTrigger value="review">검토 큐</TabsTrigger>
        </TabsList>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                클러스터링 파라미터
              </CardTitle>
              <CardDescription>
                HDBSCAN 및 토픽 모델 하이퍼파라미터 조정
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>최소 클러스터 크기 (min_cluster_size)</Label>
                    <span className="text-sm text-gray-600">{minClusterSize[0]}</span>
                  </div>
                  <Slider
                    value={minClusterSize}
                    onValueChange={setMinClusterSize}
                    min={5}
                    max={50}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    값이 클수록 큰 클러스터만 생성되며, 작은 의견 그룹은 노이즈로 처리됩니다.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>최소 샘플 수 (min_samples)</Label>
                    <span className="text-sm text-gray-600">{minSamples[0]}</span>
                  </div>
                  <Slider
                    value={minSamples}
                    onValueChange={setMinSamples}
                    min={1}
                    max={20}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    클러스터 형성에 필요한 최소 이웃 샘플 수입니다.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>유사도 임계값 (similarity_threshold)</Label>
                    <span className="text-sm text-gray-600">{similarityThreshold[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={similarityThreshold}
                    onValueChange={setSimilarityThreshold}
                    min={0.5}
                    max={0.95}
                    step={0.05}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    토픽 자동 할당 시 최소 코사인 유사도 기준입니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button>적용</Button>
                <Button variant="outline">재클러스터링 실행</Button>
                <Button variant="ghost">기본값으로 복원</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>시스템 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">총 토픽 수</p>
                  <p className="text-gray-900">{mockTopics.length}개</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">총 문서 수</p>
                  <p className="text-gray-900">1,247건</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">검토 대기</p>
                  <p className="text-gray-900">{reviewQueue.length}건</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">평균 확신도</p>
                  <p className="text-gray-900">0.82</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="w-5 h-5" />
                토픽 라벨 관리
              </CardTitle>
              <CardDescription>
                토픽 라벨 수정, 병합, 분할
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          defaultValue={topic.label}
                          className="max-w-md"
                        />
                        <Badge variant="outline">{topic.documentCount}건</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {topic.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <GitMerge className="w-4 h-4 mr-1" />
                        병합
                      </Button>
                      <Button variant="outline" size="sm">
                        <Split className="w-4 h-4 mr-1" />
                        분할
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                검토 큐
              </CardTitle>
              <CardDescription>
                확신도가 낮거나 애매한 문서들을 수동으로 검토합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-2">{item.topic}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          확신도: {(item.confidence * 100).toFixed(0)}%
                        </span>
                        <Badge variant="outline">{item.reason}</Badge>
                      </div>
                      <div className="mt-3">
                        <Label className="text-sm mb-2 block">토픽 재할당</Label>
                        <Select>
                          <SelectTrigger className="w-full max-w-md">
                            <SelectValue placeholder="토픽 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockTopics.map(topic => (
                              <SelectItem key={topic.id} value={topic.id}>
                                {topic.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        승인
                      </Button>
                      <Button size="sm" variant="outline">
                        제외
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
