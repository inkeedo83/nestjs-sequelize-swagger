import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/client/client.model';
import { Employee } from 'src/employee/employee.model';
import { RoleController } from './role.controller';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { UserRoles } from './user-roles.model';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([Role, Client, Employee, UserRoles])],
  exports: [RoleService],
})
export class RoleModule {}
