import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login(dto: AuthDto) {
    // find the user by email
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user not found, throw error
    if (!existingUser) {
      throw new BadRequestException('user not found');
    }

    // compare the password
    const pwMatches = await argon.verify(existingUser.hashedPwd, dto.password);

    // if password is incorrect, throw error
    if (!pwMatches) {
      throw new BadRequestException('incorrect password');
    }

    delete existingUser.hashedPwd;
    // return the user
    return existingUser;
  }

  async signup(dto: AuthDto) {
    // generate the hashed password
    const hashedPwd = await argon.hash(dto.password);

    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hashedPwd,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      // return the user
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        {
          if (error.code === 'P2002') {
            throw new BadRequestException('Email already exists');
          }
        }
        throw error;
      }
    }
  }
}
