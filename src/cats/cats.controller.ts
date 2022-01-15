import { Controller, Get, Post, Body, Req, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { LoggingInterceptor } from '../logging.interceptor';
import { User } from '../user.decorator';
import { Cat } from '../interfaces/cat.interface';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger'

@Controller('cats')
@ApiTags('Cat Api')
export class CatsController {
	// - for injection, nest provides values / class / async, sync factories ..
	// - @Optional() decorator for injecting, indicate that can use default values for injected data if not exists.
  // - you can also use propery-based injection.
	// by using @Inject('Property') decorator.  
	constructor(private catsService: CatsService) {}
 
	@Post('id/:id')
	@ApiOperation( { summary: 'Create Cat', description: 'createCat' })
	@ApiCreatedResponse( { description: 'create cat', type : Cat })
	async create(@Body() cat: Cat): Promise<Cat> {
		console.log(`create: ${cat.name}`);
		return await this.catsService.create(cat);
	}

	@Get('id/:id')
	// Makes swagger say it's example response.
  @ApiCreatedResponse( { description: 'find cat', type: Cat })	
	// using pipe for transform, in handler's parameter level
	// - you can also pass in-place instance, to customize built-in pip's behavior.
	// e.g. @Param('id' new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
	async findOne(@Param('id', ParseIntPipe) id: number, @User('firstName') firstName: string): Promise<Cat> {
		console.log('findOne.. /id/:'+ id);
		return await this.catsService.findOne(id);
	}

	// @Param(key?: string)
	// request lifetime = singleton. (node.js' every request is processed by sep. thread - meaning TLS?)
  @UseInterceptors(LoggingInterceptor)
	@Get()	
	async findAll(@Req() request: Request): Promise<Cat[]> {
		console.log('findAll');
		// object or arrary : automatically serialized to JSON
		// primitive type : just return the value
		// status code : 200 by default, except for POST requests which user 201.
		// change status code with adding @HttpCode(...)
		return await this.catsService.findAll();
	}
}

