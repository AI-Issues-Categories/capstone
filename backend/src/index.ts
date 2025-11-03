import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { request as undiciRequest } from 'undici';
import type { AnalysisRequest, AnalysisResult, OpinionSource } from './types.js';
import { saveAnalysis, getAnalysis, initDb } from './db.js';
import { searchYouTube } from './services/youtube.js';
import { searchNaverBlog } from './services/naver.js';
import { analyzeWithOpenAI } from './services/openai.js';

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
    const body = req.body as AnalysisRequest;

    // If URL is provided, attempt to fetch page text (simple best-effort)
    let content = body.content || '';
    if (!content && body.url) {
      try {
        const r = await undiciRequest(body.url);
        if (r.statusCode === 200) {
          const html = await r.body.text();
          // naive text extraction
          content = html.replace(/<script[\s\S]*?<\/script>/g, '')
                        .replace(/<style[\s\S]*?<\/style>/g, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .slice(0, 8000);
        }
      } catch {}
    }

    // External sources (best-effort if keys provided)
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
    const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

    const query = content?.slice(0, 80) || body.url || 'AI 정책 논의';

    const [yt, nb] = await Promise.all([
      searchYouTube(query, YOUTUBE_API_KEY, 5),
      searchNaverBlog(query, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, 5),
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

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ detail: 'OPENAI_API_KEY is not configured on the server' });
    }

    const draftReq: AnalysisRequest = { ...body, content };
    const result = await analyzeWithOpenAI(OPENAI_API_KEY, draftReq, {
      youtube: youtubeSources,
      blogs: blogSources,
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
