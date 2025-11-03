import { request } from 'undici';

export interface NaverBlogItem {
  title: string;
  url: string;
  snippet: string;
  postdate?: string; // YYYYMMDD
}

export async function searchNaverBlog(query: string, clientId?: string, clientSecret?: string, display = 5): Promise<NaverBlogItem[]> {
  if (!clientId || !clientSecret) return [];
  const url = new URL('https://openapi.naver.com/v1/search/blog.json');
  url.searchParams.set('query', query);
  url.searchParams.set('display', String(display));
  url.searchParams.set('sort', 'sim');

  const res = await request(url.toString(), {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  });
  if (res.statusCode !== 200) return [];
  const json = (await res.body.json()) as any;
  const items = (json.items ?? []) as any[];
  return items.map((it) => ({
    title: it.title?.replace(/<[^>]+>/g, '') ?? 'Untitled',
    url: it.link,
    snippet: it.description?.replace(/<[^>]+>/g, '') ?? '',
    postdate: it.postdate,
  }));
}
