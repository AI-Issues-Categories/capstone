import { request } from 'undici';

export interface NewsItem {
  title: string;
  url: string;
  snippet: string;
  publishedAt?: string;
  sourceName?: string;
}

// Search news via NewsAPI.org
export async function searchNews(query: string, apiKey?: string, pageSize = 5, language: string = 'ko'): Promise<NewsItem[]> {
  if (!apiKey) return [];
  const url = new URL('https://newsapi.org/v2/everything');
  url.searchParams.set('q', query);
  url.searchParams.set('language', language);
  url.searchParams.set('sortBy', 'publishedAt');
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('apiKey', apiKey);

  const res = await request(url.toString());
  if (res.statusCode !== 200) return [];
  const json = (await res.body.json()) as any;
  const articles = (json.articles ?? []) as any[];
  return articles.map((a) => ({
    title: a.title ?? 'Untitled',
    url: a.url,
    snippet: a.description ?? a.content ?? '',
    publishedAt: a.publishedAt,
    sourceName: a.source?.name,
  }));
}
