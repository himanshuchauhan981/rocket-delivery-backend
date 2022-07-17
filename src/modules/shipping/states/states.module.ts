import { Module } from '@nestjs/common';
import { StatesProvider } from './states.provider';
import { StatesService } from './states.service';

@Module({
  providers: [StatesService, ...StatesProvider],
})
export class StatesModule {}
