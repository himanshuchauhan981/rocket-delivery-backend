import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWTAuthGuard } from 'src/core/guard/jwt.guard';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { MeasuringUnitService } from './measuring-unit.service';

@Controller('admin/measuringUnit')
@ApiTags('Measuring units')
export class MeasuringUnitController {
  constructor(private measuringUnitService: MeasuringUnitService) {}

  @Get('all')
  @ApiBearerAuth('Authorization')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(TransformInterceptor)
  async findAll() {
    return await this.measuringUnitService.findAll();
  }
}
