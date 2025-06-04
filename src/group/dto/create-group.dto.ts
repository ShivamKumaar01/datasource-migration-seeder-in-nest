import { IsString } from "class-validator";

export class CreateGroupDto {

    @IsString()
    title:string

    @IsString()
    description:string

    @IsString()
    admin:string

    userIds?: number[];
}
