import { NewsItem } from '../types/news.type';

export function normalizeNewsItem(data: Partial<NewsItem>): NewsItem {
  return {
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || new Date().toISOString(),
    category: data.category || 'general',
    link: data.link || '',
    source: data.source || 'unknown',
  };
}
