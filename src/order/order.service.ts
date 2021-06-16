import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductService } from 'src/product/product.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private productService: ProductService,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create(dto);
    let totalPrice = 0;
    for (const i in dto.products) {
      const { productUid, quantity } = dto.products[i];
      console.log({ productUid, quantity });

      const product = await this.productService.getByUid(productUid);
      await order.$add('product', [product.uid]);
      totalPrice = totalPrice + product.price * quantity;

      const updatedQuantity = product.quantity - quantity;
      if (updatedQuantity < 0)
        throw new HttpException(
          `The quantity in the order is more than the ${product.product} quantity in the stock`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      await this.productService.update(product.uid, {
        product: product.product,
        price: product.price,
        quantity: updatedQuantity,
      });
      order.product = [product];
    }
    order.totalPrice = totalPrice;
    await this.orderRepository.update(
      { totalPrice },
      { where: { uid: order.uid } },
    );
    return order;
  }

  async getByUid(uid: string): Promise<Order> {
    return await this.orderRepository.findByPk(uid);
  }

  async delete(uid: string) {
    return await this.orderRepository.destroy({ where: { uid } });
  }

  getAll(): Promise<Order[]> {
    return this.orderRepository.findAll({ include: { all: true } });
  }
}
