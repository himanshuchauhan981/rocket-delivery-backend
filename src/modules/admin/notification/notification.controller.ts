import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { NotificationService } from './notification.service';
import {
  NotficationList,
  UpdateNotificationStatus,
} from './dto/notification.dto';

@Controller('admin/notification')
@ApiTags('Admin notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async notificationList(@Query(new ValidationPipe()) query: NotficationList) {
    return await this.notificationService.notificationList(query.pageSize);
  }

  @Patch('status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateNotificationStatus(
    @Body(new ValidationPipe()) payload: UpdateNotificationStatus,
  ) {
    return this.notificationService.updateNotificationStatus(
      payload.id,
      payload.all_read,
    );
  }
}
