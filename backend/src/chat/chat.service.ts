// src/chat/chat.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { ChatRoom, ChatRoomDocument } from './schemas/chat-room.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    @InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoomDocument>,
  ) {}

  async createMessage(createChatDto: CreateChatDto): Promise<Message> {
    const createdMessage = new this.messageModel(createChatDto);
    return createdMessage.save();
  }

  async createChatRoom(courseId: string, participants: string[]): Promise<ChatRoom> {
    const createdChatRoom = new this.chatRoomModel({ courseId, participants });
    return createdChatRoom.save();
  }

  async findMessagesByCourseId(courseId: string): Promise<Message[]> {
    return this.messageModel.find({ courseId }).exec();
  }
}
