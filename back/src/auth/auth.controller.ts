import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isMerchant?: boolean;
  }) {
    return this.service.register(body);
  }
}
