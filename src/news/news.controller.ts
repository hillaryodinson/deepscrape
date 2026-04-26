import { Controller, Get, Query } from '@nestjs/common';
import { count } from 'console';
import { StorageService } from 'src/scraper/storage.service';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAllNews() {
    return this.newsService.getAllNews();
  }

  @Get('latest')
  async getLatestNews(@Query('limit') limit?: string) {
    return this.getLatestNews(limit);
  }
}
