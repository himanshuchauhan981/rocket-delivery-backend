import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { NotificationService } from './notification.service';
import {
  NotficationList,
  UpdateNotificationStatus,
} from './dto/notification.dto';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { NotificationListResponse } from './dto/notification-response.dto';

@Controller('admin/notification')
@ApiTags('Admin notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: NotificationListResponse })
  notificationList(
    @Query(new ValidationPipe()) query: NotficationList,
  ): Promise<NotificationListResponse> {
    return this.notificationService.notificationList(query.pageSize);
  }

  @Patch('status')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  updateNotificationStatus(
    @Body(new ValidationPipe()) payload: UpdateNotificationStatus,
  ): Promise<APIResponse> {
    return this.notificationService.updateNotificationStatus(
      payload.id,
      payload.all_read,
    );
  }
}
