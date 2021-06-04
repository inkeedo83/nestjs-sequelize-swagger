import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Client } from 'src/client/client.model';
import { ProductOredr } from 'src/product/product-Order.model';
import { Product } from 'src/product/product.model';
import { ProductModule } from 'src/product/product.module';
import { RoleModule } from 'src/role/role.module';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    forwardRef(() => ProductModule),
    SequelizeModule.forFeature([Client, Product, Order, ProductOredr]),
    forwardRef(() => AuthModule),
    RoleModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
