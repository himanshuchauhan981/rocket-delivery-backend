import { Module } from '@nestjs/common';
import { AdminCountriesController } from './countries.controller';
import { CountriesProvider } from './countries.provider';
import { AdminCountriesService } from './countries.service';

@Module({
  controllers: [AdminCountriesController],
  providers: [AdminCountriesService, ...CountriesProvider],
})
export class AdminCountriesModule {}
