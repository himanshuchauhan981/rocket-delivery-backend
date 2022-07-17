import {
  CITIES_REPOSITORY,
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { Cities } from 'src/modules/shipping/cities/cities.entity';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { States } from 'src/modules/shipping/states/states.entity';

export const CitiesProvider = [
  { provide: COUNTRIES_REPOSITORY, useValue: Countries },
  { provide: STATES_REPOSITORY, useValue: States },
  { provide: CITIES_REPOSITORY, useValue: Cities },
];
