import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsResponseDto } from './dto/news-response.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all news articles' })
  @ApiResponse({ status: 200, type: NewsResponseDto })
  async getAllNews() {
    return this.newsService.getAllNews();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest news articles' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: NewsResponseDto })
  async getLatestNews(@Query('limit') limit?: number) {
    return this.newsService.getLatestNews(limit);
  }
}
