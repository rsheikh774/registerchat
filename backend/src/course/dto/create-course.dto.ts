// src/course/dto/create-course.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CourseName } from '../schemas/course.schema';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(CourseName)
  courseName: CourseName;

  @IsString()
  @IsNotEmpty()
  collegeName: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
