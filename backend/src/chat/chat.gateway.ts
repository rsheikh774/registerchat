import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // Replace with your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: { courseId: string }) {
    client.join(payload.courseId); // Join the specified room (courseId)
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: { courseId: string }) {
    client.leave(payload.courseId); // Leave the specified room (courseId)
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() createChatDto: CreateChatDto) {
    const message = await this.chatService.createMessage(createChatDto); // Use createMessage instead of create
    this.server.to(createChatDto.courseId).emit('message', message); // Emit message to the specified room
    return message;
  }
}
