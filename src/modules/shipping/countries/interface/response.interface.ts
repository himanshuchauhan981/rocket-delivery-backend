import { ApiResponse } from 'src/modules/common/interface';
import { Country } from '.';

interface CountriesListResponse extends ApiResponse {
  data: {
    countries: Country[];
    count: number;
  };
}

export { CountriesListResponse };
