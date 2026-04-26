import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { StorageService } from './storage.service';
import { NewsItem } from './types/news.type';
import { normalizeNewsItem } from './utils/news-normalizer';
import { ScraperEngine } from './scraper.engine';

const url = 'https://nairametrics.com/category/market-news/';

@Injectable()
export class ScraperService {
  constructor(private readonly storageService: StorageService) {}

  private engine = new ScraperEngine();

  async scrapTodaysMarketNews(): Promise<{
    count: number;
    articles: NewsItem[];
  }> {
    const articles = await this.engine.scrape<NewsItem>({
      url,
      itemSelector: '.jeg_post',
      fields: {
        title: 'h3 a',
        link: 'h3 a',
        excerpt: '.jeg_post_excerpt p',
        date: '.jeg_post_meta .jeg_meta_date a',
        category: '.jeg_thumb > .jeg_post_category span a',
      },
      source: 'Nairametrics',
    });

    const todaysArticles = articles.filter((article) => {
      const articleDate = new Date(article.date);
      const today = new Date();
      return (
        articleDate.getDate() === today.getDate() &&
        articleDate.getMonth() === today.getMonth() &&
        articleDate.getFullYear() === today.getFullYear()
      );
    });

    await this.storageService.save(todaysArticles);
    return {
      count: todaysArticles.length,
      articles: todaysArticles,
    };
  }

  async scrapeMarketNews(): Promise<{ count: number; articles: NewsItem[] }> {
    const articles = await this.engine.scrape<NewsItem>({
      url,
      itemSelector: '.jeg_post',
      fields: {
        title: 'h3 a',
        link: 'h3 a',
        excerpt: '.jeg_post_excerpt p',
        date: '.jeg_post_meta .jeg_meta_date a',
        category: '.jeg_thumb > .jeg_post_category span a',
      },
      source: 'Nairametrics',
    });

    await this.storageService.save(articles);
    return {
      count: articles.length,
      articles,
    };
  }
}
