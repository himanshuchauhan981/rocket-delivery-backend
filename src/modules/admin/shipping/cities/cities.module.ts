import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesProvider } from './cities.provider';
import { CitiesService } from './cities.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, ...CitiesProvider],
})
export class CitiesModule {}
