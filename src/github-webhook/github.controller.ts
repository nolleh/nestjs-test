import { Body, Controller, Req, Post } from '@nestjs/common';
import { GithubDto } from './github.dto';

@Controller('github')
export class GithubController {
  @Post('')
  handleWebHook(@Body() content: GithubDto) {
    console.log(
      'action: ',
      content.action,
      ', label.name: ',
      content?.label?.name,
    );
  }
}
