// src/course/course.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './schemas/course.schema';
import { ChatModule } from '../chat/chat.module'; // Import ChatModule


@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ChatModule,],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [MongooseModule], // Export MongooseModule to make CourseModel available
})
export class CourseModule {}

