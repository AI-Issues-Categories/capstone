export interface AnalysisRequest {
  content?: string;
  url?: string;
  language?: string;
}

export interface OpinionSource {
  title: string;
  url: string;
  source: string;
  sourceType: 'news' | 'youtube' | 'blog';
  snippet: string;
  publishedDate?: string;
  relevanceScore?: number;
}

export interface AnalysisResult {
  analysisId: string;
  isValid: boolean;
  invalidReason?: string;
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
  confidence: number;
  analyzedAt: string;
}
