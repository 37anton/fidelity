import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isMerchant?: boolean;
  }) {
    const existing = await this.usersService.findByEmail(dto.email).catch(() => null);
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
      isMerchant: dto.isMerchant ?? false,
    });

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } };
  }
}
