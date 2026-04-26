import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

const FILE_PATH = './data/market-news.json';
@Injectable()
export class StorageService {
  // Implementation for storing scraped data
  async save(newData: any[]) {
    const existingData = await this.read();

    const merged = this.mergeAndDeduplicate(existingData, newData);

    await fs.writeJson(FILE_PATH, merged, { spaces: 2 });

    return merged;
  }

  async read() {
    const exists = await fs.pathExists(FILE_PATH);

    if (!exists) {
      return [];
    }

    return await fs.readJson(FILE_PATH);
  }

  private mergeAndDeduplicate(existing: any[], incoming: any[]) {
    const map = new Map<string, any>();

    const makeKey = (item: any) => {
      return item.link; // 👈 strongest unique identifier for news
    };

    // add existing first
    for (const item of existing) {
      if (item?.link) {
        map.set(makeKey(item), item);
      }
    }

    // add new (overwrites duplicates if same link)
    for (const item of incoming) {
      if (item?.link) {
        map.set(makeKey(item), item);
      }
    }

    return Array.from(map.values());
  }
}
