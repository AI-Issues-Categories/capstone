import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Sparkles, Link2, FileText, Youtube, Newspaper, BookOpen, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { exampleAnalyses, getExampleById } from './api/exampleAnalyses';
import type { AnalysisResult as APIAnalysisResult } from './api/analysisApi';

interface AnalysisResult {
  isValid: boolean;
  keywords: string[];
  supportOpinions: OpinionSource[];
  opposeOpinions: OpinionSource[];
  neutralOpinions: OpinionSource[];
  alternativeOpinions: OpinionSource[];
  futurePrediction: string;
  originalContent?: {
    title?: string;
    summary: string;
  };
}

interface OpinionSource {
  title: string;
  url: string;
  source: string;
  sourceType: 'news' | 'youtube' | 'blog';
  snippet: string;
}

// 예시 목록
const exampleList = [
  { id: 'aiEthicsKo', label: 'AI 윤리 규제 법안 (한국어)', language: 'ko' },
  { id: 'evBatteryKo', label: '전기차 배터리 화재 안전 (한국어)', language: 'ko' },
  { id: 'climateChangeEn', label: 'Global Carbon Tax (English)', language: 'en' },
  { id: 'remoteWorkKo', label: '원격근무 vs 사무실 복귀 (한국어)', language: 'ko' },
];

