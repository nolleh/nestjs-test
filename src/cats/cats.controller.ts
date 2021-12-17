import { Controller, Get, Req, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { LoggingInterceptor } from '../logging.interceptor';
import { User } from '../user.decorator';

@Controller('cats')
export class CatsController {
	// - for injection, nest provides values / class / async, sync factories ..
	// - @Optional() decorator for injecting, indicate that can use default values for injected data if not exists.
  // - you can also use propery-based injection.
	// by using @Inject('Property') decorator.  
	constructor(private catsService: CatsService) {}

	@Get('id/:id')
	// using pipe for transform, in handler's parameter level
	// - you can also pass in-place instance, to customize built-in pip's behavior.
	// e.g. @Param('id' new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
	async findOne(@Param('id', ParseIntPipe) id: number, @User('firstName') firstName: string) {
		console.log('findOne.. /id/:'+ id);
		return this.catsService.findOne(id);
	}

	// @Param(key?: string)
	// request lifetime = singleton. (node.js' every request is processed by sep. thread - meaning TLS?)
  @UseInterceptors(LoggingInterceptor)
	@Get()	
	findAll(@Req() request: Request): string {
		console.log('findAll');
		// object or arrary : automatically serialized to JSON
		// primitive type : just return the value
		// status code : 200 by default, except for POST requests which user 201.
		// change status code with adding @HttpCode(...)
		return 'This action return all cats';
	}
}

