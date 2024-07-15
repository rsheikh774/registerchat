// src/schemas/course.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

export enum CourseName {
  FULL_STACK = 'Full Stack',
  DEVOPS = 'Devops',
  DATA_SCIENTIST = 'Data Scientist',
  ARTIFICIAL_INTELLIGENCE = 'Artificial Intelligence',
}

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: CourseName })
  courseName: CourseName;

  @Prop({ required: true })
  collegeName: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  userId: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
