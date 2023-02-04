import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  // you must inform property data to swagger's Module, to swagger test
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  homeState: string;
}
