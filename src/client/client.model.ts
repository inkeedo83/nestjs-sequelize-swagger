import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';

interface ClientCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, ClientCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: 'abc123', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Order)
  orders: Order[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
