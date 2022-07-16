import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesProvider } from './countries.provider';
import { CountriesService } from './countries.service';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService, ...CountriesProvider],
})
export class CountriesModule {}
