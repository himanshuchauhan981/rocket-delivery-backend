import { Module } from '@nestjs/common';
import { CitiesProvider } from './cities.provider';
import { CitiesService } from './cities.service';

@Module({
  providers: [CitiesService, ...CitiesProvider],
})
export class CitiesModule {}
