# OpinionMap Backend API 구현 가이드

## 개요
OpinionMap의 백엔드는 FastAPI + PostgreSQL + pgvector로 구성됩니다.
사용자가 입력한 뉴스나 블로그 글을 OpenAI API로 분석하고, 인터넷에서 관련 의견을 찾아 구조화합니다.

> 💡 **참고**: 실제 분석 결과 예시를 확인하려면 [ANALYSIS_EXAMPLES.md](./ANALYSIS_EXAMPLES.md) 파일을 참고하세요.  
> 4가지 실제 예시 데이터를 제공하며, 웹 인터페이스에서 바로 체험할 수 있습니다.

## 필수 기술 스택

### Backend Framework
- **FastAPI**: Python 기반 고성능 웹 프레임워크
- **Uvicorn**: ASGI 서버

### Database
- **PostgreSQL**: 메인 데이터베이스
- **pgvector**: 벡터 유사도 검색을 위한 PostgreSQL 확장

### AI/ML
- **OpenAI API**: 콘텐츠 분석 및 의견 분류
  - GPT-4 또는 GPT-3.5-turbo 사용 권장
- **LangChain** (선택사항): AI 워크플로우 관리

### External APIs
- **News API** 또는 **Google News API**: 뉴스 검색
- **YouTube Data API**: 유튜브 영상 검색
- **Bing Search API** 또는 **Google Custom Search**: 블로그 검색

## API 엔드포인트 설계

### 1. 콘텐츠 분석 API

#### POST /api/analyze
뉴스 글이나 URL을 입력받아 AI로 분석하고 관련 의견을 찾습니다.

**Request Body:**
```json
{
  "content": "전체 뉴스 기사 텍스트...",  // 텍스트 직접 입력
  "url": "https://example.com/article",  // 또는 URL
  "language": "ko"                        // 언어 코드
}
```

**Response:**
```json
{
  "analysisId": "uuid-here",
  "isValid": true,
  "invalidReason": null,
  "originalContent": {
    "title": "AI 윤리 규제 법안, 국회 본격 논의 시작",
    "summary": "요약된 내용...",
    "detectedLanguage": "ko"
  },
  "keywords": ["AI", "규제", "윤리", "법안"],
  "supportOpinions": [
    {
      "title": "관련 뉴스 제목",
      "url": "https://...",
      "source": "출처명",
      "sourceType": "news",
      "snippet": "발췌문...",
      "publishedDate": "2025-10-30",
      "relevanceScore": 0.95
    }
  ],
  "opposeOpinions": [...],
  "neutralOpinions": [...],
  "alternativeOpinions": [...],
  "futurePrediction": "AI가 예측한 미래 전망...",
  "confidence": 0.87,
  "analyzedAt": "2025-10-31T10:30:00Z"
}
```

### 2. 분석 결과 조회

#### GET /api/analysis/{analysisId}
저장된 분석 결과를 조회합니다.

**Response:**
위의 analyze 응답과 동일한 형식

### 3. 분석 결과 저장

#### POST /api/analysis/save
분석 결과를 데이터베이스에 저장합니다.

**Request Body:**
analyze API의 응답 형식과 동일

## 백엔드 구현 상세

### 1. OpenAI API 활용 - 콘텐츠 분석

