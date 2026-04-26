export interface ScraperConfig {
  url: string;
  itemSelector: string;

  fields: {
    title: string;
    link: string;
    excerpt?: string;
    date?: string;
    category?: string;
  };

  source: string;
}
