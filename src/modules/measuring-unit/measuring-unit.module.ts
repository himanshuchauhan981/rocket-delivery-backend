import { Module } from '@nestjs/common';

import { MeasuringUnitController } from './measuring-unit.controller';
import { MeasuringUnitService } from './measuring-unit.service';

@Module({
  controllers: [MeasuringUnitController],
  providers: [MeasuringUnitService],
})
export class MeasuringUnitModule {}
