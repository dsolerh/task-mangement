import { Controller, Get } from '@nestjs/common';
import { version } from '../package.json';
@Controller()
export class AppController {
  @Get('version')
  getVersion(): { version: string } {
    return { version };
  }
}
