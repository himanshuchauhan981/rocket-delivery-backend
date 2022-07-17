import { Module } from '@nestjs/common';

import { UserShippingService } from './user-shipping.service';
import { UserShippingController } from './shipping.controller';
import { CountriesService } from 'src/modules/shipping/countries/countries.service';
import { UserShippingProvider } from './shipping.provider';
import { StatesService } from 'src/modules/shipping/states/states.service';
import { CitiesService } from 'src/modules/shipping/cities/cities.service';

@Module({
  providers: [
    UserShippingService,
    CountriesService,
    StatesService,
    CitiesService,
    ...UserShippingProvider,
  ],
  controllers: [UserShippingController],
})
export class UserShippingModule {}
