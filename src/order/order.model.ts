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

type productType = { productUid: string; quantity: number };
interface OrderCreationAttrs {
  clientUid: string;
  products: productType[];
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
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

  @ForeignKey(() => Client)
  @ApiProperty({ example: '1', description: 'Clients unique id' })
  @Column({ type: DataType.UUID })
  clientUid: string;

  @ApiProperty({
    type: ['productType'],
    example:
      '[{"productUid": "e6547da0-ce04-11eb-a723-158b44814720" ,"quantity":2}]',
    description: 'products quantity in order',
  })
  @Column({ type: DataType.ARRAY(DataType.JSONB) })
  products: productType[];

  @ApiProperty({ example: '100.0', description: 'Total price' })
  @Column({ type: DataType.FLOAT, defaultValue: '0.0' })
  totalPrice: number;

  @BelongsTo(() => Client)
  author: Client;

  @BelongsToMany(() => Product, () => ProductOredr)
  product: Product[];
}
