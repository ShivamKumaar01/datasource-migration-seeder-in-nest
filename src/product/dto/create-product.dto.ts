import { IsInt, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    productName: string;
    @IsInt()
    price: number;
    @IsString()
    description: string;
}
