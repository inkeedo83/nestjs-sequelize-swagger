import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateOrderDto } from './dto/create.order.dto';
import { Order } from './order.model';
import { OrderService } from './order.service';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private oredrService: OrderService) {}

  @ApiOperation({ summary: 'Create oreder' })
  @ApiResponse({ status: 201, type: Order })
  @Roles('CLIENT')
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() orderDto: CreateOrderDto): Promise<Order> {
    return await this.oredrService.create(orderDto);
  }

  @ApiOperation({ summary: 'Read one order' })
  @ApiResponse({ status: 200, type: Order })
  @Roles('EMPLOYEE', 'CLIENT')
  @UseGuards(RolesGuard)
  @Get('/:uid')
  async getOne(@Param('uid', new ParseUUIDPipe()) uid: string): Promise<Order> {
    return await this.oredrService.getByUid(uid);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, type: Order })
  @Roles('EMPLOYEE')
  @UseGuards(RolesGuard)
  @Delete('/:uid')
  async delete(@Param('uid', new ParseUUIDPipe()) uid: string) {
    return await this.oredrService.delete(uid);
  }

  @ApiOperation({ summary: 'Orders list' })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles('EMPLOYEE', 'CLIENT')
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Order[]> {
    return await this.oredrService.getAll();
  }
}
