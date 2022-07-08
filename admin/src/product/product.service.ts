import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async getAllProducts() {
    return this.productRepository.find();
  }

  async createProduct({ title, image }: { title: string; image: string }) {
    return this.productRepository.save({ title, image });
  }

  async getSingleProduct(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(id: number, product) {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
