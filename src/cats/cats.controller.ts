import { Controller, Get, Req } from '@nestjs/common'
import { CatsService } from './cats.service'
import { Request } from 'express'

@Controller('cats')
export class CatsController {
	// - for injection, nest provides values / class / async, sync factories ..
	// - @Optional() decorator for injecting, indicate that can use default values for injected data if not exists.
  // - you can also use propery-based injection.
	// by using @Inject('Property') decorator.  
	constructor(private catsService: CatsService) {}

	@Get(':id')
	// @Param(key?: string)
	// request lifetime = singleton. (node.js' every request is processed by sep. thread - meaning TLS?)
	findAll(@Req() request: Request): string {
		console.log(request.params.id);
		// object or arrary : automatically serialized to JSON
		// primitive type : just return the value
		// status code : 200 by default, except for POST requests which user 201.
		// change status code with adding @HttpCode(...)
		return 'This action return all cats';
	}
}

