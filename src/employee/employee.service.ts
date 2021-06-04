import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/role/role.service';
import { CreateEmpolyeeDto } from './dto/create.employee.dto';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private roleService: RoleService,
  ) {}

  async create(dto: CreateEmpolyeeDto): Promise<Employee> {
    const user = await this.employeeRepository.create(dto);
    const role = await this.roleService.getRoleByValue('EMPLOYEE');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  getAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string): Promise<Employee> {
    const user = await this.employeeRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
