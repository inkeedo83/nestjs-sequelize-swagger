import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'EMPLOYEE/CLIENT', description: 'User role' })
  @IsString({ message: 'should be string' })
  readonly value: string;
  @ApiProperty({ example: 'Employee', description: 'Roel description' })
  @IsString({ message: 'should be string' })
  readonly description: string;
}
