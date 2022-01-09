import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { AdminService } from './admin.service';
import { AdminLogin } from './dto/admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  async login(@Body(ValidationPipe) payload: AdminLogin) {
    const data = this.adminService.login(payload);
    return data;
  }
}
