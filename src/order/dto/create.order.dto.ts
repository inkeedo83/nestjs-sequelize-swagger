import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '1', description: 'Client ID' })
  @IsNumber({ allowNaN: false })
  readonly clientId: number;
  @ApiProperty({ example: '[1,2]', description: 'Product ID' })
  @IsArray({ message: 'should be array of integers' })
  readonly productId: number[];
}
