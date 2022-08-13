import { Module, DynamicModule } from '@nestjs/common';
import { DogController } from './dogs.controller';
import { DogService } from './dogs.service';
import { DogRepository } from '../repositories/dog.repository';

@Module({
  controllers: [DogController],
  providers: [DogService, DogRepository],
})
export class DogModule {
  // a module class can inject providers as well.
  constructor(private dogService: DogService) {}
  // you can also use dynamic module.
  // dynamically define module.
  static forRoot(entities = [], options?): DynamicModule {
    // const providers = createDatabaseProviders(options, entities);
    // the returned properties are added to default modules' decorator.
    return {
      // module: DatabaseModule,
      module: DogModule,
      // providers: providers,
      // exports: providers,
    };
  }
}
