import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './client.model';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create.client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @ApiOperation({ summary: 'Create Client' })
  @ApiResponse({ status: 201, type: Client })
  @Post()
  async create(@Body() userDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(userDto);
  }

  @ApiOperation({ summary: 'Clients list' })
  @ApiResponse({ status: 200, type: [Client] })
  @Get()
  async getAll(): Promise<Client[]> {
    return await this.clientService.getAll();
  }
}
