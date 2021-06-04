import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: Product })
  @Roles('EMPLOYEE')
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() productDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(productDto);
  }

  @ApiOperation({ summary: 'Read one product' })
  @ApiResponse({ status: 200, type: Product })
  @Roles('EMPLOYEE', 'CLIENT')
  @UseGuards(RolesGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Product> {
    return await this.productService.getById(id);
  }

  @ApiOperation({ summary: 'Edit product' })
  @ApiResponse({ status: 200, type: Product })
  @Roles('EMPLOYEE')
  @UseGuards(RolesGuard)
  @Put('/:id')
  async update(@Param('id') id: number, @Body() dto: CreateProductDto) {
    return await this.productService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, type: Product })
  @Roles('EMPLOYEE')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }

  @ApiOperation({ summary: 'Products list' })
  @ApiResponse({ status: 200, type: [Product] })
  @Roles('EMPLOYEE', 'CLIENT')
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }
}
