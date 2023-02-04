import { ApiProperty } from '@nestjs/swagger';

export class Dog {
  // you must inform property data to swagger's Module, to swagger test
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
