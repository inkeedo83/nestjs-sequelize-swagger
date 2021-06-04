import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/role/role.service';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create.client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private clientRepository: typeof Client,
    private roleService: RoleService,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const user = await this.clientRepository.create(dto);
    const role = await this.roleService.getRoleByValue('CLIENT');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll(): Promise<Client[]> {
    return await this.clientRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string): Promise<Client> {
    const user = await this.clientRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
