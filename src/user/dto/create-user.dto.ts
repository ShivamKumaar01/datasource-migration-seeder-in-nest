import { IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsInt()
    age: number;
    @IsString()
    password: string;
    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender: string;
      @IsOptional()
  @IsArray()
  @IsInt({ each: true })
    groupIds?: number[];
}
