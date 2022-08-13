import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { DogEntity } from "../entities/dog.entity";

@EntityRepository(DogEntity)
export class DogRepository extends Repository<DogEntity> {}
