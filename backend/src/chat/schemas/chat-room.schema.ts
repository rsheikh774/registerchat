// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type ChatDocument = Chat & Document;

// @Schema()
// export class Chat {
//   @Prop()
//   username: string;

//   @Prop()
//   message: string;

//   @Prop({ default: Date.now })
//   createdAt: Date;
// }

// export const ChatSchema = SchemaFactory.createForClass(Chat);


// src/chat/schemas/chat-room.schema.ts
// src/chat/schemas/chat-room.schema.ts
// src/chat/schemas/chat-room.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatRoomDocument = ChatRoom & Document;

@Schema()
export class ChatRoom {
  @Prop({ required: true })
  courseId: string;

  @Prop({ type: [String], required: true })
  participants: string[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);


