import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productName:string;

    @Column({ type: 'int' })
    price:number

    @Column()
    description:string
}
