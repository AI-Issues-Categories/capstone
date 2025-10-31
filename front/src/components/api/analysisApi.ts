/**
 * OpinionMap Analysis API
 * FastAPI Backend Integration
 * 
 * Backend should be running at: http://localhost:8000
 * 
 * Required endpoints:
 * POST /api/analyze - Analyze content and find opinions
 * GET /api/analysis/{id} - Get analysis result
 */

export interface AnalysisRequest {
  content?: string;  // Article text content
  url?: string;      // Article URL
  language?: string; // Content language for better analysis
}

export interface OpinionSource {
  title: string;
  url: string;
  source: string;          // Source name (e.g., "TechNews", "AI Blog")
  sourceType: 'news' | 'youtube' | 'blog';
  snippet: string;         // Brief excerpt
  publishedDate?: string;  // Publication date
  relevanceScore?: number; // 0-1 score from AI
}

export interface AnalysisResult {
  analysisId: string;
  isValid: boolean;        // Whether content is appropriate for analysis
  invalidReason?: string;  // Reason if not valid
  originalContent: {
    title?: string;
    summary: string;
    detectedLanguage: string;
  };
  keywords: string[];
  supportOpinions: OpinionSource[];
  opposeOpinions: OpinionSource[];
  neutralOpinions: OpinionSource[];
  alternativeOpinions: OpinionSource[];
  futurePrediction: string;
  confidence: number;      // 0-1 confidence score
  analyzedAt: string;      // ISO timestamp
}

// Configure your backend URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Analyze content using OpenAI and find related opinions
 */
export async function analyzeContent(request: AnalysisRequest): Promise<AnalysisResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Analysis failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Analysis API error:', error);
    throw error;
  }
}

/**
 * Get analysis result by ID
 */
export async function getAnalysisResult(analysisId: string): Promise<AnalysisResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analysis/${analysisId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch analysis result');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch analysis error:', error);
    throw error;
  }
}

/**
 * Save analysis result to database
 */
export async function saveAnalysis(analysisResult: AnalysisResult): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/api/analysis/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analysisResult),
    });
  } catch (error) {
    console.error('Save analysis error:', error);
    throw error;
  }
}

/**
 * Get demo/example analysis result for testing
 * This shows what a real analysis would look like
 */
