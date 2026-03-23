import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/user.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { Comment } from './comments/comments.entity';

@Module({
  imports: [
    // Variables de entorno disponibles en toda la app
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Comment],
      synchronize: false, // True DEV y False PROD
    }),

    UsersModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}