import { Injectable } from '@nestjs/common';
import { PageDto, PageMetaDto, PageOptionsDto } from '../common/paginations';
import { Dog } from '../interfaces/dog.interface';
import { DogRepository } from '../repositories/dog.repository';

@Injectable()
export class DogService {
  constructor(private readonly _dogRepository: DogRepository) {}

  public async getDogs(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Dog>> {
    console.log(`how are you, repo?: ${this._dogRepository}`);
    const queryBuilder = this._dogRepository.createQueryBuilder('dog');

    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
