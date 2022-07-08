import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  all() {
    return this.productService.getAllProducts();
  }

  @Post()
  create(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.createProduct({ title, image });
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.getSingleProduct(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body('title') title: string, @Body('image') image: string) {
    return this.productService.updateProduct(id, { title, image });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
