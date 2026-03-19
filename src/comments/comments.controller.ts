import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/common/guards/jwt.guards';
import { CommentsService } from './comments.service';
import { UsersService } from 'src/users/user.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private service: CommentsService,
    private usersService: UsersService,
  ) {}

  // GET /comments  →  público, cualquiera puede ver los comentarios
  @Get()
  getAll() {
    return this.service.getAll();
  }

  // POST /comments  →  requiere JWT
  @UseGuards(JwtAuthGuard)
@Post()
async create(@Req() req, @Body() body: { message: string }) {
  const user = await this.usersService.findById(req.user.userId);
  
  if (!user) throw new UnauthorizedException(); 
  
  return this.service.create(user, body.message);
}

  // DELETE /comments/:id  →  requiere JWT
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.service.delete(Number(id), req.user.userId);
  }
}