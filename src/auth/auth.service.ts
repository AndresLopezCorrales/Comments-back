import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    // Comparar con bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        username: user.username,
      }),
    };
  }

  async register(username: string, password: string) {
    // Hashear la contraseña antes de guardar
    const hashed = await bcrypt.hash(password, 10);
    return this.usersService.create({ username, password: hashed });
  }
}