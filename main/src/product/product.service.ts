import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  async allProducts() {
    return this.productModel.find().exec();
  }
  async createProduct(product) {
    return new this.productModel(product).save();
  }
  async findProduct(id: number) {
    return this.productModel.findOne({ id });
  }
  async updateProduct(data: any) {
    console.log('data: ', data);
    return this.productModel.findOneAndReplace({ id: data.id }, data).exec();
  }
  async deleteProduct(id: number) {
    return this.productModel.deleteOne({ id });
  }
}
