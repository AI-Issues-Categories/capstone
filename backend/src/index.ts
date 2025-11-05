import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { request as undiciRequest } from 'undici';
import type { AnalysisRequest, AnalysisResult, OpinionSource } from './types.js';
import { saveAnalysis, getAnalysis, initDb, listAnalyses } from './db.js';
import { searchYouTube } from './services/youtube.js';
import { searchNaverBlog } from './services/naver.js';
import { analyzeWithOpenAI, filterContentWithOpenAI } from './services/openai.js';
import { extractReadableTextFromUrl } from './utils/extractArticle.js';
import { extractTopKeywords } from './utils/keywords.js';
import { searchNews } from './services/news.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = Number(process.env.PORT || 8000);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

// Analyze endpoint expected by front
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
  const body = req.body as AnalysisRequest & { text?: string };

    // If URL is provided, attempt to fetch page text (simple best-effort)
  let content = body.content || body.text || '';
    if (!content && body.url) {
      const art = await extractReadableTextFromUrl(body.url);
      if (art?.text) {
        content = art.text;
        if (!body.content && art.title) {
          // Attach title hint at the beginning for better context
          content = `${art.title}\n\n${content}`;
        }
      }
    }

    // Quick validation with OpenAI (stage 1)
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ detail: 'OPENAI_API_KEY is not configured on the server' });
    }

    const filter = await filterContentWithOpenAI(OPENAI_API_KEY, { ...body, content });
    if (!filter.isValid) {
      const invalid: AnalysisResult = {
        analysisId: randomUUID(),
        isValid: false,
        invalidReason: filter.invalidReason || 'Not a valid news article',
        originalContent: {
          title: undefined,
          summary: filter.summary || '',
          detectedLanguage: filter.detectedLanguage || (body.language ?? 'auto'),
        },
        keywords: filter.keywords ?? [],
        supportOpinions: [],
        opposeOpinions: [],
        neutralOpinions: [],
        alternativeOpinions: [],
        futurePrediction: '',
        confidence: 0.2,
        analyzedAt: new Date().toISOString(),
      };
      // Save also invalid to keep audit trail
      await saveAnalysis(invalid);
      return res.json(invalid);
    }

    // External sources (stage 2, best-effort if keys provided)
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
    const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
  const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

    let query = content?.slice(0, 80) || body.url || 'AI 정책 논의';
    const kws = extractTopKeywords(content);
    if (kws.length >= 2) {
      query = kws.slice(0, 5).join(' ');
    }

    const [yt, nb, nw] = await Promise.all([
      searchYouTube(query, YOUTUBE_API_KEY, 5),
      searchNaverBlog(query, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, 5),
      searchNews(query, NEWSAPI_KEY, 5, (body.language ?? 'ko')),
    ]);

    const youtubeSources: OpinionSource[] = yt.map((i) => ({
      title: i.title,
      url: i.url,
      source: 'YouTube',
      sourceType: 'youtube',
      snippet: i.snippet,
      publishedDate: i.publishedAt,
      relevanceScore: 0.7,
    }));

    const blogSources: OpinionSource[] = nb.map((i) => ({
      title: i.title,
      url: i.url,
      source: 'Naver Blog',
      sourceType: 'blog',
      snippet: i.snippet,
      publishedDate: i.postdate,
      relevanceScore: 0.7,
    }));

    const newsSources: OpinionSource[] = nw.map((i) => ({
      title: i.title,
      url: i.url,
      source: i.sourceName || 'News',
      sourceType: 'news',
      snippet: i.snippet,
      publishedDate: i.publishedAt,
      relevanceScore: 0.75,
    }));

    const draftReq: AnalysisRequest = { ...body, content };
    const result = await analyzeWithOpenAI(OPENAI_API_KEY, draftReq, {
      youtube: youtubeSources,
      blogs: blogSources,
      news: newsSources,
    });

    // ensure analysisId/analyzedAt
    const analysisId = result.analysisId || randomUUID();
    const analyzedAt = result.analyzedAt || new Date().toISOString();
    const normalized: AnalysisResult = { ...result, analysisId, analyzedAt };

    // save
    await saveAnalysis(normalized);

    res.json(normalized);
  } catch (err: any) {
    console.error('Analyze error', err);
    res.status(500).json({ detail: err?.message || 'Internal Server Error' });
  }
});

app.get('/api/analysis/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const found = await getAnalysis(id);
    if (!found) return res.status(404).json({ detail: 'Not found' });
    res.json(found);
  } catch (err: any) {
    res.status(500).json({ detail: err?.message || 'Internal Server Error' });
  }
});

// List analyses for dashboards (simple pagination)
app.get('/api/analyses/all', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.max(1, Math.min(100, Number(req.query.pageSize || 20)));
    const offset = (page - 1) * pageSize;
    const items = await listAnalyses({ limit: pageSize, offset });
    res.json({ page, pageSize, items });
  } catch (err: any) {
    res.status(500).json({ detail: err?.message || 'Internal Server Error' });
  }
});

app.post('/api/analysis/save', async (req: Request, res: Response) => {
  try {
    const payload = req.body as AnalysisResult;
    if (!payload?.analysisId) payload.analysisId = randomUUID();
    if (!payload?.analyzedAt) payload.analyzedAt = new Date().toISOString();
    await saveAnalysis(payload);
    res.json({ ok: true, analysisId: payload.analysisId });
  } catch (err: any) {
    res.status(500).json({ detail: err?.message || 'Internal Server Error' });
  }
});

async function start() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

start();
