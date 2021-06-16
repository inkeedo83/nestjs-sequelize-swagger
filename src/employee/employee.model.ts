import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';

interface EmployeeCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
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

  @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'abc123', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
