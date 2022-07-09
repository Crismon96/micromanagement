import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.allProducts();
  }

  @EventPattern('product_created')
  async productCreated({ id, title, image, likes }: any) {
    this.productService.createProduct({
      id,
      title,
      image,
      likes,
    });
  }

  @EventPattern('product_updated')
  async productUpdated({ id, title, image, likes }: any) {
    const updatedProduct = await this.productService.updateProduct({
      id,
      title,
      image,
      likes,
    });

    return updatedProduct;
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.deleteProduct(id);

    return true;
  }

  @EventPattern('product_liked')
  async productLiked(id: number) {
    const { title, image, likes } = await this.productService.findProduct(id);

    return this.productService.updateProduct({ id, title, image, likes: likes + 1 });
  }
}
