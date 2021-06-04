import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmpolyeeDto } from './dto/create.employee.dto';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Create Employee' })
  @ApiResponse({ status: 201, type: Employee })
  @Post()
  create(@Body() userDto: CreateEmpolyeeDto): Promise<Employee> {
    return this.employeeService.create(userDto);
  }

  @ApiOperation({ summary: 'Employess List' })
  @ApiResponse({ status: 200, type: [Employee] })
  @Get()
  getAll(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }
}
