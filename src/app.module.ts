import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScraperModule } from './scraper/scraper.module';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScraperModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class AppModule {}
