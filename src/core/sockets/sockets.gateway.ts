import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketsGateway {
  @WebSocketServer() server: Server;

  socketUsers = {};

  afterInit() {
    console.log('Socket initiated successfully');
  }

  @SubscribeMessage('connection')
  handleConnection(client: Socket, args: SocketConnection) {
    if (args) {
      this.socketUsers[`${args.user_id}-${args.user_type}`] = client;

      console.log(`Client connected ${client.id}`);
    }
  }

  sendNotification(notificationArgs: any) {
    const client =
      this.socketUsers[
        `${notificationArgs.receiver_id}-${notificationArgs.receiver_type}`
      ];

    client.emit('admin_notification', {
      data: notificationArgs.data,
    });
  }
}
