import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScraperService } from './scraper.service';

@Injectable()
export class ScraperScheduler {
  private readonly logger = new Logger(ScraperScheduler.name);

  constructor(private readonly scraperService: ScraperService) {
    console.log('🟢 ScraperScheduler initialized');
  }

  // ⏱ every 15 minutes
  @Cron('0 */15 * * * *')
  async handleScraping() {
    this.logger.log('Running scheduled scraping...');

    try {
      const data = await this.scraperService.scrapeMarketNews();

      this.logger.log(`Scraped ${data.count} articles`);
    } catch (err) {
      this.logger.error('Scraping failed', err);
    }
  }
}
