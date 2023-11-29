import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // The AuthService instance is injected into the AuthController constructor.
  // path on server is /auth/signup
  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  // path on server is /auth/login
  @Post('login')
  login() {
    return this.authService.login();
  }
}
