import { Pool } from 'pg';
import dotenv from 'dotenv';
import type { AnalysisResult } from './types.js';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

let pool: Pool | null = null;
if (DATABASE_URL) {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: getSSL(),
    connectionTimeoutMillis: 10000, // fail fast if DB is unreachable
  });
}

function getSSL() {
  // Enable SSL if running on typical AWS RDS with enforced SSL
  // Can be tuned by env later; here we allow default false that most local setups prefer
  if (process.env.PGSSLMODE === 'require') {
    return { rejectUnauthorized: false } as any;
  }
  return undefined as any;
}

// Fallback in-memory store when no DB configured
const memoryStore = new Map<string, AnalysisResult>();

export async function initDb() {
  if (!pool) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS analyses (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    // Optional helpful index for keywords or timestamps
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses (created_at);`);
  } catch (err) {
    console.warn('[DB] Failed to initialize DB, falling back to in-memory store:', (err as any)?.message);
    // Fall back to in-memory to keep server usable
    pool = null;
  }
}

export async function saveAnalysis(result: AnalysisResult) {
  if (!pool) {
    memoryStore.set(result.analysisId, result);
    return;
  }
  await pool.query('INSERT INTO analyses (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data', [
    result.analysisId,
    result,
  ]);
}

export async function getAnalysis(id: string): Promise<AnalysisResult | null> {
  if (!pool) {
    return memoryStore.get(id) ?? null;
  }
  const res = await pool.query('SELECT data FROM analyses WHERE id = $1', [id]);
  if (res.rows.length === 0) return null;
  return res.rows[0].data as AnalysisResult;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
}

export async function listAnalyses(opts: ListOptions = {}): Promise<AnalysisResult[]> {
  const limit = Math.max(1, Math.min(200, opts.limit ?? 20));
  const offset = Math.max(0, opts.offset ?? 0);
  if (!pool) {
    // Memory store doesn't support pagination well; emulate
    return Array.from(memoryStore.values()).slice(offset, offset + limit);
  }
  const res = await pool.query('SELECT data FROM analyses ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
  return res.rows.map((r) => r.data as AnalysisResult);
}
