import { Module } from '@nestjs/common';

import { CountriesController } from './countries.controller';
import { CountriesProvider } from './countries.provider';
import { CountriesService } from './countries.service';
import { CountriesService as CommonCountriesService } from '../../../shipping/countries/countries.service';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService, CommonCountriesService, ...CountriesProvider],
})
export class CountriesModule {}
