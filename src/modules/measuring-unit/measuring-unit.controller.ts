import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { MeasuringUnitService } from './measuring-unit.service';

@Controller('admin/measuringUnit')
@ApiTags('Measuring units')
export class MeasuringUnitController {

  constructor(private measuringUnitService: MeasuringUnitService) {}

  @Get('all')
  @UseInterceptors(TransformInterceptor)
  async findAll() {
    return await this.measuringUnitService.findAll();
  }
}
