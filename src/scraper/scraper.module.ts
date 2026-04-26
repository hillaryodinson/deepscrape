import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { StorageService } from './storage.service';
import { ScraperScheduler } from './scraper.scheduler';

@Module({
  providers: [ScraperService, StorageService, ScraperScheduler],
  exports: [ScraperService, StorageService],
})
export class ScraperModule {}
