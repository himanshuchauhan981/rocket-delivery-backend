import { Module } from '@nestjs/common';

import { CitiesController } from './cities.controller';
import { CitiesProvider } from './cities.provider';
import { CitiesService } from './cities.service';
import { CitiesService as CommonCitiesService } from '../../../shipping/cities/cities.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, CommonCitiesService, ...CitiesProvider],
})
export class CitiesModule {}
