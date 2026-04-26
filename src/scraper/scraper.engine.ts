import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScraperConfig } from './types/scraper-config.type';

export class ScraperEngine {
  async scrape<T>(config: ScraperConfig): Promise<T[]> {
    const { data } = await axios.get(config.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    const results: any[] = [];

    $(config.itemSelector).each((_, el) => {
      const item: any = {};

      // ✅ Proper field mapping
      Object.entries(config.fields).forEach(([key, selector]) => {
        if (!selector) return;

        const element = $(el).find(selector);

        if (key === 'link') {
          item[key] = element.attr('href') || null;
        } else {
          item[key] = element.text().trim() || null;
        }
      });

      item.source = config.source;

      if (item.title && item.link) {
        results.push(item);
      }
    });

    return results as T[];
  }
}
