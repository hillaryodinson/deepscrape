import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScraperModule, ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService],
})
export class AppModule {}
