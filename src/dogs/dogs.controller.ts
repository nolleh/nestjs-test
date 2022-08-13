import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PageDto, PageOptionsDto } from '../common/paginations';
import { Dog } from '../interfaces/dog.interface';
import { DogService } from './dogs.service';

@Controller('Dogs')
@UseInterceptors(ClassSerializerInterceptor)
export class DogController {
  constructor(private readonly _dogService: DogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDogs(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Dog>> {
    return this._dogService.getDogs(pageOptionsDto);
  }
}
