import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    admin: string

    @ManyToMany(() => User, user => user.groups)
    users: User[];
}
