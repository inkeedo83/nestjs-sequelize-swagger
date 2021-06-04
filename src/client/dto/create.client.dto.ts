import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'user@mail.com', description: 'Email address' })
  @IsString({ message: 'should be string' })
  @IsEmail({}, { message: 'invalid email address' })
  readonly email: string;
  @ApiProperty({ example: 'abc123', description: 'Password' })
  @IsString({ message: 'should be string' })
  @Length(4, 16, {
    message: 'password should not be less than 4 and more than 16',
  })
  readonly password: string;
}
