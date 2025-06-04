import { IsInt, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreatePostDto {
  

    @IsString()
    title:string

    @IsString()
    description:string
    
    @IsInt()
    userid:number

    



}
