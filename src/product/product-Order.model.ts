import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { Product } from './product.model';

@Table({ tableName: 'product-order', createdAt: false, updatedAt: false })
export class ProductOredr extends Model<ProductOredr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  productUid: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  orderUid: string;
}
