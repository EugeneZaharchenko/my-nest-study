import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(newProduct: ProductDTO): Promise<Product> {
    const { productname, price } = newProduct;
    const product = this.productRepository.create({ productname, price });
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        price: 'ASC',
      },
    });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(
    id: number,
    updatedProduct: ProductDTO,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.productRepository.merge(product, updatedProduct);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
  }
}
