import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { hi: 'this is login' };
  }

  signup() {
    return { hi: 'this is signup' };
  }
}
