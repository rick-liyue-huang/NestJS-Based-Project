import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // The AuthService instance is injected into the AuthController constructor.
  // path on server is /auth/signup
  @Post('signup')
  signup(
    /*@Req() req: Request*/ @Body('email') email: string,
    @Body('password', ParseIntPipe) password: string,
    @Body() dto: AuthDto
  ) {
    console.log({ dto });
    return this.authService.signup(dto);
  }

  // path on server is /auth/login
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
