import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entities/product';
import { ProductService } from 'src/products/service/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getAll')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get('getById/:id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Post('create')
  async addProduct(@Body() productData: ProductDTO) {
    await this.productService.addProduct(productData);
    return { message: 'Product created successfully' };
  }
}
