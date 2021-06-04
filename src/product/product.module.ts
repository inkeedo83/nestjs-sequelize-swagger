import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/order/order.model';
import { OrderModule } from 'src/order/order.module';
import { RoleModule } from 'src/role/role.module';
import { ProductOredr } from './product-Order.model';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    forwardRef(() => OrderModule),
    SequelizeModule.forFeature([Product, Order, ProductOredr]),
    forwardRef(() => AuthModule),
    RoleModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
