import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ unique: true, nullable: false, length: 100 })
  productname: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false, default: 0.0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