export function IssueAnalysis() {
  const { t } = useLanguage();
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedExample, setSelectedExample] = useState<string>('');

  const loadExample = () => {
    if (!selectedExample) return;
    
    const example = getExampleById(selectedExample);
    if (example) {
      // 예시 데이터를 입력 필드에 채움
      if (example.originalContent.title) {
        setInputText(`${example.originalContent.title}\n\n${example.originalContent.summary}`);
      } else {
        setInputText(example.originalContent.summary);
      }
      setInputType('text');
    }
  };

  const analyzeExample = async () => {
    if (!selectedExample) return;
    
    const example = getExampleById(selectedExample);
    if (example) {
      // 예시 데이터를 입력 필드에 채움
      if (example.originalContent.title) {
        setInputText(`${example.originalContent.title}\n\n${example.originalContent.summary}`);
      } else {
        setInputText(example.originalContent.summary);
      }
      setInputType('text');
      
      // 바로 분석 시작
      await analyzeContent();
    }
  };

  const analyzeContent = async () => {
    setIsAnalyzing(true);
    
    // 실제로는 백엔드 API를 호출하여 OpenAI로 분석
    // 여기서는 모의 응답을 생성
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 선택된 예시가 있으면 해당 예시의 결과를 반환
    let result: AnalysisResult;
    
    if (selectedExample) {
      const example = getExampleById(selectedExample);
      if (example) {
        result = {
          isValid: example.isValid,
          keywords: example.keywords,
          supportOpinions: example.supportOpinions,
          opposeOpinions: example.opposeOpinions,
          neutralOpinions: example.neutralOpinions,
          alternativeOpinions: example.alternativeOpinions,
          futurePrediction: example.futurePrediction,
          originalContent: example.originalContent
        };
      } else {
        result = createDefaultMockResult();
      }
    } else {
      result = createDefaultMockResult();
    }

    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const createDefaultMockResult = (): AnalysisResult => ({
    isValid: true,
    keywords: ['AI', '인공지능', '규제', '윤리', '개인정보', '기술혁신'],
    supportOpinions: [
      {
        title: 'AI 윤리 가이드라인 법제화 필요성',
        url: 'https://example.com/news1',
        source: 'TechNews',
        sourceType: 'news',
        snippet: 'AI 기술의 안전한 활용을 위해 윤리 기준과 안전장치가 반드시 필요하며, 특히 개인정보 보호와 책임 소재를 명확히 해야 한다는 전문가들의 의견이 제시되었습니다.'
      },
      {
        title: 'AI 규제, 유럽의 선진 사례를 따라야',
        url: 'https://example.com/blog1',
        source: 'Tech Blog',
        sourceType: 'blog',
        snippet: 'EU의 AI Act를 참고하여 한국도 체계적인 AI 규제 프레임워크를 구축해야 한다는 목소리가 높아지고 있습니다.'
      }
    ],
    opposeOpinions: [
      {
        title: 'AI 규제, 혁신을 저해할 수 있다',
        url: 'https://example.com/news2',
        source: 'Business Daily',
        sourceType: 'news',
        snippet: '과도한 규제는 AI 스타트업의 성장을 막고 글로벌 경쟁력을 약화시킬 수 있다는 업계의 우려가 커지고 있습니다.'
      },
      {
        title: 'AI 규제보다 자율 규제가 답이다',
        url: 'https://youtube.com/watch?v=example',
        source: 'Tech Channel',
        sourceType: 'youtube',
        snippet: '정부의 강력한 규제보다는 업계의 자율 규제와 자정 노력이 더 효과적일 수 있다는 의견이 제시되었습니다.'
      }
    ],
    neutralOpinions: [
      {
        title: 'AI 규제, 신중한 접근 필요',
        url: 'https://example.com/news3',
        source: 'National News',
        sourceType: 'news',
        snippet: 'AI 규제는 혁신과 안전성의 균형을 맞추는 것이 중요하며, 성급한 결정보다는 충분한 논의가 필요하다는 중립적 시각이 제시되었습니다.'
      }
    ],
    alternativeOpinions: [
      {
        title: '리스크 기반 AI 규제 프레임워크 제안',
        url: 'https://example.com/blog2',
        source: 'Policy Blog',
        sourceType: 'blog',
        snippet: '일률적 규제 대신 AI 시스템의 위험도에 따라 차등화된 규제를 적용하는 리스크 기반 접근법이 대안으로 제시되고 있습니다.'
      },
      {
        title: '샌드박스 방식의 단계적 AI 규제',
        url: 'https://example.com/news4',
        source: 'Innovation Weekly',
        sourceType: 'news',
        snippet: '규제 샌드박스를 통해 혁신적인 AI 기술을 시험하고, 그 결과를 바탕으로 점진적으로 규제를 만들어가는 방식이 효과적일 수 있습니다.'
      }
    ],
    futurePrediction: 'AI 규제에 대한 논의가 계속되면서, 향후 2-3년 내에 한국형 AI 규제 프레임워크가 마련될 것으로 예상됩니다. 이는 EU의 리스크 기반 접근법과 미국의 자율 규제 방식을 절충한 형태가 될 가능성이 높습니다. 특히 의료, 금융 등 고위험 분야에서는 강력한 규제가, 일반적인 AI 활용 분야에서는 가이드라인 중심의 접근이 이루어질 것으로 보입니다. 이러한 규제 체계는 AI 산업의 건전한 발전과 국민의 안전을 동시에 보장하는 방향으로 진화할 것입니다.'
  });

  const getSourceIcon = (sourceType: 'news' | 'youtube' | 'blog') => {
    switch (sourceType) {
      case 'news': return <Newspaper className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'blog': return <BookOpen className="w-4 h-4" />;
    }
  };

  const getSourceTypeLabel = (sourceType: 'news' | 'youtube' | 'blog') => {
    switch (sourceType) {
      case 'news': return t.news;
      case 'youtube': return t.youtube;
      case 'blog': return t.blog;
    }
  };

  const OpinionCard = ({ opinion, stanceColor }: { opinion: OpinionSource; stanceColor: string }) => (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg ${stanceColor} flex-shrink-0`}>
            {getSourceIcon(opinion.sourceType)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-gray-900 mb-1 line-clamp-2">{opinion.title}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{opinion.source}</span>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                {getSourceTypeLabel(opinion.sourceType)}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{opinion.snippet}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => window.open(opinion.url, '_blank')}
        >
          {t.viewOriginal}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-700">{t.issueAnalysisSubtitle}</span>
        </div>
        <h2 className="text-gray-900">{t.issueAnalysis}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.issueAnalysisDesc}
        </p>
      </div>

      {/* Example Selector */}
      <Card className="border-2 border-purple-200 bg-purple-50/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 text-purple-900">
            <Lightbulb className="w-5 h-5" />
            <h3>분석 예시 체험하기</h3>
          </div>
          <p className="text-sm text-purple-700">
            실제 분석이 어떻게 작동하는지 미리 확인해보세요. 예시를 선택하고 "예시 불러오기" 버튼을 클릭하세요.
          </p>
          <div className="flex gap-3">
            <Select value={selectedExample} onValueChange={setSelectedExample}>
              <SelectTrigger className="flex-1 bg-white">
                <SelectValue placeholder="예시 선택..." />
              </SelectTrigger>
              <SelectContent>
                {exampleList.map((example) => (
                  <SelectItem key={example.id} value={example.id}>
                    {example.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline"
              onClick={loadExample}
              disabled={!selectedExample}
              className="border-purple-300 text-purple-700 hover:bg-purple-100 whitespace-nowrap"
            >
              예시 불러오기
            </Button>
            <Button 
              onClick={analyzeExample}
              disabled={!selectedExample || isAnalyzing}
              className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap gap-2"
            >
              <Sparkles className="w-4 h-4" />
              바로 분석하기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <Tabs value={inputType} onValueChange={(v) => setInputType(v as 'text' | 'url')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="gap-2">
                <FileText className="w-4 h-4" />
                {t.inputText}
              </TabsTrigger>
              <TabsTrigger value="url" className="gap-2">
                <Link2 className="w-4 h-4" />
                {t.inputUrl}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputType === 'text' ? (
            <div className="space-y-2">
              <label className="text-sm text-gray-700">{t.pasteArticle}</label>
              <Textarea
                placeholder={t.pasteArticlePlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-gray-700">{t.enterUrl}</label>
              <Input
                placeholder={t.enterUrlPlaceholder}
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </div>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t.analysisNote}
            </AlertDescription>
          </Alert>

          <Button 
            onClick={analyzeContent}
            disabled={isAnalyzing || (inputType === 'text' ? !inputText.trim() : !inputUrl.trim())}
            className="w-full gap-2"
            size="lg"
          >
            <Sparkles className="w-5 h-5" />
            {isAnalyzing ? t.analyzing : t.startAnalysis}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Result */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Original Content Summary */}
          {analysisResult.originalContent && (
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <h3 className="text-purple-900">분석된 내용</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysisResult.originalContent.title && (
                  <div>
                    <p className="text-sm text-purple-700 mb-1">제목</p>
                    <p className="text-purple-900">{analysisResult.originalContent.title}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-purple-700 mb-1">요약</p>
                  <p className="text-gray-700 leading-relaxed">{analysisResult.originalContent.summary}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Keywords */}
          <Card>
            <CardHeader>
              <h3 className="text-gray-900">{t.extractedKeywords}</h3>
              <p className="text-sm text-gray-600">{t.extractedKeywordsDesc}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1">
                    #{keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Opinions */}
          {analysisResult.supportOpinions.length > 0 && (
            <Card className="border-blue-200 bg-blue-50/30">
              <CardHeader>
                <h3 className="text-blue-900">{t.supportOpinion}</h3>
                <p className="text-sm text-blue-700">
                  {t.foundOpinions.replace('{count}', analysisResult.supportOpinions.length.toString())}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.supportOpinions.map((opinion, idx) => (
                    <OpinionCard key={idx} opinion={opinion} stanceColor="bg-blue-100" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Oppose Opinions */}
          {analysisResult.opposeOpinions.length > 0 && (
            <Card className="border-red-200 bg-red-50/30">
              <CardHeader>
                <h3 className="text-red-900">{t.opposeOpinion}</h3>
                <p className="text-sm text-red-700">
                  {t.foundOpinions.replace('{count}', analysisResult.opposeOpinions.length.toString())}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.opposeOpinions.map((opinion, idx) => (
                    <OpinionCard key={idx} opinion={opinion} stanceColor="bg-red-100" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Neutral Opinions */}
          {analysisResult.neutralOpinions.length > 0 && (
            <Card className="border-gray-200 bg-gray-50/30">
              <CardHeader>
                <h3 className="text-gray-900">{t.neutralOpinion}</h3>
                <p className="text-sm text-gray-700">
                  {t.foundOpinions.replace('{count}', analysisResult.neutralOpinions.length.toString())}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.neutralOpinions.map((opinion, idx) => (
                    <OpinionCard key={idx} opinion={opinion} stanceColor="bg-gray-100" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alternative Opinions */}
          {analysisResult.alternativeOpinions.length > 0 && (
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader>
                <h3 className="text-green-900">{t.alternativeOpinion}</h3>
                <p className="text-sm text-green-700">
                  {t.foundOpinions.replace('{count}', analysisResult.alternativeOpinions.length.toString())}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.alternativeOpinions.map((opinion, idx) => (
                    <OpinionCard key={idx} opinion={opinion} stanceColor="bg-green-100" />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Future Prediction */}
          <Card className="border-purple-200 bg-purple-50/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="text-purple-900">{t.futurePrediction}</h3>
              </div>
              <p className="text-sm text-purple-700">{t.futurePredictionDesc}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {analysisResult.futurePrediction}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
