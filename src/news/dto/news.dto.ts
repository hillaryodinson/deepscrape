import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
  @ApiProperty({ example: 'CBN increases interest rate' })
  title: string;

  @ApiProperty({ example: 'The Central Bank announced...' })
  excerpt: string;

  @ApiProperty({ example: '2026-04-26T10:00:00Z' })
  date: string;

  @ApiProperty({ example: 'Market News' })
  category: string;

  @ApiProperty({ example: 'https://example.com/news/123' })
  link: string;

  @ApiProperty({ example: 'nairametrics' })
  source: string;
}
