import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorld } from './entities/hello-world.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'DevF3st123-pluto-is-plan3t',
      database: process.env.DB_DATABASE || 'devfest_db',
      entities: [HelloWorld],
      synchronize: false, // Don't auto-sync in production
      logging: true,
    }),
    TypeOrmModule.forFeature([HelloWorld]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

