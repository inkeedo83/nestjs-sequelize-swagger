import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientModule } from 'src/client/client.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthClientService } from './auth.client.service';
import { AuthController } from './auth.controller';
import { AuthEmployeeService } from './auth.Employee.service';

@Module({
  controllers: [AuthController],
  providers: [AuthEmployeeService, AuthClientService],
  imports: [
    forwardRef(() => EmployeeModule),
    forwardRef(() => ClientModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthEmployeeService, AuthClientService, JwtModule],
})
export class AuthModule {}