```python
import openai
from typing import Dict, List

async def analyze_content_with_openai(content: str, language: str) -> Dict:
    """
    OpenAI GPT를 사용하여 콘텐츠 분석
    """
    
    # 1단계: 콘텐츠 유효성 검증
    validation_prompt = f"""
    다음 텍스트가 뉴스 기사나 이슈 분석에 적합한 내용인지 판단해주세요.
    광고, 스팸, 개인 일기, 의미 없는 내용은 부적합으로 판단합니다.
    
    텍스트: {content[:500]}
    
    JSON 형식으로 응답:
    {{
        "isValid": true/false,
        "reason": "판단 이유"
    }}
    """
    
    validation_result = await openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": validation_prompt}],
        response_format={"type": "json_object"}
    )
    
    validation = json.loads(validation_result.choices[0].message.content)
    
    if not validation["isValid"]:
        return {
            "isValid": False,
            "invalidReason": validation["reason"]
        }
    
    # 2단계: 키워드 추출 및 요약
    analysis_prompt = f"""
    다음 뉴스 기사를 분석해주세요:
    
    {content}
    
    다음 정보를 JSON 형식으로 추출:
    {{
        "title": "기사 제목 (없으면 생성)",
        "summary": "200자 이내 요약",
        "keywords": ["키워드1", "키워드2", ...],  // 5-10개
        "mainTopic": "주요 주제",
        "stance": "support/oppose/neutral/alternative"  // 기사의 입장
    }}
    """
    
    analysis_result = await openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": analysis_prompt}],
        response_format={"type": "json_object"}
    )
    
    analysis = json.loads(analysis_result.choices[0].message.content)
    
    return analysis
```

### 2. 인터넷에서 관련 의견 검색

```python
async def search_related_opinions(
    keywords: List[str], 
    main_topic: str
) -> Dict[str, List[OpinionSource]]:
    """
    뉴스, 유튜브, 블로그에서 관련 의견 검색
    """
    
    # 검색 쿼리 생성
    search_queries = {
        "support": f"{main_topic} 찬성 OR 지지 OR 필요성",
        "oppose": f"{main_topic} 반대 OR 우려 OR 문제점",
        "neutral": f"{main_topic} 분석 OR 전망",
        "alternative": f"{main_topic} 대안 OR 개선방안"
    }
    
    opinions = {
        "support": [],
        "oppose": [],
        "neutral": [],
        "alternative": []
    }
    
    for stance, query in search_queries.items():
        # 뉴스 검색 (News API 사용)
        news_results = await search_news(query)
        
        # 유튜브 검색 (YouTube Data API 사용)
        youtube_results = await search_youtube(query)
        
        # 블로그 검색 (Bing Search API 사용)
        blog_results = await search_blogs(query)
        
        # AI로 각 결과의 관련성 판단 및 분류
        for result in news_results + youtube_results + blog_results:
            relevance = await classify_opinion_with_ai(
                result["snippet"],
                main_topic,
                stance
            )
            
            if relevance["score"] > 0.7:  # 관련성 70% 이상만
                opinions[stance].append({
                    "title": result["title"],
                    "url": result["url"],
                    "source": result["source"],
                    "sourceType": result["type"],  # news/youtube/blog
                    "snippet": result["snippet"],
                    "publishedDate": result["date"],
                    "relevanceScore": relevance["score"]
                })
    
    # 각 입장별로 관련도 순으로 정렬하고 상위 2-3개만 선택
    for stance in opinions:
        opinions[stance] = sorted(
            opinions[stance], 
            key=lambda x: x["relevanceScore"], 
            reverse=True
        )[:3]
    
    return opinions
```

### 3. AI 기반 의견 분류

```python
async def classify_opinion_with_ai(
    snippet: str, 
    main_topic: str, 
    expected_stance: str
) -> Dict:
    """
    OpenAI로 의견의 입장 및 관련성 판단
    """
    
    prompt = f"""
    주제: {main_topic}
    예상 입장: {expected_stance}
    
    다음 텍스트가 위 주제에 대해 {expected_stance} 입장을 취하고 있는지,
    그리고 얼마나 관련이 있는지 판단해주세요:
    
    텍스트: {snippet}
    
    JSON 형식으로 응답:
    {{
        "isRelevant": true/false,
        "score": 0.0-1.0,  // 관련성 점수
        "actualStance": "support/oppose/neutral/alternative",
        "reasoning": "판단 근거"
    }}
    """
    
    result = await openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # 분류는 3.5로도 충분
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    classification = json.loads(result.choices[0].message.content)
    return classification
```

### 4. 미래 예측 생성

