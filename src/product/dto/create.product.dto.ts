import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'apple', description: 'Product name' })
  @IsString({ message: 'should be string' })
  readonly product: string;
  @ApiProperty({ example: '95.5', description: 'Price' })
  @IsString({ message: 'should be string' })
  readonly price: string;
}
