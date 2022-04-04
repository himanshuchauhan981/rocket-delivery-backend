import { Module } from '@nestjs/common';

import { SocketsGateway } from 'src/core/sockets/sockets.gateway';
import { NotificationProvider } from '../notification.provider';
import { NotificationService } from '../notification.service';

@Module({
  providers: [NotificationService, SocketsGateway, ...NotificationProvider],
})
export class NotificationModule {}