```python
async def generate_future_prediction(
    main_topic: str,
    keywords: List[str],
    all_opinions: Dict[str, List[OpinionSource]]
) -> str:
    """
    수집된 의견을 바탕으로 미래 전망 생성
    """
    
    # 모든 의견 요약
    opinions_summary = []
    for stance, opinions in all_opinions.items():
        for opinion in opinions:
            opinions_summary.append(f"[{stance}] {opinion['snippet'][:200]}")
    
    prompt = f"""
    주제: {main_topic}
    키워드: {', '.join(keywords)}
    
    다양한 의견들:
    {chr(10).join(opinions_summary)}
    
    위 의견들을 종합하여 이 이슈의 미래 전망을 작성해주세요.
    다음 구조로 작성:
    1. 단기 전망 (6개월-1년)
    2. 중기 전망 (1-2년)
    3. 장기 전망 (2-3년 이상)
    4. 예상되는 영향 (긍정적/부정적/중립적)
    
    한국어로, 객관적이고 균형잡힌 시각으로 작성해주세요.
    """
    
    result = await openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    
    prediction = result.choices[0].message.content
    return prediction
```

### 5. 외부 API 검색 예시

```python
import aiohttp
from datetime import datetime, timedelta

async def search_news(query: str, max_results: int = 10) -> List[Dict]:
    """
    News API를 사용한 뉴스 검색
    """
    NEWS_API_KEY = "your-news-api-key"
    
    # 최근 7일 이내 뉴스만 검색
    from_date = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
    
    async with aiohttp.ClientSession() as session:
        async with session.get(
            'https://newsapi.org/v2/everything',
            params={
                'q': query,
                'from': from_date,
                'language': 'ko',
                'sortBy': 'relevancy',
                'pageSize': max_results,
                'apiKey': NEWS_API_KEY
            }
        ) as response:
            data = await response.json()
            
            results = []
            for article in data.get('articles', []):
                results.append({
                    'title': article['title'],
                    'url': article['url'],
                    'source': article['source']['name'],
                    'type': 'news',
                    'snippet': article['description'] or article['content'][:300],
                    'date': article['publishedAt'][:10]
                })
            
            return results

async def search_youtube(query: str, max_results: int = 10) -> List[Dict]:
    """
    YouTube Data API를 사용한 검색
    """
    YOUTUBE_API_KEY = "your-youtube-api-key"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(
            'https://www.googleapis.com/youtube/v3/search',
            params={
                'part': 'snippet',
                'q': query,
                'type': 'video',
                'maxResults': max_results,
                'order': 'relevance',
                'key': YOUTUBE_API_KEY
            }
        ) as response:
            data = await response.json()
            
            results = []
            for item in data.get('items', []):
                results.append({
                    'title': item['snippet']['title'],
                    'url': f"https://youtube.com/watch?v={item['id']['videoId']}",
                    'source': item['snippet']['channelTitle'],
                    'type': 'youtube',
                    'snippet': item['snippet']['description'][:300],
                    'date': item['snippet']['publishedAt'][:10]
                })
            
            return results

async def search_blogs(query: str, max_results: int = 10) -> List[Dict]:
    """
    Bing Search API를 사용한 블로그 검색
    """
    BING_API_KEY = "your-bing-api-key"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(
            'https://api.bing.microsoft.com/v7.0/search',
            headers={'Ocp-Apim-Subscription-Key': BING_API_KEY},
            params={
                'q': f'{query} blog',
                'count': max_results,
                'mkt': 'ko-KR'
            }
        ) as response:
            data = await response.json()
            
            results = []
            for item in data.get('webPages', {}).get('value', []):
                if 'blog' in item['url'].lower():
                    results.append({
                        'title': item['name'],
                        'url': item['url'],
                        'source': item['displayUrl'].split('/')[0],
                        'type': 'blog',
                        'snippet': item['snippet'],
                        'date': datetime.now().strftime('%Y-%m-%d')
                    })
            
            return results
```

