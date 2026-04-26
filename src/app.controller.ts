import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';

@Controller()
export class AppController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async testScrape() {
    return this.scraperService.scrapTodaysMarketNews();
  }
}
