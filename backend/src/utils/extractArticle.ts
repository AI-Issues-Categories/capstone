import { request } from 'undici';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export async function extractReadableTextFromUrl(url: string): Promise<{ title?: string; text: string } | null> {
  try {
    const res = await request(url);
    if (res.statusCode !== 200) return null;
    const html = await res.body.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    if (article && article.textContent) {
      const text = article.textContent.replace(/\s+/g, ' ').trim().slice(0, 12000);
      return { title: article.title || undefined, text };
    }
    // Fallback naive extraction
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 8000)
      .trim();
    return { text };
  } catch {
    return null;
  }
}
