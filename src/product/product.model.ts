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
  price: number;
  quantity: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: '1', description: 'index id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'e6547da0-ce04-11eb-a723-158b44814720',
    description: 'Unique id',
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  uid: string;

  @ApiProperty({ example: 'apple', description: 'Product name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  product: string;

  @ApiProperty({ example: '95.5', description: 'Price' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @ApiProperty({ example: '100', description: 'Quantity' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  quantity: number;

  @BelongsToMany(() => Order, () => ProductOredr)
  order: Order[];
}
