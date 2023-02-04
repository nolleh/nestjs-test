import { Injectable } from '@nestjs/common';
import { PageDto, PageMetaDto, PageOptionsDto } from '../common/paginations';
import { Dog } from '../interfaces/dog.interface';
import { DogEntity } from '../entities/dog.entity';
import { AppDataSource } from 'data-source';

@Injectable()
export class DogService {
  // constructor(private readonly _dogRepository: DogRepository) {}

  public async getDogs(pageOptionsDto: PageOptionsDto): Promise<PageDto<Dog>> {
    const repository = AppDataSource.getRepository(DogEntity);
    console.log(`how are you, repo?: ${repository}`);
    const queryBuilder = repository.createQueryBuilder('dog');

    queryBuilder
      .orderBy('dog.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
