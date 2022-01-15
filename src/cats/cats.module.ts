import { Module, DynamicModule } from '@nestjs/common'
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})

export class CatsModule {
  // a module class can inject providers as well.
  constructor(private catsService: CatsService) {}
  // you can also use dynamic module.
  // dynamically define module.
  static forRoot(entities = [], options?): DynamicModule {
    // const providers = createDatabaseProviders(options, entities);
    // the returned properties are added to default modules' decorator.
    return {
      // module: DatabaseModule,
      module: CatsModule,
      // providers: providers,
      // exports: providers,
    };
  }
}

