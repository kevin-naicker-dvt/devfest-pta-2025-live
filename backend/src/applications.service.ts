import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const application = this.applicationsRepository.create(createApplicationDto);
    return this.applicationsRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByEmail(email: string): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: { email },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
    const application = await this.findOne(id);
    
    Object.assign(application, updateApplicationDto);
    
    return this.applicationsRepository.save(application);
  }

  async remove(id: number): Promise<void> {
    const result = await this.applicationsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }
}



