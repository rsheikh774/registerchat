// src/course/course.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { ChatService } from '../chat/chat.service';
import { CourseDocument } from './schemas/course.schema';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly chatService: ChatService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('course-selection')
  async createCourse(@Req() req, @Body() createCourseDto: CreateCourseDto) {
    const userId = req.user.userId;
    const course: CourseDocument = await this.courseService.createCourse({ ...createCourseDto, userId });

    // Create chat room for the selected course
    const participants = [userId]; // Add more participants as needed
    await this.chatService.createChatRoom(course._id.toString(), participants);

    return course;
  }
}
