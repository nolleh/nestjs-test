import { AbstractEntity } from './abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'dogs' })
export class DogEntity extends AbstractEntity {
  @Column()
  public name: string;

  @Column()
  public age: number;

  @Column()
  public breed: string;
}
