import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: any): Promise<any> {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<any> {
    const { accessToken } = await this.authService.login(email, password);
    return { accessToken };
  }
}
