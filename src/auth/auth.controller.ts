import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // POST /auth/login
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validate(body.username, body.password);

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    return this.authService.login(user);
    // Devuelve: access_token
  }

  // POST /auth/register
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    // Verificar que el username no exista ya
    const existing = await this.usersService.findByUsername(body.username);
    if (existing) throw new ConflictException('El usuario ya existe');

    const user = await this.authService.register(body.username, body.password);

    // Loguear automáticamente al registrarse
    return this.authService.login(user);
    // Devuelve: access_token
  }
}