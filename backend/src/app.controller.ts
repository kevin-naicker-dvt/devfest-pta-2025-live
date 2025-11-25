import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloWorld } from './entities/hello-world.entity';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async getHelloWorld(): Promise<HelloWorld> {
    return this.appService.getHelloWorld();
  }

  @Get('health')
  async getHealth(): Promise<{ status: string; timestamp: string }> {
    return this.appService.getHealth();
  }
}



