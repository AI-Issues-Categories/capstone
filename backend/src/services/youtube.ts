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

  const res = await request(url.toString());
  if (res.statusCode !== 200) return [];
  const json = (await res.body.json()) as any;
  const items = (json.items ?? []) as any[];
  return items.map((it) => ({
    title: it.snippet?.title ?? 'Untitled',
    url: `https://www.youtube.com/watch?v=${it.id?.videoId}`,
    snippet: it.snippet?.description ?? '',
    publishedAt: it.snippet?.publishedAt,
  }));
}
