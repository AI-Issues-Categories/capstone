/**
 * 분석 예시 데이터
 * 실제 분석이 어떻게 작동하는지 보여주는 샘플들
 */

import type { AnalysisResult } from './analysisApi';

export const exampleAnalyses: Record<string, AnalysisResult> = {
  // 예시 1: AI 윤리 규제 (한국어)
  aiEthicsKo: {
    analysisId: 'example-ai-ethics-ko',
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
  },

  // 예시 2: 기후변화 (영어)
  climateChangeEn: {
    analysisId: 'example-climate-en',
    isValid: true,
    originalContent: {
      title: 'Global Carbon Tax Proposal Gains Momentum',
      summary: 'International climate experts propose a unified global carbon tax system to accelerate emission reductions. The proposal faces strong opposition from developing nations and energy-dependent industries, while environmental groups and some economists support the measure as essential for meeting Paris Agreement targets.',
      detectedLanguage: 'en'
    },
    keywords: ['carbon tax', 'climate change', 'emissions', 'Paris Agreement', 'green economy', 'sustainability'],
    supportOpinions: [
      {
        title: 'Carbon Pricing: The Most Effective Climate Solution',
        url: 'https://climate-economics.com/carbon-tax-effectiveness',
        source: 'Climate Economics Journal',
        sourceType: 'news',
        snippet: 'Economic analysis shows that carbon pricing is the most cost-effective way to reduce emissions. By putting a price on carbon, we create market incentives for innovation and cleaner technologies. Countries with carbon taxes have seen significant emission reductions without harming economic growth.',
        publishedDate: '2025-10-25',
        relevanceScore: 0.93
      },
      {
        title: 'Why We Need Global Carbon Tax Now',
        url: 'https://green-future-blog.org/global-carbon-tax',
        source: 'Green Future Blog',
        sourceType: 'blog',
        snippet: 'Climate crisis requires immediate action. A global carbon tax ensures all countries contribute fairly to emission reductions. Without it, carbon-intensive industries simply move to countries with lax regulations, undermining global climate efforts.',
        publishedDate: '2025-10-26',
        relevanceScore: 0.89
      }
    ],
    opposeOpinions: [
      {
        title: 'Carbon Tax Threatens Developing Economies',
        url: 'https://world-economy.com/carbon-tax-concerns',
        source: 'World Economy Today',
        sourceType: 'news',
        snippet: 'Developing nations argue that carbon taxes unfairly burden countries still building their infrastructure. These nations contributed minimally to historical emissions but would pay the highest costs. A global carbon tax could trap billions in poverty and slow economic development.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.91
      },
      {
        title: 'Industry Leaders Warn of Job Losses',
        url: 'https://youtube.com/watch?v=carbon-tax-jobs',
        source: 'Business News Network',
        sourceType: 'youtube',
        snippet: 'Manufacturing and energy sector leaders warn that carbon taxes could eliminate millions of jobs. Companies may relocate to countries without carbon pricing, leading to job losses in developed nations while failing to reduce global emissions.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.85
      }
    ],
    neutralOpinions: [
      {
        title: 'Carbon Tax: Analyzing the Trade-offs',
        url: 'https://policy-review.org/carbon-tax-analysis',
        source: 'Policy Review',
        sourceType: 'news',
        snippet: 'While carbon taxes can effectively reduce emissions, implementation matters greatly. The revenue must be carefully allocated to support affected workers and communities. Success depends on international coordination and fair burden-sharing mechanisms.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.87
      }
    ],
    alternativeOpinions: [
      {
        title: 'Cap-and-Trade: A Better Alternative to Carbon Tax',
        url: 'https://environmental-policy.com/cap-and-trade-alternative',
        source: 'Environmental Policy Institute',
        sourceType: 'blog',
        snippet: 'Cap-and-trade systems offer more flexibility than carbon taxes. By setting emission limits and allowing trading, we achieve environmental goals while giving businesses flexibility in how they reduce emissions. The EU Emissions Trading System demonstrates this approach can work.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.92
      },
      {
        title: 'Technology-First Climate Strategy',
        url: 'https://youtube.com/watch?v=tech-climate-solution',
        source: 'Innovation Hub',
        sourceType: 'youtube',
        snippet: 'Instead of carbon taxes, massive investment in clean technology and renewable energy can drive faster emission reductions. Government subsidies for green tech, not taxes on carbon, create positive incentives for change while supporting economic growth.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.88
      }
    ],
    futurePrediction: `The global carbon tax debate will likely evolve over the next 2-3 years:

**Short-term (6-12 months)**
Expect continued negotiations at international climate summits. Some regional blocs may implement carbon border adjustment mechanisms, while resistance from developing nations persists.

**Medium-term (1-2 years)**
A tiered carbon pricing system may emerge, with different rates for developed vs. developing nations. Revenue sharing mechanisms and technology transfer agreements could help build consensus.

**Long-term (2-3 years)**
Market-based mechanisms combining elements of carbon taxes, cap-and-trade, and technology subsidies will likely predominate. International carbon credit systems may be standardized.

**Expected impacts**
- Positive: Accelerated clean energy transition, innovation in green technologies
- Negative: Temporary economic disruption in carbon-intensive sectors
- Neutral: Shift in global manufacturing patterns, evolution of energy markets`,
    confidence: 0.84,
    analyzedAt: '2025-10-31T11:00:00Z'
  },

  // 예시 3: 전기차 배터리 화재 (한국어 - 새로운 예시)
  evBatteryKo: {
    analysisId: 'example-ev-battery-ko',
    isValid: true,
    originalContent: {
      title: '전기차 배터리 화재 사고 잇따라... 안전 대책 마련 시급',
      summary: '최근 국내외에서 전기차 배터리 화재 사고가 연이어 발생하면서 전기차 안전성에 대한 우려가 커지고 있다. 지하주차장 화재로 인한 대규모 피해 사례가 보고되면서 소비자들의 불안감이 증가하고 있으며, 정부는 전기차 배터리 안전 기준 강화를 검토 중이다. 한편 전기차 업계는 배터리 기술이 지속적으로 개선되고 있으며, 통계적으로 내연기관차보다 화재 위험이 낮다고 반박하고 있다.',
      detectedLanguage: 'ko'
    },
    keywords: ['전기차', '배터리 화재', 'EV', '리튬이온 배터리', '안전 기준', '지하주차장', '전기차 보급', '배터리 기술', '열폭주'],
    supportOpinions: [
      {
        title: '전기차 배터리 안전 기준 강화 시급하다',
        url: 'https://www.safety-news.com/ev-battery-safety-standards',
        source: 'Safety News Korea',
        sourceType: 'news',
        snippet: '최근 발생한 전기차 화재 사고들을 분석한 결과, 배터리 관리 시스템의 결함과 품질 관리 부실이 주요 원인으로 지적되고 있다. 전기차 배터리에 대한 엄격한 안전 인증 제도와 정기적인 점검 의무화가 필요하다. 특히 지하주차장에 설치되는 전기차 충전기에 대한 소방 안전 기준을 강화해야 한다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.94
      },
      {
        title: '전기차 주차 제한 필요하다는 아파트 주민들',
        url: 'https://community-voice-blog.com/ev-parking-restrictions',
        source: 'Community Voice',
        sourceType: 'blog',
        snippet: '지하주차장에서 발생한 전기차 화재로 수십 대의 차량이 전소되는 사고가 발생한 후, 많은 아파트 단지에서 전기차 주차를 제한하거나 지상 주차만 허용하는 움직임이 나타나고 있다. 주민들의 안전이 최우선이며, 안전 대책이 마련될 때까지 신중한 접근이 필요하다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.89
      },
      {
        title: '전기차 화재, 진압이 어려운 이유',
        url: 'https://youtube.com/watch?v=ev-fire-suppression',
        source: '소방안전 채널',
        sourceType: 'youtube',
        snippet: '전기차 배터리 화재는 일반 화재와 달리 열폭주 현상으로 진압이 매우 어렵습니다. 물을 대량으로 사용해야 하고, 재발화 위험도 높습니다. 소방대원들도 전기차 화재 대응 훈련이 필수적이며, 지하주차장 구조상 대응이 더욱 어렵다는 점을 고려해야 합니다.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.92
      }
    ],
    opposeOpinions: [
      {
        title: '전기차 화재율, 내연기관차보다 낮다',
        url: 'https://auto-tech-news.com/ev-vs-ice-fire-statistics',
        source: 'Auto Tech News',
        sourceType: 'news',
        snippet: '실제 통계를 보면 전기차의 화재 발생률은 10만 대당 25건으로, 내연기관차의 1,530건에 비해 현저히 낮다. 최근의 화재 사고들이 언론에 크게 보도되면서 전기차가 더 위험하다는 잘못된 인식이 퍼지고 있다. 과학적 데이터를 바탕으로 판단해야 한다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.93
      },
      {
        title: '전기차 기술 발전으로 안전성 크게 향상',
        url: 'https://ev-tech-blog.com/battery-safety-improvements',
        source: 'EV Technology Blog',
        sourceType: 'blog',
        snippet: '최신 전기차들은 배터리 관리 시스템(BMS), 열관리 시스템, 다층 보호 구조 등 안전 기술이 대폭 강화되었다. LFP 배터리 등 더 안전한 배터리 화학 조성도 개발되고 있다. 몇 건의 사고로 전체 전기차 산업을 부정적으로 보는 것은 불공정하다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.88
      },
      {
        title: '전기차 화재 공포, 환경 전환을 막는다',
        url: 'https://youtube.com/watch?v=ev-fear-environment',
        source: 'Green Future Channel',
        sourceType: 'youtube',
        snippet: '전기차에 대한 과도한 공포는 기후변화 대응을 위한 친환경 차량 전환을 저해합니다. 내연기관차도 매년 수많은 화재 사고가 발생하지만 이슈가 되지 않습니다. 합리적인 안전 대책과 함께 전기차 보급을 지속해야 합니다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.85
      }
    ],
    neutralOpinions: [
      {
        title: '전기차 화재, 냉정한 분석 필요',
        url: 'https://research-journal.com/ev-fire-analysis',
        source: 'Research Journal',
        sourceType: 'news',
        snippet: '전기차 화재는 발생 빈도는 낮지만 한 번 발생하면 진압이 어렵고 피해가 크다는 특성이 있다. 내연기관차와는 다른 접근이 필요하며, 감정적 대응보다는 과학적 데이터에 기반한 안전 대책 마련이 중요하다. 주차 인프라, 소방 대응, 보험 체계 등 다각적인 검토가 필요하다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.90
      },
      {
        title: '전문가들이 말하는 전기차 화재의 진실',
        url: 'https://youtube.com/watch?v=ev-fire-expert-panel',
        source: 'Expert Panel Discussion',
        sourceType: 'youtube',
        snippet: '전기차 화재는 내연기관차 화재와 다른 특성을 가지고 있습니다. 빈도는 낮지만 진압 난이도가 높고, 예측이 어렵습니다. 과장도 과소평가도 모두 위험합니다. 배터리 기술 개선과 함께 소방 인프라, 주차 정책 등을 종합적으로 개선해야 합니다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.87
      }
    ],
    alternativeOpinions: [
      {
        title: '전기차 전용 주차구역 및 소방 시설 의무화',
        url: 'https://urban-planning.com/ev-parking-zones',
        source: 'Urban Planning Institute',
        sourceType: 'blog',
        snippet: '전기차를 금지하는 대신, 전기차 전용 주차구역을 별도로 마련하고 해당 구역에 강화된 소방 시설을 설치하는 방안이 효과적이다. 스프링클러, 배연 시설, 열감지 센서 등을 갖춘 전용 공간에서 충전과 주차가 이루어지도록 하면 안전과 전기차 보급을 모두 달성할 수 있다.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.95
      },
      {
        title: '배터리 교체형(배터리 스왑) 전기차 확대',
        url: 'https://auto-innovation.com/battery-swap-solution',
        source: 'Auto Innovation Weekly',
        sourceType: 'news',
        snippet: '중국에서 성공을 거두고 있는 배터리 교체형 전기차는 충전 시간을 단축하고, 배터리 상태를 중앙에서 관리할 수 있어 안전성이 높다. 개인이 노후 배터리를 계속 사용하는 위험을 줄이고, 전문 시설에서 배터리를 관리함으로써 화재 위험을 대폭 감소시킬 수 있는 대안이다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.91
      },
      {
        title: 'AI 기반 배터리 건강 모니터링 시스템',
        url: 'https://youtube.com/watch?v=ai-battery-monitoring',
        source: 'Tech Innovation Hub',
        sourceType: 'youtube',
        snippet: 'AI와 IoT를 활용하여 전기차 배터리의 건강 상태를 실시간으로 모니터링하고, 이상 징후를 조기에 감지하는 시스템이 개발되고 있습니다. 온도, 전압, 충방전 패턴을 분석하여 화재 위험을 사전에 예측하고 경고할 수 있습니다. 이러한 예방적 접근이 가장 효과적인 대안입니다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.93
      }
    ],
    futurePrediction: `전기차 배터리 안전 논란은 향후 1-2년간 지속되면서 새로운 안전 기준과 인프라가 마련될 것으로 예상됩니다.

**단기 전망 (6개월-1년)**
정부 차원의 전기차 배터리 안전 기준이 강화될 것입니다. 지하주차장에 대한 소방 안전 규정이 개정되고, 노후 배터리에 대한 점검 의무화가 시행될 전망입니다. 일부 아파트 단지에서는 전기차 주차 제한이 일시적으로 확대될 수 있으나, 법적 분쟁도 예상됩니다.

**중기 전망 (1-2년)**
배터리 기술의 발전으로 LFP(리튬인산철) 배터리 등 더 안전한 배터리가 주류를 이룰 것입니다. 전기차 전용 주차 구역과 강화된 소방 시설이 신축 건물에 의무화되고, 기존 건물도 단계적으로 시설을 개선할 것입니다. AI 기반 배터리 건강 모니터링 시스템이 상용화됩니다.

**장기 전망 (2-3년 이상)**
전고체 배터리 등 차세대 배터리 기술이 상용화되면서 화재 위험이 근본적으로 감소할 것입니다. 배터리 교체형 전기차와 중앙 집중식 배터리 관리 시스템이 확산될 가능성이 있습니다. 전기차 보험 체계도 더욱 정교해질 것입니다.

**예상되는 영향**
- 긍정적: 안전 기술 발전, 소방 인프라 개선, 배터리 산업 고도화
- 부정적: 단기적 전기차 보급 둔화, 주차 갈등, 보험료 상승
- 중립적: 전기차 관련 규제 산업 성장, 배터리 검사 시장 확대

결국 초기의 안전 우려는 기술 발전과 제도 개선을 통해 해소될 것이며, 전기차는 내연기관차보다 더 안전한 모빌리티로 자리잡게 될 것입니다. 다만 이 과정에서 충분한 안전 투자와 합리적인 규제가 필수적입니다.`,
    confidence: 0.88,
    analyzedAt: '2025-10-31T13:45:00Z'
  },

  // 예시 4: 원격근무 (한국어)
  remoteWorkKo: {
    analysisId: 'example-remote-work-ko',
    isValid: true,
    originalContent: {
      title: '대기업들, 사무실 복귀 의무화 확대... 원격근무 시대 끝나나',
      summary: '국내 주요 대기업들이 직원들의 사무실 복귀를 의무화하는 정책을 잇따라 발표하고 있다. 코로나19 팬데믹 기간 동안 확대되었던 원격근무 제도가 축소되면서 직장인들의 반발이 거세지고 있다. 기업들은 업무 효율성과 협업 증진을 이유로 들고 있지만, 직원들은 워라밸 악화를 우려하고 있다.',
      detectedLanguage: 'ko'
    },
    keywords: ['원격근무', '재택근무', '사무실 복귀', '워라밸', '하이브리드 근무', '업무 효율성', '기업 문화'],
    supportOpinions: [
      {
        title: '대면 협업이 혁신을 만든다',
        url: 'https://business-insight.com/office-collaboration',
        source: 'Business Insight',
        sourceType: 'news',
        snippet: '원격근무는 단기적으로는 효율적이지만, 장기적으로는 팀워크와 혁신을 저해한다는 연구 결과가 나왔다. 특히 신입 직원의 온보딩과 조직 문화 전승에는 대면 근무가 필수적이다. 주요 글로벌 기업들도 사무실 복귀를 강화하고 있다.',
        publishedDate: '2025-10-26',
        relevanceScore: 0.88
      },
      {
        title: '생산성 데이터가 말하는 진실',
        url: 'https://youtube.com/watch?v=productivity-office-return',
        source: 'HR 전문가 채널',
        sourceType: 'youtube',
        snippet: '여러 기업의 내부 데이터 분석 결과, 사무실 근무 시 프로젝트 완료 속도가 평균 23% 빨랐습니다. 즉각적인 소통과 협업이 가능한 환경이 복잡한 업무에서는 더 효과적입니다. 원격근무는 단순 반복 업무에만 적합합니다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.82
      }
    ],
    opposeOpinions: [
      {
        title: '출퇴근 시간 낭비가 생산성을 갉아먹는다',
        url: 'https://workplace-future.com/commute-waste',
        source: 'Workplace Future',
        sourceType: 'blog',
        snippet: '평균 출퇴근 시간 2시간을 업무나 자기계발에 사용할 수 있다면 생산성은 오히려 향상된다. 원격근무로 직원들의 만족도가 높아지면 이직률이 낮아지고 장기적으로 기업에 이득이다. 사무실 복귀 강요는 시대착오적 발상이다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.90
      },
      {
        title: '재택근무 중단 기업, 인재 이탈 가속화',
        url: 'https://hr-trends.com/remote-work-retention',
        source: 'HR Trends Korea',
        sourceType: 'news',
        snippet: '원격근무를 중단한 기업들에서 핵심 인재의 이탈이 급증하고 있다. 특히 IT, 디자인 등 전문직 인력들은 재택근무를 제공하는 기업으로 이동하는 추세다. 우수 인재 확보 경쟁에서 원격근무는 이제 필수 조건이 되었다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.93
      },
      {
        title: '원격근무가 환경을 살린다',
        url: 'https://youtube.com/watch?v=remote-work-environment',
        source: 'Green Life Channel',
        sourceType: 'youtube',
        snippet: '출퇴근 차량 운행 감소로 탄소 배출이 크게 줄어듭니다. 서울 시내 교통량이 20% 감소하면 대기질이 눈에 띄게 개선됩니다. 기업의 사회적 책임 측면에서도 원격근무를 지속해야 합니다.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.79
      }
    ],
    neutralOpinions: [
      {
        title: '원격근무 vs 사무실, 정답은 없다',
        url: 'https://work-research.org/hybrid-work-study',
        source: 'Work Research Institute',
        sourceType: 'news',
        snippet: '업종과 직무에 따라 최적의 근무 방식이 다르다. 창의적 협업이 필요한 업무는 대면이, 집중이 필요한 개인 업무는 원격이 효과적이다. 획일적인 정책보다는 팀과 개인의 선택권을 존중하는 유연한 접근이 필요하다.',
        publishedDate: '2025-10-29',
        relevanceScore: 0.86
      }
    ],
    alternativeOpinions: [
      {
        title: '하이브리드 모델이 미래다',
        url: 'https://future-work.com/hybrid-model',
        source: 'Future of Work',
        sourceType: 'blog',
        snippet: '주 2-3일 사무실, 2-3일 재택의 하이브리드 모델이 최적의 균형점이다. 중요한 회의와 협업은 사무실에서, 집중 업무는 재택에서 수행하는 방식으로 양쪽의 장점을 모두 취할 수 있다. 글로벌 선진 기업들이 이미 성공적으로 운영 중이다.',
        publishedDate: '2025-10-28',
        relevanceScore: 0.95
      },
      {
        title: '업무 성과 기반 평가로 전환해야',
        url: 'https://youtube.com/watch?v=output-based-evaluation',
        source: 'Management Innovation',
        sourceType: 'youtube',
        snippet: '근무 장소가 아니라 업무 성과로 평가하는 시스템을 구축하면 이 논쟁은 해결됩니다. 목표 관리(OKR)와 성과 중심 문화를 정착시키면 직원들이 어디서 일하든 생산성이 보장됩니다. 중요한 것은 장소가 아니라 결과물입니다.',
        publishedDate: '2025-10-30',
        relevanceScore: 0.91
      },
      {
        title: '디지털 협업 도구 개선이 해답',
        url: 'https://tech-workplace.com/digital-collaboration',
        source: 'Tech Workplace',
        sourceType: 'news',
        snippet: '원격근무의 단점으로 지적되는 소통 문제는 기술로 해결 가능하다. AI 기반 회의 요약, 실시간 협업 툴, 가상 오피스 플랫폼 등을 적극 도입하면 물리적 거리의 한계를 극복할 수 있다. 기술 투자가 사무실 임대료보다 훨씬 효율적이다.',
        publishedDate: '2025-10-27',
        relevanceScore: 0.87
      }
    ],
    futurePrediction: `원격근무와 사무실 복귀 논쟁은 향후 1-2년간 계속되면서 새로운 균형점을 찾아갈 것으로 예상됩니다.

**단기 전망 (6개월-1년)**
대기업 중심으로 사무실 복귀가 확대되지만, 인재 이탈 문제가 불거지면서 일부 기업들이 정책을 재검토할 것입니다. 특히 IT와 스타트업 업계는 원격근무를 경쟁력으로 활용하며 차별화를 시도할 것입니다.

**중기 전망 (1-2년)**
하이브리드 근무 모델이 주류로 자리잡을 것입니다. 주 2-3일 출근이 표준이 되며, 업무 성과 중심의 평가 체계가 확산됩니다. 기업들은 사무실 공간을 협업 중심으로 재설계하게 될 것입니다.

**장기 전망 (2-3년 이상)**
완전한 원격 근무와 사무실 근무 중 하나를 선택하는 이분법적 접근은 사라지고, 직무와 개인 특성에 맞춘 맞춤형 근무 방식이 정착될 것입니다. 메타버스 오피스 등 새로운 형태의 가상 협업 공간이 등장할 수 있습니다.

**예상되는 영향**
- 긍정적: 워라밸 개선, 지역 균형 발전, 사무실 비용 절감
- 부정적: 조직 문화 약화 우려, 세대 간 갈등, 평가의 공정성 이슈
- 중립적: 부동산 시장 재편, 협업 도구 시장 성장

결국 한국 기업들도 글로벌 트렌드를 따라 유연 근무제를 받아들이게 될 것이며, 이는 기업 경쟁력과 직원 만족도 모두를 높이는 방향으로 진화할 것입니다.`,
    confidence: 0.89,
    analyzedAt: '2025-10-31T12:15:00Z'
  }
};

// 랜덤 예시 가져오기
export function getRandomExample(): AnalysisResult {
  const examples = Object.values(exampleAnalyses);
  return examples[Math.floor(Math.random() * examples.length)];
}

// 특정 예시 가져오기
export function getExampleById(id: string): AnalysisResult | undefined {
  return exampleAnalyses[id];
}
