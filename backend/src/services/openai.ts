import { OpenAI } from 'openai';
import type { AnalysisRequest, AnalysisResult, OpinionSource } from '../types.js';

export interface AnalyzeContextSources {
  youtube: OpinionSource[];
  blogs: OpinionSource[];
  news: OpinionSource[];
}

export interface FilterResult {
  isValid: boolean;
  invalidReason?: string;
  summary?: string;
  detectedLanguage?: string;
  keywords?: string[];
}

// Quick filter to decide if content is a valid news-like article and extract minimal metadata
export async function filterContentWithOpenAI(apiKey: string, req: AnalysisRequest): Promise<FilterResult> {
  const client = new OpenAI({ apiKey });
  const contentText = (req.content ?? '').slice(0, 4000);
  const language = req.language ?? 'auto';

  const system = `You are a strict content validator. Decide if the given text (possibly with a URL) is a news article or substantive report suitable for analysis. Avoid spam, ads, non-news, or trivial content. Return a compact JSON with fields: isValid (boolean), invalidReason (string? if not valid), summary (<=80 words), detectedLanguage (ISO 639-1 or 'auto'), keywords (5-10).`;
  const user = `URL: ${req.url ?? ''}
LANG_HINT: ${language}
TEXT:\n${contentText}

Return ONLY JSON.`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0,
    response_format: { type: 'json_object' },
  });
  const raw = response.choices[0]?.message?.content;
  if (!raw) throw new Error('OpenAI filter returned empty content');
  const parsed = JSON.parse(raw) as FilterResult;
  return parsed;
}

export async function analyzeWithOpenAI(apiKey: string, req: AnalysisRequest, sources: AnalyzeContextSources): Promise<AnalysisResult> {
  const client = new OpenAI({ apiKey });

  const contentText = req.content ?? '';
  const language = req.language ?? 'auto';

  const system = `You are an expert policy and technology analyst. Produce a strict JSON object matching this TypeScript type and constraints:
interface AnalysisResult {
  analysisId: string;
  isValid: boolean;
  invalidReason?: string;
  originalContent: { title?: string; summary: string; detectedLanguage: string; };
  keywords: string[];
  supportOpinions: OpinionSource[];
  opposeOpinions: OpinionSource[];
  neutralOpinions: OpinionSource[];
  alternativeOpinions: OpinionSource[];
  futurePrediction: string;
  confidence: number;
  analyzedAt: string;
}
interface OpinionSource { title: string; url: string; source: string; sourceType: 'news' | 'youtube' | 'blog'; snippet: string; publishedDate?: string; relevanceScore?: number; }`;

  const user = `Analyze the following content (language hint: ${language}). If url is provided, it's likely the original article: ${req.url ?? ''}.
Content (trimmed):\n${contentText}

Use ONLY the provided external sources to support/oppose/neutral opinions. Do not invent URLs. Assign a relevanceScore in [0,1]. Keep summaries concise and faithful to the content. If the content is too short or unclear, set isValid=false with invalidReason.
Constraints:
- originalContent.summary: <= 120 words, in the detected language
- detectedLanguage: ISO 639-1 code if obvious, else 'auto'
- keywords: 5-10 salient terms from the content (not generic words)
- support/oppose: Each 2-5 items, referencing provided sources only; include a short one-sentence rationale derived from the content and source snippet
- neutralOpinions: 1-3 balanced views, also grounded in sources
- alternativeOpinions: 1-3 plausible alternatives or angles (ground in content or sources; no speculation beyond them)
- futurePrediction: 1-2 sentences, bounded and content-grounded
- confidence: number in [0,1]

External sources (JSON):
YouTube sources: ${JSON.stringify(sources.youtube)}
Blog sources: ${JSON.stringify(sources.blogs)}
News sources: ${JSON.stringify(sources.news)}

Return ONLY the JSON. Do not include markdown.`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) throw new Error('OpenAI returned empty content');
  const parsed = JSON.parse(raw) as AnalysisResult;
  return parsed;
}
