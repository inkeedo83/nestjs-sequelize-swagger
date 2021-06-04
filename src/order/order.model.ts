import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/client/client.model';
import { ProductOredr } from 'src/product/product-Order.model';
import { Product } from 'src/product/product.model';

interface OrderCreationAttrs {
  clientId: number;
  productId: number[];
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Client)
  @ApiProperty({ example: '1', description: 'Client ID' })
  @Column({ type: DataType.INTEGER })
  clientId: number;

  @ApiProperty({ example: '100.0', description: 'Total price' })
  @Column({ type: DataType.STRING, defaultValue: '0.0' })
  totalPrice: string;

  @BelongsTo(() => Client)
  author: Client;

  @BelongsToMany(() => Product, () => ProductOredr)
  product: Product[];
}
