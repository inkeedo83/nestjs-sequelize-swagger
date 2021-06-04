import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from 'src/client/dto/create.client.dto';
import { CreateEmpolyeeDto } from 'src/employee/dto/create.employee.dto';
import { AuthClientService } from './auth.client.service';
import { AuthEmployeeService } from './auth.Employee.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authEmployeeService: AuthEmployeeService,
    private authClientService: AuthClientService,
  ) {}

  @ApiOperation({ summary: 'Employee login' })
  @ApiResponse({ status: 200, description: 'return Employee' })
  @Post('/employees/login')
  async empLogin(
    @Body() userDto: CreateEmpolyeeDto,
  ): Promise<{ token: string }> {
    return await this.authEmployeeService.empLogin(userDto);
  }

  @ApiOperation({ summary: 'Employee registration' })
  @ApiResponse({ status: 201, description: 'JWT token for registerd user' })
  @ApiResponse({ status: 400, description: 'bad request/user exist' })
  @Post('/employees/registration')
  async empRegistration(
    @Body() userDto: CreateEmpolyeeDto,
  ): Promise<{ token: string }> {
    return await this.authEmployeeService.empRegistration(userDto);
  }

  @ApiOperation({ summary: 'Client login' })
  @ApiResponse({ status: 200, description: 'return Client' })
  @Post('/client/login')
  async cpLogin(@Body() userDto: CreateClientDto): Promise<{ token: string }> {
    return await this.authClientService.empLogin(userDto);
  }

  @ApiOperation({ summary: 'Client registration' })
  @ApiResponse({ status: 201, description: 'JWT token for registerd user' })
  @ApiResponse({ status: 400, description: 'bad request/user exist' })
  @Post('/client/registration')
  async cRegistration(
    @Body() userDto: CreateClientDto,
  ): Promise<{ token: string }> {
    return await this.authClientService.empRegistration(userDto);
  }
}
