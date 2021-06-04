import { Injectable } from '@nestjs/common';
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
    for (const id of dto.productId) {
      const product = await this.productService.getById(id);
      await order.$add('product', [product.id]);
      totalPrice = totalPrice + Number(product.price);
      order.product = [product];
    }
    const strTotalPrice = String(totalPrice);
    order.totalPrice = strTotalPrice;
    await this.orderRepository.update(
      { totalPrice: strTotalPrice },
      { where: { id: order.id } },
    );
    return order;
  }

  async getById(id: number): Promise<Order> {
    return await this.orderRepository.findByPk(id);
  }

  async delete(id: number) {
    return await this.orderRepository.destroy({ where: { id } });
  }

  getAll(): Promise<Order[]> {
    return this.orderRepository.findAll({ include: { all: true } });
  }
}
