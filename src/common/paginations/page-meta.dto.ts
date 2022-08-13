import { ApiProperty } from '@nestjs/swagger';
// import { PageMetaDtoParameters } from '../interfaces';
import { PageOptionsDto } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  @ApiProperty() 
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty({ name: 'item_count' })
  readonly itemCount: number;

  @ApiProperty({ name: 'page_count' })
  readonly pageCount: number;

  @ApiProperty({ name: 'has_previous_page' })
  readonly hasPreviousPage: boolean;

  @ApiProperty({ name: 'has_next_page' })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1; 
    this.hasNextPage = this.page < this.pageCount;
  }
}
