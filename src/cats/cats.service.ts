import { Injectable } from '@nestjs/common'
import { Cat } from '../interfaces/cat.interface';

// for register Injectable data, use this decorator... 
@Injectable()
export class CatsService {
		private readonly cats: Cat[] = [];

		create(cat: Cat) {
			this.cats.push(cat);
		}
    
		findOne(idx: number) {
			return idx;
			// return this.cats[idx];
		}
		findAll(): Cat[] {
			return this.cats;
		}
}
