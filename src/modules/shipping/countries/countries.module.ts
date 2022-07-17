import { Module } from '@nestjs/common';
import { CountriesProvider } from './countries.provider';
import { CountriesService } from './countries.service';

@Module({
  providers: [CountriesService, ...CountriesProvider],
})
export class CountriesModule {}
