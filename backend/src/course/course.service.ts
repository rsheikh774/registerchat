// src/course/course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }
}