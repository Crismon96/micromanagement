import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
  ) {}

  @Get()
  all() {
    return this.productService.getAllProducts();
  }

  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    console.log('product: ', title);

    const product = await this.productService.createProduct({ title, image });
    this.client.emit('product_created', product);

    return product;
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.getSingleProduct(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body('title') title: string, @Body('image') image: string) {
    await this.productService.updateProduct(id, { title, image });

    const product = await this.productService.getSingleProduct(id);

    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);

    this.client.emit('product_deleted', id);
    return true;
  }

  @Post(':id/like')
  async likeProduct(@Param('id') id: number) {
    const product = await this.productService.getSingleProduct(id);

    this.client.emit('product_liked', id);
    return this.productService.updateProduct(id, { ...product, likes: product.likes + 1 });
  }
}
