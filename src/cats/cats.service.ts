import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';

// for register Injectable data, use this decorator...
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  async create(cat: Cat): Promise<Cat> {
    // actual example is get from some storage..
    // we just this use array. to understand. as simple example.
    this.cats.push(cat);
    return Promise.resolve(this.cats[this.cats.length - 1]);
  }

  async findOne(idx: number): Promise<Cat> {
    return Promise.resolve(this.cats[idx]);
  }

  async findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }
}