export function getDemoAnalysisResult(): AnalysisResult {
  return {
    analysisId: 'demo-001',
    isValid: true,
    originalContent: {
      title: 'AI 윤리 규제 법안, 국회 본격 논의 시작',
      summary: '인공지능 기술의 윤리적 사용을 보장하기 위한 규제 법안이 국회에서 본격적으로 논의되기 시작했다. 법안은 AI 개발 및 사용 시 개인정보 보호, 알고리즘 투명성, 책임 소재 명확화 등을 주요 내용으로 담고 있다. 찬반 양론이 팽팽하게 맞서고 있으며, 업계는 과도한 규제가 혁신을 저해할 수 있다고 우려하는 반면, 시민단체는 AI의 오용을 막기 위한 강력한 규제가 필수적이라고 주장한다.',
      detectedLanguage: 'ko'
    },
    keywords: ['AI 윤리', '인공지능', '규제', '법안', '개인정보보호', '알고리즘 투명성', '책임 소재', '기술혁신', 'EU AI Act'],
    supportOpinions: [
      {
        title: 'AI 윤리 가이드라인 법제화 시급하다',
        url: 'https://www.example-tech-news.com/ai-ethics-regulation-needed',
        source: 'TechDaily Korea',
        sourceType: 'news',
        snippet: 'AI 기술이 빠르게 발전하면서 윤리적 기준과 안전장치가 반드시 필요하다. 특히 개인정보 보호와 알고리즘의 편향성 문제, 그리고 AI 오작동 시 책임 소재를 명확히 해야 한다. 유럽연합의 AI Act를 참고하여 우리나라도 체계적인 규제 프레임워크를 마련해야 할 시점이다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.95
      },
      {
        title: 'AI 규제, 시민 안전을 위한 필수 조치',
        url: 'https://www.civic-voice-blog.com/ai-safety-regulation',
        source: 'Civic Voice Blog',
        sourceType: 'blog',
        snippet: '최근 AI 기술의 오남용 사례가 증가하고 있다. 딥페이크를 이용한 범죄, AI 알고리즘의 차별적 판단, 개인정보 무단 수집 등의 문제가 심각하다. 기술의 발전도 중요하지만 시민의 안전과 인권 보호가 우선되어야 한다. 강력한 AI 규제는 선택이 아닌 필수다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.88
      },
      {
        title: 'EU AI Act 전문가가 말하는 한국의 AI 규제 방향',
        url: 'https://youtube.com/watch?v=ai-regulation-korea',
        source: '테크 인사이트 채널',
        sourceType: 'youtube',
        snippet: 'EU의 AI Act는 위험도 기반 접근법을 채택하여 고위험 AI 시스템에는 엄격한 규제를, 저위험 시스템에는 가이드라인을 적용합니다. 한국도 이러한 균형잡힌 접근이 필요합니다. 특히 의료, 금융, 법률 분야의 AI는 반드시 강력한 규제가 필요합니다.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.92
      }
    ],
    opposeOpinions: [
      {
        title: '과도한 AI 규제는 혁신의 발목을 잡는다',
        url: 'https://business-daily.com/ai-overregulation-concern',
        source: 'Business Daily',
        sourceType: 'news',
        snippet: 'AI 스타트업들은 이미 글로벌 경쟁에서 뒤처지고 있는 상황이다. 여기에 과도한 규제까지 더해지면 한국의 AI 산업은 더욱 위축될 것이다. 미국과 중국은 최소한의 규제로 혁신을 장려하고 있는데, 우리만 규제를 강화하면 경쟁력을 잃게 된다. 규제보다는 산업 육성에 집중해야 한다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.91
      },
      {
        title: 'AI 규제법, 스타트업 생태계 파괴 우려',
        url: 'https://startup-voice.com/ai-regulation-threat',
        source: 'Startup Voice',
        sourceType: 'blog',
        snippet: '대기업은 법무팀과 컴플라이언스 조직으로 규제에 대응할 수 있지만, 스타트업은 그렇지 못하다. 복잡한 규제는 작은 기업들에게 진입장벽이 되고, 결국 AI 생태계의 다양성을 해칠 것이다. 혁신적인 아이디어를 가진 스타트업들이 규제 때문에 사업을 포기하는 상황을 막아야 한다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.87
      },
      {
        title: '자율 규제가 답이다 - AI 업계 간담회',
        url: 'https://youtube.com/watch?v=ai-self-regulation',
        source: 'Tech Conference TV',
        sourceType: 'youtube',
        snippet: '정부의 일방적인 규제보다는 업계의 자율 규제와 윤리 강령 마련이 더 효과적입니다. 기술을 잘 아는 개발자와 기업들이 스스로 기준을 만들고 지키는 것이 현실적입니다. 해외 빅테크들도 자체적으로 윤리 위원회를 운영하며 성과를 내고 있습니다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.84
      }
    ],
    neutralOpinions: [
      {
        title: 'AI 규제, 신중한 접근이 필요하다',
        url: 'https://national-news.com/ai-regulation-balanced-view',
        source: 'National News',
        sourceType: 'news',
        snippet: 'AI 규제는 혁신과 안전성 사이의 균형을 찾는 것이 핵심이다. 너무 강한 규제는 산업 발전을 저해할 수 있고, 너무 약한 규제는 시민을 보호하지 못한다. 다양한 이해관계자의 의견을 충분히 수렴하고, 단계적으로 규제 체계를 만들어가는 접근이 바람직하다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.89
      },
      {
        title: '전문가들의 의견: AI 규제 찬반 토론',
        url: 'https://youtube.com/watch?v=ai-debate-experts',
        source: 'News Debate',
        sourceType: 'youtube',
        snippet: '찬성과 반대 양측 모두 일리가 있습니다. 중요한 것은 어떻게 균형을 맞출 것인가입니다. 의료나 자율주행처럼 생명과 직결된 분야는 강한 규제가 필요하지만, 엔터테인먼트나 게임 같은 분야는 유연한 접근이 가능합니다. 분야별 맞춤형 규제가 해답일 수 있습니다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.86
      }
    ],
    alternativeOpinions: [
      {
        title: '리스크 기반 AI 규제 프레임워크가 대안이다',
        url: 'https://policy-institute.com/risk-based-ai-regulation',
        source: 'Policy Research Institute',
        sourceType: 'blog',
        snippet: '일률적인 규제 대신, AI 시스템의 위험도에 따라 차등화된 규제를 적용하는 리스크 기반 접근법이 효과적이다. 고위험 AI(의료 진단, 자율주행 등)에는 엄격한 인증과 모니터링을, 저위험 AI(추천 시스템, 번역 등)에는 자율 규제를 적용하는 방식이다. 이는 혁신과 안전을 동시에 달성할 수 있는 현실적인 대안이다.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.94
      },
      {
        title: '샌드박스 방식의 단계적 AI 규제 도입 제안',
        url: 'https://innovation-weekly.com/ai-sandbox-regulation',
        source: 'Innovation Weekly',
        sourceType: 'news',
        snippet: '규제 샌드박스를 통해 새로운 AI 기술을 안전하게 시험하고, 그 결과를 바탕으로 점진적으로 규제를 만들어가는 방식을 제안한다. 이미 금융, 헬스케어 분야에서 검증된 방법이다. 혁신적인 AI 기술이 실제 환경에서 테스트되면서 필요한 규제 사항을 발견하고, 이를 법제화하는 선순환 구조를 만들 수 있다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.90
      },
      {
        title: '민관 협력 AI 거버넌스 모델 제안',
        url: 'https://youtube.com/watch?v=ai-governance-model',
        source: 'Future Tech Forum',
        sourceType: 'youtube',
        snippet: '정부 주도의 규제도, 완전한 자율 규제도 아닌 제3의 길을 제시합니다. 정부, 기업, 학계, 시민단체가 함께 참여하는 AI 거버넌스 위원회를 구성하고, 여기서 지속적으로 가이드라인을 업데이트하는 방식입니다. 싱가포르와 캐나다가 이런 모델로 성과를 내고 있습니다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.88
      }
    ],
    futurePrediction: `AI 윤리 규제에 대한 논의가 본격화되면서, 향후 2-3년 내에 한국형 AI 규제 프레임워크가 마련될 것으로 예상됩니다.

**단기 전망 (6개월-1년)**
국회에서 AI 윤리 기본법안이 통과될 가능성이 높으며, 초기에는 가이드라인 중심의 자율 규제 형태로 시작될 것입니다. 의료, 금융, 공공 분야의 고위험 AI부터 우선적으로 규제 대상이 될 전망입니다.

**중기 전망 (1-2년)**
EU의 AI Act와 유사한 리스크 기반 접근법이 도입되어, AI 시스템을 위험도별로 분류하고 차등 규제하는 체계가 구축될 것입니다. AI 윤리 인증 제도와 감사 체계가 마련되며, 대기업과 공공기관을 중심으로 컴플라이언스가 강화됩니다.

**장기 전망 (2-3년 이상)**
규제 샌드박스를 통한 실증 경험이 축적되면서, 더욱 정교하고 실효성 있는 규제로 발전할 것입니다. 민관 협력 거버넌스 체계가 안정화되고, 국제 표준과의 조화도 이루어질 전망입니다.

**예상되는 영향**
- 긍정적: AI 기술에 대한 국민 신뢰 증가, 윤리적 AI 개발 생태계 조성, 글로벌 규제 표준 선도 가능성
- 부정적: 스타트업의 초기 적응 비용 증가, 일부 혁신적 시도의 지연 가능성
- 중립적: 대기업의 시장 지배력 강화 가능성, 규제 준수 산업의 성장

결국 한국의 AI 규제는 유럽식 강한 규제와 미국식 자율 규제를 절충한 "리스크 기반 유연 규제" 모델로 정착할 것이며, 이는 AI 산업의 건전한 발전과 국민의 안전을 동시에 보장하는 방향으로 진화할 것입니다.`,
    confidence: 0.87,
    analyzedAt: '2025-10-31T10:30:00Z'
  };
}
