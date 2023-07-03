import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip): string {
    console.log('HREN');
    console.log(ip);
    return this.appService.getHello();
  }
}
