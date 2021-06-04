import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { Client } from './client/client.model';
import { Employee } from './employee/employee.model';
import { Product } from './product/product.model';
import { Order } from './order/order.model';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserRoles } from './role/user-roles.model';
import { Role } from './role/role.model';
import { ProductOredr } from './product/product-Order.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Client, Employee, Product, Order, UserRoles, Role, ProductOredr],
      autoLoadModels: true,
    }),

    ClientModule,
    EmployeeModule,
    ProductModule,
    OrderModule,
    AuthModule,
    RoleModule,
  ],
})
export class AppModule {}
