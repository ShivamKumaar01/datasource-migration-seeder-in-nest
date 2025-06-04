import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;


} 
