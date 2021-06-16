import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'apple', description: 'Product name' })
  @IsString({ message: 'should be string' })
  readonly product: string;

  @ApiProperty({ example: '95.5', description: 'Price' })
  @IsNumber({ allowNaN: false }, { message: 'should be a number' })
  readonly price: number;

  @ApiProperty({ example: '100', description: 'Price' })
  @IsNumber({ allowNaN: false }, { message: 'should be a number' })
  readonly quantity: number;
}
