import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationProvider } from './notification.provider';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, ...NotificationProvider],
})
export class NotificationModule {}
