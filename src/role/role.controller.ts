import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';

@ApiTags('Users roles')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, type: [Role] })
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<Role> {
    return await this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Read one role' })
  @ApiResponse({ status: 201, type: [Role] })
  @Get('/:value')
  async getByValue(@Param('value') value: string): Promise<Role> {
    return await this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Roles list' })
  @ApiResponse({ status: 201, type: [Role] })
  @Get()
  async getAll(): Promise<Role[]> {
    return await this.roleService.getAll();
  }
}
