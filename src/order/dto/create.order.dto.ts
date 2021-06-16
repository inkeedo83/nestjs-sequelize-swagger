import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

type productType = { productUid: string; quantity: number };
export class CreateOrderDto {
  @ApiProperty({
    example: 'g6547da0-ce04-11eb-a723-158b44814720',
    description: 'Client ID',
  })
  @IsUUID('all')
  readonly clientUid: string;

  @ApiProperty({
    type: ['productType'],
    example:
      '[{"productUid": "e6547da0-ce04-11eb-a723-158b44814720" ,"quantity":2}]',
    description: 'order details',
  })
  products: productType[];
}
