import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelloWorld } from './entities/hello-world.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(HelloWorld)
    private helloWorldRepository: Repository<HelloWorld>,
  ) {}

  async getHelloWorld(): Promise<HelloWorld> {
    const result = await this.helloWorldRepository.findOne({
      where: {},
      order: { id: 'ASC' },
    });
    return result;
  }

  async getHealth(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}

