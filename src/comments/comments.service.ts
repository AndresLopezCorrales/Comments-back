import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comments.entity';
import { User } from '../users/user.entity';

// Forma de la respuesta que espera el frontend
export interface CommentResponse {
  id: number;
  username: string;
  message: string;
  date: Date;
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}

  // Mapea la entidad al formato plano que espera el frontend
  private toResponse(comment: Comment): CommentResponse {
    return {
      id: comment.id,
      username: comment.user.username,
      message: comment.message,
      date: comment.date,
    };
  }

  async getAll(): Promise<CommentResponse[]> {
    const comments = await this.repo.find();
    return comments.map((c) => this.toResponse(c));
  }

  async create(user: User, message: string): Promise<CommentResponse> {
    const comment = this.repo.create({
      message,
      date: new Date(),
      user,
    });
    const saved = await this.repo.save(comment);
    return this.toResponse(saved);
  }

  async delete(id: number, userId: number): Promise<{ message: string }> {
    const comment = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) throw new NotFoundException('Comentario no encontrado');

    if (comment.user.id !== userId) {
      throw new ForbiddenException('No puedes eliminar este comentario');
    }

    await this.repo.remove(comment);
    return { message: 'Comentario eliminado' };
  }
}