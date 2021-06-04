import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/order/order.model';
import { Product } from 'src/product/product.model';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { UserRoles } from 'src/role/user-roles.model';
import { ClientController } from './client.controller';
import { Client } from './client.model';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    RoleModule,
    SequelizeModule.forFeature([Client, Product, Order, Role, UserRoles]),
    forwardRef(() => AuthModule),
  ],
  exports: [ClientService],
})
export class ClientModule {}
