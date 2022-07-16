import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesProvider } from './states.provider';
import { StatesService } from './states.service';

@Module({
  controllers: [StatesController],
  providers: [StatesService, ...StatesProvider],
})
export class StatesModule {}
