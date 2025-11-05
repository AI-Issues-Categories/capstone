import { request } from 'undici';

export interface YouTubeItem {
  title: string;
  url: string;
  snippet: string;
  publishedAt?: string;
}

export async function searchYouTube(query: string, apiKey?: string, maxResults = 5): Promise<YouTubeItem[]> {
  if (!apiKey) return [];
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', String(maxResults));
  url.searchParams.set('key', apiKey);

  const attempts = 2;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await request(url.toString(), { headersTimeout: 5000, bodyTimeout: 5000, maxRedirections: 2 });
      if (res.statusCode !== 200) continue;
      const json = (await res.body.json()) as any;
      const items = (json.items ?? []) as any[];
      return items.map((it) => ({
        title: it.snippet?.title ?? 'Untitled',
        url: `https://www.youtube.com/watch?v=${it.id?.videoId}`,
        snippet: it.snippet?.description ?? '',
        publishedAt: it.snippet?.publishedAt,
      }));
    } catch {
      // wait briefly then retry
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return [];
}
