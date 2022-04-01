import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketsGateway {

  @WebSocketServer() server;

  socketUsers = {};

  afterInit(server: Server) {
    console.log('Socket initiated successfully');
  }

  @SubscribeMessage('connection')
  handleConnection(client: Socket, user_id: number) {

    if(user_id) {
      this.socketUsers[user_id] = client;

      console.log(`Client connected ${client.id}`);
    }
    
  }
}
