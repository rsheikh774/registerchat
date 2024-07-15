import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from '../schemas/user.schema';
import { CourseModule } from '../course/course.module'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('WEBTOKEN_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('WEBTOKEN_EXPIRATION_TIME') },
      }),
      
    }),
    CourseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Import User model here
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
