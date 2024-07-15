// src/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Course, CourseDocument } from '../course/schemas/course.schema'; // Import Course schema
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>, // Inject Course model
    private jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ username, email, password: hashedPassword });
    return user.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string, isRegisteredForCourse: boolean }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);
    const isRegisteredForCourse = await this.courseModel.findOne({ userId: user._id }).exec();
    return { token, isRegisteredForCourse: !!isRegisteredForCourse };
  }
}
