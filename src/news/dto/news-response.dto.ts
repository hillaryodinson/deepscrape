import { ApiProperty } from '@nestjs/swagger';
import { NewsDto } from './news.dto';

export class NewsResponseDto {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: [NewsDto] })
  data: NewsDto[];

  @ApiProperty({ example: true })
  cached: boolean;
}
