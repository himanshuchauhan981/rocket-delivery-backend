import { Module } from '@nestjs/common';

import { StatesController } from './states.controller';
import { StatesProvider } from './states.provider';
import { StatesService } from './states.service';
import { StatesService as CommonStatesService } from '../../../shipping/states/states.service';

@Module({
  controllers: [StatesController],
  providers: [StatesService, CommonStatesService, ...StatesProvider],
})
export class StatesModule {}
