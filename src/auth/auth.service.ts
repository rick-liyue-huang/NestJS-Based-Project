import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  login() {
    return { hi: 'this is login' };
  }

  signup() {
    return { hi: 'this is signup' };
  }
}
