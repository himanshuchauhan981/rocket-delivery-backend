import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [CountriesModule, StatesModule],
})
export class ShippingModule {}
