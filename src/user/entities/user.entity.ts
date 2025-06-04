// import { group } from "console";
import { Group } from "src/group/entities/group.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  // @Column({ type: 'varchar', length: 15 ,nullable:true})
  // interest: string;


  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @ManyToMany(() => Group, group => group.users, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable() // only on one side
  groups: Group[];

}
