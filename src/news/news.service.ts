import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/scraper/storage.service';

@Injectable()
export class NewsService {
  constructor(private readonly storage: StorageService) {}

  async getAllNews() {
    const data = await this.storage.read();

    return {
      count: data.length,
      data,
    };
  }

  async getLatestNews(limit = 10) {
    const data = await this.storage.read();

    const sorted = data.sort((a, b) => {
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    });

    return {
      count: Math.min(limit, sorted.length),
      data: sorted.slice(0, limit),
    };
  }
}
