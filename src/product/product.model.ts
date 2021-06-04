import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { ProductOredr } from './product-Order.model';

interface ProductCreationAttrs {
  product: string;
  price: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'apple', description: 'Product name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  product: string;

  @ApiProperty({ example: '95.5', description: 'Price' })
  @Column({ type: DataType.STRING, allowNull: false })
  price: string;

  @BelongsToMany(() => Order, () => ProductOredr)
  order: Order[];
}