## 데이터베이스 스키마

```sql
-- 분석 결과 테이블
CREATE TABLE analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_content JSONB NOT NULL,
    keywords TEXT[] NOT NULL,
    embedding VECTOR(1536),  -- OpenAI ada-002 임베딩
    confidence FLOAT NOT NULL,
    analyzed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 의견 소스 테이블
CREATE TABLE opinion_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES analysis_results(id),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    source TEXT NOT NULL,
    source_type VARCHAR(20) NOT NULL,  -- news, youtube, blog
    snippet TEXT NOT NULL,
    stance VARCHAR(20) NOT NULL,  -- support, oppose, neutral, alternative
    relevance_score FLOAT NOT NULL,
    published_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 미래 예측 테이블
CREATE TABLE future_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES analysis_results(id),
    prediction_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_analysis_embedding ON analysis_results USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_opinion_analysis ON opinion_sources(analysis_id);
CREATE INDEX idx_opinion_stance ON opinion_sources(stance);
```

## 환경 변수 설정

```bash
# .env 파일
DATABASE_URL=postgresql://user:password@localhost:5432/opinionmap
OPENAI_API_KEY=sk-...
NEWS_API_KEY=...
YOUTUBE_API_KEY=...
BING_API_KEY=...
```

## 실행 방법

```bash
# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install fastapi uvicorn openai psycopg2-binary pgvector aiohttp python-dotenv

# 서버 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 프론트엔드 연결

프론트엔드에서 환경 변수 설정:

```bash
# .env 파일
VITE_API_URL=http://localhost:8000
```

이제 `/components/IssueAnalysis.tsx`에서 실제 API를 호출하려면:

```typescript
// analyzeContent 함수에서 getDemoAnalysisResult() 대신:
const result = await analyzeContent({ content, url, language });
```

## 주의사항

1. **API 비용**: OpenAI API, News API 등은 유료이므로 사용량 모니터링 필요
2. **Rate Limiting**: 각 외부 API의 요청 제한 확인 및 준수
3. **캐싱**: 동일한 콘텐츠 재분석 방지를 위한 캐싱 구현 권장
4. **에러 처리**: 외부 API 실패 시 fallback 로직 필요
5. **보안**: API 키는 절대 프론트엔드에 노출하지 않고 백엔드에서만 사용

## 개선 제안

1. **Redis 캐싱**: 분석 결과 캐싱으로 응답 속도 개선
2. **큐 시스템**: Celery + Redis로 비동기 분석 처리
3. **웹 스크래핑**: URL 입력 시 BeautifulSoup으로 콘텐츠 추출
4. **다국어 지원**: 언어별 최적화된 검색 쿼리
5. **사용자 피드백**: 분석 결과에 대한 사용자 평가 수집

## 예시 데이터 활용

프론트엔드에는 이미 완성도 높은 예시 데이터가 준비되어 있습니다:

- `/components/api/exampleAnalyses.ts` - 4가지 실제 분석 예시
- AI 윤리 규제 법안 (한국어)
- **전기차 배터리 화재 안전 (한국어) ⭐ 신규 추가**
- Global Carbon Tax (English)
- 원격근무 vs 사무실 복귀 (한국어)

이 예시들은 실제 API 응답 형식과 동일하며, 백엔드 구현 시 참고할 수 있습니다.

자세한 내용은 [ANALYSIS_EXAMPLES.md](./ANALYSIS_EXAMPLES.md)를 참조하세요.

## 참고 자료

- [FastAPI 공식 문서](https://fastapi.tiangolo.com/)
- [OpenAI API 문서](https://platform.openai.com/docs)
- [pgvector 문서](https://github.com/pgvector/pgvector)
- [News API 문서](https://newsapi.org/docs)
- [YouTube Data API 문서](https://developers.google.com/youtube/v3)
- [OpinionMap 분석 예시 가이드](./ANALYSIS_EXAMPLES.md)
