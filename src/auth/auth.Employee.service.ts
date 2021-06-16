import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateEmpolyeeDto } from 'src/employee/dto/create.employee.dto';
import { Employee } from 'src/employee/employee.model';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthEmployeeService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async empLogin(dto: CreateEmpolyeeDto): Promise<{ token: string }> {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async empRegistration(dto: CreateEmpolyeeDto): Promise<{ token: string }> {
    const candidate = await this.employeeService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        `user with email ${dto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.employeeService.create({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: Employee): Promise<{ token: string }> {
    const payload = {
      email: user.email,
      id: user.id,
      uid: user.uid,
      role: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: CreateEmpolyeeDto): Promise<Employee> {
    const user = await this.employeeService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'invalid email or password',
    });
  }
}
