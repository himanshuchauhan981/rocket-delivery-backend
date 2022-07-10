import { COUNTRIES_REPOSITORY } from 'src/core/constants/repositories';
import { Countries } from 'src/modules/countries/countries.entity';

export const CountriesProvider = [
  { provide: COUNTRIES_REPOSITORY, useValue: Countries },
];
