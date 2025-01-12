import { IsString, Min } from 'class-validator';

export class ProductDTO {
  @IsString()
  productname: string;
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;
}
