import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Client } from 'src/client/client.model';
import { ClientService } from 'src/client/client.service';
import { CreateClientDto } from 'src/client/dto/create.client.dto';
import { CreateEmpolyeeDto } from 'src/employee/dto/create.employee.dto';

@Injectable()
export class AuthClientService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async empLogin(dto: CreateClientDto): Promise<{ token: string }> {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async empRegistration(dto: CreateClientDto): Promise<{ token: string }> {
    const candidate = await this.clientService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        `user with email ${dto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.clientService.create({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: Client): Promise<{ token: string }> {
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

  private async validateUser(dto: CreateEmpolyeeDto): Promise<Client> {
    const user = await this.clientService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'invalid email or password',
    });
  }
}
