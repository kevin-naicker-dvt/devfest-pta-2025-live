import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'candidate_name' })
  candidateName: string;

  @Column()
  email: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  position: string;

  @Column({ name: 'cv_filename', nullable: true })
  cvFilename: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}



