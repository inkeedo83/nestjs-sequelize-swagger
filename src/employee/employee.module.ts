import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { UserRoles } from 'src/role/user-roles.model';
import { EmployeeController } from './employee.controller';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    RoleModule,
    SequelizeModule.forFeature([Employee, Role, UserRoles]),
    forwardRef(() => AuthModule),
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
