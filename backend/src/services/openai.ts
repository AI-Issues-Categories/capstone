import { OpenAI } from 'openai';
import type { AnalysisRequest, AnalysisResult, OpinionSource } from '../types.js';

export interface AnalyzeContextSources {
  youtube: OpinionSource[];
  blogs: OpinionSource[];
}

export async function analyzeWithOpenAI(apiKey: string, req: AnalysisRequest, sources: AnalyzeContextSources): Promise<AnalysisResult> {
  const client = new OpenAI({ apiKey });

  const contentText = req.content ?? '';
  const language = req.language ?? 'auto';

  const system = `You are an expert analyst. Produce a strict JSON object that matches this TypeScript type:
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

  const user = `Analyze the following content (language hint: ${language}). If url is provided, it's the original article: ${req.url ?? ''}.
Content:\n${contentText}

You may also use the following external sources already fetched to enrich opinions (do not invent links; you can include provided ones with reasonable relevanceScore 0-1):
YouTube sources: ${JSON.stringify(sources.youtube)}
Blog sources: ${JSON.stringify(sources.blogs)}

Return ONLY the JSON. Do not include markdown.`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) throw new Error('OpenAI returned empty content');
  const parsed = JSON.parse(raw) as AnalysisResult;
  return parsed;
}
