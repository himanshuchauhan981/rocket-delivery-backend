import { Cities } from 'src/modules/shipping/cities/cities.entity';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { States } from 'src/modules/shipping/states/states.entity';
import {
  ADDRESS_REPOSITORY,
  CITIES_REPOSITORY,
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from '../../../core/constants/repositories';
import { Address } from '../../../modules/address/address.entity';

export const UserAddressProvider = [
  { provide: ADDRESS_REPOSITORY, useValue: Address },
  { provide: COUNTRIES_REPOSITORY, useValue: Countries },
  { provide: STATES_REPOSITORY, useValue: States },
  { provide: CITIES_REPOSITORY, useValue: Cities },
];
